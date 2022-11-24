import { defaultMaterial } from '~components/materials'
import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module'
import { IDebugData, IDebug } from '~types'

const gui = new GUI()
const stats = Stats()

export const data: IDebugData = {
    showPerformance: true,
    wireframe: false,
    visible: true,
    resetCameraControls: null,
}

export function debug({ objects, controls }: IDebug) {
    const setCubeVisibility = (value: boolean) => (objects.cube.visible = value)
    const setMaterialWireframe = (value: boolean) =>
        (defaultMaterial.wireframe = value)

    const toggleStats = (value: boolean) => {
        if (!document.body.contains(stats.dom) && !data.showPerformance) return
        if (!value) {
            document.body.removeChild(stats.dom)
            return
        }
        document.body.appendChild(stats.dom)
    }

    const cubeFolder = gui.addFolder('Cube')
    cubeFolder.add(data, 'wireframe').onChange(setMaterialWireframe)
    cubeFolder.add(data, 'visible').onChange(setCubeVisibility)

    data.resetCameraControls = () => controls.reset()
    gui.add(data, 'showPerformance').onChange(toggleStats)
    gui.add(data, 'resetCameraControls')

    setMaterialWireframe(data.wireframe)
    setCubeVisibility(data.visible)
    toggleStats(data.showPerformance)
}

export const updateStats = () => {
    if (data.showPerformance) stats.update()
}
