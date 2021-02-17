import { scene } from './scene'
import { Synced } from './syncable'
import { spawnTables } from './tables'
//import { changeTexture, kittyTexture, dclLogoTexture } from './screenColumns'
// import { SmokeSwirl, startSmoke } from './smoke'
// import { DotLightsController } from './dotLights'
// import { LaserController } from './lasers'
// import { SpiralController } from './spirals'
// import { tvScreenController } from './screenColumns'

let bottlesBottomShape = new GLTFShape('models/bottles_bottom.glb')
let bottlesTopShape = new GLTFShape('models/bottles_top.glb')
let poleShape = new GLTFShape('models/pole.glb')
let logoScreenShape = new GLTFShape('models/logo_screen.glb')

// ADD dance poles
let pole1 = new Entity()
pole1.addComponent(
  new Transform({
    position: new Vector3(
      scene.venueCenter.x - 6.5,
      scene.venueCenter.y + 0.7,
      scene.venueCenter.z + 13.5
    ),
  })
)
pole1.addComponent(poleShape)
engine.addEntity(pole1)

let pole2 = new Entity()
pole2.addComponent(
  new Transform({
    position: new Vector3(
      scene.venueCenter.x - 6.5,
      scene.venueCenter.y + 0.7,
      scene.venueCenter.z - 13.5
    ),
  })
)
pole2.addComponent(poleShape)
engine.addEntity(pole2)

// ADD bar bottles

let bottlesTop = new Entity()
bottlesTop.addComponent(
  new Transform({
    position: new Vector3(scene.center.x, scene.center.y, scene.center.z),
  })
)
bottlesTop.addComponent(bottlesTopShape)
engine.addEntity(bottlesTop)

let bottlesBottom = new Entity()
bottlesBottom.addComponent(
  new Transform({
    position: new Vector3(scene.center.x, scene.center.y, scene.center.z),
  })
)
bottlesBottom.addComponent(bottlesBottomShape)
engine.addEntity(bottlesBottom)

//engine.addSystem( new glassBreakSystem())

// let chairReflect1 = new Entity()
// chairReflect1.addComponent(new Transform({position: new Vector3(scene.venueCenter.x-2.8, scene.venueCenter.y-0.0 , scene.venueCenter.z-8.9)}))
// chairReflect1.addComponent(chairReflectShape)
// chairReflect1.addComponent(new Billboard(false,true, false))
// engine.addEntity(chairReflect1)

spawnTables()

// const input = Input.instance
// input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   //changeTexture(kittyTexture)
//   startSmoke(true)

//   dotLightsControl.show()
//   laserControl.show()
//   spiralControl.showAll()
//   tvScreenController.stretchVideoAcross()
// })

// input.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, true, (e) => {
//   //changeTexture(dclLogoTexture)
//   startSmoke(false)
//   dotLightsControl.hide()
//   laserControl.hide()
//   spiralControl.hideAll()
//   tvScreenController.splitVideoToEach()
// })

// add logo screen above bar
let logoScreen = new Entity()
logoScreen.addComponent(
  new Transform({
    position: new Vector3(
      scene.venueCenter.x - 12.05,
      scene.venueCenter.y + 4.3,
      scene.venueCenter.z
    ),
  })
)
logoScreen.addComponent(logoScreenShape)
engine.addEntity(logoScreen)

// DJ

// export let dj = new Synced(new GLTFShape('models/RAC_NPC.glb'), false, 'idle', {
//   position: new Vector3(77, 29.7, 31.3),
//   rotation: Quaternion.Euler(0, 270, 0),
//   scale: new Vector3(1.5, 1.5, 1.5),
// })
