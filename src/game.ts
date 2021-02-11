import { scene } from './modules/scene'
import { spawnTables } from './modules/tables'
import * as utils from '@dcl/ecs-scene-utils'
import { movePlayerTo } from '@decentraland/RestrictedActions'
import { initiateVJUI } from './modules/adminVJ'
import * as ui from '@dcl/ui-scene-utils'
import { NPC } from '@dcl/npc-scene-utils'
import { elf1Intro } from './modules/dialog'
import { checkTime } from './modules/showPlaying'

let shroomShape = new GLTFShape('models/shroom_building.glb')

let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({ position: scene.center }))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)

//engine.addSystem( new glassBreakSystem())

// let chairReflect1 = new Entity()
// chairReflect1.addComponent(new Transform({position: new Vector3(scene.venueCenter.x-2.8, scene.venueCenter.y-0.0 , scene.venueCenter.z-8.9)}))
// chairReflect1.addComponent(chairReflectShape)
// chairReflect1.addComponent(new Billboard(false,true, false))
// engine.addEntity(chairReflect1)

spawnTables()

initiateVJUI()

// Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   log(
//     `{ position: new Vector3(`,
//     Camera.instance.position.x,
//     ',',
//     Camera.instance.position.y,
//     ',',
//     Camera.instance.position.z,
//     `) },`
//   )
// })

export let elf1 = new NPC(
  { position: new Vector3(28, 0, 32), scale: new Vector3(6, 6, 6) },
  'models/ElfBell.glb',
  () => {
    elf1.talk(elf1Intro)
    elf1.playAnimation(`Greet`, true, 2.17)
  },
  {
    idleAnim: `Idle_01`,
    faceUser: true,
    darkUI: true,
    onlyETrigger: true,
  }
)

export let elf2 = new NPC(
  { position: new Vector3(40, 0, 37), scale: new Vector3(6, 6, 6) },
  'models/ElfGirl.glb',
  () => {
    elf2.talk(elf1Intro)
    elf2.playAnimation(`Greet`, true, 2.17)
  },
  {
    idleAnim: `Idle_01`,
    faceUser: true,
    darkUI: true,
    onlyETrigger: true,
  }
)

// start default show
checkTime()
