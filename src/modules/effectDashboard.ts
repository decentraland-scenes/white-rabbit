import { changeTexture, kittyTexture, dclLogoTexture } from "./effects/screenColumns";
import { SmokeController} from "./effects/smoke";
import { DotLightsController } from "./effects/dotLights";
import { LaserController } from "./effects/lasers";
import { SpiralController } from "./effects/spirals";
import { tvScreenController } from "./effects/screenColumns";
import { GlassController } from "./effects/glassWindows";


// -- ADD MOVING DOTS EFFECT 
let dotLightsControl = new DotLightsController()

// -- ADD LASER FAN EFFECT
let laserControl = new LaserController()

// -- ADD SPIRAL CEILING EFFECT
let spiralControl = new SpiralController()

// -- ADD WINDOW BREAK EFFECT
let windowControl = new GlassController()

// -- ADD SMOKE EFFECT
let smokeControl = new SmokeController()






const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, e => {


windowControl.shatterGlasses()
//changeTexture(kittyTexture)
smokeControl.startSmoke()

dotLightsControl.activatePulse()
dotLightsControl.show()
laserControl.show()
laserControl.changeRotationSpeedBy(10)
laserControl.activateFanPulse(true)
//spiralControl.showAll()
spiralControl.showFirst()
spiralControl.showSecond()
tvScreenController.stretchVideoAcross()

})

input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, true, e => {


//changeTexture(dclLogoTexture)
smokeControl.stopSmoke()
//dotLightsControl.hide()
dotLightsControl.deactivatePulse()
//laserControl.hide()
//laserControl.setRotationSpeed(10)
laserControl.changeRotationSpeedBy(-10)
laserControl.activateFanPulse(false)
laserControl.setFanWidth(0.05)

spiralControl.hideAll()

tvScreenController.splitVideoToEach()

  
})