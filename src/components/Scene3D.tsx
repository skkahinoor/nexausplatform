import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function FloatingShape({ position, color, speed = 1, distort = 0.4, scale = 1 }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Sphere args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={distort}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, color, scale = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Torus args={[1, 0.4, 32, 64]}>
          <meshStandardMaterial
            color={color}
            roughness={0.1}
            metalness={0.9}
            emissive={color}
            emissiveIntensity={0.1}
          />
        </Torus>
      </mesh>
    </Float>
  );
}

function FloatingCube({ position, color, scale = 1 }: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <Box args={[1, 1, 1]}>
          <meshStandardMaterial
            color={color}
            roughness={0.15}
            metalness={0.85}
            emissive={color}
            emissiveIntensity={0.05}
          />
        </Box>
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }) {
  const mesh = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      temp[i3] = (Math.random() - 0.5) * 20;
      temp[i3 + 1] = (Math.random() - 0.5) * 20;
      temp[i3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02;
      mesh.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color="#00d4ff" />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#00d4ff" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a855f7" />

        <FloatingShape position={[-3.5, 1.5, -2]} color="#00d4ff" speed={0.8} distort={0.5} scale={1.2} />
        <FloatingShape position={[3.5, -1, -1]} color="#a855f7" speed={1.2} distort={0.3} scale={0.8} />
        <FloatingTorus position={[4, 2, -3]} color="#00d4ff" scale={0.6} />
        <FloatingTorus position={[-4, -2, -2]} color="#a855f7" scale={0.5} />
        <FloatingCube position={[0, -2.5, -1]} color="#00d4ff" scale={0.7} />
        <FloatingCube position={[-2, 3, -4]} color="#a855f7" scale={0.5} />
        
        <Particles count={150} />
      </Canvas>
    </div>
  );
}
