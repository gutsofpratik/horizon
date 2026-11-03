import importlib.util, math, time, unittest
from pathlib import Path
spec=importlib.util.spec_from_file_location('portal',Path(__file__).parents[2]/'runtime/linux/portal.py')
p=importlib.util.module_from_spec(spec);spec.loader.exec_module(p)
class PortalTests(unittest.TestCase):
 def test_bounds(self):
  for x in [-1,1280,float('nan'),float('inf'),True,None,'1']:
   with self.assertRaises(ValueError):p.coordinate(x,1280)
  self.assertEqual(p.coordinate(1279,1280),1279)
 def test_unicode_and_shortcuts(self):
  self.assertEqual(p.keysym('Ctrl'),0xffe3)
  self.assertEqual(p.keysym('F12'),0xffc9)
  self.assertEqual(p.keysym('क'),0x01000000|ord('क'))
  with self.assertRaises(ValueError):p.keysym('Unknown')
 def fake(self):
  portal=p.Portal.__new__(p.Portal);portal.session='approved';portal.logical=(2560,1600);portal.node=1
  portal.screens={'chat':{'id':'s','time':time.monotonic(),'width':1280,'height':800}}
  portal.events=[];portal.notify=lambda *args:portal.events.append(args);portal.capture=lambda owner:{'owner':owner}
  return portal
 def test_cross_chat_stale_and_consumed_screens(self):
  portal=self.fake()
  with self.assertRaises(ValueError):portal.tool('computer_click',{'screen_id':'s','x':1,'y':1},'other')
  portal.screens['chat']['time']-=61
  with self.assertRaises(ValueError):portal.tool('computer_click',{'screen_id':'s','x':1,'y':1},'chat')
  self.assertEqual(portal.events,[])
 def test_scaled_coordinates_and_button_release(self):
  portal=self.fake();portal.tool('computer_click',{'screen_id':'s','x':640,'y':400},'chat')
  self.assertEqual(portal.events[0],('NotifyPointerMotionAbsolute','udd',(1,1280.0,800.0)))
  self.assertEqual(portal.events[-1],('NotifyPointerButton','iu',(272,0)))
  with self.assertRaises(ValueError):portal.tool('computer_click',{'screen_id':'s','x':1,'y':1},'chat')
 def test_invalid_shortcut_has_no_partial_input(self):
  portal=self.fake()
  with self.assertRaises(ValueError):portal.tool('computer_key',{'screen_id':'s','keys':['Ctrl','Invalid']},'chat')
  self.assertEqual(portal.events,[])
 def test_pointer_button_released_on_failure(self):
  portal=self.fake();events=[]
  def notify(*args):
   events.append(args)
   if len(events)==2:raise RuntimeError('revoked')
  portal.notify=notify
  with self.assertRaises(RuntimeError):portal.tool('computer_click',{'screen_id':'s','x':1,'y':1},'chat')
  self.assertEqual(events[-1],('NotifyPointerButton','iu',(272,0)))
if __name__=='__main__':unittest.main()
