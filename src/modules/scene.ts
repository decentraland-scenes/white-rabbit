export class Scene {   
    sizeX: number = 6*16
    sizeZ: number = 4*16 
    groundElevation: number = 0        
    center: Vector3 
    //venueCenter: Vector3 = new Vector3(this.center.x + 0 , this.groundElevation + 0, this.center.z + 0)
    venueCenter: Vector3 
    columnsCenter: Vector3
    screensCenter: Vector3
    tablePositions: Vector3[]

    constructor(){
        this.tablePositions = []
        this.center = new Vector3(this.sizeX/2, this.groundElevation, this.sizeZ/2)
        //this.venueCenter = new Vector3(this.center.x + 0 , this.groundElevation + 0, this.center.z + 0)
        this.venueCenter = new Vector3(this.center.x + 15.438 , this.groundElevation + 29.157, this.center.z)
        this.columnsCenter = new Vector3(this.venueCenter.x, this.venueCenter.y, this.venueCenter.z)
        this.screensCenter = new Vector3(this.venueCenter.x-8, this.venueCenter.y + 2, this.venueCenter.z)

        let radius = []

        radius.push(8 + 1)
        radius.push(8 + 4)
        radius.push(8 + 2.5)
        radius.push(8 + 0.5)
        radius.push(8 + 1)
        radius.push(8 + 3.6)
        radius.push(8 + 1.4)
        radius.push(8 + 2)
       

        for(let i=0; i< radius.length; i++){
            //let rootPos = scene.tablePositions[i]
            let angle = (360/16 *i) + 360/32
            //let radius = 8
            this.tablePositions.push( this.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius[i],radius[i],radius[i])) )
        }        

    }
}   

export let scene = new Scene
   