import { scene } from '../scene'

let glassShatterShape = new GLTFShape('models/glass_shattered.glb')
let glassBasicShape = new GLTFShape('models/glass_basic.glb')

@Component('ShatterGlass')
export class ShatterGlass {
  isShattered: boolean = false
  animFraction: number = 0
  speed: number = 1
  index: number = 0

  constructor(_speed: number, _index: number) {
    this.speed = _speed
    this.index = _index
  }
}

export class GlassController {
  glassWindows: Entity[]
  glassWindowsBroken: Entity[]

  constructor() {
    //this.glassWindows = []
    this.glassWindowsBroken = []

    this.addGlassPlanes(
      new Vector3(
        scene.venueCenter.x,
        scene.venueCenter.y + 2.35,
        scene.venueCenter.z
      ),
      16.8
    )
  }

  addGlassPlanes(center: Vector3, radius: number) {
    //DUMMY SHAPE UNDERGROUND
    let glassBrokenDummy = new Entity()
    glassBrokenDummy.addComponent(
      new Transform({
        position: new Vector3(25, -10, 25),
        scale: new Vector3(0.11, 0.1, 0),
      })
    )
    glassBrokenDummy.addComponent(glassShatterShape)
    engine.addEntity(glassBrokenDummy)

    // add venue windows
    for (let i = 0; i < 16; i++) {
      let angle = (360 / 16) * i + 360 / 32

      let glassBroken = new Entity()
      glassBroken.addComponent(
        new Transform({
          position: center.add(
            Vector3.Backward()
              .rotate(Quaternion.Euler(0, angle, 0))
              .multiplyByFloats(radius, radius, radius)
          ),
          rotation: Quaternion.Euler(0, angle, 0),
          scale: new Vector3(1, 1, 0),
        })
      )

      glassBroken.addComponent(glassBasicShape)
      glassBroken.addComponent(new ShatterGlass(Math.random() + 0.6, i))
      glassBroken.addComponent(
        new OnPointerDown(
          (e) => {
            this.shatterGlass(i)
          },
          { distance: 4, hoverText: 'Break Window' }
        )
      )
      engine.addEntity(glassBroken)

      this.glassWindowsBroken.push(glassBroken)
    }
  }

  rebuildGlasses(glass: Entity) {
    let group = engine.getComponentGroup(ShatterGlass, Transform)

    for (let entity of group.entities) {
      entity.getComponent(Transform).position.y = -10
      entity.addComponentOrReplace(glassBasicShape)
    }

    for (let i = 0; i < this.glassWindows.length; i++) {
      this.glassWindows[i].getComponent(Transform).position.y =
        scene.venueCenter.y + 2.35
    }
  }

  shatterGlasses() {
    for (let i = 0; i < this.glassWindowsBroken.length; i++) {
      this.shatterGlass(i)
    }
  }

  shatterGlass(_index: number) {
    this.glassWindowsBroken[_index].getComponent(
      ShatterGlass
    ).isShattered = true
    this.glassWindowsBroken[_index].getComponent(Transform).position.y =
      scene.venueCenter.y + 2.35
    this.glassWindowsBroken[_index].addComponentOrReplace(glassShatterShape)
  }
}

class glassBreakSystem {
  group = engine.getComponentGroup(ShatterGlass, Transform)

  update(dt: number) {
    for (let entity of this.group.entities) {
      const transform = entity.getComponent(Transform)
      const glassInfo = entity.getComponent(ShatterGlass)

      if (glassInfo.isShattered) {
        if (glassInfo.animFraction < 3) {
          glassInfo.animFraction += glassInfo.speed * dt
          transform.scale.z = Math.sqrt(glassInfo.animFraction)
        } else {
          //entity.getComponent(GLTFShape).visible = false
          glassInfo.isShattered = false
          glassInfo.animFraction = 3
        }
      } else {
        if (glassInfo.animFraction > 0) {
          glassInfo.animFraction -= glassInfo.speed * dt
          transform.scale.z = Math.sqrt(glassInfo.animFraction)
        } else {
          //entity.getComponent(GLTFShape).visible = false
          glassInfo.animFraction = 0
          entity.addComponentOrReplace(glassBasicShape)
          entity.getComponent(Transform).scale.z = 1
        }
      }
    }
  }
}
engine.addSystem(new glassBreakSystem())
