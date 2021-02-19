import { scene } from './scene'
import {
  changeTexture,
  kittyTexture,
  dclLogoTexture,
} from './effects/screenColumns'
import { SmokeController } from './effects/smoke'
import { DotLightsController } from './effects/dotLights'
import { LaserController } from './effects/lasers'
import { SpiralController } from './effects/spirals'
import { tvScreenController } from './effects/screenColumns'
import { GlassController } from './effects/glassWindows'
import { transform } from '../../node_modules/typescript/lib/typescript'
import { freeMode } from './showPlaying'
import { Action, runAction } from './eventScripts'

let dashboardShape = new GLTFShape('models/dashboard.glb')
let onButtonShape = new GLTFShape('models/on_button.glb')
let offButtonShape = new GLTFShape('models/off_button.glb')
let plusButtonShape = new GLTFShape('models/plus_button.glb')
let minusButtonShape = new GLTFShape('models/minus_button.glb')

// -- ADD MOVING DOTS LIGHTING EFFECT ON FLOOR
// .show - shows all floor lights
// .hide - hides all floor lights
// .activatePulse - turns pulsating scaling on
// .deactivatePulse - turns pulsating scaling on
export let dotLightsControl = new DotLightsController()

// -- ADD LASER FAN EFFECT
// .show
// .hide
// .rotate(bool) - enable/disable rotation
// .changeRotationSpeedBy(number) - increase/decrease rotation speed by number (angles/second) typically 10/-10 is a good increment
// activateFanPulse(bool) - turns on/off the pulsating effect of the lasers width
export let laserControl = new LaserController()

// -- ADD SPIRAL CEILING EFFECTS
// .showAll
// .hideAll
// .showFirst - show only the first of the two spirals
// .hideFirst
// .showSecond- show only the second one of the two spirals
// .hideSecond
export let spiralControl = new SpiralController()

// -- ADD WINDOW BREAK EFFECT
// .shatterGlasses() - break all windows simultaneously
// .shatterGlass(index:number) - break a specific window identified by index num
export let windowControl = new GlassController()

// -- ADD CENTER SMOKE EFFECT
// .startSmoke
// .stopSmoke
export let smokeControl = new SmokeController()

// -- CONTROLS THE TV SCREENS ON STAGE
// .stretchVideoAcross() - shows one big video stretching across all screens
// .splitVideoToEach() - each TV shows the video inidividually
tvScreenController.stretchVideoAcross()

export enum ButtonType {
  ON = 0,
  OFF = 1,
  PLUS = 2,
  MINUS = 3,
}

interface NoArgCallBack {
  (): void
}

class EffectUISection extends Entity {
  title: Entity
  titleText: TextShape

  constructor(_pos: Vector3, _title: string, _width: number) {
    super()
    this.addComponent(
      new Transform({
        position: _pos,
      })
    )

    this.title = new Entity()
    this.titleText = new TextShape(_title)
    this.titleText.hTextAlign = 'center'

    this.title.addComponent(
      new Transform({
        position: new Vector3(_width / 2, 0.05, 0.15),
        rotation: Quaternion.Euler(90, 0, 0),
        scale: new Vector3(0.1, 0.1, 0.1),
      })
    )
    this.title.addComponent(this.titleText)
    this.title.setParent(this)
  }

  addButton(
    _pos: Vector3,
    _scale: number,
    _type: ButtonType,
    callback: NoArgCallBack
  ) {
    let button = new Entity()
    button.addComponent(
      new Transform({
        position: new Vector3(_pos.x, _pos.y, _pos.z),
        scale: new Vector3(_scale, _scale, _scale),
      })
    )

    switch (_type) {
      case ButtonType.ON: {
        button.addComponent(onButtonShape)
        break
      }
      case ButtonType.OFF: {
        button.addComponent(offButtonShape)
        break
      }
      case ButtonType.PLUS: {
        button.addComponent(plusButtonShape)
        break
      }
      case ButtonType.MINUS: {
        button.addComponent(minusButtonShape)
        break
      }
    }

    button.addComponent(
      new OnPointerDown((e) => {
        callback()
      })
    )
    button.setParent(this)
  }
}

class EffectDashboard {
  effectUIRoot: Entity
  dashboardMesh: Entity
  uiSections: EffectUISection[]

