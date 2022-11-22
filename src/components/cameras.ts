import { PerspectiveCamera } from 'three'

/**
 * Main camera
 */

export const getMainCamera = (aspectRatio: number) =>
    new PerspectiveCamera(45, aspectRatio, 0.1, 1000)
