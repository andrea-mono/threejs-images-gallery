import { WebGLRenderer, Scene, Group } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
import GUI from 'lil-gui'
import { getMainCamera } from '~components/cameras'
import { createCube } from '~components/objects'
import { axesHelper } from '~utils/helpers'
import { sizes } from '~utils/window'
import { defaultMaterial } from '~components/materials'

const aspectRatio = sizes.w / sizes.h
const mainCamera = getMainCamera(aspectRatio)
const cameraGroup = new Group()
const scene = new Scene()
const renderer = new WebGLRenderer({ antialias: true })
const stats = Stats()
const gui = new GUI()
const cube = createCube()

const data = {
    showPerformance: false,
    wireframe: false,
    visible: true,
}

function debug() {
    let mounted = false

    const setCubeVisibility = (value: boolean) => (cube.visible = value)
    const setMaterialWireframe = (value: boolean) =>
        (defaultMaterial.wireframe = value)

    const toggleStats = (value: boolean) => {
        if (!document.body.contains(stats.dom) && !mounted) {
            mounted = true
            return
        }
        if (!value) {
            document.body.removeChild(stats.dom)
            return
        }
        document.body.appendChild(stats.dom)
    }

    gui.add(data, 'showPerformance').onChange(toggleStats)

    const cubeFolder = gui.addFolder('Cube')
    cubeFolder.add(data, 'visible').onChange(setCubeVisibility)
    cubeFolder.add(data, 'wireframe').onChange(setMaterialWireframe)

    setCubeVisibility(data.visible)
    setMaterialWireframe(data.wireframe)
    toggleStats(data.showPerformance)
}

export function init() {
    document.getElementById('app')?.appendChild(renderer.domElement)
    renderer.setSize(sizes.w, sizes.h)
    renderer.setPixelRatio(window.devicePixelRatio)

    mainCamera.position.set(0, 2, 15)
    cameraGroup.add(mainCamera)
    cameraGroup.rotation.set(0, Math.PI * 0.25, 0)

    cube.position.set(3, 0.5, 0)
    mainCamera.lookAt(cube.position)

    scene.add(cube)
    scene.add(axesHelper)
    debug()
}

export function animate() {
    window.requestAnimationFrame(animate)
    renderer.render(scene, mainCamera)
    if (data.showPerformance) stats.update()
}
