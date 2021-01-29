import { scene } from "./modules/scene";
import * as ui from '../node_modules/@dcl/ui-utils/index'
import utils from '../node_modules/decentraland-ecs-utils/index'


let shroomShape = new GLTFShape("models/shroom_building.glb")

let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({ position: scene.center }))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)



