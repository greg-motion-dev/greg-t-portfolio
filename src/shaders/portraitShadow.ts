import { Color, ShaderMaterial, type IUniform } from "three";

export interface PortraitShadowUniforms {
  readonly [uniform: string]: IUniform;
  readonly uInnerRadius: IUniform<number>;
  readonly uOuterRadius: IUniform<number>;
  readonly uStrength: IUniform<number>;
  readonly uGlowColor: IUniform<Color>;
  readonly uGlowWidth: IUniform<number>;
  readonly uGlowStrength: IUniform<number>;
  readonly uGlowPulseMin: IUniform<number>;
  readonly uGlowPulsePeriod: IUniform<number>;
  readonly uTime: IUniform<number>;
}

export interface PortraitShadowOptions {
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly strength: number;
  readonly glowColor: string;
  readonly glowWidth: number;
  readonly glowStrength: number;
  readonly glowPulseMin: number;
  readonly glowPulsePeriod: number;
}

export const portraitShadowVertexShader = `
varying vec2 vPlanePosition;

void main() {
  vPlanePosition = position.xy;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const portraitShadowFragmentShader = `
uniform float uInnerRadius;
uniform float uOuterRadius;
uniform float uStrength;
uniform vec3 uGlowColor;
uniform float uGlowWidth;
uniform float uGlowStrength;
uniform float uGlowPulseMin;
uniform float uGlowPulsePeriod;
uniform float uTime;

varying vec2 vPlanePosition;

void main() {
  float distanceFromCenter = length(vPlanePosition);
  float outsidePortrait = 1.0 - step(distanceFromCenter, uInnerRadius);
  float distanceFromEdge = max(distanceFromCenter - uInnerRadius, 0.0);

  float falloff = 1.0 - smoothstep(uInnerRadius, uOuterRadius, distanceFromCenter);
  float shadow = uStrength * falloff * outsidePortrait;
  float pulse = mix(uGlowPulseMin, 1.0, 0.5 - 0.5 * cos(6.283185307179586 * uTime / uGlowPulsePeriod));
  float glow = uGlowStrength * pulse * exp(-distanceFromEdge / uGlowWidth) * outsidePortrait;

  float alpha = clamp(shadow + glow * (1.0 - shadow), 0.0, 1.0);
  vec3 color = uGlowColor * (glow / max(alpha, 0.0001));

  gl_FragColor = vec4(color, alpha);

  #include <colorspace_fragment>
}
`;

export function createPortraitShadowMaterial(options: PortraitShadowOptions): ShaderMaterial {
  const uniforms: PortraitShadowUniforms = {
    uInnerRadius: { value: options.innerRadius },
    uOuterRadius: { value: options.outerRadius },
    uStrength: { value: options.strength },
    uGlowColor: { value: new Color(options.glowColor) },
    uGlowWidth: { value: options.glowWidth },
    uGlowStrength: { value: options.glowStrength },
    uGlowPulseMin: { value: options.glowPulseMin },
    uGlowPulsePeriod: { value: options.glowPulsePeriod },
    uTime: { value: 0 },
  };

  return new ShaderMaterial({
    uniforms,
    vertexShader: portraitShadowVertexShader,
    fragmentShader: portraitShadowFragmentShader,
    transparent: true,
    depthWrite: false,
  });
}
