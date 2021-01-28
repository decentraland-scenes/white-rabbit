import { scene } from "./modules/scene";
import * as ui from '../node_modules/@dcl/ui-utils/index'
import utils from '../node_modules/decentraland-ecs-utils/index'
import { movePlayerTo } from '@decentraland/RestrictedActions'


let shroomShape = new GLTFShape("models/shroom_building.glb")
let portalEntranceShape = new GLTFShape("models/portal_entrance.glb")

let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({ position: scene.center }))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)


let portalEntrance = new Entity()
portalEntrance.addComponent(new Transform({ position: new Vector3(scene.center.x - 6.634, scene.center.y+ 3.321,  scene.center.z)}))
portalEntrance.addComponent(portalEntranceShape)
portalEntrance.addComponent(new OnPointerDown( (e)=>{
  movePlayerTo({ x: 66, y: 32, z: 32 })
},{hoverText: "Enter"}))
engine.addEntity(portalEntrance)

let portalExit = new Entity()
portalExit.addComponent(new Transform({ position: new Vector3(scene.venueCenter.x, scene.venueCenter.y-1.5,  scene.venueCenter.z),
rotation: Quaternion.Euler(0,0,-90) }))
portalExit.addComponent(portalEntranceShape)
portalExit.addComponent(new OnPointerDown( (e)=>{
  movePlayerTo({ x: 40, y: 3, z: 32 })
},{hoverText: "Exit"}))
engine.addEntity(portalExit)

