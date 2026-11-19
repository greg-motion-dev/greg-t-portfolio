import {
  fluidAdvectionShader,
  fluidBaseVertexShader,
  fluidClearShader,
  fluidCurlShader,
  fluidDisplayShader,
  fluidDivergenceShader,
  fluidGradientSubtractShader,
  fluidPressureShader,
  fluidSplatShader,
  fluidVorticityShader,
} from "@/shaders/fluid";

export interface FluidColor {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

export interface FluidSettings {
  readonly simResolution: number;
  readonly dyeResolution: number;
  readonly densityDissipation: number;
  readonly velocityDissipation: number;
  readonly pressure: number;
  readonly pressureIterations: number;
  readonly curl: number;
  readonly splatRadius: number;
  readonly splatForce: number;
  readonly colorIntensity: number;
  readonly colorCycleSeconds: number;
  readonly opacity: number;
  readonly maxPixelRatio: number;
  readonly introSplatForce: number;
  readonly burstColorMultiplier: number;
}

export interface FluidSimulation {
  readonly start: () => void;
  readonly stop: () => void;
  readonly movePointer: (x: number, y: number) => void;
  readonly releasePointer: () => void;
  readonly introSplats: () => void;
  readonly burst: (x: number, y: number) => void;
  readonly dispose: () => void;
}

interface TextureFormat {
  readonly internalFormat: number;
  readonly format: number;
}

interface FormatSupport {
  readonly rgba: TextureFormat;
  readonly rg: TextureFormat;
  readonly r: TextureFormat;
}

interface FrameBuffer {
  readonly texture: WebGLTexture;
  readonly fbo: WebGLFramebuffer;
  readonly width: number;
  readonly height: number;
  readonly texelSizeX: number;
  readonly texelSizeY: number;
}

interface DoubleFrameBuffer {
  read: FrameBuffer;
  write: FrameBuffer;
  readonly width: number;
  readonly height: number;
  readonly texelSizeX: number;
  readonly texelSizeY: number;
}

interface ShaderProgram {
  readonly program: WebGLProgram;
  readonly uniforms: Readonly<Record<string, WebGLUniformLocation | null>>;
}

interface PointerState {
  active: boolean;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  moved: boolean;
  colorIndex: number;
  colorTimer: number;
}

interface SimulationTargets {
  dye: DoubleFrameBuffer;
  velocity: DoubleFrameBuffer;
  divergence: FrameBuffer;
  curl: FrameBuffer;
  pressure: DoubleFrameBuffer;
}

const contextAttributes: WebGLContextAttributes = {
  alpha: true,
  depth: false,
  stencil: false,
  antialias: false,
  premultipliedAlpha: true,
  preserveDrawingBuffer: false,
  powerPreference: "low-power",
};

function compileShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (shader === null) {
    throw new Error("Unable to create shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compilation failed");
  }
  return shader;
}

function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentSource: string,
): ShaderProgram {
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, "aPosition");
  gl.linkProgram(program);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Program link failed");
  }

  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const uniformCount: number = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
  for (let index = 0; index < uniformCount; index++) {
    const info = gl.getActiveUniform(program, index);
    if (info !== null) {
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
  }
  return { program, uniforms };
}

function uniform(program: ShaderProgram, name: string): WebGLUniformLocation | null {
  return program.uniforms[name] ?? null;
}

function supportsRenderFormat(
  gl: WebGL2RenderingContext,
  internalFormat: number,
  format: number,
): boolean {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, gl.HALF_FLOAT, null);
  const framebuffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  const complete = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.deleteFramebuffer(framebuffer);
  gl.deleteTexture(texture);
  return complete;
}

function resolveFormat(
  gl: WebGL2RenderingContext,
  candidates: readonly TextureFormat[],
): TextureFormat | null {
  return (
    candidates.find((candidate) =>
      supportsRenderFormat(gl, candidate.internalFormat, candidate.format),
    ) ?? null
  );
}

function detectFormats(gl: WebGL2RenderingContext): FormatSupport | null {
  gl.getExtension("EXT_color_buffer_float");
  gl.getExtension("EXT_color_buffer_half_float");
  const rgbaFormat = { internalFormat: gl.RGBA16F, format: gl.RGBA };
  const rgFormat = { internalFormat: gl.RG16F, format: gl.RG };
  const rFormat = { internalFormat: gl.R16F, format: gl.RED };
  const rgba = resolveFormat(gl, [rgbaFormat]);
  const rg = resolveFormat(gl, [rgFormat, rgbaFormat]);
  const r = resolveFormat(gl, [rFormat, rgFormat, rgbaFormat]);
  if (rgba === null || rg === null || r === null) {
    return null;
  }
  return { rgba, rg, r };
}

