export {WebBrowser as BrowserView} from '../browser/WebBrowser';
import {WorkerTerminal} from '../activity/WorkerTerminal';
export function NativeTerminal({conversationId,scope,onError}:any){return <WorkerTerminal conversationId={conversationId??scope} onError={onError}/>;}
export {WebComputerControl as ComputerControl} from './WebComputerControl';
export {ModelLibrary,ManagedModels,RuntimePacks,openExternal} from './shared-ui';
export async function pickSpeechFolder():Promise<string|null>{const {pickModelPath}=await import('./model-picker');return pickModelPath('safetensors');}
