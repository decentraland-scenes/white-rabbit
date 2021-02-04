import { scene } from "./scene";
import { spawnTables } from "./tables";


let bottlesBottomShape = new GLTFShape("models/bottles_bottom.glb")
let bottlesTopShape = new GLTFShape("models/bottles_top.glb")
let poleShape = new GLTFShape("models/pole.glb")
let logoScreenShape = new GLTFShape("models/logo_screen.glb")


// ADD dance poles
let pole1 = new Entity()
pole1.addComponent(new Transform({
    position: new Vector3(scene.venueCenter.x-6.5, scene.venueCenter.y+0.7, scene.venueCenter.z+13.5)
}))
pole1.addComponent(poleShape)
engine.addEntity(pole1)

let pole2 = new Entity()
pole2.addComponent(new Transform({
    position: new Vector3(scene.venueCenter.x-6.5, scene.venueCenter.y+0.7, scene.venueCenter.z-13.5)
}))
pole2.addComponent(poleShape)
engine.addEntity(pole2)



// ADD bar bottles

let bottlesTop = new Entity()
bottlesTop.addComponent(new Transform({
    position: new Vector3(scene.center.x, scene.center.y, scene.center.z)
}))
bottlesTop.addComponent(bottlesTopShape)
engine.addEntity(bottlesTop)

let bottlesBottom = new Entity()
bottlesBottom.addComponent(new Transform({
    position: new Vector3(scene.center.x, scene.center.y, scene.center.z)
}))
bottlesBottom.addComponent(bottlesBottomShape)
engine.addEntity(bottlesBottom)

spawnTables()


// add logo screen above bar
let logoScreen = new Entity()
logoScreen.addComponent(new Transform({
    position: new Vector3(scene.venueCenter.x-12.05, scene.venueCenter.y+4.3, scene.venueCenter.z)
}))
logoScreen.addComponent(logoScreenShape)
engine.addEntity(logoScreen)

