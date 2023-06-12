import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Skull from './Skull.jsx'
import { useFrame } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas>
        <Skull/>
    </Canvas>
)