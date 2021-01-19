import { scene } from "./modules/scene";
import { spawnTables } from "./modules/tables";


let shroomShape = new GLTFShape("models/shroom_building.glb")
let topSwirlShape = new GLTFShape("models/top_swirl.glb")
let bottomSwirlShape = new GLTFShape("models/bottom_swirl.glb")


let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({position: scene.center}))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)

let topSwirl = new Entity()
topSwirl.addComponent(new Transform({position: scene.venueCenter}))
topSwirl.addComponent(topSwirlShape)
engine.addEntity(topSwirl)

let bottomSwirl = new Entity()
bottomSwirl.addComponent(new Transform({position: scene.venueCenter}))
bottomSwirl.addComponent(bottomSwirlShape)
engine.addEntity(bottomSwirl)

// let chairReflect1 = new Entity()
// chairReflect1.addComponent(new Transform({position: new Vector3(scene.venueCenter.x-2.8, scene.venueCenter.y-0.0 , scene.venueCenter.z-8.9)}))
// chairReflect1.addComponent(chairReflectShape)
// chairReflect1.addComponent(new Billboard(false,true, false))
// engine.addEntity(chairReflect1)

spawnTables()