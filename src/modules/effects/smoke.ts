import { isExpressionWithTypeArguments } from '../../../node_modules/typescript/lib/typescript'
import { scene } from '../scene'

let bottomSwirlShape = new GLTFShape('models/bottom_swirl.glb')
let bottomSwirl2Shape = new GLTFShape('models/bottom_swirl2.glb')
let ceilingFanShape = new GLTFShape('models/ceiling_fan.glb')
let ceilingFan2Shape = new GLTFShape('models/ceiling_fan2.glb')

@Component('SmokeSwirl')
export class SmokeSwirl {
  active: boolean = false
  scale: number = 0

  setActive(_active: boolean) {
    this.active = _active
  }
}

let ceilingFan = new Entity()
ceilingFan.addComponent(
  new Transform({
    position: scene.venueCenter,
    scale: new Vector3(1, 1, 1),
  })
)
ceilingFan.addComponent(ceilingFanShape)
engine.addEntity(ceilingFan)

let ceilingFan2 = new Entity()
ceilingFan2.addComponent(
  new Transform({
    position: scene.venueCenter,
    scale: new Vector3(1, 1, 1),
  })
)
ceilingFan2.addComponent(ceilingFan2Shape)
engine.addEntity(ceilingFan2)

export class SmokeController {
  bottomSwirl: Entity
  bottomSwirl2: Entity

  constructor() {
    this.bottomSwirl = new Entity()
    this.bottomSwirl.addComponent(
      new Transform({
        position: scene.venueCenter,
        scale: new Vector3(0, 1, 0),
      })
    )
    this.bottomSwirl.addComponent(bottomSwirlShape)
    this.bottomSwirl.addComponent(new SmokeSwirl())
    engine.addEntity(this.bottomSwirl)

    this.bottomSwirl2 = new Entity()
    this.bottomSwirl2.addComponent(
      new Transform({
        position: scene.venueCenter,
        scale: new Vector3(0, 1, 0),
      })
    )
    this.bottomSwirl2.addComponent(bottomSwirl2Shape)
    this.bottomSwirl2.addComponent(new SmokeSwirl())
    engine.addEntity(this.bottomSwirl2)
  }

  startSmoke() {
    this.bottomSwirl.getComponent(SmokeSwirl).setActive(true)
    this.bottomSwirl2.getComponent(SmokeSwirl).setActive(true)
  }

  stopSmoke() {
    this.bottomSwirl.getComponent(SmokeSwirl).setActive(false)
    this.bottomSwirl2.getComponent(SmokeSwirl).setActive(false)
  }
}

class smokeSystem {
  elapsedTime: number = 0
  animFraction: number = 0
  group = engine.getComponentGroup(SmokeSwirl, Transform)

  update(dt: number) {
    this.elapsedTime += dt

    for (let entity of this.group.entities) {
      const info = entity.getComponent(SmokeSwirl)
      const transform = entity.getComponent(Transform)

      if (info.active) {
        if (info.scale < 1) {
          entity.getComponent(GLTFShape).visible = true

          info.scale += 0.5 * dt
          transform.scale.set(info.scale, 1, info.scale)
        } else {
          info.scale = 1
          transform.scale.set(1, 1, 1)
        }
      } else {
        if (info.scale > 0) {
          info.scale -= 0.5 * dt
          transform.scale.set(1, info.scale, 1)
        } else {
          info.scale = 0
          transform.scale.set(0, info.scale, 0)
          entity.getComponent(GLTFShape).visible = false
        }
      }
    }
  }
}
engine.addSystem(new smokeSystem())
