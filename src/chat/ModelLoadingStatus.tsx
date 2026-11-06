import {useId,useState} from 'react';
import {ChevronDown} from 'lucide-react';

export function ModelLoadingStatus({progress}: {progress?:{percent?:number|null;stage?:string}}){
 const [expanded,setExpanded]=useState(false);const details=useId();
 const percent=typeof progress?.percent==='number'&&Number.isFinite(progress.percent)?Math.max(0,Math.min(100,Math.floor(progress.percent))):null;
 return <div className="model-loading-status">
  <div className="model-loading-heading">
   <span role="status" aria-live="polite">{percent!==null&&<span className="model-loading-percent">{percent}% </span>}Model loading</span>
   <button className="model-loading-toggle" aria-label="Model loading details" aria-expanded={expanded} aria-controls={details} onClick={()=>setExpanded(!expanded)}><ChevronDown size={14}/></button>
  </div>
  {expanded&&<p id={details} className="model-loading-detail">{progress?.stage??'Preparing the inference runtime'}{percent!==null&&' · Percentage reports model weights loaded.'}</p>}
 </div>;
}
