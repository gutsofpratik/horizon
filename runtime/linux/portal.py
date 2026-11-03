"""App-owned Wayland capture/input session; never bypasses the portal consent dialog."""
import base64, io, json, math, os, sys, threading, time, uuid
import gi
gi.require_version('Gst', '1.0')
from gi.repository import Gio, GLib, Gst
from PIL import Image
Gst.init(None)
DEST = 'org.freedesktop.portal.Desktop'
PATH = '/org/freedesktop/portal/desktop'
RD = 'org.freedesktop.portal.RemoteDesktop'
SC = 'org.freedesktop.portal.ScreenCast'


def coordinate(value, maximum):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value) or not 0 <= value < maximum:
        raise ValueError('Coordinates must be finite and inside the latest screenshot')
    return float(value)


def keysym(name):
    names = {'ctrl': 0xffe3, 'control': 0xffe3, 'shift': 0xffe1, 'alt': 0xffe9,
             'meta': 0xffeb, 'super': 0xffeb, 'win': 0xffeb, 'windows': 0xffeb,
             'enter': 0xff0d, 'return': 0xff0d, 'tab': 0xff09, 'escape': 0xff1b,
             'esc': 0xff1b, 'backspace': 0xff08, 'delete': 0xffff, 'space': 32,
             'left': 0xff51, 'up': 0xff52, 'right': 0xff53, 'down': 0xff54,
             'home': 0xff50, 'end': 0xff57, 'pageup': 0xff55, 'pagedown': 0xff56}
    if not isinstance(name, str):
        raise ValueError('Invalid keyboard key')
    if name.lower() in names:
        return names[name.lower()]
    if name.lower().startswith('f') and name[1:].isdigit() and 1 <= int(name[1:]) <= 12:
        return 0xffbd + int(name[1:])
    if len(name) == 1:
        value = ord(name)
        return value if value <= 255 else 0x01000000 | value
    raise ValueError('Unknown keyboard key: ' + name)


