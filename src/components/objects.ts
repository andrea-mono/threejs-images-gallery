import * as THREE from 'three'
import { boxGeometry } from '~components/geometries'
import { defaultMaterial } from '~components/materials'
import { ICube } from '~types'

/**
 * Objects
 */

export function createCube(parameters: ICube = {}) {
    const { material = defaultMaterial } = parameters
    return new THREE.Mesh(boxGeometry, material)
}
