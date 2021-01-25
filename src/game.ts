import { scene } from "./modules/scene";

let shroomShape = new GLTFShape("models/shroom_building.glb")

let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({position: scene.center}))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)
