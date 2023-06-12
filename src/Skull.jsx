import React, { useState, useEffect, useRef } from 'react';
import { Html, OrbitControls, useHelper } from '@react-three/drei';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshPhysicalMaterial, Vector3 } from 'three';
import { gsap } from 'gsap';
import './style.css';

export default function Skull() {
  const { scene } = useLoader(GLTFLoader, './skull2.gltf');
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);
  const { camera } = useThree();
  const controlsRef = useRef();

  const target = new Vector3();
  const target1 = new Vector3(0, 1.2, 1.6);
  const target2 = new Vector3(0, 0.2, -1.7);
  const target3 = new Vector3(0, -1, 1.8);

  const cameraPosition1 = new Vector3(-2, 1.2, 3.5);
  const cameraPosition2 = new Vector3(2, 0.2, -4);
  const cameraPosition3 = new Vector3(2, -1, 3.5);

  // Update the material to MeshPhysicalMaterial
  scene.traverse((node) => {
    if (!node.isMesh) return;

    node.material = new MeshPhysicalMaterial({
      map: node.material.map,  // keep the original texture
      clearcoat: 0.1,          // Change these values according to your needs
      clearcoatRoughness: 0.2,
      reflectivity: 0.5,
    });
  });

  scene.position.set(0, -1.2, 0);

  useEffect(() => {
    let timer1;
    if (hover1) {
      timer1 = setTimeout(() => setHover1(false), 5000);
      gsap.to(target, { duration: 2, x: 1.5, y: target1.y, z: target1.z, ease: "power4.out" });
      gsap.to(camera.position, { duration: 4, x: cameraPosition1.x, y: cameraPosition1.y, z: cameraPosition1.z, ease: "power4.out" });
      controlsRef.current.autoRotate = false;
      setHover2(false);
      setHover3(false);
    } else {
      controlsRef.current.autoRotate = true;
    }
    return () => clearTimeout(timer1);
  }, [hover1]);

  useEffect(() => {
    let timer2;
    if (hover2) {
      timer2 = setTimeout(() => setHover2(false), 5000);
      gsap.to(target, { duration: 2, x: -2, y: target2.y, z: target2.z, ease: "power4.out" });
      gsap.to(camera.position, { duration: 4, x: cameraPosition2.x, y: cameraPosition2.y, z: cameraPosition2.z, ease: "power4.out" });
      controlsRef.current.autoRotate = false;
      setHover1(false);
      setHover3(false);
    } else {
      controlsRef.current.autoRotate = true;
    }
    return () => clearTimeout(timer2);
  }, [hover2]);

  useEffect(() => {
    let timer3;
    if (hover3) {
      timer3 = setTimeout(() => setHover3(false), 5000);
      gsap.to(target, { duration: 2, x: 1.2, y: target3.y, z: target3.z, ease: "power4.out" });
      gsap.to(camera.position, { duration: 4, x: cameraPosition3.x, y: cameraPosition3.y, z: cameraPosition3.z, ease: "power4.out" });
      controlsRef.current.autoRotate = false;
      setHover1(false);
      setHover2(false);
    } else {
      controlsRef.current.autoRotate = true;
    }
    return () => clearTimeout(timer3);
  }, [hover3]);

  useFrame(() => {
    controlsRef.current.target.lerp(target, 0.05);
    controlsRef.current.update();
  });

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.03}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={3}    // Minimum zoom distance
        maxDistance={10}   // Maximum zoom distance
      />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <directionalLight position={[-1, -2, -3]} intensity={0.5} />

      <primitive object={scene} scale={0.025} />

      <Html position={target1.toArray()}>
        <div
          className="dot1"
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '4px solid white', // Add a white stroke to the dot
            opacity: hover1 ? 1 : 0.2,
            transition: 'opacity 1s ease-in-out',
          }}
          onMouseEnter={() => setHover1(true)}
        />

        <div
          className="text1"
          style={{
            marginLeft: '10px', // Adjust this as needed
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Glass-like background
            padding: '1px 20px 20px 20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            width: '300px',
            transform: 'translate(10%, -50%)',
            transition: 'opacity 1s ease-in-out',
            opacity: hover1 ? 1 : 0,
          }}
        >
          <h4>Frontal Bone</h4>
          The frontal bone is a shell-shaped, unpaired, flat bone of the skull located in the forehead region.
          The frontal bone consists of six main parts: the squamous part, nasal part, two orbital plates, and two zygomatic plates.
        </div>
      </Html>

      <Html position={target2.toArray()}>
        <div
          className="dot2"
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '4px solid white', // Add a white stroke to the dot
            opacity: hover2 ? 1 : 0.2,
            transition: 'opacity 1s ease-in-out',
          }}
          onMouseEnter={() => setHover2(true)}
        />

        <div
          className="text2"
          style={{
            marginLeft: '10px', // Adjust this as needed
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Glass-like background
            padding: '1px 20px 20px 20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            width: '300px',
            transform: 'translate(10%, -50%)',
            transition: 'opacity 1s ease-in-out',
            opacity: hover2 ? 1 : 0,
          }}
        >
          <h4>Occipital bone</h4>
          The occipital bone is an unpaired bone which covers the back of the head (occiput). It makes up a large portion of the basilar part of the neurocranium and entirely houses the cerebellum. <br /><br />

It is the only cranial bone to articulate with the cervical spine. Besides this joint, it articulates with many other bones of the skull. Because of that, the occipital bone is described in terms of separate parts which are: the basilar part, squamous part, lateral parts (placed laterally to the foramen magnum).
        </div>
      </Html>

      <Html position={target3.toArray()}>
        <div
          className="dot3"
          style={{
            width: '20px',
            height: '20px',
            backgroundColor: 'red',
            borderRadius: '50%',
            border: '4px solid white', // Add a white stroke to the dot
            opacity: hover3 ? 1 : 0.2,
            transition: 'opacity 1s ease-in-out',
          }}
          onMouseEnter={() => setHover3(true)}
        />

        <div
          className="text3"
          style={{
            marginLeft: '10px', // Adjust this as needed
            backgroundColor: 'rgba(0, 0, 0, 0.4)', // Glass-like background
            padding: '1px 20px 20px 20px',
            borderRadius: '10px',
            backdropFilter: 'blur(10px)',
            width: '300px',
            transform: 'translate(10%, -50%)',
            transition: 'opacity 1s ease-in-out',
            opacity: hover3 ? 1 : 0,
          }}
        >
          <h4>Mandible</h4>
          The mandible is the largest bone of the fascial skeleton (viscerocranium).
           Besides the bones of the middle ear, the mandible is the only mobile bone in the skull.
            Unlike other bones of the skull, the mandible doesn’t articulate with the surrounding bones via sutures,
             but rather via a synovial joint called the temporomandibular joint. This joint allows the mandible 
             to be attached to the skull while at the same time being capable of producing various translatory 
             and rotatory movements. These movements allow complex actions like chewing and speaking.<br /><br />


        </div>
      </Html>
    </>
  );
}
