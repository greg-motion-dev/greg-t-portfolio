import { Color, ShaderMaterial, Vector3, type IUniform } from "three";

export interface StarGlintUniforms {
  readonly [uniform: string]: IUniform;
  readonly uStarPosition: IUniform<Vector3>;
  readonly uProgress: IUniform<number>;
  readonly uPixelRatio: IUniform<number>;
  readonly uSize: IUniform<number>;
  readonly uTurn: IUniform<number>;
  readonly uRayWidth: IUniform<number>;
  readonly uTint: IUniform<number>;
  readonly uTintColor: IUniform<Color>;
}

export interface StarGlintOptions {
  readonly size: number;
  readonly turn: number;
  readonly rayWidth: number;
  readonly tint: number;
  readonly tintColor: string;
}

export const starGlintVertexShader = `
#define PI 3.141592653589793

uniform vec3 uStarPosition;
uniform float uProgress;
uniform float uPixelRatio;
uniform float uSize;

varying float vEnvelope;

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(uStarPosition, 1.0);
  gl_Position = projectionMatrix * viewPosition;

  vEnvelope = sin(PI * clamp(uProgress, 0.0, 1.0));
  gl_PointSize = uSize * uPixelRatio * (0.35 + 0.65 * vEnvelope);
}
`;

export const starGlintFragmentShader = `
uniform float uProgress;
uniform float uTurn;
uniform float uRayWidth;
uniform float uTint;
uniform vec3 uTintColor;

varying float vEnvelope;

float ray(float across, float along) {
  float taper = 1.0 - along;
  return smoothstep(uRayWidth * taper, 0.0, abs(across)) * taper * taper;
}

void main() {
  vec2 point = gl_PointCoord * 2.0 - 1.0;
  float angle = uTurn * uProgress;
  float cosAngle = cos(angle);
  float sinAngle = sin(angle);
  point = vec2(cosAngle * point.x - sinAngle * point.y, sinAngle * point.x + cosAngle * point.y);

  float distanceFromCenter = length(point);
  if (distanceFromCenter > 1.0) {
    discard;
  }

  float rays = max(ray(point.y, abs(point.x)), ray(point.x, abs(point.y)));
  float core = exp(-distanceFromCenter * distanceFromCenter * 60.0);
  float intensity = max(rays, core) * vEnvelope;

  vec3 color = mix(vec3(1.0), uTintColor, uTint);
  gl_FragColor = vec4(color, intensity);

  #include <colorspace_fragment>
}
`;

export function createStarGlintMaterial(options: StarGlintOptions): ShaderMaterial {
  const uniforms: StarGlintUniforms = {
    uStarPosition: { value: new Vector3() },
    uProgress: { value: 0 },
    uPixelRatio: { value: 1 },
    uSize: { value: options.size },
    uTurn: { value: options.turn },
    uRayWidth: { value: options.rayWidth },
    uTint: { value: options.tint },
    uTintColor: { value: new Color(options.tintColor) },
  };

  return new ShaderMaterial({
    uniforms,
    vertexShader: starGlintVertexShader,
    fragmentShader: starGlintFragmentShader,
    transparent: true,
    depthWrite: false,
  });
}
