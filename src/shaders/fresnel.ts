import { Color, ShaderMaterial, Vector3, type IUniform } from "three";

export interface FresnelUniforms {
  readonly [uniform: string]: IUniform;
  readonly uColor: IUniform<Color>;
  readonly uRimPower: IUniform<number>;
  readonly uBodyStrength: IUniform<number>;
  readonly uDiffuseStrength: IUniform<number>;
  readonly uRimStrength: IUniform<number>;
  readonly uSpecularStrength: IUniform<number>;
  readonly uShininess: IUniform<number>;
  readonly uLightDirection: IUniform<Vector3>;
}

export const fresnelVertexShader = `
varying vec3 vViewPosition;

void main() {
  vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = viewPosition.xyz;
  gl_Position = projectionMatrix * viewPosition;
}
`;

export const fresnelFragmentShader = `
uniform vec3 uColor;
uniform float uRimPower;
uniform float uBodyStrength;
uniform float uDiffuseStrength;
uniform float uRimStrength;
uniform float uSpecularStrength;
uniform float uShininess;
uniform vec3 uLightDirection;

varying vec3 vViewPosition;

void main() {
  vec3 faceNormal = normalize(cross(dFdx(vViewPosition), dFdy(vViewPosition)));
  vec3 viewDirection = normalize(-vViewPosition);
  vec3 lightDirection = normalize(uLightDirection);

  float facing = clamp(dot(faceNormal, viewDirection), 0.0, 1.0);
  float rim = pow(1.0 - facing, uRimPower);
  float diffuse = clamp(dot(faceNormal, lightDirection), 0.0, 1.0);
  vec3 halfVector = normalize(lightDirection + viewDirection);
  float specular = pow(clamp(dot(faceNormal, halfVector), 0.0, 1.0), uShininess);

  vec3 color = uColor * (uBodyStrength + diffuse * uDiffuseStrength)
    + uColor * rim * uRimStrength
    + vec3(specular * uSpecularStrength);

  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}
`;

export function createFresnelMaterial(color: string): ShaderMaterial {
  const uniforms: FresnelUniforms = {
    uColor: { value: new Color(color) },
    uRimPower: { value: 2.2 },
    uBodyStrength: { value: 0.12 },
    uDiffuseStrength: { value: 0.5 },
    uRimStrength: { value: 1.4 },
    uSpecularStrength: { value: 0.9 },
    uShininess: { value: 48 },
    uLightDirection: { value: new Vector3(0.4, 0.8, 0.6) },
  };

  return new ShaderMaterial({
    uniforms,
    vertexShader: fresnelVertexShader,
    fragmentShader: fresnelFragmentShader,
  });
}
