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
        this.venueCenter = new Vector3(this.center.x + 15.438 , this.groundElevation + 29.157, this.center.z + 1.3622)
        this.columnsCenter = new Vector3(this.venueCenter.x, this.venueCenter.y, this.venueCenter.z)
        this.screensCenter = new Vector3(this.venueCenter.x-8, this.venueCenter.y + 2, this.venueCenter.z)

        let radius = []

        radius.push(8 + 1)
        radius.push(8 + 5)
        radius.push(8 + 3.5)
        radius.push(8 + 1.5)
        radius.push(8 + 2)
        radius.push(8 + 4.6)
        radius.push(8 + 2.4)
        radius.push(8 + 3)
        // radius.push(8 + 4)
        // radius.push(8 + 2)

        for(let i=0; i< radius.length; i++){

            //let rootPos = scene.tablePositions[i]
            let angle = (360/16 *i) + 360/32
            //let radius = 8
            this.tablePositions.push( this.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius[i],radius[i],radius[i])) )
        }
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 3.7816, this.venueCenter.y, this.venueCenter.z + 8.343))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 9.6841, this.venueCenter.y, this.venueCenter.z + 9.591))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 8.769, this.venueCenter.y, this.venueCenter.z + 3.812))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 4.3194, this.venueCenter.y, this.venueCenter.z + 4))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 13.12, this.venueCenter.y, this.venueCenter.z + 0.08))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 8.669, this.venueCenter.y, this.venueCenter.z - 4.115))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 9.8154, this.venueCenter.y, this.venueCenter.z -9.234))
        // this.tablePositions.push(new Vector3(this.venueCenter.x - 3.985, this.venueCenter.y, this.venueCenter.z -8.1335))
        // this.tablePositions.push(new Vector3(this.venueCenter.x + 0.07, this.venueCenter.y, this.venueCenter.z -13.511))

    }
}   

export let scene = new Scene
   