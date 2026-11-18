import { ShaderMaterial, type IUniform } from "three";

export interface StarfieldUniforms {
  readonly [uniform: string]: IUniform;
  readonly uTime: IUniform<number>;
  readonly uPixelRatio: IUniform<number>;
  readonly uTwinklePeak: IUniform<number>;
  readonly uEdgeFadeStart: IUniform<number>;
}

export interface StarfieldMaterialOptions {
  readonly twinklePeak: number;
  readonly edgeFadeStart: number;
}

export const starfieldVertexShader = `
#define TAU 6.283185307179586

uniform float uTime;
uniform float uPixelRatio;
uniform float uTwinklePeak;
uniform float uEdgeFadeStart;

attribute float aBrightness;
attribute float aSize;
attribute float aTwinkle;
attribute float aPhase;
attribute float aPeriod;

varying float vAlpha;

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = aSize * uPixelRatio;

  float wave = 0.5 - 0.5 * cos(TAU * (uTime / aPeriod + aPhase));
  float twinkleBrightness = mix(aBrightness, uTwinklePeak, wave);
  float brightness = mix(aBrightness, twinkleBrightness, aTwinkle);

  vec2 screenPosition = gl_Position.xy / gl_Position.w;
  float edgeFade = 1.0 - smoothstep(uEdgeFadeStart, 1.0, length(screenPosition));

  vAlpha = brightness * edgeFade;
}
`;

export const starfieldFragmentShader = `
varying float vAlpha;

void main() {
  gl_FragColor = vec4(vec3(1.0), vAlpha);

  #include <colorspace_fragment>
}
`;

export function createStarfieldMaterial(options: StarfieldMaterialOptions): ShaderMaterial {
  const uniforms: StarfieldUniforms = {
    uTime: { value: 0 },
    uPixelRatio: { value: 1 },
    uTwinklePeak: { value: options.twinklePeak },
    uEdgeFadeStart: { value: options.edgeFadeStart },
  };

  return new ShaderMaterial({
    uniforms,
    vertexShader: starfieldVertexShader,
    fragmentShader: starfieldFragmentShader,
    transparent: true,
    depthWrite: false,
  });
}
