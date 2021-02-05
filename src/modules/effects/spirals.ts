import { scene } from "../scene"

let topSwirlShape = new GLTFShape("models/top_swirl.glb")

export class SpiralController{

    topSwirl:Entity
    topSwirl2:Entity

    constructor(){
        this.topSwirl = new Entity()
        this.topSwirl.addComponent(new Transform({
            position: new Vector3(scene.venueCenter.x, scene.venueCenter.y+6.9, scene.venueCenter.z),
            scale: Vector3.Zero()
        }))
            this.topSwirl.addComponent(topSwirlShape).visible = true
        

        this.topSwirl2 = new Entity()
        this.topSwirl2.addComponent(new Transform({
            position: new Vector3(scene.venueCenter.x, scene.venueCenter.y+6.9, scene.venueCenter.z),
            scale:new Vector3(0,0,0) }))
            this.topSwirl2.addComponent(topSwirlShape).visible = true

        engine.addEntity(this.topSwirl) 
        engine.addEntity(this.topSwirl2) 
        
    }

    hideAll(){                     
       // this.topSwirl.getComponent(GLTFShape).visible = false
       // this.topSwirl2.getComponent(GLTFShape).visible = false
        //engine.removeEntity(this.topSwirl)   
       // engine.removeEntity(this.topSwirl2)  
       
       this.topSwirl.getComponent(Transform).scale.setAll(0)
       this.topSwirl2.getComponent(Transform).scale.setAll(0)
    }

    showAll(){        
       // this.topSwirl.getComponent(GLTFShape).visible = true
       // this.topSwirl2.getComponent(GLTFShape).visible = true  
       // engine.addEntity(this.topSwirl) 
       // engine.addEntity(this.topSwirl2) 
        this.topSwirl.getComponent(Transform).scale.setAll(1)          
        this.topSwirl2.getComponent(Transform).scale.set(-1,1,1) 
    }
    
    hideFirst(){                     
       //this.topSwirl.getComponent(GLTFShape).visible = false 
      // engine.removeEntity(this.topSwirl)   
       this.topSwirl.getComponent(Transform).scale.setAll(0)    
    }

    showFirst(){        
       // this.topSwirl.getComponent(GLTFShape).visible = true
       //engine.addEntity(this.topSwirl)                 
       this.topSwirl.getComponent(Transform).scale.setAll(1)  
    }
    hideSecond(){                     
       // this.topSwirl2.getComponent(GLTFShape).visible = false  
      // engine.removeEntity(this.topSwirl2)
      this.topSwirl2.getComponent(Transform).scale.setAll(0)  
    }

    showSecond(){        
        //this.topSwirl2.getComponent(GLTFShape).visible = true 
        //engine.addEntity(this.topSwirl2)             
        this.topSwirl2.getComponent(Transform).scale.set(-1,1,1)     
        
    }

}


