/** Paths selected in a browser refer to the authenticated Horizon host. */
export async function pickModelPath(format:'gguf'|'safetensors',initial=''):Promise<string|null>{
 if(window.claudeDesktop){const {invoke}=await import('@tauri-apps/api/core');return invoke<string|null>('model_pick',{format});}
 const label=format==='gguf'?'GGUF file path on the Horizon host':'Model folder path on the Horizon host';
 const value=window.prompt(label,initial);return value?.trim()||null;
}
