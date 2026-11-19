export const fluidBaseVertexShader = `
precision highp float;

attribute vec2 aPosition;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 texelSize;

void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const fluidClearShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
uniform sampler2D uTexture;
uniform float value;

void main () {
  gl_FragColor = value * texture2D(uTexture, vUv);
}
`;

export const fluidDisplayShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uTexture;
uniform vec2 texelSize;
uniform float opacity;

void main () {
  vec3 color = texture2D(uTexture, vUv).rgb;
  vec3 left = texture2D(uTexture, vL).rgb;
  vec3 right = texture2D(uTexture, vR).rgb;
  vec3 top = texture2D(uTexture, vT).rgb;
  vec3 bottom = texture2D(uTexture, vB).rgb;

  float dx = length(right) - length(left);
  float dy = length(top) - length(bottom);
  vec3 normal = normalize(vec3(dx, dy, length(texelSize)));
  float diffuse = clamp(dot(normal, vec3(0.0, 0.0, 1.0)) + 0.7, 0.7, 1.0);
  color *= diffuse * opacity;

  float alpha = max(color.r, max(color.g, color.b));
  gl_FragColor = vec4(color, alpha);
}
`;

export const fluidSplatShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;

void main () {
  vec2 offset = vUv - point.xy;
  offset.x *= aspectRatio;
  vec3 splat = exp(-dot(offset, offset) / radius) * color;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}
`;

export const fluidAdvectionShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;

void main () {
  vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
  vec4 result = texture2D(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  gl_FragColor = result / decay;
}
`;

export const fluidDivergenceShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main () {
  float left = texture2D(uVelocity, vL).x;
  float right = texture2D(uVelocity, vR).x;
  float top = texture2D(uVelocity, vT).y;
  float bottom = texture2D(uVelocity, vB).y;

  vec2 center = texture2D(uVelocity, vUv).xy;
  if (vL.x < 0.0) { left = -center.x; }
  if (vR.x > 1.0) { right = -center.x; }
  if (vT.y > 1.0) { top = -center.y; }
  if (vB.y < 0.0) { bottom = -center.y; }

  float divergence = 0.5 * (right - left + top - bottom);
  gl_FragColor = vec4(divergence, 0.0, 0.0, 1.0);
}
`;

export const fluidCurlShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uVelocity;

void main () {
  float left = texture2D(uVelocity, vL).y;
  float right = texture2D(uVelocity, vR).y;
  float top = texture2D(uVelocity, vT).x;
  float bottom = texture2D(uVelocity, vB).x;
  float vorticity = right - left - top + bottom;
  gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
}
`;

export const fluidVorticityShader = `
precision highp float;
precision highp sampler2D;

varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;

void main () {
  float left = texture2D(uCurl, vL).x;
  float right = texture2D(uCurl, vR).x;
  float top = texture2D(uCurl, vT).x;
  float bottom = texture2D(uCurl, vB).x;
  float center = texture2D(uCurl, vUv).x;

  vec2 force = 0.5 * vec2(abs(top) - abs(bottom), abs(right) - abs(left));
  force /= length(force) + 0.0001;
  force *= curl * center;
  force.y *= -1.0;

  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity += force * dt;
  velocity = min(max(velocity, -1000.0), 1000.0);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;

export const fluidPressureShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;

void main () {
  float left = texture2D(uPressure, vL).x;
  float right = texture2D(uPressure, vR).x;
  float top = texture2D(uPressure, vT).x;
  float bottom = texture2D(uPressure, vB).x;
  float divergence = texture2D(uDivergence, vUv).x;
  float pressure = (left + right + bottom + top - divergence) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}
`;

export const fluidGradientSubtractShader = `
precision mediump float;
precision mediump sampler2D;

varying highp vec2 vUv;
varying highp vec2 vL;
varying highp vec2 vR;
varying highp vec2 vT;
varying highp vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;

void main () {
  float left = texture2D(uPressure, vL).x;
  float right = texture2D(uPressure, vR).x;
  float top = texture2D(uPressure, vT).x;
  float bottom = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(right - left, top - bottom);
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}
`;
