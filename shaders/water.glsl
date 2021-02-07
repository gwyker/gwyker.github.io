//#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//out vec4 FragColor;

void main(){
  vec2 coord = 6.*gl_FragCoord.xy / u_resolution;

  for (int i = 1; i < 6; i++) {
    float n = float(i);
    coord += vec2(.9*sin(cos(u_time/3000.*u_time)*9.) / 3.*n*sin(n*coord.y + u_time + .3*n) + .4, .4 / n*sin(coord.x + u_time + .3*n*.1) + 9.6);
  }

  vec3 color = vec3(.5 * sin(coord.x) + .5, .5 * sin(coord.y) + .5, sin(coord.x + coord.y));

  float pct = sin(coord.y);
  color -= smoothstep(u_resolution.x-100., u_resolution.y+100., pct);

  // color.rg += u_mouse / u_resolution;

  gl_FragColor = vec4(color, 1.);
}