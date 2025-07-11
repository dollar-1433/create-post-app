import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';

const Earth = ({ countries = [] }) => {
  const meshRef = useRef();
  const groupRef = useRef();

  // Create earth texture
  const earthTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    // Create a simple earth-like texture
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#4A90E2');
    gradient.addColorStop(0.3, '#7ED321');
    gradient.addColorStop(0.7, '#F5A623');
    gradient.addColorStop(1, '#4A90E2');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some continent-like shapes
    context.fillStyle = '#50E3C2';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 50 + 20;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  // Convert lat/lng to 3D coordinates
  const latLngToVector3 = (lat, lng, radius = 2.1) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    return new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    );
  };

  return (
    <group ref={groupRef}>
      {/* Earth Sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial map={earthTexture} />
      </Sphere>
      
      {/* Country Pins */}
      {countries.map((country, index) => {
        const position = latLngToVector3(
          country.coordinates?.lat || 0, 
          country.coordinates?.lng || 0
        );
        
        return (
          <group key={country._id || index} position={position}>
            {/* Pin */}
            <mesh>
              <cylinderGeometry args={[0.02, 0.02, 0.2]} />
              <meshStandardMaterial color="#ff4757" />
            </mesh>
            {/* Pin Head */}
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.05]} />
              <meshStandardMaterial color="#ff3742" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const Earth3D = ({ countries = [] }) => {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-b from-blue-900 to-purple-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Earth countries={countries} />
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default Earth3D;