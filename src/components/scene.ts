import { WebGLRenderer, Scene, Group } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { getMainCamera } from '~components/cameras'
import { createCube } from '~components/objects'
import { debug, updateStats } from '~components/debug'
import { axesHelper, gridHelper } from '~utils/helpers'
import { sizes } from '~utils/window'

let aspectRatio = sizes.w / sizes.h
const mainCamera = getMainCamera(aspectRatio)
const cameraGroup = new Group()
const scene = new Scene()
const renderer = new WebGLRenderer({ antialias: true })
const controls = new OrbitControls(mainCamera, renderer.domElement)
const cube = createCube()

function updateCamera() {
    sizes.w = window.innerWidth
    sizes.h = window.innerHeight
    aspectRatio = sizes.w / sizes.h

    mainCamera.aspect = aspectRatio
    mainCamera.updateProjectionMatrix()

    renderer.setSize(sizes.w, sizes.h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
}

export function init() {
    const objects = { cube }

    document.getElementById('app')?.appendChild(renderer.domElement)
    renderer.setSize(sizes.w, sizes.h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    controls.enableDamping = true
    controls.maxDistance = 50
    controls.minDistance = 5

    axesHelper.position.y = 0.01
    gridHelper.renderOrder = 1

    mainCamera.position.set(0, 10, 20)
    cameraGroup.add(mainCamera)
    cameraGroup.rotation.set(0, Math.PI * 0.25, 0)

    cube.position.set(3, 0.5, 0)
    mainCamera.lookAt(cube.position)
    controls.saveState()

    scene.add(cube)
    scene.add(axesHelper)
    scene.add(gridHelper)

    debug({
        objects,
        controls,
    })

    window.addEventListener('resize', updateCamera)
}

export function animate() {
    window.requestAnimationFrame(animate)
    renderer.render(scene, mainCamera)
    controls.update()
    updateStats()
}
