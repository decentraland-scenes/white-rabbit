import { scene } from './scene'

//let arcadeDCLShape = new GLTFShape("models/arcadeCabinetDecentraland.glb")
let arcadeDCLShape = new GLTFShape('models/arcadeCabinetEthereum.glb')

// Left
let arcadePos1 = Vector3.Forward()
  .rotate(Quaternion.Euler(0, 24, 0))
  .multiplyByFloats(15, 15, 15)
let arcadePos2 = Vector3.Forward()
  .rotate(Quaternion.Euler(0, 15, 0))
  .multiplyByFloats(15, 15, 15)

// Right
let arcadePos3 = Vector3.Forward()
  .rotate(Quaternion.Euler(0, 180 - 24, 0))
  .multiplyByFloats(15, 15, 15)
let arcadePos4 = Vector3.Forward()
  .rotate(Quaternion.Euler(0, 180 - 15, 0))
  .multiplyByFloats(15, 15, 15)

let arcadeDCL = new Entity()
arcadeDCL.addComponent(
  new Transform({
    position: arcadePos1.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 24, 0),
  })
)
arcadeDCL.addComponent(arcadeDCLShape)
engine.addEntity(arcadeDCL)

let arcadeDCL2 = new Entity()
arcadeDCL2.addComponent(
  new Transform({
    position: arcadePos2.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 15, 0),
  })
)
arcadeDCL2.addComponent(arcadeDCLShape)
engine.addEntity(arcadeDCL2)

let arcadeDCL3 = new Entity()
arcadeDCL3.addComponent(
  new Transform({
    position: arcadePos3.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 180 - 24, 0),
  })
)
arcadeDCL3.addComponent(arcadeDCLShape)
engine.addEntity(arcadeDCL3)

let arcadeDCL4 = new Entity()
arcadeDCL4.addComponent(
  new Transform({
    position: arcadePos4.add(scene.venueCenter),
    rotation: Quaternion.Euler(0, 180 - 15, 0),
  })
)
arcadeDCL4.addComponent(arcadeDCLShape)
engine.addEntity(arcadeDCL4)
