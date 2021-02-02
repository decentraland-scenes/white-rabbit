import { scene } from "./scene"

let topSwirlShape = new GLTFShape("models/top_swirl.glb")

export class SpiralController{

    topSwirl:Entity
    topSwirl2:Entity

    constructor(){
        this.topSwirl = new Entity()
        this.topSwirl.addComponent(new Transform({
            position: new Vector3(scene.venueCenter.x, scene.venueCenter.y+6.9, scene.venueCenter.z) }))
            this.topSwirl.addComponent(topSwirlShape).visible = true
        

        this.topSwirl2 = new Entity()
        this.topSwirl2.addComponent(new Transform({
            position: new Vector3(scene.venueCenter.x, scene.venueCenter.y+6.9, scene.venueCenter.z),
            scale:new Vector3(-1,1,1) }))
            this.topSwirl2.addComponent(topSwirlShape).visible = true
        
    }

    hideAll(){                     
       // this.topSwirl.getComponent(GLTFShape).visible = false
       // this.topSwirl2.getComponent(GLTFShape).visible = false
        engine.removeEntity(this.topSwirl)   
        engine.removeEntity(this.topSwirl2)   
    }

    showAll(){        
       // this.topSwirl.getComponent(GLTFShape).visible = true
       // this.topSwirl2.getComponent(GLTFShape).visible = true  
        engine.addEntity(this.topSwirl) 
        engine.addEntity(this.topSwirl2)          
        
    }
    
    hideFirst(){                     
       //this.topSwirl.getComponent(GLTFShape).visible = false 
       engine.removeEntity(this.topSwirl)       
    }

    showFirst(){        
       // this.topSwirl.getComponent(GLTFShape).visible = true
       engine.addEntity(this.topSwirl)                 
        
    }
    hideSecond(){                     
       // this.topSwirl2.getComponent(GLTFShape).visible = false  
       engine.removeEntity(this.topSwirl2)
    }

    showSecond(){        
        //this.topSwirl2.getComponent(GLTFShape).visible = true 
        engine.addEntity(this.topSwirl2)                
        
    }

}


