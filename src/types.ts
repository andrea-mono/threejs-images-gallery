import { Material, Object3D } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export interface IDebug {
    objects: Record<string, Object3D>
    controls: OrbitControls
}

export interface IDebugData {
    showPerformance: boolean
    wireframe: boolean
    visible: boolean
    resetCameraControls: (() => void) | null
}

export interface ICube {
    material?: Material
}
