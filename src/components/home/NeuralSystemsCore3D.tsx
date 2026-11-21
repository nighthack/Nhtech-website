import { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw, RotateCw } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useTheme } from '../../context/ThemeContext';

export type SpatialSystemMode = 'embedded' | 'vision-edge' | 'custom-platforms';

interface NeuralSystemsCore3DProps {
  activeMode: SpatialSystemMode;
}

const NODE_COUNT = 42;
const PACKET_COUNT = 28;

// Pre-allocated scratch math helpers (zero GC inside render loop)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _scale = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _color = new THREE.Color();

function computeTargetLayouts(): Record<SpatialSystemMode, Float32Array> {
  const embedded = new Float32Array(NODE_COUNT * 3);
  const vision = new Float32Array(NODE_COUNT * 3);
  const custom = new Float32Array(NODE_COUNT * 3);

  for (let i = 0; i < NODE_COUNT; i++) {
    // 1. Embedded Teams: Dual orchestrated rings feeding through an approval meridian
    const t = i / NODE_COUNT;
    const ringIdx = i % 3;
    const ringRadius = ringIdx === 0 ? 1.55 : ringIdx === 1 ? 2.15 : 0.95;
    const angle = (Math.floor(i / 3) / (NODE_COUNT / 3)) * Math.PI * 2;
    const yOffset = ringIdx === 0 ? 0.38 * Math.sin(angle * 2) : ringIdx === 1 ? -0.32 * Math.cos(angle * 3) : 0;
    embedded[i * 3] = Math.cos(angle) * ringRadius;
    embedded[i * 3 + 1] = yOffset;
    embedded[i * 3 + 2] = Math.sin(angle) * ringRadius;

    // 2. Vision & Edge AI: Optical frustum / biomechanical kinematic lattice
    const layer = Math.floor(i / 14); // 3 spatial planes (0 = sensor, 1 = mid lattice, 2 = edge core)
    const subIdx = i % 14;
    const subAngle = (subIdx / 14) * Math.PI * 2;
    const coneRadius = 0.65 + layer * 0.72;
    vision[i * 3] = Math.cos(subAngle) * coneRadius;
    vision[i * 3 + 1] = (layer - 1) * 0.92;
    vision[i * 3 + 2] = Math.sin(subAngle) * coneRadius;

    // 3. Custom AI Platforms: Sovereign 3D compute matrix cube (7x3x2 layered grid)
    const gx = i % 7;
    const gy = Math.floor(i / 7) % 3;
    const gz = Math.floor(i / 21);
    custom[i * 3] = (gx - 3) * 0.56;
    custom[i * 3 + 1] = (gy - 1) * 0.78;
    custom[i * 3 + 2] = (gz - 0.5) * 1.15;

    void t;
  }

  return {
    embedded,
    'vision-edge': vision,
    'custom-platforms': custom
  };
}

const TARGET_LAYOUTS = computeTargetLayouts();

