import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Box, Ring } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

interface ServiceScene3DProps {
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  shapes?: ('sphere' | 'torus' | 'box' | 'ring')[];
}

function FloatingShape({ position, color, speed = 1, distort = 0.4, scale = 1, shape = 'sphere' }: {
  position: [number, number, number];
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
  shape?: 'sphere' | 'torus' | 'box' | 'ring';
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.003 * speed;
    }
  });

  const shapeComponent = () => {
    switch (shape) {
      case 'torus':
        return (
          <Torus args={[1, 0.4, 32, 64]}>
            <meshStandardMaterial
              color={color}
              roughness={0.1}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.1}
            />
          </Torus>
        );
      case 'box':
        return (
          <Box args={[1, 1, 1]}>
            <meshStandardMaterial
              color={color}
              roughness={0.15}
              metalness={0.85}
              emissive={color}
              emissiveIntensity={0.05}
            />
          </Box>
        );
      case 'ring':
        return (
          <Ring args={[0.8, 1.2, 64]}>
            <meshStandardMaterial
              color={color}
              roughness={0.1}
              metalness={0.9}
              emissive={color}
              emissiveIntensity={0.1}
              side={THREE.DoubleSide}
            />
          </Ring>
        );
      default:
        return (
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
        );
    }
  };

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {shapeComponent()}
      </mesh>
    </Float>
  );
}

export function ServiceScene3D({ colors, shapes = ['sphere', 'torus', 'box'] }: ServiceScene3DProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.4} color={colors.primary} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color={colors.primary} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color={colors.secondary} />

        <FloatingShape 
          position={[-3.5, 1.5, -2]} 
          color={colors.primary} 
          speed={0.8} 
          distort={0.5} 
          scale={1.2}
          shape={shapes[0] || 'sphere'}
        />
        <FloatingShape 
          position={[3.5, -1, -1]} 
          color={colors.secondary} 
          speed={1.2} 
          distort={0.3} 
          scale={0.8}
          shape={shapes[1] || 'torus'}
        />
        <FloatingShape 
          position={[4, 2, -3]} 
          color={colors.primary} 
          speed={1.5}
          scale={0.6}
          shape={shapes[2] || 'box'}
        />
        {colors.accent && (
          <FloatingShape 
            position={[-4, -2, -2]} 
            color={colors.accent} 
            speed={1}
            scale={0.5}
            shape="ring"
          />
        )}
      </Canvas>
    </div>
  );
}

