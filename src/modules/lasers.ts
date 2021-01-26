import { scene } from "./scene";

let laserConeShape = new GLTFShape("models/laser_cone.glb")

let laserCones:Entity[] = []

let laserRotateRoot = new Entity()
laserRotateRoot.addComponent(new Transform({
    position: new Vector3( scene.venueCenter.x, scene.venueCenter.y, scene.venueCenter.z)
}))
engine.addEntity(laserRotateRoot)

function addLasers(){
    for (let i = 0; i < 16; i++){

        
        let laserCone1 = new Entity()
        laserCone1.addComponent(new Transform({
            position: new Vector3(0, i%2*8, 0),
            rotation:    Quaternion.Euler(0, 360/16*i + 360/32 ,0),
            scale:new Vector3(0.8, 1, 1)
        }))
        laserCone1.addComponent(laserConeShape)
        //engine.addEntity(laserCone1)

        laserCone1.setParent(laserRotateRoot)
        laserCones.push(laserCone1)
    }
}


addLasers()

class laserSystem {

   elapsedTime:number = 0

    update(dt:number){

        this.elapsedTime += dt
        for(let i=0; i< laserCones.length; i++){   
           
            if(i%2){
                laserCones[i].getComponent(Transform).rotate(Vector3.Forward(),  Math.sin(this.elapsedTime))
                laserCones[i].getComponent(Transform).scale.z = (Math.sin(this.elapsedTime) + 1)/2
               // laserCones[i].getComponent(Transform).scale.y = Math.sin(this.elapsedTime) + 1
                //laserCones[i].getComponent(Transform).rotate(Vector3.Up(), Math.sin(this.elapsedTime))
                //laserCones[i].getComponent(Transform).rotate(Vector3.Right(), dt*100)
            }
            else{
                laserCones[i].getComponent(Transform).rotate(Vector3.Forward(),  -Math.sin(this.elapsedTime))
                laserCones[i].getComponent(Transform).scale.z = (Math.sin(this.elapsedTime) + 1)/2
            }
            laserRotateRoot.getComponent(Transform).rotate(Vector3.Up(), dt*5)
            
            
        }

        
    }
} 
engine.addSystem( new laserSystem())

