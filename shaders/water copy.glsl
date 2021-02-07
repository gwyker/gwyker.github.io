#version 300 es
#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 FragColor;

float random(vec2 norm_coord) {
    return fract(sin(u_time*norm_coord.y*norm_coord.x*1283.2)*2415.);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float getNoise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation
    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
vec3 hsl( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}
vec3 hsl( in float h, in float s, in float l){
    vec3 rgb = clamp(abs(mod(h*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return l * mix( vec3(1.0), rgb, s);
}

vec2 get_polar(vec2 norm_coord, float center_x, float center_y) {
    vec2 center = vec2(center_x, center_y);
    // Angle is from 0 to 1
    // 0 on right side, to 1 on left
    return vec2(
        distance(norm_coord, center)*2.,
        atan(norm_coord.y-center_y, norm_coord.x-center_x)/PI
    );
}

void main(){
  // Coord is just normalized 0-1
  vec2 coord = 1.*gl_FragCoord.xy / u_resolution;
  vec2 polar = get_polar(coord, .5, .5);
  float r = polar.x;
  float o = polar.y;
  // Mouse coords 0-1
  vec2 mouse = u_mouse.xy / u_resolution;
  // Twinkling stars
  float rand = getNoise(coord);
  vec3 color = vec3(hsl(rand, .5, 0.7));








  // vec3 color = vec3(mouse.x, 0.5, 0.2);
  // vec3 color = vec3(hsl(vec3(sin(r*.1)-u_time*.1, 1., 0.9)));

  // vec3 color = vec3(hsl(r, 1., 0.9));
  // vec3 color = vec3(1., cos(coord.x*u_time*5.), 0.);

  // for (int i = 1; i < 6; i++) {
  //   float n = float(i);
  //   coord += vec2(.9*sin(cos(u_time/3000.*u_time)*9.) / 3.*n*sin(n*coord.y + u_time + .3*n) + .4, .4 / n*sin(coord.x + u_time + .3*n*.1) + 9.6);
  // }

  // vec3 color = vec3(.5 * sin(coord.x) + .5, .5 * sin(coord.y) + .5, sin(coord.x + coord.y));

  // float pct = sin(coord.y);
  // color -= smoothstep(u_resolution.x-100., u_resolution.y+100., pct);

  // color.rg += u_mouse / u_resolution;

  FragColor = vec4(color, 1.);
}
