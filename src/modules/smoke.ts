import { isExpressionWithTypeArguments } from "../../node_modules/typescript/lib/typescript";
import { scene } from "./scene";

let bottomSwirlShape = new GLTFShape("models/bottom_swirl.glb")
let bottomSwirl2Shape = new GLTFShape("models/bottom_swirl2.glb")


@Component("SmokeSwirl")
export class SmokeSwirl{  

   active:boolean = false
   scale:number = 0
     
    setActive(_active:boolean){
        this.active = _active
    }

}

let bottomSwirl = new Entity()
bottomSwirl.addComponent(new Transform({
    position: scene.venueCenter,
    scale:new Vector3(0,1,0)
    }))
bottomSwirl.addComponent(bottomSwirlShape)
bottomSwirl.addComponent(new SmokeSwirl())
engine.addEntity(bottomSwirl)

let bottomSwirl2 = new Entity()
bottomSwirl2.addComponent(new Transform({
    position: scene.venueCenter,
    scale:new Vector3(0,1,0)
}))
bottomSwirl2.addComponent(bottomSwirl2Shape)
bottomSwirl2.addComponent(new SmokeSwirl())
engine.addEntity(bottomSwirl2)


class smokeSystem {

    elapsedTime:number = 0
    animFraction:number = 0
    group = engine.getComponentGroup(SmokeSwirl, Transform)
     update(dt:number){
        
         this.elapsedTime += dt        

         for( let entity of this.group.entities){
             const info = entity.getComponent(SmokeSwirl)
             const transform = entity.getComponent(Transform)

             if(info.active){

                 if(info.scale < 1){
                    entity.getComponent(GLTFShape).visible = true                    
                    
                    info.scale  += 0.5*dt
                    transform.scale.set(info.scale , 1, info.scale)
                 }
                 else{
                     info.scale = 1
                     transform.scale.set(1 , 1, 1)
                 }
             }
             else{                
                if(info.scale > 0){                    
                    info.scale  -= 0.5*dt
                    transform.scale.set(1, info.scale , 1)
                 }
                 else{
                     info.scale = 0
                     transform.scale.set(0 , info.scale ,0)
                     entity.getComponent(GLTFShape).visible = false
                 }
             }
         }

       
     }
 } 
 engine.addSystem( new smokeSystem())

 const  smokes = engine.getComponentGroup(SmokeSwirl, Transform)

 export function startSmoke(_start:boolean){
    for( let entity of smokes.entities){
        entity.getComponent(SmokeSwirl).setActive(_start)
    }

 }