"use client";

import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface Region {
  id: string;
  name: string;
  position: [number, number, number];
  achievement: string;
}

interface MarkerProps {
  position: [number, number, number];
  achievement: string;
  name: string;
  onClick: () => void;
  isActive: boolean;
}

// Helper function to convert lat/long to 3D coordinates
const latLongToVector3 = (lat: number, long: number, radius: number): [number, number, number] => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (long + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return [x, y, z];
};

// Define the regions and their information
const regions: Region[] = [
  // India
  {
    id: 'bangalore',
    name: 'Bangalore, India',
    position: latLongToVector3(12.9716, 77.5946, 1.5), // Bangalore coordinates
    achievement: 'Led technology innovation hub, driving digital transformation initiatives across APAC.'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad, India',
    position: latLongToVector3(17.3850, 78.4867, 1.5), // Hyderabad coordinates
    achievement: 'Established global delivery center, managing large-scale enterprise solutions.'
  },
  // Middle East
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    position: latLongToVector3(25.2048, 55.2708, 1.5), // Dubai coordinates
    achievement: 'Spearheaded digital transformation projects across the Middle East region.'
  },
  {
    id: 'riyadh',
    name: 'Riyadh, Saudi Arabia',
    position: latLongToVector3(24.7136, 46.6753, 1.5), // Riyadh coordinates
    achievement: 'Led strategic initiatives for government digital transformation programs.'
  },
  // Europe
  {
    id: 'poland',
    name: 'Warsaw, Poland',
    position: latLongToVector3(52.2297, 21.0122, 1.5), // Warsaw coordinates
    achievement: 'Established Eastern European technology center, driving innovation in EU region.'
  },
  {
    id: 'london',
    name: 'London, UK',
    position: latLongToVector3(51.5074, -0.1278, 1.5), // London coordinates
    achievement: 'Managed cross-functional teams across European markets.'
  },
  // United States
  {
    id: 'sanfrancisco',
    name: 'San Francisco, USA',
    position: latLongToVector3(37.7749, -122.4194, 1.5), // San Francisco coordinates
    achievement: 'Drove innovation partnerships with Silicon Valley tech companies.'
  },
  {
    id: 'newyork',
    name: 'New York, USA',
    position: latLongToVector3(40.7128, -74.0060, 1.5), // New York coordinates
    achievement: 'Led strategic client relationships and digital transformation projects.'
  },
  {
    id: 'texas',
    name: 'Austin, Texas',
    position: latLongToVector3(30.2672, -97.7431, 1.5), // Austin coordinates
    achievement: 'Established technology innovation hub for southern United States.'
  },
  {
    id: 'california',
    name: 'Los Angeles, California',
    position: latLongToVector3(34.0522, -118.2437, 1.5), // Los Angeles coordinates
    achievement: 'Managed West Coast operations and client partnerships.'
  }
];

const Marker: React.FC<MarkerProps> = ({ position, achievement, name, onClick, isActive }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={position}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh scale={0.05}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={isActive || hovered ? "#ff2222" : "#ff4444"}
          emissive={isActive || hovered ? "#ff0000" : "#cc0000"}
          emissiveIntensity={1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {(isActive || hovered) && (
        <Html center distanceFactor={8}>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-xs">
            <h3 className="font-bold text-lg mb-2">{name}</h3>
            <p className="text-sm text-gray-600">{achievement}</p>
          </div>
        </Html>
      )}
    </group>
  );
};

const Globe = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  // Create the globe material with a brighter texture
  const globeMaterial = useMemo(() => {
    const material = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load('https://unpkg.com/three-globe@2.30.0/example/img/earth-blue-marble.jpg'),
      bumpMap: new THREE.TextureLoader().load('https://unpkg.com/three-globe@2.30.0/example/img/earth-topology.png'),
      bumpScale: 0.2,
      shininess: 5,
      specular: new THREE.Color(0x333333),
    });
    return material;
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  const handleMarkerClick = (regionId: string) => {
    setActiveRegion(regionId === activeRegion ? null : regionId);
  };

  return (
    <group>
      <ambientLight intensity={1.2} />
      <directionalLight 
        position={[1, 1, 1]} 
        intensity={2} 
        castShadow 
      />
      <directionalLight 
        position={[-1, -1, -1]} 
        intensity={0.8} 
      />
      <group ref={groupRef}>
        <mesh receiveShadow castShadow>
          <sphereGeometry args={[1.5, 64, 64]} />
          {globeMaterial && <primitive object={globeMaterial} attach="material" />}
        </mesh>
        {regions.map((region) => (
          <Marker
            key={region.id}
            position={region.position}
            name={region.name}
            achievement={region.achievement}
            onClick={() => handleMarkerClick(region.id)}
            isActive={activeRegion === region.id}
          />
        ))}
      </group>
    </group>
  );
};

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Driving Strategic Impact Across Programs & Teams Worldwide
            </h1>
            <p className="text-xl text-gray-600">
              I'm Bala Karumanchi, a Program Manager with expertise in delivering complex projects, enabling data-driven decisions, and fostering innovation across industries.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="https://drive.google.com/file/d/13MXUL6H1DSoZa0MPEQHdpkAfsvGp7seH/view?usp=sharing" className="btn-primary">
                Explore My Portfolio
              </a>
              <a
                href="https://www.linkedin.com/in/balak-73368253/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Connect with Me on LinkedIn
              </a>
            </div>
          </motion.div>
          <div className="h-[500px] relative">
            <div className="globe-container">
              <Canvas 
                camera={{ position: [0, 0, 4], fov: 45 }}
                shadows
              >
                <Globe />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={false}
                  minPolarAngle={Math.PI / 2}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 