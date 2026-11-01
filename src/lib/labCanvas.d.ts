export function createLabCanvas(canvas:HTMLCanvasElement,copy:HTMLElement,onCue:()=>void):Promise<{resume():void;pause():void;seek(time:number):void;time():number;destroy():void}>;
