import { scene } from "../scene";
import { ScalePulse, YRotator, SwayRotator } from "../utilities/simpleAnimators";

let laserConeShape = new GLTFShape("models/laser_cone.glb")

export class LaserController {

    laserCones:Entity[]
    laserRotateRoot:Entity

    mainRotationSpeed:number
    rotSpeedMax:number
    rotSpeedMin:number

    constructor(){
        this.laserCones = []

        this.mainRotationSpeed = 30
        this.rotSpeedMax = 180
        this.rotSpeedMin = -180

        this.laserRotateRoot = new Entity()
        this.laserRotateRoot.addComponent(new Transform({
            position: new Vector3( scene.venueCenter.x, scene.venueCenter.y, scene.venueCenter.z)
        }))
        this.laserRotateRoot.addComponent( new YRotator(30))
        engine.addEntity(this.laserRotateRoot)

        this.addLasers()
    }

    addLasers(){

        let baseRadius = 2
        
        for (let i = 0; i < 16; i++){
            
            let laserCone1 = new Entity()
            

            // bottom lasers
            if(i%2 == 0){
                laserCone1.addComponent(new Transform({
                    position: Vector3.Left().rotate(Quaternion.Euler(0, 360/16*i + 360/32 ,0)).multiplyByFloats(baseRadius,baseRadius,baseRadius),
                    rotation:    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    scale:new Vector3(0.8, 1, 1)
                }))                
                laserCone1.addComponent(new SwayRotator(                
                    2,
                    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    Quaternion.Euler(0, 360/16*i + 360/32 ,-30)
    
                ))
                laserCone1.addComponent(new ScalePulse(
                    false, false, true,
                    new Vector3(0.5,0.5,0.8),
                    new Vector3(0.8,1,0.05),
                    new Vector3(1,1,1)
                    ))  
            }
            // top lasers
            else{
                let pos = Vector3.Left().rotate(Quaternion.Euler(0, 360/16*i + 360/32 ,0)).multiplyByFloats(baseRadius,baseRadius,baseRadius)
                laserCone1.addComponent(new Transform({
                    position: pos.add(new Vector3(0,8,0)),
                    rotation:    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
                    scale:new Vector3(0.8, 1, 1)
                }))                
                laserCone1.addComponent(new SwayRotator(                
                    2,
                    Quaternion.Euler(0, 360/16*i + 360/32 ,10),
                    Quaternion.Euler(0, 360/16*i + 360/32 ,45)
    
                ))
                laserCone1.addComponent(new ScalePulse(
                    false, false, true,
                    new Vector3(0.5,0.5,0.8),
                    new Vector3(0.8,1,0.05),
                    new Vector3(1,1,1)
                    ))  
            }            
            
            
            laserCone1.addComponent(laserConeShape).visible = false
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
    rotate(activate:boolean){    
        if(activate){
            this.laserRotateRoot.getComponent(YRotator).speed = this.mainRotationSpeed
        }
        else{
            this.laserRotateRoot.getComponent(YRotator).speed = 0
        } 
    }
    setRotationSpeed(_speed:number){
        if(_speed > this.rotSpeedMax){
            this.mainRotationSpeed = this.rotSpeedMax
        }else if(_speed < this.rotSpeedMin){
            this.mainRotationSpeed = this.rotSpeedMin
        }else{
            this.mainRotationSpeed = _speed
        }        
        this.laserRotateRoot.getComponent(YRotator).speed = this.mainRotationSpeed
    }

    changeRotationSpeedBy(_amount:number){
        this.mainRotationSpeed += _amount

        if(this.mainRotationSpeed > this.rotSpeedMax){
            this.mainRotationSpeed = this.rotSpeedMax
        }else if(this.mainRotationSpeed < this.rotSpeedMin){
            this.mainRotationSpeed = this.rotSpeedMin
        }

        this.laserRotateRoot.getComponent(YRotator).speed = this.mainRotationSpeed
    }

    activateFanPulse(activate:boolean){
        for (let i = 0; i < this.laserCones.length; i++){            
            if(activate){
                this.laserCones[i].getComponent(ScalePulse).activate()
            }
            else{
                this.laserCones[i].getComponent(ScalePulse).deactivate() 
            }
            
        } 
    }

    setFanWidth(_width:number){
        for (let i = 0; i < this.laserCones.length; i++){    
            this.laserCones[i].getComponent(Transform).scale.z = _width
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

