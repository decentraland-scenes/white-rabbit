import { scene } from './scene'

export let topSwirlShape = new GLTFShape('models/top_swirl.glb')
export let bottomSwirlShape = new GLTFShape('models/bottom_swirl.glb')
export let bottomSwirl2Shape = new GLTFShape('models/bottom_swirl2.glb')
let glassShatterShape = new GLTFShape('models/glass_shattered.glb')
let glassBasicShape = new GLTFShape('models/glass_basic.glb')

export let topSwirl = new Entity()
topSwirl.addComponent(
  new Transform({
    position: new Vector3(
      scene.venueCenter.x,
      scene.venueCenter.y + 6.9,
      scene.venueCenter.z
    ),
  })
)
topSwirl.addComponent(topSwirlShape)
engine.addEntity(topSwirl)

export let bottomSwirl = new Entity()
bottomSwirl.addComponent(
  new Transform({
    position: scene.venueCenter,
    scale: new Vector3(1, 1, 1),
  })
)
bottomSwirl.addComponent(bottomSwirlShape)
engine.addEntity(bottomSwirl)

export let bottomSwirl2 = new Entity()
bottomSwirl2.addComponent(
  new Transform({
    position: scene.venueCenter,
    scale: new Vector3(1, 1, 1),
  })
)
bottomSwirl2.addComponent(bottomSwirl2Shape)
engine.addEntity(bottomSwirl2)
