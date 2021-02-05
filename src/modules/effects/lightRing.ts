import { scene } from "../scene";

let lightRingShape = new GLTFShape("models/light_ring.glb")


let lightRing = new Entity()
lightRing.addComponent(new Transform({
    position: scene.venueCenter,
    scale:new Vector3(1,1,1)
}))
lightRing.addComponent(lightRingShape)
engine.addEntity(lightRing)