export function NeuralSystemsCore3D({ activeMode }: NeuralSystemsCore3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const modeRef = useRef<SpatialSystemMode>(activeMode);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const redrawRef = useRef<(() => void) | null>(null);
  const rotateRef = useRef<((angle: number) => void) | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const motionPaused = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    modeRef.current = activeMode;
    redrawRef.current?.();
  }, [activeMode]);

  useEffect(() => {
    themeRef.current = theme;
    redrawRef.current?.();
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Probe WebGL2 + software GL once
    let isSoftwareGl = false;
    let hasWebGl = true;
    try {
      const probeCanvas = document.createElement('canvas');
      const probeGl =
        probeCanvas.getContext('webgl2') ||
        (probeCanvas.getContext('webgl') as WebGLRenderingContext | null);
      if (!probeGl) {
        hasWebGl = false;
      } else {
        const ext = probeGl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : probeGl.RENDERER;
        const gpu = String(probeGl.getParameter(param) || '');
        probeGl.getExtension('WEBGL_lose_context')?.loseContext();
        isSoftwareGl = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      }
    } catch {
      hasWebGl = false;
    }

    if (!hasWebGl) {
      setFallbackActive(true);
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setFallbackActive(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.96;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 460;
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const updateCameraFraming = (w: number, h: number) => {
      const aspect = w / h;
      const dist = aspect < 1 ? Math.min(11.6, 8.1 / Math.max(aspect, 0.65)) : 8.1;
      camera.aspect = aspect;
      camera.position.set(0, aspect < 1 ? 1.05 : 1.3, dist);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    updateCameraFraming(width, height);

    // Three-point studio lighting + cool Ocean hemisphere fill (restrained intensity)
    const hemiLight = new THREE.HemisphereLight(0x75a4b5, 0x061421, 0.72);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff1e6, 1.55);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x47849b, 1.65);
    rimLight.position.set(-6, 3, -5);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0xff5a1f, 1.85, 12, 1.8);
    accentPoint.position.set(0, 0.4, 2.2);
    scene.add(accentPoint);

    // Composite Multi-Part Procedural Architecture Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials with calibrated roughness & metalness variation
    const anodizedNavyMat = new THREE.MeshStandardMaterial({
      color: 0x173d5b,
      metalness: 0.88,
      roughness: 0.24
    });

    const brushedTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x75a4b5,
      metalness: 0.92,
      roughness: 0.18,
      clearcoat: 0.65,
      clearcoatRoughness: 0.15
    });

    const graphiteFrameMat = new THREE.MeshStandardMaterial({
      color: 0x202a33,
      metalness: 0.72,
      roughness: 0.46
    });

    const signalOrangeMat = new THREE.MeshStandardMaterial({
      color: 0xff5a1f,
      emissive: 0xff5a1f,
      emissiveIntensity: 0.5,
      metalness: 0.35,
      roughness: 0.28
    });

    const crystalCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x326b86,
      metalness: 0.12,
      roughness: 0.12,
      clearcoat: 0.8,
      transparent: true,
      opacity: isSoftwareGl ? 0.38 : 0.5
    });

    // 1. Outer Gimbal Containment Ring
    const outerGimbalGeo = new THREE.TorusGeometry(2.45, 0.035, 16, 96);
    const outerGimbal = new THREE.Mesh(outerGimbalGeo, anodizedNavyMat);
    outerGimbal.rotation.x = Math.PI * 0.42;
    rootGroup.add(outerGimbal);

    // 4 Structural Gimbal Collars
    const collarGeo = new THREE.CylinderGeometry(0.085, 0.085, 0.22, 16);
    for (let i = 0; i < 4; i++) {
      const collar = new THREE.Mesh(collarGeo, brushedTitaniumMat);
      const a = (i / 4) * Math.PI * 2;
      collar.position.set(Math.cos(a) * 2.45, Math.sin(a) * 2.45, 0);
      collar.rotation.z = a;
      outerGimbal.add(collar);
    }

    // 2. Governance Human-Review Meridian Ring (Signal Orange Hairline Ring)
    const governanceRingGeo = new THREE.TorusGeometry(1.78, 0.022, 12, 84);
    const governanceRing = new THREE.Mesh(governanceRingGeo, signalOrangeMat);
    governanceRing.rotation.y = Math.PI * 0.25;
    rootGroup.add(governanceRing);

    // 3. Inner Precision Telemetry Ring
    const innerRingGeo = new THREE.TorusGeometry(1.18, 0.028, 14, 72);
    const innerRing = new THREE.Mesh(innerRingGeo, brushedTitaniumMat);
    innerRing.rotation.x = -Math.PI * 0.35;
    rootGroup.add(innerRing);

    // 4. Central Optical Core (Multi-part: faceted octahedron + inner emitter)
    const coreShellGeo = new THREE.OctahedronGeometry(0.56, 1);
    const coreShell = new THREE.Mesh(coreShellGeo, crystalCoreMat);
    rootGroup.add(coreShell);

    const coreWireGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.68, 0));
    const coreWireMat = new THREE.LineBasicMaterial({
      color: 0xa6c3ce,
      transparent: true,
      opacity: 0.34
    });
    const coreWire = new THREE.LineSegments(coreWireGeo, coreWireMat);
    rootGroup.add(coreWire);

    const coreHeartGeo = new THREE.OctahedronGeometry(0.24, 0);
    const coreHeart = new THREE.Mesh(coreHeartGeo, signalOrangeMat);
    rootGroup.add(coreHeart);

    // 5. Base Architectural Calibration Ring (grounded reference plane)
    const basePlinthGeo = new THREE.RingGeometry(2.15, 2.22, 72);
    const basePlinthMat = new THREE.MeshBasicMaterial({
      color: 0x47849b,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const basePlinth = new THREE.Mesh(basePlinthGeo, basePlinthMat);
    basePlinth.rotation.x = -Math.PI / 2;
    basePlinth.position.y = -2.05;
    rootGroup.add(basePlinth);

    const baseGridGeo = new THREE.RingGeometry(1.1, 1.13, 64);
    const baseGrid = new THREE.Mesh(baseGridGeo, basePlinthMat);
    baseGrid.rotation.x = -Math.PI / 2;
    baseGrid.position.y = -2.04;
    rootGroup.add(baseGrid);

    // 6. Instanced Morphing Compute Nodes (42 nodes morphing smoothly per mode)
    const nodeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 6);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.65,
      roughness: 0.25
    });
    const nodeInstanced = new THREE.InstancedMesh(nodeGeo, nodeMat, NODE_COUNT);
    nodeInstanced.frustumCulled = false;

    const currentNodePositions = new Float32Array(TARGET_LAYOUTS[modeRef.current]);
    for (let i = 0; i < NODE_COUNT; i++) {
      _vec3A.set(
        currentNodePositions[i * 3],
        currentNodePositions[i * 3 + 1],
        currentNodePositions[i * 3 + 2]
      );
      _scale.setScalar(1);
      _quat.identity();
      _mat4.compose(_vec3A, _quat, _scale);
      nodeInstanced.setMatrixAt(i, _mat4);
      _color.setHex(i % 5 === 0 ? 0xff5a1f : i % 2 === 0 ? 0x75a4b5 : 0x24536f);
      nodeInstanced.setColorAt(i, _color);
    }
    nodeInstanced.instanceMatrix.needsUpdate = true;
    if (nodeInstanced.instanceColor) nodeInstanced.instanceColor.needsUpdate = true;
    nodeInstanced.computeBoundingSphere();
    rootGroup.add(nodeInstanced);

    // 7. Instanced Orbital Signal Packets
    const packetGeo = new THREE.SphereGeometry(0.042, 10, 10);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const packetInstanced = new THREE.InstancedMesh(packetGeo, packetMat, PACKET_COUNT);
    packetInstanced.frustumCulled = false;
    for (let i = 0; i < PACKET_COUNT; i++) {
      _color.setHex(i % 3 === 0 ? 0xff5a1f : 0xa6c3ce);
      packetInstanced.setColorAt(i, _color);
    }
    if (packetInstanced.instanceColor) packetInstanced.instanceColor.needsUpdate = true;
    rootGroup.add(packetInstanced);

    // Subtle pointer interactivity (hover parallax + drag spin)
    let targetRotX = 0.16;
    let targetRotY = -0.35;
    let currentRotX = targetRotX;
    let currentRotY = targetRotY;
    let dragPointer: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;

    const onPointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return;
      dragPointer = event.pointerId;
      lastClientX = event.clientX;
      lastClientY = event.clientY;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (dragPointer !== event.pointerId) return;
      targetRotY += (event.clientX - lastClientX) * 0.008;
      targetRotX = THREE.MathUtils.clamp(targetRotX + (event.clientY - lastClientY) * 0.006, -0.7, 0.7);
      lastClientX = event.clientX;
      lastClientY = event.clientY;
      redrawRef.current?.();
    };

    const onPointerEnd = (event: PointerEvent) => {
      if (dragPointer === event.pointerId) dragPointer = null;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerEnd);
    window.addEventListener('pointercancel', onPointerEnd);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setFallbackActive(true);
    };
    domEl.addEventListener('webglcontextlost', onContextLost);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w <= 0 || h <= 0) return;
      updateCameraFraming(w, h);
      renderer.setSize(w, h);
      redrawRef.current?.();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pre-compile on hardware GPUs
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    let frameId = 0;
    let frameScheduled = false;
    let elapsed = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    const tick = () => {
      frameScheduled = false;
      if (disposed) return;

      const isStill = prefersReducedMotion || motionPaused.current;
      const delta = Math.min(clock.getDelta(), 0.08);
      if (!isStill) elapsed += delta;
      const mode = modeRef.current;
      const isDark = themeRef.current === 'dark';

      // Adapt material tint slightly for light vs dark background harmony
      anodizedNavyMat.color.setHex(isDark ? 0x173d5b : 0x24536f);
      coreWireMat.color.setHex(isDark ? 0xa6c3ce : 0x24536f);
      basePlinthMat.opacity = isDark ? 0.16 : 0.1;

      if (dragPointer === null && !isStill) {
        targetRotY += delta * 0.16;
      }

      currentRotX = isStill ? targetRotX : THREE.MathUtils.damp(currentRotX, targetRotX, 5.5, delta);
      currentRotY = isStill ? targetRotY : THREE.MathUtils.damp(currentRotY, targetRotY, 5.5, delta);
      rootGroup.rotation.x = currentRotX;
      rootGroup.rotation.y = currentRotY;

      // Mode-specific orbital gimbal kinematics
      const targetGovTilt =
        mode === 'embedded' ? 0.44 : mode === 'vision-edge' ? 1.15 : 0.12;
      governanceRing.rotation.x = isStill ? targetGovTilt : THREE.MathUtils.damp(
        governanceRing.rotation.x,
        targetGovTilt,
        4.2,
        delta
      );
      if (!isStill) {
        outerGimbal.rotation.z += delta * 0.22;
        innerRing.rotation.y -= delta * 0.35;
        coreShell.rotation.y += delta * 0.4;
        coreWire.rotation.y -= delta * 0.25;
        coreHeart.rotation.y += delta * 0.9;
        coreHeart.rotation.x += delta * 0.45;
      }

      // Morph instanced compute nodes smoothly to active mode target positions
      const targetArr = TARGET_LAYOUTS[mode];
      if (isStill) currentNodePositions.set(targetArr);
      for (let i = 0; i < NODE_COUNT; i++) {
        const ix = i * 3;
        currentNodePositions[ix] = THREE.MathUtils.damp(
          currentNodePositions[ix],
          targetArr[ix],
          4.5,
          delta
        );
        currentNodePositions[ix + 1] = THREE.MathUtils.damp(
          currentNodePositions[ix + 1],
          targetArr[ix + 1],
          4.5,
          delta
        );
        currentNodePositions[ix + 2] = THREE.MathUtils.damp(
          currentNodePositions[ix + 2],
          targetArr[ix + 2],
          4.5,
          delta
        );

        const floatY = Math.sin(elapsed * 1.4 + i * 0.45) * 0.045;
        _vec3A.set(
          currentNodePositions[ix],
          currentNodePositions[ix + 1] + floatY,
          currentNodePositions[ix + 2]
        );
        _euler.set(elapsed * 0.25 + i * 0.2, elapsed * 0.4 + i * 0.3, 0);
        _quat.setFromEuler(_euler);
        const s = 0.85 + ((i % 4) * 0.12);
        _scale.set(s, s, s);
        _mat4.compose(_vec3A, _quat, _scale);
        nodeInstanced.setMatrixAt(i, _mat4);
      }
      nodeInstanced.instanceMatrix.needsUpdate = true;

      // Animate orbital signal packets
      for (let i = 0; i < PACKET_COUNT; i++) {
        const speed = 0.55 + (i % 5) * 0.14;
        const phase = elapsed * speed + (i / PACKET_COUNT) * Math.PI * 2;
        const orbitR = i % 3 === 0 ? 1.78 : i % 2 === 0 ? 2.45 : 1.18;
        const tiltAngle = i % 3 === 0 ? governanceRing.rotation.x : i % 2 === 0 ? 0.5 : -0.65;

        _vec3B.set(Math.cos(phase) * orbitR, Math.sin(phase * 2) * 0.14, Math.sin(phase) * orbitR);
        _euler.set(tiltAngle, i * 0.4, 0);
        _quat.setFromEuler(_euler);
        _vec3B.applyQuaternion(_quat);

        _quat.identity();
        _scale.setScalar(i % 3 === 0 ? 1.25 : 0.85);
        _mat4.compose(_vec3B, _quat, _scale);
        packetInstanced.setMatrixAt(i, _mat4);
      }
      packetInstanced.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);

      if (isStill) return;

      frameScheduled = true;
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    redrawRef.current = () => {
      if (!frameScheduled) tick();
    };
    rotateRef.current = (angle) => {
      targetRotY += angle;
      redrawRef.current?.();
    };
    tick();

    return () => {
      redrawRef.current = null;
      rotateRef.current = null;
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      domEl.removeEventListener('pointerdown', onPointerDown);
      domEl.removeEventListener('webglcontextlost', onContextLost);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);

      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh || (obj as THREE.LineSegments).isLineSegments) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      graphiteFrameMat.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (domEl.parentNode === container) {
        container.removeChild(domEl);
      }
    };
  }, [fallbackActive, prefersReducedMotion]);

  if (fallbackActive) {
    return (
      <div aria-hidden="true" className="w-full h-full flex items-center justify-center relative select-none">
        <svg viewBox="0 0 400 400" className="w-4/5 h-4/5 max-w-[380px]">
          <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="108" fill="none" stroke="#FF5A1F" strokeOpacity="0.8" strokeWidth="1.5" strokeDasharray="6 6" />
          <circle cx="200" cy="200" r="64" fill="none" stroke="#47849B" strokeOpacity="0.65" strokeWidth="1.5" />
          <polygon points="200,152 242,200 200,248 158,200" fill="#173D5B" fillOpacity="0.65" stroke="#FF5A1F" strokeWidth="1.5" />
        </svg>
      </div>
    );
  }

  return (
    <>
      <div
        ref={mountRef}
        aria-hidden="true"
        className="relative h-full w-full cursor-grab touch-pan-y opacity-80 active:cursor-grabbing"
      />
      <div className="absolute right-0 top-0 flex gap-1.5">
        {!prefersReducedMotion && (
          <button
            type="button"
            aria-label={isPaused ? 'Resume 3D model animation' : 'Pause 3D model animation'}
            title={isPaused ? 'Resume animation' : 'Pause animation'}
            onClick={() => {
              motionPaused.current = !motionPaused.current;
              setIsPaused(motionPaused.current);
              redrawRef.current?.();
            }}
            className="site-button button-secondary size-11 p-0"
          >
            {isPaused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          </button>
        )}
        <button type="button" aria-label="Rotate 3D model left" title="Rotate left" onClick={() => rotateRef.current?.(-0.55)} className="site-button button-secondary size-11 p-0">
          <RotateCcw aria-hidden="true" className="size-4" />
        </button>
        <button type="button" aria-label="Rotate 3D model right" title="Rotate right" onClick={() => rotateRef.current?.(0.55)} className="site-button button-secondary size-11 p-0">
          <RotateCw aria-hidden="true" className="size-4" />
        </button>
      </div>
    </>
  );
}
