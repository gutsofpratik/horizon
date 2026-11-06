/** Non-regression alone cannot certify a model that never succeeds. */
export function evaluationPassed(cases:number,baseExact:number,adaptedExact:number,baseGeneral:number,adaptedGeneral:number){
 return cases>0&&adaptedExact/cases>=0.8&&adaptedExact>=baseExact&&adaptedGeneral>=3&&adaptedGeneral>=baseGeneral;
}
