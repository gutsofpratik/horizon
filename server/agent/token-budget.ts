/** Base64 pixels are an image channel, not millions of text tokens. This is an
 * estimate only; provider/worker token measurements remain authoritative. */
export function contextCharacters(messages:any[]){
 let imageCount=0;
 const text=JSON.stringify(messages.map(({images,...message}:any)=>{imageCount+=images?.length??0;return message;}));
 return text.length+imageCount*1536*3;
}
