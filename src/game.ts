import { scene } from './modules/scene'
import { spawnTables } from './modules/tables'
import { spawnEnvironment } from './modules/environment'

import { movePlayerTo } from '@decentraland/RestrictedActions'
import { initiateVJUI } from './modules/adminVJ'

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

spawnEnvironment()
spawnTables()

initiateVJUI()

Input.instance.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
  log(
    `{ position: new Vector3(`,
    Camera.instance.position.x,
    ',',
    Camera.instance.position.y,
    ',',
    Camera.instance.position.z,
    `) },`
  )
})

// start default light show
checkTime()
