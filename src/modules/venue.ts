import { scene } from "./scene";
import { spawnTables } from "./tables";
import { changeTexture, kittyTexture, dclLogoTexture } from "./screenColumns";
import { SmokeSwirl, startSmoke} from "./smoke";
import { DotLightsController } from "./dotLights";



let topSwirlShape = new GLTFShape("models/top_swirl.glb")
let glassShatterShape = new GLTFShape("models/glass_shattered.glb")
let glassBasicShape = new GLTFShape("models/glass_basic.glb")
let ceilingFanShape = new GLTFShape("models/ceiling_fan.glb")
let ceilingFan2Shape = new GLTFShape("models/ceiling_fan2.glb")


// -- ADD MOVING DOTS EFFECT 
let dotLightsControl = new DotLightsController()
//dotLightsControl.addDotLights()



let topSwirl = new Entity()
topSwirl.addComponent(new Transform({position: new Vector3(scene.venueCenter.x, scene.venueCenter.y+6.9, scene.venueCenter.z) }))
topSwirl.addComponent(topSwirlShape)
engine.addEntity(topSwirl)


let ceilingFan = new Entity()
ceilingFan.addComponent(new Transform({
    position: scene.venueCenter,
    scale:new Vector3(1,1,1)
}))
ceilingFan.addComponent(ceilingFanShape)
engine.addEntity(ceilingFan)

let ceilingFan2 = new Entity()
ceilingFan2.addComponent(new Transform({
    position: scene.venueCenter,
    scale:new Vector3(1,1,1)
}))
ceilingFan2.addComponent(ceilingFan2Shape)
engine.addEntity(ceilingFan2)





@Component("ShatterGlass")
export class ShatterGlass{  

    isShattered:boolean = false
    animFraction:number = 0
    speed:number = 1

    constructor(_speed:number){   
        this.speed = _speed       
    }    
}

let glassWindows:Entity[] = []
let glassWindowsBroken:Entity[] = []

function addGlassPlanes(center:Vector3, radius:number){
 

    for(let i=0; i < 16; i++){
  
      let angle = (360/16 *i) + 360/32
  
      let glass = new Entity()
      
      glass.addComponent(new Transform({
          position: center.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius,radius,radius)),
          rotation: Quaternion.Euler(0,angle,0),
          scale: new Vector3(1,1,1)
      }))
      glass.addComponent(glassBasicShape)
      //glass.addComponent(new ShatterGlass(Math.random()+ 0.6))
      engine.addEntity(glass)

      glassWindows.push(glass)

      let glassBroken = new Entity()
      glassBroken.addComponent(new Transform({
          position: center.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius,radius,radius)),
          rotation: Quaternion.Euler(0,angle,0),
          scale: new Vector3(1,1,0)
      }))

      glassBroken.getComponent(Transform).position.y = -10
      glassBroken.addComponent(glassShatterShape)
      glassBroken.addComponent(new ShatterGlass(Math.random()+ 0.6))
      engine.addEntity(glassBroken)

      glassWindowsBroken.push(glassBroken)
      
     
    }
}

addGlassPlanes(new Vector3( scene.venueCenter.x, scene.venueCenter.y +2.35, scene.venueCenter.z) , 16.8)


class glassBreakSystem {

    group = engine.getComponentGroup(ShatterGlass, Transform)

    update(dt:number){

        for(let entity of this.group.entities){
            
            const transform = entity.getComponent(Transform)
            const glassInfo = entity.getComponent(ShatterGlass)

            if(glassInfo.isShattered){
                if(glassInfo.animFraction < 3){
                    glassInfo.animFraction += glassInfo.speed * dt 
                    transform.scale.z =  Math.sqrt(glassInfo.animFraction)
                }
                else{
                   //entity.getComponent(GLTFShape).visible = false 
                   glassInfo.isShattered = false
                   glassInfo.animFraction = 3
                }
                
            }
            else{
                if(glassInfo.animFraction > 0){
                    glassInfo.animFraction -= glassInfo.speed * dt 
                    transform.scale.z =  Math.sqrt(glassInfo.animFraction)
                }
                else{
                   //entity.getComponent(GLTFShape).visible = false 
                   glassInfo.animFraction = 0
                   entity.addComponentOrReplace(glassBasicShape)
                   entity.getComponent(Transform).scale.z = 1
                }
            }
            
        }
    }
}
engine.addSystem( new glassBreakSystem())

function rebuildGlasses(glass:Entity){
    let group = engine.getComponentGroup(ShatterGlass, Transform)

    for(let entity of group.entities){
       // entity.getComponent(ShatterGlass).isShattered = true
        entity.getComponent(Transform).position.y = -10
        entity.addComponentOrReplace(glassBasicShape)
         
     }

    for(let i = 0; i< glassWindows.length; i++){
        glassWindows[i].getComponent(Transform).position.y = scene.venueCenter.y +2.35
    }
}

function shatterGlasses(){
    let group = engine.getComponentGroup(ShatterGlass, Transform)

    for(let i = 0; i< glassWindows.length; i++){
        glassWindows[i].getComponent(Transform).position.y = -10
    }
    for(let entity of group.entities){
       entity.getComponent(ShatterGlass).isShattered = true
       entity.getComponent(Transform).position.y = scene.venueCenter.y +2.35
       entity.addComponentOrReplace(glassShatterShape)
        
    }
}

//engine.addSystem( new glassBreakSystem())

// let chairReflect1 = new Entity()
// chairReflect1.addComponent(new Transform({position: new Vector3(scene.venueCenter.x-2.8, scene.venueCenter.y-0.0 , scene.venueCenter.z-8.9)}))
// chairReflect1.addComponent(chairReflectShape)
// chairReflect1.addComponent(new Billboard(false,true, false))
// engine.addEntity(chairReflect1)

spawnTables()

const input = Input.instance
input.subscribe("BUTTON_DOWN", ActionButton.PRIMARY, true, e => {


shatterGlasses()
changeTexture(kittyTexture)
startSmoke(true)

dotLightsControl.show()
})

input.subscribe("BUTTON_DOWN", ActionButton.SECONDARY, true, e => {


changeTexture(dclLogoTexture)
startSmoke(false)
dotLightsControl.hide()

  
})