import { scene } from "./scene"

let chairReflectShape = new GLTFShape("models/chair_reflect.glb")
let tableShape = new GLTFShape("models/table.glb")
let chairShape = new GLTFShape("models/chair.glb")

export function spawnTables(){

    let chairRadius = 1

    for(let i=0; i< scene.tablePositions.length; i++){

        let rootPos = scene.tablePositions[i]
        let table = new Entity()
        table.addComponent(new Transform({position: rootPos}))
        table.addComponent(new GLTFShape("models/table.glb"))        
        engine.addEntity(table)

        for (let j = 0; j < 3; j++){

            let chair = new Entity()
            chair.addComponent(new Transform({position: rootPos.add(Vector3.Forward().rotate(Quaternion.Euler(0,120*j,0)))}))
            chair.addComponent(chairShape)
            chair.addComponent(new Billboard(false,true, false))
            engine.addEntity(chair)

            let chairReflect1 = new Entity()
            chairReflect1.addComponent(new Transform({position: rootPos.add(Vector3.Forward().rotate(Quaternion.Euler(0,120*j,0)))}))
            chairReflect1.addComponent(chairReflectShape)
            chairReflect1.addComponent(new Billboard(false,true, false))
            engine.addEntity(chairReflect1)
        }
        
    }
}