class Portal:
    def __init__(self):
        self.bus = Gio.bus_get_sync(Gio.BusType.SESSION, None)
        self.session = None
        self.pipe = None
        self.fd = None
        self.screens = {}
        self.closed_subscription = None

    def call(self, interface, method, signature, args):
        return self.bus.call_sync(DEST, PATH, interface, method, GLib.Variant(signature, args),
                                  None, Gio.DBusCallFlags.NONE, 15000, None)

    def request(self, interface, method, signature, args):
        token = 'horizon_' + uuid.uuid4().hex
        args = list(args)
        args[-1] = dict(args[-1], handle_token=GLib.Variant('s', token))
        sender = self.bus.get_unique_name()[1:].replace('.', '_')
        path = '/org/freedesktop/portal/desktop/request/' + sender + '/' + token
        event, answer = threading.Event(), []
        def response(_bus, _sender, _path, _interface, _signal, params):
            answer.append(params.unpack())
            event.set()
        sub = self.bus.signal_subscribe(DEST, 'org.freedesktop.portal.Request', 'Response', path,
                                        None, Gio.DBusSignalFlags.NONE, response)
        try:
            self.call(interface, method, signature, tuple(args))
            if not event.wait(90):
                self.bus.call_sync(DEST, path, 'org.freedesktop.portal.Request', 'Close', None,
                                   None, Gio.DBusCallFlags.NONE, 3000, None)
                raise TimeoutError('Desktop permission request timed out')
            code, values = answer[0]
            if code != 0:
                raise PermissionError('Desktop sharing was cancelled or denied')
            return values
        finally:
            self.bus.signal_unsubscribe(sub)

    def grant(self):
        self.close()
        try:
            result = self.request(RD, 'CreateSession', '(a{sv})', ({'session_handle_token': GLib.Variant('s', 'horizon_' + uuid.uuid4().hex)},))
            self.session = result['session_handle']
            self.closed_subscription = self.bus.signal_subscribe(DEST, 'org.freedesktop.portal.Session', 'Closed', self.session, None,
                Gio.DBusSignalFlags.NONE, lambda *_: self.close(False))
            self.request(RD, 'SelectDevices', '(oa{sv})', (self.session, {'types': GLib.Variant('u', 3)}))
            self.request(SC, 'SelectSources', '(oa{sv})', (self.session, {'types': GLib.Variant('u', 1), 'multiple': GLib.Variant('b', False), 'cursor_mode': GLib.Variant('u', 2)}))
            result = self.request(RD, 'Start', '(osa{sv})', (self.session, '', {}))
            if result.get('devices', 0) & 3 != 3:
                raise PermissionError('Both keyboard and pointer permission are required')
            streams = result.get('streams', [])
            if len(streams) != 1:
                raise ValueError('Select exactly one display for coordinate-safe control')
            self.node, props = streams[0]
            self.logical = props.get('logical_size', props.get('size'))
            if not self.logical or min(self.logical) <= 0:
                raise ValueError('Portal did not provide valid display dimensions')
            reply, fds = self.bus.call_with_unix_fd_list_sync(DEST, PATH, SC, 'OpenPipeWireRemote',
                GLib.Variant('(oa{sv})', (self.session, {})), GLib.VariantType.new('(h)'), Gio.DBusCallFlags.NONE, 15000, None, None)
            self.fd = fds.get(reply.unpack()[0])
            self.pipe = Gst.parse_launch(f'pipewiresrc fd={self.fd} path={self.node} do-timestamp=true ! videoconvert ! video/x-raw,format=RGB ! appsink name=frames max-buffers=1 drop=true sync=false')
            self.sink = self.pipe.get_by_name('frames')
            self.pipe.set_state(Gst.State.PLAYING)
            return {'enabled': True}
        except Exception:
            self.close()
            raise

    def close(self, notify=True):
        session, self.session = self.session, None
        self.screens.clear()
        if self.closed_subscription:
            self.bus.signal_unsubscribe(self.closed_subscription)
            self.closed_subscription = None
        if self.pipe:
            self.pipe.set_state(Gst.State.NULL)
            self.pipe = None
        if self.fd is not None:
            os.close(self.fd)
            self.fd = None
        if session and notify:
            try:
                self.bus.call_sync(DEST, session, 'org.freedesktop.portal.Session', 'Close', None, None, Gio.DBusCallFlags.NONE, 3000, None)
            except GLib.Error:
                pass
        return {'enabled': False}

    def capture(self, owner):
        if not self.session or not self.pipe:
            raise PermissionError('Enable Linux computer control and approve the desktop sharing dialog first')
        sample = self.sink.emit('try-pull-sample', 5 * Gst.SECOND)
        if sample is None:
            raise TimeoutError('No screen frame received from the approved display')
        caps = sample.get_caps().get_structure(0)
        width, height = caps.get_value('width'), caps.get_value('height')
        buffer = sample.get_buffer()
        ok, info = buffer.map(Gst.MapFlags.READ)
        if not ok:
            raise ValueError('Unable to map screen frame')
        try:
            stride = ((width * 3 + 3) // 4) * 4
            image = Image.frombytes('RGB', (width, height), bytes(info.data), 'raw', 'RGB', stride)
        finally:
            buffer.unmap(info)
        image.thumbnail((1280, 800))
        data = io.BytesIO()
        image.save(data, format='PNG')
        screen = {'id': uuid.uuid4().hex, 'time': time.monotonic(), 'width': image.width, 'height': image.height}
        self.screens[owner] = screen
        return {'screen_id': screen['id'], 'screenshot': {'image': base64.b64encode(data.getvalue()).decode(), 'width': image.width, 'height': image.height, 'mediaType': 'image/png'}}

    def notify(self, method, signature, args):
        if not self.session:
            raise PermissionError('Desktop sharing was revoked')
        self.call(RD, method, '(oa{sv}' + signature + ')', (self.session, {}, *args))

    def tool(self, name, args, owner):
        if not isinstance(owner, str) or not owner or len(owner) > 300:
            raise ValueError('Computer tools require a bounded conversation owner')
        if name == 'computer_screenshot':
            return self.capture(owner)
        if name == 'computer_wait':
            duration = args.get('duration_ms', 1000)
            if not isinstance(duration, (int, float)) or not math.isfinite(duration):
                raise ValueError('Invalid wait duration')
            time.sleep(max(0, min(duration, 5000)) / 1000)
            return self.capture(owner)
        screen = self.screens.pop(owner, None)
        if not screen or args.get('screen_id') != screen['id'] or time.monotonic() - screen['time'] > 60:
            raise ValueError('Capture a fresh screenshot before input; screenshot is stale or belongs to another chat')
        def point(x, y):
            x = coordinate(x, screen['width']) * self.logical[0] / screen['width']
            y = coordinate(y, screen['height']) * self.logical[1] / screen['height']
            self.notify('NotifyPointerMotionAbsolute', 'udd', (self.node, x, y))
        def button(code, state):
            self.notify('NotifyPointerButton', 'iu', (code, state))
        def key(code, state):
            self.notify('NotifyKeyboardKeysym', 'iu', (code, state))
        if name == 'computer_move':
            point(args.get('x'), args.get('y'))
        elif name == 'computer_click':
            code = {'left': 272, 'right': 273, 'middle': 274}.get(args.get('button', 'left'))
            if code is None:
                raise ValueError('Invalid mouse button')
            count = args.get('click_count', 1)
            if type(count) is not int or count not in (1, 2):
                raise ValueError('Click count must be 1 or 2')
            point(args.get('x'), args.get('y'))
            for _ in range(count):
                try:
                    button(code, 1)
                finally:
                    button(code, 0)
        elif name == 'computer_scroll':
            amount = args.get('amount')
            if type(amount) is not int:
                raise ValueError('Scroll amount must be an integer')
            self.notify('NotifyPointerAxisDiscrete', 'ui', (0, -max(-20, min(amount, 20))))
        elif name == 'computer_type':
            text = args.get('text')
            if not isinstance(text, str) or len(text) > 8000:
                raise ValueError('Type at most 8000 characters per call')
            for char in text:
                code = keysym({'\n': 'Enter', '\t': 'Tab'}.get(char, char))
                try:
                    key(code, 1)
                finally:
                    key(code, 0)
        elif name == 'computer_key':
            names = args.get('keys')
            if not isinstance(names, list) or not 1 <= len(names) <= 5:
                raise ValueError('Use 1 to 5 keyboard keys')
            codes = [keysym(x) for x in names]
            pressed = []
            try:
                for code in codes:
                    key(code, 1)
                    pressed.append(code)
            finally:
                for code in reversed(pressed):
                    key(code, 0)
        elif name == 'computer_drag':
            sx, sy, ex, ey = [args.get(k) for k in ('start_x', 'start_y', 'end_x', 'end_y')]
            for x, y in ((sx, sy), (ex, ey)):
                coordinate(x, screen['width']); coordinate(y, screen['height'])
            duration = args.get('duration', .5)
            if not isinstance(duration, (int, float)) or not math.isfinite(duration):
                raise ValueError('Invalid drag duration')
            point(sx, sy)
            try:
                button(272, 1)
                for step in range(1, 21):
                    point(sx + (ex-sx)*step/20, sy + (ey-sy)*step/20)
                    time.sleep(max(.1, min(duration, 3))/20)
            finally:
                button(272, 0)
        else:
            raise ValueError('Unknown computer tool: ' + name)
        return self.capture(owner)


def main():
    loop = GLib.MainLoop()
    threading.Thread(target=loop.run, daemon=True).start()
    portal = Portal()
    try:
        for line in sys.stdin:
            try:
                req = json.loads(line)
                op = req['operation']
                if op == 'status': result = {'enabled': bool(portal.session)}
                elif op == 'grant': result = portal.grant()
                elif op == 'revoke': result = portal.close()
                else: result = portal.tool(op, req.get('args', {}), req.get('owner'))
                print(json.dumps({'data': result}), flush=True)
            except Exception as exc:
                print(json.dumps({'error': str(exc)}), flush=True)
    finally:
        portal.close()
        loop.quit()


if __name__ == '__main__':
    main()
