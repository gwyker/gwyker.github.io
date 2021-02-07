#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
    vec2 normCoord = gl_FragCoord.xy/u_resolution;

    vec3 color = vec3(normCoord.y);

    gl_FragColor = vec4(color, 1.);
}