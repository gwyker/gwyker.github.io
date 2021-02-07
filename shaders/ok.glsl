#version 300 es
#ifdef GL_ES
precision mediump float;
#endif
// #import shade.glsl

#define PI 3.1415926

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 FragColor;

/* Color palette */
#define BLACK           vec3(0.0, 0.0, 0.0)
#define WHITE           vec3(1.0, 1.0, 1.0)
#define RED             vec3(1.0, 0.0, 0.0)
#define GREEN           vec3(0.0, 1.0, 0.0)
#define BLUE            vec3(0.0, 0.0, 1.0)
#define YELLOW          vec3(1.0, 1.0, 0.0)
#define CYAN            vec3(0.0, 1.0, 1.0)
#define MAGENTA         vec3(1.0, 0.0, 1.0)
#define ORANGE          vec3(1.0, 0.5, 0.0)
#define PURPLE          vec3(1.0, 0.0, 0.5)
#define LIME            vec3(0.5, 1.0, 0.0)
#define ACQUA           vec3(0.0, 1.0, 0.5)
#define VIOLET          vec3(0.5, 0.0, 1.0)
#define AZUR            vec3(0.0, 0.5, 1.0)

const int num_lines = 500;
// float y_vals[num_lines];

//  Function from Iñigo Quiles
//  https://www.shadertoy.com/view/MsS3Wc
vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix( vec3(1.0), rgb, c.y);
}
// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(15.9898,78.233)))
                 * 43758.5453123);
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

float line(vec2 st, float pct) {
	return smoothstep(pct-.02, pct, st.y) -
	       smoothstep(pct, pct+.02, st.y);
}

float perline(vec2 st, float thickness) {
	return smoothstep(st.x-thickness, st.x, st.y) -
	       smoothstep(st.x, st.x+thickness, st.y);
}

vec2 getPolar(vec2 normCoord, float x, float y) {
    vec2 center = vec2(x, y);
    // Angle is from 0 to 1
    // 0 on right side, to 1 on left
    return vec2(
        distance(normCoord, center)*2.,
        atan(normCoord.y-y, normCoord.x-x)/PI
    );
}

void main() {
    // vec2 uv = (gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
    vec2 uv = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.4);

    // float noise = getNoise();

	// vec2 noised_uv = uv + getNoise(uv*27.) - .5;
	// color += line(noised_uv, 0.);
	// color += noised_uv.x;
	// uv += u_time;

	const float y_step = 1./float(num_lines);
	// We keep an array to store y values in the current column.
	// Check on each loop if there is a y value below the current. if so, do not draw.
    float last_y = 0.;
    float last_y_drawn = 0.;
    // Min and max for where this pixel might be in the y-axis of lines
    float y_buf = .09;
    float min_y = uv.y-y_buf;
    float max_y = uv.y+y_buf;
	for (float y=min_y; y < max_y; y+=y_step) {
		float noise = getNoise(vec2(u_time*y*9., uv.x*+u_time*1.))*0.13;
        float y_val = y+noise;
        if (last_y < y_val) {
            float line = perline(vec2(y_val, uv.y), .001*abs(noise)*25.);
            if (last_y_drawn != 0.) {
                // color += mix(0., 0.3, y_val-last_y_drawn);
            }
            color += line; 
            last_y = y_val;
            if (line > 0.) {
                last_y_drawn = y_val;
            }
            // color -= hsb2rgb(vec3(noise*3.61, 0.3, 0.02));
            // color.r -= noise*.07;
        }
        else {
            last_y_drawn = 0.;
        }
        // Set color based on the location of the *de-noised* y value of the line
		// color.r -= noise*.005;
		// color.g -= noise*.0;
		// color.b -= noise*.00005;
	}
    // color = max(color, vec3(0.,1.,1.));
    // color -= hsb2rgb(vec3(.3, 1., 1.));
	// float noise = getNoise(vec2(.1*11., uv.x*1111.));
	// color += perline(vec2(uv.x, uv.y+0.010));
    // color *= hsb2rgb(vec3(1.5, 1., 1.));

    // FragColor = vec4(color, 1.);

    
}



