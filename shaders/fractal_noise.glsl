// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9986,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 6

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy*1.;
    vec2 mouse = u_mouse.xy/u_resolution.xy;
    float dist = distance(st, mouse);
    st += smoothstep(.1, .3, dist);
    // st.x += step(st.x-mouse.x, .1)*step(st.y-mouse.y, .1);
    // st.y += step(st.x-mouse.x, .1)*step(st.y-mouse.y, .1);
    // st += st * sin(u_time*0.1)*3.0;
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.21*u_time);
    q.y = fbm( st + vec2(1.0)-vec2(.21*u_time, -.31*u_time));

    vec2 r = vec2(0.);
    r.x = fbm( st + 55.0*q + vec2(.1,0.2)+ 0.15*u_time );
    r.y = fbm( st + 55.0*q + vec2(.1,0.8)+ 0.126*u_time);

    vec2 g = vec2(0.);
    g.x = fbm( st + 55.0*r + vec2(.1,0.2)+ 0.15*u_time );
    g.y = fbm( st + 55.0*r + vec2(.1,0.8)+ 0.126*u_time);

    vec2 t = vec2(0.);
    g.x = fbm( st + 59.0*g + vec2(.1,0.2)+ 0.15*u_time );
    g.y = fbm( st + 99.0*g + vec2(.9,0.8)+ 0.126*u_time);
    float f = fbm(st+t);
    // f += (sin(-99.01*st.x*u_time)+cos(-49.*st.y*u_time)*.9)*.1;
    // f = f*mouse.x;
    

    color = mix(vec3(1.0, 0.0, 0.3843),
                vec3(0.9059, 0.9059, 0.9059),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,0.4));

    color = mix(color,
                vec3(0.7255, 0.7961, 0.9922),
                clamp(length(r.x),0.0,1.0));

    // color.rb += smoothstep(.1, .3, dist)*sin(u_time*3.2);
    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
}
