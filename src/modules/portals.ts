import { scene } from "./scene"
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { TriggerBox } from "./utilities/triggerBox"
import { player } from "./player"



let portalEntranceShape = new GLTFShape("models/portal_entrance.glb")

let portalEntrance = new Entity()
portalEntrance.addComponent(new Transform({ 
    position: new Vector3(scene.center.x - 6.634, scene.center.y+ 3.321,  scene.center.z)}))
portalEntrance.addComponent(portalEntranceShape)
portalEntrance.addComponent(new OnPointerDown( (e)=>{
  movePlayerTo({ x: 68, y: 32, z: 32 })
},{hoverText: "Enter the Rabbit Hole"}))
engine.addEntity(portalEntrance)

let portalTrigger = new TriggerBox(
    new Vector3(scene.center.x - 4.5, scene.center.y+ 3.321,  scene.center.z),
    new Vector3(4,3,3.3)
    )
engine.addEntity(portalTrigger)


let portalExit = new Entity()
portalExit.addComponent(new Transform({ position: new Vector3(scene.venueCenter.x, scene.venueCenter.y-0.5,  scene.venueCenter.z),
rotation: Quaternion.Euler(0,0,-90),
scale: new Vector3(1,1,1) }))
portalExit.addComponent(portalEntranceShape)
portalExit.addComponent(new OnPointerDown( (e)=>{
  movePlayerTo({ x: 40, y: 3, z: 32 })
},{hoverText: "Exit"}))
engine.addEntity(portalExit)

let portalExitTrigger = new TriggerBox(
    new Vector3(scene.venueCenter.x, scene.venueCenter.y-5,  scene.venueCenter.z),
    new Vector3(3,4,3)
    )
engine.addEntity(portalExitTrigger)


class PortalCheckSystem {

    update(dt:number){

        if(portalTrigger.collide(player.headPos)){
            movePlayerTo({ x: 66, y: 32, z: 32 })
        }
        if(portalExitTrigger.collide(player.headPos)){
            movePlayerTo({ x: 40, y: 3, z: 32 })
        }
    }
}
engine.addSystem(new PortalCheckSystem())
