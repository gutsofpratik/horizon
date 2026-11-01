// Reproducible, static hero artwork. Run renderSculpture() in a browser, then
// export its canvas as PNG. The landing page does not run WebGL or animation.
export async function renderSculpture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1440;
  canvas.height = 1412;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    preserveDrawingBuffer: true,
  });
  if (!gl) throw new Error("WebGL is required to render the artwork.");
  const vertex = "attribute vec2 p; void main(){ gl_Position=vec4(p,0.,1.); }";
  const fragment = `
    precision highp float;
    uniform vec2 resolution;
    mat3 rx(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}
    mat3 ry(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}
    mat3 rz(float a){float c=cos(a),s=sin(a);return mat3(c,s,0.,-s,c,0.,0.,0.,1.);}
    vec3 local(vec3 p){return rx(-.83)*ry(.35)*rz(.58)*p;}
    float scene(vec3 p){p=local(p);return length(vec2(length(p.xy)-1.42,p.z))-.57;}
    vec3 normal(vec3 p){vec2 e=vec2(.001,0.);return normalize(vec3(scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}
    float boxlight(vec3 r,vec3 l,float power){return pow(max(0.,dot(r,normalize(l))),power);}
    void main(){
      vec2 uv=(gl_FragCoord.xy/resolution-.5)*vec2(5.2,5.1);
      vec3 ro=vec3(uv,5.),rd=vec3(0.,0.,-1.);
      float t=0.;
      for(int i=0;i<100;i++){float d=scene(ro+rd*t);if(d<.0004||t>9.)break;t+=d*.8;}
      if(t>9.){gl_FragColor=vec4(0.);return;}
      vec3 p=ro+rd*t,n=normal(p),r=reflect(rd,n);
      float light=max(0.,dot(n,normalize(vec3(-3.,4.,5.))));
      float value=.20+.41*light+.22*boxlight(r,vec3(-2.,3.,4.),8.)+.19*boxlight(r,vec3(3.,1.,2.),30.);
      float ao=clamp(scene(p+n*.20)/.20,.35,1.);
      value*=ao;
      vec3 lp=local(p);
      float angle=atan(lp.y,lp.x);
      float grooves=pow(.5+.5*cos(angle*200.),24.);
      value-=grooves*.022;
      value=pow(value,.84);
      gl_FragColor=vec4(vec3(value),1.);
    }
  `;
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader));
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(program));
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "p");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(
    gl.getUniformLocation(program, "resolution"),
    canvas.width,
    canvas.height,
  );
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
  gl.finish();
  const result = canvas.toDataURL("image/png");
  gl.getExtension("WEBGL_lose_context")?.loseContext();
  return result;
}
