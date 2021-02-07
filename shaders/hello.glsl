#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 getPolar(vec2 normCoord, float x, float y) {
    vec2 center = vec2(x, y);
    // Angle is from 0 to 1
    // 0 on right side, to 1 on left
    return vec2(
        distance(normCoord, center)*2.,
        atan(normCoord.y-y, normCoord.x-x)/PI
    );
}

float random(vec2 normCoord) {
    return fract(sin(u_time*normCoord.y*normCoord.x*1283.2)*2415.);
}

float circle(vec2 polarCoord, float speed, float percent) {
    // Calculate polar coordinates from the cartesian normCoord
    // percent = abs(cos(percent*PI*u_time*speed)) / 4.;
    // Sinewave the circle
    polarCoord.x += cos(polarCoord.y*26.)/20.;
    float line = smoothstep(percent-.09, percent, polarCoord.x) -
                 smoothstep(percent, percent+.09, polarCoord.x);
    // line -= step(.4, polarCoord.x);
    ivec2 f;
    return line;
}

void main() {
    vec2 normCoord = gl_FragCoord.xy/u_resolution;
    vec2 polarCoord = getPolar(normCoord, .5, .5);
    float radius = polarCoord.x;
    float theta = polarCoord.y; // from -1 (left-down) to 1 (left-up)

    // Create moving circle
    float speed = .9;
    float percent = .9;
    float line = circle(polarCoord, speed, percent);
    vec3 color = vec3(line);
    // vec3 color = vec3(0.25);

    // Color the circle based on theta
    theta = (theta + 1.) * 1.5;  // normalize theta to 0-3
    theta += u_time/2.;
    theta = mod(theta, 3.);
    vec3 colApplied = vec3(0.25);
    color.r -= step(0.1,theta);
    if (theta < 1.) {
        colApplied.r += 1.0-theta;
        colApplied.g += theta;
    }
    else if (theta < 2.) {
        theta -= 1.;
        colApplied.g += 1.0-theta;
        colApplied.b += theta;
    }
    else {
        theta -= 2.;
        colApplied.b += 1.0-theta;
        colApplied.r += theta;
    }
    color *= colApplied;
    // Add a glow
    // float lineWidth = cos(u_time);
    // color += lineWidth;
    // color += mix(0., 1., theta);
    gl_FragColor = vec4(color, 1.);
}

vec3 randomColor(vec2 normCoord) {
    return vec3(
        fract(sin(u_time*normCoord.y*normCoord.x*2284.2)*2415.),
        fract(sin(u_time*normCoord.y*normCoord.x*1283.2)*4415.),
        fract(sin(u_time*normCoord.y*normCoord.x*3283.2)*3415.)
    );

}