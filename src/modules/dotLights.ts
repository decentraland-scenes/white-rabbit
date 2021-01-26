import { scene } from "./scene";

let dotLightShape = new GLTFShape("models/dot_lights.glb")



export class DotLightsController {

    isActive:boolean = false
    isAdded:boolean = false
    dotLights:Entity[] 
    dotLightsRoot:Entity
    dotLightCount:number 

    constructor(){
        this.dotLights = []
        this.dotLightCount = 16

        this.dotLightsRoot = new Entity()
        this.dotLightsRoot.addComponent(new Transform({
            position: new Vector3(scene.venueCenter.x, scene.venueCenter.y, scene.venueCenter.z)
        }))

        this.addDotLights()
    }

    private addDotLights(){       
    
        if(!this.isAdded){
            for (let i = 0; i < this.dotLightCount; i++){
    
                let light = new Entity()
                light.addComponent(new Transform({
                    position: new Vector3(0, 0, 0),
                    rotation:    Quaternion.Euler(0,360/this.dotLightCount*i,0)
                }))
                light.addComponent(dotLightShape).visible = false
                //engine.addEntity(light)
                light.setParent(this.dotLightsRoot)
                this.dotLights.push(light)
            }
            engine.addEntity(this.dotLightsRoot)
            this.isAdded = true
        }
        
    }

    hide(){
        if(this.isActive){
            for (let i = 0; i < this.dotLightCount; i++){    
                this.dotLights[i].getComponent(GLTFShape).visible = false
            }            
            this.isActive = false
        }
    }

    show(){
        if(!this.isActive){
            for (let i = 0; i < this.dotLightCount; i++){    
                this.dotLights[i].getComponent(GLTFShape).visible = true
            }            
            this.isActive = true
        }
    }

}

// export function addDotLights(){
//     const dotLightCount = 16

//     for (let i = 0; i < dotLightCount; i++){

//         let light = new Entity()
//         light.addComponent(new Transform({
//             position: new Vector3(0, 0, 0),
//             rotation:    Quaternion.Euler(0,360/dotLightCount*i,0)
//         }))
//         light.addComponent(dotLightShape)
//         //engine.addEntity(light)
//         light.setParent(dotLightsRoot)
//         dotLights.push(light)
//     }
//     engine.addEntity(dotLightsRoot)
// }


