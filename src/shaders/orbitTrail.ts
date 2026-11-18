import { Color, ShaderMaterial, type IUniform } from "three";

export interface OrbitTrailUniforms {
  readonly [uniform: string]: IUniform;
  readonly uColor: IUniform<Color>;
  readonly uOpacity: IUniform<number>;
  readonly uPathOpacity: IUniform<number>;
  readonly uTime: IUniform<number>;
  readonly uPhase: IUniform<number>;
  readonly uSpeed: IUniform<number>;
  readonly uBodyCount: IUniform<number>;
  readonly uHold: IUniform<number>;
  readonly uFade: IUniform<number>;
  readonly uRadius: IUniform<number>;
  readonly uDepthFade: IUniform<number>;
}

export interface OrbitTrailOptions {
  readonly color: string;
  readonly opacity: number;
  readonly pathOpacity: number;
  readonly phase: number;
  readonly speed: number;
  readonly bodyCount: number;
  readonly hold: number;
  readonly fade: number;
  readonly radius: number;
  readonly depthFade: number;
}

export interface OrbitTrail {
  readonly material: ShaderMaterial;
  readonly uniforms: OrbitTrailUniforms;
}

export const orbitTrailMaxBodies = 4;

export const orbitTrailVertexShader = `
uniform float uRadius;
uniform float uDepthFade;

varying vec2 vRingPosition;
varying float vDepthFactor;

void main() {
  vRingPosition = position.xy;
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  float ringCenterDepth = (modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0)).z;
  float relativeDepth = clamp((viewPosition.z - ringCenterDepth) / uRadius, -1.0, 1.0);
  vDepthFactor = mix(uDepthFade, 1.0, smoothstep(-1.0, 1.0, relativeDepth));
  gl_Position = projectionMatrix * viewPosition;
}
`;

export const orbitTrailFragmentShader = `
#define TAU 6.283185307179586
#define MAX_BODIES ${orbitTrailMaxBodies}

uniform vec3 uColor;
uniform float uOpacity;
uniform float uPathOpacity;
uniform float uTime;
uniform float uPhase;
uniform float uSpeed;
uniform int uBodyCount;
uniform float uHold;
uniform float uFade;

varying vec2 vRingPosition;
varying float vDepthFactor;

void main() {
  float pointAngle = atan(vRingPosition.y, vRingPosition.x);
  float direction = sign(uSpeed);
  float angularSpeed = max(abs(uSpeed), 0.0001);
  float visibility = 0.0;

  for (int index = 0; index < MAX_BODIES; index++) {
    if (index >= uBodyCount) {
      break;
    }
    float bodyAngle = uPhase + float(index) * TAU / float(uBodyCount) + uTime * uSpeed;
    float angleBehind = mod((bodyAngle - pointAngle) * direction, TAU);
    float secondsSincePass = angleBehind / angularSpeed;
    float trail = 1.0 - smoothstep(uHold, uHold + uFade, secondsSincePass);
    visibility = max(visibility, trail);
  }

  vec3 color = mix(vec3(1.0), uColor, visibility);
  float alpha = mix(uPathOpacity, uOpacity, visibility) * vDepthFactor;

  gl_FragColor = vec4(color, alpha);

  #include <colorspace_fragment>
}
`;

export function createOrbitTrail(options: OrbitTrailOptions): OrbitTrail {
  const uniforms: OrbitTrailUniforms = {
    uColor: { value: new Color(options.color) },
    uOpacity: { value: options.opacity },
    uPathOpacity: { value: options.pathOpacity },
    uTime: { value: 0 },
    uPhase: { value: options.phase },
    uSpeed: { value: options.speed },
    uBodyCount: { value: Math.min(options.bodyCount, orbitTrailMaxBodies) },
    uHold: { value: options.hold },
    uFade: { value: options.fade },
    uRadius: { value: options.radius },
    uDepthFade: { value: options.depthFade },
  };

  const material = new ShaderMaterial({
    uniforms,
    vertexShader: orbitTrailVertexShader,
    fragmentShader: orbitTrailFragmentShader,
    transparent: true,
  });

  return { material, uniforms };
}
