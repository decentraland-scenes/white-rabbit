import { Arcade } from "./arcades/gameObjects/arcade"
import { loadPlayer, unloadPlayer } from "./arcades/player"
import { loadEthereumLevel, loadEthereumBricks, unloadEthereumBricks } from "./arcades/gameLogic/ethereumLevel"
import { GameManager } from "./arcades/gameManager"
import * as utils from "@dcl/ecs-scene-utils"
import { scene } from "./scene"

// Ethereum arcade cabinets
const arcadeEthereumShape = new GLTFShape("models/arcadeCabinetEthereum.glb")
// Left
let arcadePos1 = Vector3.Forward().rotate(Quaternion.Euler(0, 24, 0)).multiplyByFloats(15, 15, 15)
let arcadePos2 = Vector3.Forward().rotate(Quaternion.Euler(0, 15, 0)).multiplyByFloats(15, 15, 15)

// Right
let arcadePos3 = Vector3.Forward().rotate(Quaternion.Euler(0, 180 - 24, 0)).multiplyByFloats(15, 15, 15)
let arcadePos4 = Vector3.Forward().rotate(Quaternion.Euler(0, 180 - 15, 0)).multiplyByFloats(15, 15, 15)

// Ethereum arcade positions and triggers
const arcadeEthereumPos: Transform[] = [
  new Transform({
    position: arcadePos1.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 24, 0),
  }),
  new Transform({
    position: arcadePos2.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 15, 0),
  }),
  new Transform({
    position: arcadePos3.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 180 - 24, 0),
  }),
  new Transform({
    position: arcadePos4.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 180 - 15, 0),
  }),
]
// ISSUE: These ecs-utils triggers can't rotate but work fine for now...
const arcadeEthereumTriggerPos: Vector3[] = [new Vector3(-0.33, 2, -0.5), new Vector3(-0.33, 2, -0.5), new Vector3(-0.33, 2, 0.5), new Vector3(-0.33, 2, 0.5)]

// Ethereum arcade cabinet
for (let i = 0; i < arcadeEthereumPos.length; i++) {
  const arcadeCabinetEthereum = new Arcade(arcadeEthereumShape, arcadeEthereumPos[i])

  // Breakout ethereum
  const ethereumGameTransform = new Entity()
  ethereumGameTransform.addComponent(new Transform({ position: new Vector3(-0.48, 1.38, -0.155) }))
  ethereumGameTransform.getComponent(Transform).scale.setAll(0.03)
  ethereumGameTransform.getComponent(Transform).rotate(Vector3.Left(), 75)
  ethereumGameTransform.setParent(arcadeCabinetEthereum)
  let arcadeCabinetEthereumTrigger = new utils.TriggerBoxShape(new Vector3(1.5, 3, 3), arcadeEthereumTriggerPos[i])
  loadEthereumLevel(ethereumGameTransform)

  arcadeCabinetEthereum.addComponent(
    new utils.TriggerComponent(arcadeCabinetEthereumTrigger, {
      onCameraEnter: () => {
        if (!GameManager.hasGameLoaded) {
          loadEthereumBricks(ethereumGameTransform)
          loadPlayer(ethereumGameTransform, arcadeCabinetEthereum)
        }
      },
      onCameraExit: () => {
        if (GameManager.hasGameLoaded) {
          unloadEthereumBricks()
          unloadPlayer()
        }
      },
      enableDebug: false,
    })
  )
}