  constructor(_transform: TranformConstructorArgs) {
    this.effectUIRoot = new Entity()
    this.effectUIRoot.addComponent(
      new Transform({
        position: new Vector3(
          _transform.position.x,
          _transform.position.y,
          _transform.position.z
        ),
        rotation: _transform.rotation,
        scale: _transform.scale,
      })
    )
    this.effectUIRoot.getComponent(Transform).rotate(Vector3.Right(), -60)

    this.dashboardMesh = new Entity()
    this.dashboardMesh.addComponent(
      new Transform({
        scale: new Vector3(4, 1, 1),
        rotation: Quaternion.Euler(0, 0, 0),
      })
    )
    this.dashboardMesh.addComponent(dashboardShape)
    this.dashboardMesh.setParent(this.effectUIRoot)

    this.uiSections = []

    let uiAnchorTop = 0.25
    let uiAnchorLeft = -1.8
    let uiSectionStep = 0.8
    let mainButtonSize = 3
    let subButtonSize = 2

    // ADD SMOKE CONTROLS
    let smokeSection = new EffectUISection(
      new Vector3(uiAnchorLeft, 0, uiAnchorTop),
      'SMOKE',
      0.5
    )
    smokeSection.addButton(
      new Vector3(0.1, 0, 0),
      subButtonSize,
      ButtonType.ON,
      () => {
        if (!freeMode) {
          runAction(Action.SMOKE)
        }
      }
    )
    smokeSection.addButton(
      new Vector3(0.4, 0, 0),
      subButtonSize,
      ButtonType.OFF,
      () => {
        if (!freeMode) {
          runAction(Action.SMOKESTOP)
        }
      }
    )
    smokeSection.setParent(this.effectUIRoot)
    this.uiSections.push(smokeSection)

    // ADD LASER MAIN CONTROLS
    let laserSection = new EffectUISection(
      new Vector3(uiAnchorLeft + uiSectionStep, 0, uiAnchorTop),
      'LASERS',
      0.75
    )
    laserSection.addButton(
      new Vector3(0.2, 0, 0),
      subButtonSize,
      ButtonType.ON,
      () => {
        if (!freeMode) {
          runAction(Action.LASERSHOW)
        }
      }
    )
    laserSection.addButton(
      new Vector3(0.45, 0, 0),
      subButtonSize,
      ButtonType.OFF,
      () => {
        if (!freeMode) {
          runAction(Action.LASERHIDE)
        }
      }
    )
    laserSection.setParent(this.effectUIRoot)
    this.uiSections.push(laserSection)

    // LASER SPEED CONTROLS
    let laserSpeedSection = new EffectUISection(
      new Vector3(uiAnchorLeft + uiSectionStep, 0, uiAnchorTop - 0.3),
      'ROT SPEED',
      0.75
    )
    laserSpeedSection.addButton(
      new Vector3(0.15, 0, 0),
      subButtonSize,
      ButtonType.PLUS,
      () => {
        if (!freeMode) {
          runAction(Action.LASERROTFAST)
        }
      }
    )
    laserSpeedSection.addButton(
      new Vector3(0.3, 0, 0),
      subButtonSize,
      ButtonType.MINUS,
      () => {
        if (!freeMode) {
          runAction(Action.LASERROTSLOW)
        }
      }
    )
    laserSpeedSection.addButton(
      new Vector3(0.6, 0, 0),
      subButtonSize,
      ButtonType.OFF,
      () => {
        if (!freeMode) {
          runAction(Action.LASERROTOFF)
        }
      }
    )
    laserSpeedSection.setParent(this.effectUIRoot)
    this.uiSections.push(laserSpeedSection)

    // LASER SCALE PULSE CONTROLS
    let laserPulseSection = new EffectUISection(
      new Vector3(uiAnchorLeft + uiSectionStep, 0, uiAnchorTop - 0.6),
      'PULSE',
      0.75
    )
    laserPulseSection.addButton(
      new Vector3(0.2, 0, 0),
      subButtonSize,
      ButtonType.ON,
      () => {
        if (!freeMode) {
          runAction(Action.LASERPULSE)
        }
      }
    )
    laserPulseSection.addButton(
      new Vector3(0.45, 0, 0),
      subButtonSize,
      ButtonType.OFF,
      () => {
        if (!freeMode) {
          runAction(Action.LASERPULSEOFF)
        }
      }
    )

    laserPulseSection.setParent(this.effectUIRoot)
    this.uiSections.push(laserPulseSection)

    engine.addEntity(this.effectUIRoot)
  }
}

let dashboard = new EffectDashboard({
  position: new Vector3(
    scene.venueCenter.x - 13,
    scene.venueCenter.y + 1,
    scene.venueCenter.z
  ),
  rotation: Quaternion.Euler(0, 90, 0),
})

//effectUIRoot.setParent(Attachable.AVATAR)

// const input = Input.instance
// input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
//   windowControl.shatterGlasses()
//   //changeTexture(kittyTexture)
//   smokeControl.startSmoke()

//   dotLightsControl.activatePulse()
//   dotLightsControl.show()
//   laserControl.show()
//   laserControl.changeRotationSpeedBy(10)
//   laserControl.activateFanPulse(true)
//   //spiralControl.showAll()
//   spiralControl.showFirst()
//   spiralControl.showSecond()
//   tvScreenController.stretchVideoAcross()
// })

// input.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, true, (e) => {
//   //changeTexture(dclLogoTexture)
//   smokeControl.stopSmoke()
//   dotLightsControl.hide()
//   dotLightsControl.deactivatePulse()
//   laserControl.hide()
//   //laserControl.setRotationSpeed(10)
//   laserControl.changeRotationSpeedBy(-10)
//   laserControl.activateFanPulse(false)
//   laserControl.setFanWidth(0.05)

//   spiralControl.hideAll()

//   tvScreenController.splitVideoToEach()
// })
