import { scene } from "./scene";
import { ScalePulse, YRotator, SwayRotator } from "./simpleAnimators";

let laserConeShape = new GLTFShape("models/laser_cone.glb")


export class LaserController {

    laserCones:Entity[]
    laserRotateRoot:Entity

    constructor(){
        this.laserCones = []

        this.laserRotateRoot = new Entity()
        this.laserRotateRoot.addComponent(new Transform({
            position: new Vector3( scene.venueCenter.x, scene.venueCenter.y, scene.venueCenter.z)
        }))
        this.laserRotateRoot.addComponent( new YRotator(30))
        engine.addEntity(this.laserRotateRoot)

        this.addLasers()
    }

    addLasers(){
        for (let i = 0; i < 16; i++){
            
            let laserCone1 = new Entity()

            // bottom lasers
            if(i%2 == 0){
                laserCone1.addComponent(new Transform({
                    position: new Vector3(0, 0, 0),
                    rotation:    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    scale:new Vector3(0.8, 1, 1)
                }))                
                laserCone1.addComponent(new SwayRotator(                
                    2,
                    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    Quaternion.Euler(0, 360/16*i + 360/32 ,-45)
    
                ))
                laserCone1.addComponent(new ScalePulse(
                    false, false, true,
                    new Vector3(0.5,0.5,0.5),
                    new Vector3(0.8,0,0),
                    new Vector3(1,1,1)
                    ))  
            }
            else{
                laserCone1.addComponent(new Transform({
                    position: new Vector3(0, 8, 0),
                    rotation:    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    scale:new Vector3(0.8, 1, 1)
                }))                
                laserCone1.addComponent(new SwayRotator(                
                    2,
                    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    Quaternion.Euler(0, 360/16*i + 360/32 ,45)
    
                ))
                laserCone1.addComponent(new ScalePulse(
                    false, false, true,
                    new Vector3(1,1,1),
                    new Vector3(0.8,1,1),
                    new Vector3(1,1,1)
                    ))  
            }            
            
            
            laserCone1.addComponent(laserConeShape)
            //engine.addEntity(laserCone1)
    
            laserCone1.setParent(this.laserRotateRoot)
            this.laserCones.push(laserCone1)
        }
    }

    hide(){
        
        for (let i = 0; i < this.laserCones.length; i++){    
            this.laserCones[i].getComponent(GLTFShape).visible = false
        }            
            
        
    }

    show(){
        
            for (let i = 0; i < this.laserCones.length; i++){    
                this.laserCones[i].getComponent(GLTFShape).visible = true
            }            
            
        
    }


}

// class laserSystem {

//    elapsedTime:number = 0

//     update(dt:number){

//         this.elapsedTime += dt
//         for(let i=0; i< laserCones.length; i++){   
           
//             if(i%2){
//                 laserCones[i].getComponent(Transform).rotate(Vector3.Forward(),  Math.sin(this.elapsedTime))
//                 laserCones[i].getComponent(Transform).scale.z = (Math.sin(this.elapsedTime) + 1)/2
//                // laserCones[i].getComponent(Transform).scale.y = Math.sin(this.elapsedTime) + 1
//                 //laserCones[i].getComponent(Transform).rotate(Vector3.Up(), Math.sin(this.elapsedTime))
//                 //laserCones[i].getComponent(Transform).rotate(Vector3.Right(), dt*100)
//             }
//             else{
//                 laserCones[i].getComponent(Transform).rotate(Vector3.Forward(),  -Math.sin(this.elapsedTime))
//                 laserCones[i].getComponent(Transform).scale.z = (Math.sin(this.elapsedTime) + 1)/2
//             }
//             laserRotateRoot.getComponent(Transform).rotate(Vector3.Up(), dt*5)            
            
//         }
        
//     }
// } 
//engine.addSystem( new laserSystem())