export function createFluidSimulation(
  canvas: HTMLCanvasElement,
  palette: readonly FluidColor[],
  settings: FluidSettings,
): FluidSimulation | null {
  try {
    return buildFluidSimulation(canvas, palette, settings);
  } catch {
    return null;
  }
}

function buildFluidSimulation(
  canvas: HTMLCanvasElement,
  palette: readonly FluidColor[],
  settings: FluidSettings,
): FluidSimulation | null {
  const gl = canvas.getContext("webgl2", contextAttributes);
  if (gl === null || gl.isContextLost() || palette.length === 0) {
    return null;
  }
  const formats = detectFormats(gl);
  if (formats === null) {
    return null;
  }

  const baseVertexShader = compileShader(gl, gl.VERTEX_SHADER, fluidBaseVertexShader);
  const programs = {
    clear: createProgram(gl, baseVertexShader, fluidClearShader),
    display: createProgram(gl, baseVertexShader, fluidDisplayShader),
    splat: createProgram(gl, baseVertexShader, fluidSplatShader),
    advection: createProgram(gl, baseVertexShader, fluidAdvectionShader),
    divergence: createProgram(gl, baseVertexShader, fluidDivergenceShader),
    curl: createProgram(gl, baseVertexShader, fluidCurlShader),
    vorticity: createProgram(gl, baseVertexShader, fluidVorticityShader),
    pressure: createProgram(gl, baseVertexShader, fluidPressureShader),
    gradientSubtract: createProgram(gl, baseVertexShader, fluidGradientSubtractShader),
  };

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const allFrameBuffers = new Set<FrameBuffer>();

  const blit = (target: FrameBuffer | null): void => {
    if (target === null) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    } else {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  const attach = (target: FrameBuffer, unit: number): number => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, target.texture);
    return unit;
  };

  const createFrameBuffer = (
    width: number,
    height: number,
    textureFormat: TextureFormat,
    filter: number,
  ): FrameBuffer => {
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      textureFormat.internalFormat,
      width,
      height,
      0,
      textureFormat.format,
      gl.HALF_FLOAT,
      null,
    );
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const frameBuffer = {
      texture,
      fbo,
      width,
      height,
      texelSizeX: 1 / width,
      texelSizeY: 1 / height,
    };
    allFrameBuffers.add(frameBuffer);
    return frameBuffer;
  };

  const createDoubleFrameBuffer = (
    width: number,
    height: number,
    textureFormat: TextureFormat,
    filter: number,
  ): DoubleFrameBuffer => ({
    read: createFrameBuffer(width, height, textureFormat, filter),
    write: createFrameBuffer(width, height, textureFormat, filter),
    width,
    height,
    texelSizeX: 1 / width,
    texelSizeY: 1 / height,
  });

  const swap = (target: DoubleFrameBuffer): void => {
    const previousRead = target.read;
    target.read = target.write;
    target.write = previousRead;
  };

  const deleteFrameBuffer = (target: FrameBuffer): void => {
    gl.deleteTexture(target.texture);
    gl.deleteFramebuffer(target.fbo);
    allFrameBuffers.delete(target);
  };

  const resolution = (base: number): { width: number; height: number } => {
    const aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    const ratio = aspect < 1 ? 1 / aspect : aspect;
    const short = Math.round(base);
    const long = Math.round(base * ratio);
    return gl.drawingBufferWidth > gl.drawingBufferHeight
      ? { width: long, height: short }
      : { width: short, height: long };
  };

  const resizeCanvas = (): boolean => {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, settings.maxPixelRatio);
    const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio));
    const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio));
    if (canvas.width === width && canvas.height === height) {
      return false;
    }
    canvas.width = width;
    canvas.height = height;
    return true;
  };

  const createTargets = (): SimulationTargets => {
    const simulation = resolution(settings.simResolution);
    const dye = resolution(settings.dyeResolution);
    return {
      dye: createDoubleFrameBuffer(dye.width, dye.height, formats.rgba, gl.LINEAR),
      velocity: createDoubleFrameBuffer(simulation.width, simulation.height, formats.rg, gl.LINEAR),
      divergence: createFrameBuffer(simulation.width, simulation.height, formats.r, gl.NEAREST),
      curl: createFrameBuffer(simulation.width, simulation.height, formats.r, gl.NEAREST),
      pressure: createDoubleFrameBuffer(simulation.width, simulation.height, formats.r, gl.NEAREST),
    };
  };

  const deleteTargets = (current: SimulationTargets): void => {
    [
      current.dye.read,
      current.dye.write,
      current.velocity.read,
      current.velocity.write,
      current.divergence,
      current.curl,
      current.pressure.read,
      current.pressure.write,
    ].forEach(deleteFrameBuffer);
  };

  resizeCanvas();
  let targets = createTargets();

  const pointer: PointerState = {
    active: false,
    x: 0,
    y: 0,
    deltaX: 0,
    deltaY: 0,
    moved: false,
    colorIndex: 0,
    colorTimer: 0,
  };

  const aspectRatio = (): number => canvas.width / canvas.height;

  const correctedRadius = (): number => {
    const radius = settings.splatRadius / 100;
    return aspectRatio() > 1 ? radius * aspectRatio() : radius;
  };

  const scaledColor = (index: number, intensity: number): FluidColor => {
    const color = palette[index % palette.length] ?? { r: 1, g: 1, b: 1 };
    return { r: color.r * intensity, g: color.g * intensity, b: color.b * intensity };
  };

  const splat = (x: number, y: number, deltaX: number, deltaY: number, color: FluidColor): void => {
    const program = programs.splat;
    gl.useProgram(program.program);
    gl.uniform1i(uniform(program, "uTarget"), attach(targets.velocity.read, 0));
    gl.uniform1f(uniform(program, "aspectRatio"), aspectRatio());
    gl.uniform2f(uniform(program, "point"), x, y);
    gl.uniform3f(uniform(program, "color"), deltaX, deltaY, 0);
    gl.uniform1f(uniform(program, "radius"), correctedRadius());
    blit(targets.velocity.write);
    swap(targets.velocity);

    gl.uniform1i(uniform(program, "uTarget"), attach(targets.dye.read, 0));
    gl.uniform3f(uniform(program, "color"), color.r, color.g, color.b);
    blit(targets.dye.write);
    swap(targets.dye);
  };

  const step = (dt: number): void => {
    gl.disable(gl.BLEND);
    const { velocity, dye, pressure, divergence, curl } = targets;

    gl.useProgram(programs.curl.program);
    gl.uniform2f(uniform(programs.curl, "texelSize"), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(uniform(programs.curl, "uVelocity"), attach(velocity.read, 0));
    blit(curl);

    gl.useProgram(programs.vorticity.program);
    gl.uniform2f(uniform(programs.vorticity, "texelSize"), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(uniform(programs.vorticity, "uVelocity"), attach(velocity.read, 0));
    gl.uniform1i(uniform(programs.vorticity, "uCurl"), attach(curl, 1));
    gl.uniform1f(uniform(programs.vorticity, "curl"), settings.curl);
    gl.uniform1f(uniform(programs.vorticity, "dt"), dt);
    blit(velocity.write);
    swap(velocity);

    gl.useProgram(programs.divergence.program);
    gl.uniform2f(uniform(programs.divergence, "texelSize"), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(uniform(programs.divergence, "uVelocity"), attach(velocity.read, 0));
    blit(divergence);

    gl.useProgram(programs.clear.program);
    gl.uniform1i(uniform(programs.clear, "uTexture"), attach(pressure.read, 0));
    gl.uniform1f(uniform(programs.clear, "value"), settings.pressure);
    blit(pressure.write);
    swap(pressure);

    gl.useProgram(programs.pressure.program);
    gl.uniform2f(uniform(programs.pressure, "texelSize"), velocity.texelSizeX, velocity.texelSizeY);
    gl.uniform1i(uniform(programs.pressure, "uDivergence"), attach(divergence, 0));
    for (let iteration = 0; iteration < settings.pressureIterations; iteration++) {
      gl.uniform1i(uniform(programs.pressure, "uPressure"), attach(pressure.read, 1));
      blit(pressure.write);
      swap(pressure);
    }

    gl.useProgram(programs.gradientSubtract.program);
    gl.uniform2f(
      uniform(programs.gradientSubtract, "texelSize"),
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform1i(uniform(programs.gradientSubtract, "uPressure"), attach(pressure.read, 0));
    gl.uniform1i(uniform(programs.gradientSubtract, "uVelocity"), attach(velocity.read, 1));
    blit(velocity.write);
    swap(velocity);

    gl.useProgram(programs.advection.program);
    gl.uniform2f(uniform(programs.advection, "texelSize"), velocity.texelSizeX, velocity.texelSizeY);
    const velocityUnit = attach(velocity.read, 0);
    gl.uniform1i(uniform(programs.advection, "uVelocity"), velocityUnit);
    gl.uniform1i(uniform(programs.advection, "uSource"), velocityUnit);
    gl.uniform1f(uniform(programs.advection, "dt"), dt);
    gl.uniform1f(uniform(programs.advection, "dissipation"), settings.velocityDissipation);
    blit(velocity.write);
    swap(velocity);

    gl.uniform1i(uniform(programs.advection, "uVelocity"), attach(velocity.read, 0));
    gl.uniform1i(uniform(programs.advection, "uSource"), attach(dye.read, 1));
    gl.uniform1f(uniform(programs.advection, "dissipation"), settings.densityDissipation);
    blit(dye.write);
    swap(dye);
  };

  const render = (): void => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.disable(gl.BLEND);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    const program = programs.display;
    gl.useProgram(program.program);
    gl.uniform2f(
      uniform(program, "texelSize"),
      1 / gl.drawingBufferWidth,
      1 / gl.drawingBufferHeight,
    );
    gl.uniform1f(uniform(program, "opacity"), settings.opacity);
    gl.uniform1i(uniform(program, "uTexture"), attach(targets.dye.read, 0));
    blit(null);
  };

  const applyPointer = (dt: number): void => {
    pointer.colorTimer += dt;
    if (pointer.colorTimer >= settings.colorCycleSeconds) {
      pointer.colorTimer = 0;
      pointer.colorIndex = (pointer.colorIndex + 1) % palette.length;
    }
    if (!pointer.moved) {
      return;
    }
    pointer.moved = false;
    splat(
      pointer.x,
      pointer.y,
      pointer.deltaX * settings.splatForce,
      pointer.deltaY * settings.splatForce,
      scaledColor(pointer.colorIndex, settings.colorIntensity),
    );
  };

  let frameHandle: number | null = null;
  let lastTime = 0;

  const frame = (time: number): void => {
    const dt = Math.min((time - lastTime) / 1000, 1 / 60);
    lastTime = time;
    if (resizeCanvas()) {
      deleteTargets(targets);
      targets = createTargets();
    }
    applyPointer(dt);
    step(dt);
    render();
    frameHandle = requestAnimationFrame(frame);
  };

  const start = (): void => {
    if (frameHandle !== null) {
      return;
    }
    lastTime = performance.now();
    frameHandle = requestAnimationFrame(frame);
  };

  const stop = (): void => {
    if (frameHandle !== null) {
      cancelAnimationFrame(frameHandle);
      frameHandle = null;
    }
  };

  const movePointer = (x: number, y: number): void => {
    const texX = x;
    const texY = 1 - y;
    if (!pointer.active) {
      pointer.active = true;
      pointer.x = texX;
      pointer.y = texY;
      return;
    }
    const aspect = aspectRatio();
    const rawDeltaX = texX - pointer.x;
    const rawDeltaY = texY - pointer.y;
    pointer.deltaX = aspect < 1 ? rawDeltaX * aspect : rawDeltaX;
    pointer.deltaY = aspect > 1 ? rawDeltaY / aspect : rawDeltaY;
    pointer.x = texX;
    pointer.y = texY;
    pointer.moved = pointer.deltaX !== 0 || pointer.deltaY !== 0;
  };

  const releasePointer = (): void => {
    pointer.active = false;
    pointer.moved = false;
  };

  const introSplats = (): void => {
    palette.forEach((_, index) => {
      const x = 0.2 + Math.random() * 0.6;
      const y = 0.2 + Math.random() * 0.6;
      const deltaX = settings.introSplatForce * (Math.random() - 0.5);
      const deltaY = settings.introSplatForce * (Math.random() - 0.5);
      splat(x, y, deltaX, deltaY, scaledColor(index, settings.colorIntensity * 6));
    });
  };

  const burst = (x: number, y: number): void => {
    splat(
      x,
      1 - y,
      10 * (Math.random() - 0.5),
      30 * (Math.random() - 0.5),
      scaledColor(pointer.colorIndex, settings.colorIntensity * settings.burstColorMultiplier),
    );
  };

  const dispose = (): void => {
    stop();
    [...allFrameBuffers].forEach(deleteFrameBuffer);
    Object.values(programs).forEach(({ program }) => gl.deleteProgram(program));
    gl.deleteShader(baseVertexShader);
    gl.deleteBuffer(vertexBuffer);
    gl.deleteBuffer(indexBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  return { start, stop, movePointer, releasePointer, introSplats, burst, dispose };
}
