"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Environment } from "@react-three/drei";
import { useCrystalStore } from "@/lib/store";
import { materials } from "@/lib/materials";
import * as THREE from "three";

function Atom({ position, radius, color }: { position: [number, number, number]; radius: number; color: string }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.2} />
    </mesh>
  );
}

function Bond({ start, end, color }: { start: [number, number, number]; end: [number, number, number]; color: string }) {
  const mid: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];
  const dir = new THREE.Vector3(end[0] - start[0], end[1] - start[1], end[2] - start[2]);
  const len = dir.length();
  dir.normalize();
  const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <mesh position={mid} quaternion={quat}>
      <cylinderGeometry args={[0.04, 0.04, len, 8]} />
      <meshStandardMaterial color={color} metalness={0.1} roughness={0.5} opacity={0.6} transparent />
    </mesh>
  );
}

function CrystalStructure() {
  const groupRef = useRef<THREE.Group>(null);
  const { selectedMaterial, rotationSpeed } = useCrystalStore();
  const material = materials.find((m) => m.id === selectedMaterial) || materials[0];

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  const scale = 2;

  return (
    <group ref={groupRef}>
      {material.atoms.map((atom, i) => (
        <Atom
          key={i}
          position={[(atom.x - 0.5) * scale, (atom.y - 0.5) * scale, (atom.z - 0.5) * scale]}
          radius={atom.radius * 0.8}
          color={atom.color}
        />
      ))}
      {material.bonds.map(([a, b], i) => {
        const atomA = material.atoms[a];
        const atomB = material.atoms[b];
        if (!atomA || !atomB) return null;
        return (
          <Bond
            key={i}
            start={[(atomA.x - 0.5) * scale, (atomA.y - 0.5) * scale, (atomA.z - 0.5) * scale]}
            end={[(atomB.x - 0.5) * scale, (atomB.y - 0.5) * scale, (atomB.z - 0.5) * scale]}
            color="#475569"
          />
        );
      })}
      {/* Unit cell wireframe */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(scale, scale, scale)]} />
        <lineBasicMaterial color="#334155" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

export default function CrystalViewer() {
  const { selectedMaterial } = useCrystalStore();
  const material = materials.find((m) => m.id === selectedMaterial) || materials[0];

  return (
    <div className="relative w-full h-full">
      <Canvas camera={{ position: [3, 2, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.3} color="#6366f1" />
        <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
          <CrystalStructure />
        </Float>
        <OrbitControls enableDamping dampingFactor={0.05} />
        <Environment preset="night" />
      </Canvas>
      <div className="absolute bottom-4 left-4 glass-panel px-4 py-2">
        <div className="text-sm font-medium text-white">{material.name}</div>
        <div className="text-xs text-slate-400">{material.formula} - {material.crystalSystem}</div>
      </div>
    </div>
  );
}
