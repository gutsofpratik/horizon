export {NativeBrowser as BrowserView} from './NativeBrowser';
export {NativeTerminal} from './NativeTerminal';
export {ComputerControl} from './ComputerControl';
export {ModelLibrary,ManagedModels,RuntimePacks,openExternal} from '../platform/shared-ui';
export async function pickSpeechFolder():Promise<string|null>{const {pickModelPath}=await import('../platform/model-picker');return pickModelPath('safetensors');}
