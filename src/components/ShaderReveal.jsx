import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { shaderMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import gsap from "gsap";

// --- GLSL Shaders ---

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform sampler2D uTexture;
  uniform sampler2D uMask;
  uniform float uProgress;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 uv = vUv;
    
    // Sample the smoke mask
    // We can perturb the UVs for the mask slightly with noise to make it more alive
    float noiseVal = snoise(uv * 2.0 + uTime * 0.1);
    vec2 maskUv = uv + noiseVal * 0.05;
    vec4 maskColor = texture2D(uMask, maskUv);
    
    // Use the red channel of the mask (assuming grayscale)
    float maskVal = maskColor.r; 
    
    // Combine procedural noise with texture mask for detail
    float finalMask = maskVal + noiseVal * 0.1;

    // Calculate reveal factor
    // Map progress to cover the full range of mask values
    float threshold = (uProgress * 1.5) - 0.2; 
    
    // Smooth edge for the reveal
    float visibility = 1.0 - smoothstep(threshold - 0.15, threshold + 0.15, finalMask);
    
    // Texture color
    vec4 texColor = texture2D(uTexture, uv);
    
    // Edge effect (The "Color thrown" part)
    // The edge is where visibility is transitioning
    float edge = smoothstep(threshold - 0.15, threshold, finalMask) - smoothstep(threshold, threshold + 0.15, finalMask);
    
    // Boost the edge
    vec3 edgeColor = uColor * 2.5;
    
    // Final color mixing
    vec3 col = mix(edgeColor, texColor.rgb, visibility);
    
    // Add some "smoke" density to the alpha
    float finalAlpha = visibility;
    
    // Apply the edge color more strongly
    col = mix(col, edgeColor, edge * 0.8);

    gl_FragColor = vec4(col, finalAlpha * texColor.a);
    
    if (finalAlpha < 0.01) discard;
  }
`;

// --- Shader Material Definition ---

const RevealMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture(),
        uMask: new THREE.Texture(),
        uProgress: 0,
    },
    vertexShader,
    fragmentShader
);

extend({ RevealMaterial });

// --- Component ---

const Scene = ({ image, color, isActive }) => {
    const materialRef = useRef();
    // Load both the main image and the smoke mask
    const [texture, mask] = useTexture([image, "/smoke_mask.png"]);

    // Animate uniforms
    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta;
        }
    });

    // Trigger reveal animation when isActive becomes true
    React.useEffect(() => {
        if (materialRef.current) {
            if (isActive) {
                // Reset and animate
                materialRef.current.uProgress = 0;
                gsap.to(materialRef.current, {
                    uProgress: 1.0,
                    duration: 2.5,
                    ease: "power2.inOut",
                    delay: 0.5, // Slight delay to wait for panel expansion
                });
            } else {
                // Reset when closed
                materialRef.current.uProgress = 0;
            }
        }
    }, [isActive, image]);

    return (
        <mesh>
            <planeGeometry args={[5, 5, 32, 32]} />
            <revealMaterial
                ref={materialRef}
                uTexture={texture}
                uMask={mask}
                uColor={new THREE.Color(color)}
                transparent
            />
        </mesh>
    );
};

const ShaderReveal = ({ image, color, isActive }) => {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 3], fov: 75 }}>
                <React.Suspense fallback={null}>
                    <Scene image={image} color={color} isActive={isActive} />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default ShaderReveal;
