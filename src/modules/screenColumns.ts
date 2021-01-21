import { scene } from "./scene";
import { Projector } from "./projector";
import { Screen, ScreenGroup } from "./screens";

const player = Camera.instance

let uvCheckerTexture = new Texture('textures/uv_checker.png', {samplingMode: 2})
let alphaBlackTexture = new Texture('textures/alpha.png', {samplingMode: 2})
let kittyTexture = new Texture('textures/kitty.png', {samplingMode: 2, wrap:0})

//let aoShape =  new GLTFShape('models/ao_column.glb')

const myVideoClip1 = new VideoClip(
  'textures/cc_video.mp4'
)
const myVideoTexture = new VideoTexture(myVideoClip1)



let uvMat = new Material()
uvMat.albedoTexture = kittyTexture
uvMat.emissiveTexture = kittyTexture
//uvMat.alphaTexture = alphaBlackTexture
uvMat.transparencyMode = 2
//uvMat.emissiveColor = Color3.White()
uvMat.roughness = 0.5
uvMat.specularIntensity = 0
uvMat.metallic = 0.1

let uvMat2 = new Material()
uvMat2.albedoTexture = myVideoTexture
//uvMat.emissiveTexture = myVideoTexture
//uvMat.alphaTexture = alphaBlackTexture
uvMat2.transparencyMode = 2
//uvMat.emissiveColor = Color3.White()
uvMat2.roughness = 0
uvMat2.specularIntensity = 1
uvMat2.metallic = 0.7


myVideoTexture.loop = true
myVideoTexture.playing = true

// const canvas = new UICanvas()

// let uiInstruction = new UIText(canvas)
// uiInstruction.value = 'Click to start video' 
// uiInstruction.hAlign = 'center' 
// uiInstruction.vAlign = 'center' 
// uiInstruction.hTextAlign = 'center' 
// uiInstruction.vTextAlign = 'center' 


let projectorColumns = new Projector(new Vector3(scene.columnsCenter.x, scene.columnsCenter.y+ 3 ,scene.columnsCenter.z), new Vector3(4,4,1), Quaternion.Euler(0,0,0), false)
let projectorScatter = new Projector(new Vector3(scene.screensCenter.x, scene.screensCenter.y ,scene.screensCenter.z), new Vector3(8,4,1), Quaternion.Euler(0,0,0), true)


let ScreenGrpColumns = new ScreenGroup(projectorColumns)
let ScreenGrpScatter = new ScreenGroup(projectorScatter)



function addRandomScreens(_num:number){
  let randScaleX = 8
  let randScaleY = 4.5

  let randPosX = 8
  let randPosY = 1
  let randPosZ = 1

  for (let i=0; i<_num; i++){
    randScaleX = 1 + Math.random()*3
    randScaleY = 1 + Math.random()*1.5

    randPosX = scene.screensCenter.x + Math.random()*6 -3
    randPosY = scene.screensCenter.y+ Math.random()*4-2
    randPosZ = scene.screensCenter.z + Math.random()*6-3    


    let screen = new Screen({
      position: new Vector3(randPosX,randPosY,randPosZ),
      rotation: Quaternion.Euler(Math.random()*90-45,Math.random()*90-45, Math.random()*90-45),
      scale: new Vector3(randScaleX,randScaleY,1)},
      true, uvMat2)

      ScreenGrpScatter.addSCreen(screen)
  }
}


class ColumnScreen {
  screens:Screen[] = []  

  constructor(group:ScreenGroup, _pos:Vector3, _radius:number, _height:number, _isTwoSided:boolean, _mat:Material){

    let screen1 = new Screen({
      position: new Vector3(_pos.x + _radius/2, _pos.y + _height/2, _pos.z),
      rotation: Quaternion.Euler(0,90,0),
      scale: new Vector3(_radius, _height,1)},
      _isTwoSided, 
      _mat)

    // let screen2 = new Screen({
    //   position: new Vector3(_pos.x - _radius/2, _pos.y + _height/2, _pos.z),
    //   rotation: Quaternion.Euler(0,270,0),
    //   scale: new Vector3(_radius, _height,1)},
    //   _isTwoSided, 
    //   _mat)

    // let screen3 = new Screen({
    //   position: new Vector3(_pos.x, _pos.y + _height/2, _pos.z + _radius/2),
    //   rotation: Quaternion.Euler(0,0,0),
    //   scale: new Vector3(_radius, _height,1)},
    //   _isTwoSided, 
    //   _mat)

    // let screen4 = new Screen({
    //   position: new Vector3(_pos.x, _pos.y + _height/2, _pos.z - _radius/2),
    //   rotation: Quaternion.Euler(0,180,0),
    //   scale: new Vector3(_radius, _height,1)},
    //   _isTwoSided, 
    //   _mat)  

    // let aoBottom = new Entity()
    // aoBottom.addComponent(new Transform({position: _pos, scale: new Vector3(_radius,_radius,_radius)}))
    // aoBottom.addComponent(aoShape)
    // engine.addEntity(aoBottom)

    // let aoTop = new Entity()
    // aoTop.addComponent(new Transform({position: new Vector3(_pos.x, _pos.y+_height, _pos.z), scale: new Vector3(_radius,_radius,_radius), rotation:Quaternion.Euler(180,0,0)}))
    // aoTop.addComponent(aoShape)
    // engine.addEntity(aoTop)

      group.addSCreen(screen1)
      // group.addSCreen(screen2)
      // group.addSCreen(screen3)
      // group.addSCreen(screen4)

      this.screens.push(screen1)
     // this.screens.push(screen2)
      // this.screens.push(screen3)
      // this.screens.push(screen4)
    }

    
    updateColumn(_pos:Vector3, _rotation:Quaternion, _radius:number, _height:number, _mat:Material){

      this.screens[0].getComponent(Transform).position.set(_pos.x + _radius/2, _pos.y + _height/2, _pos.z) 
      this.screens[0].getComponent(Transform).rotation.copyFrom(_rotation)
      this.screens[0].getComponent(Transform).scale = new Vector3(_radius, _height,1)

      // this.screens[1].getComponent(Transform).position.set(_pos.x - _radius/2, _pos.y + _height/2, _pos.z)
      // this.screens[1].getComponent(Transform).rotation.copyFrom(_rotation)
      // this.screens[1].getComponent(Transform).scale = new Vector3(_radius, _height,1)



  
  
      // this.screens[1] = new Screen({
      //   position: new Vector3(_pos.x - _radius/2, _pos.y + _height/2, _pos.z),
      //   rotation: Quaternion.Euler(0,90,0),
      //   scale: new Vector3(_radius, _height,1)},
      //   false, _mat)
  
      // this.screens[2] = new Screen({
      //   position: new Vector3(_pos.x, _pos.y + _height/2, _pos.z + _radius/2),
      //   rotation: Quaternion.Euler(0,0,0),
      //   scale: new Vector3(_radius, _height,1)},
      //   false, _mat)
  
      // this.screens[3] = new Screen({
      //   position: new Vector3(_pos.x, _pos.y + _height/2, _pos.z - _radius/2),
      //   rotation: Quaternion.Euler(0,0,0),
      //   scale: new Vector3(_radius, _height,1)},
      //   false, _mat)  
  
    }

  }

  class CubeScreen {
    screens:Screen[] = []  
  
    constructor(group:ScreenGroup, _pos:Vector3, _radius:number){
  
      let screen1 = new Screen({
        position: new Vector3(_pos.x + _radius/2, _pos.y, _pos.z),
        rotation: Quaternion.Euler(0,90,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)
  
      let screen2 = new Screen({
        position: new Vector3(_pos.x - _radius/2, _pos.y, _pos.z),
        rotation: Quaternion.Euler(0,270,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)
  
      let screen3 = new Screen({
        position: new Vector3(_pos.x, _pos.y, _pos.z + _radius/2),
        rotation: Quaternion.Euler(0,0,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)
  
      let screen4 = new Screen({
        position: new Vector3(_pos.x, _pos.y, _pos.z - _radius/2),
        rotation: Quaternion.Euler(0,180,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)  

      let screenTop = new Screen({
        position: new Vector3(_pos.x, _pos.y + _radius/2, _pos.z),
        rotation: Quaternion.Euler(90,0,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)  

      let screenBottom = new Screen({
        position: new Vector3(_pos.x, _pos.y - _radius/2, _pos.z),
        rotation: Quaternion.Euler(90,0,0),
        scale: new Vector3(_radius, _radius,1)},
        false, uvMat)  
  
        group.addSCreen(screen1)
        group.addSCreen(screen2)
        group.addSCreen(screen3)
        group.addSCreen(screen4)
        group.addSCreen(screenTop)
        group.addSCreen(screenBottom)
  
        this.screens.push(screen1, screen2, screen3, screen4, screenTop, screenBottom)
      }
  
      //WRONG!!
      updateCube(_pos:Vector3, _radius:number){

          this.screens[0] = new Screen({
          position: new Vector3(_pos.x + _radius/2, _pos.y, _pos.z),
          rotation: Quaternion.Euler(0,90,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat)
    
          this.screens[1] = new Screen({
          position: new Vector3(_pos.x - _radius/2, _pos.y, _pos.z),
          rotation: Quaternion.Euler(0,270,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat)
    
          this.screens[2] = new Screen({
          position: new Vector3(_pos.x, _pos.y, _pos.z + _radius/2),
          rotation: Quaternion.Euler(0,0,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat)
    
          this.screens[3] = new Screen({
          position: new Vector3(_pos.x, _pos.y, _pos.z - _radius/2),
          rotation: Quaternion.Euler(0,180,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat)  
  
          this.screens[4]= new Screen({
          position: new Vector3(_pos.x, _pos.y + _radius/2, _pos.z),
          rotation: Quaternion.Euler(90,0,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat)  
  
         this.screens[5] = new Screen({
          position: new Vector3(_pos.x, _pos.y - _radius/2, _pos.z),
          rotation: Quaternion.Euler(-90,0,0),
          scale: new Vector3(_radius, _radius,1)},
          false, uvMat) 
    
      }
  
    }

const columnScale = 0.75
const columnBaseHeight = 0
const columnHeight = 10
const columnSpacing = 2

const cubeScale = 3

//let column1 = new ColumnScreen(ScreenGrp1, )

function addColumnGrid(_rows:number, _cols:number, _center:Vector3){

  let sizeRows = columnSpacing *(_rows-1)
  let sizeCols = columnSpacing *(_cols-1)

  let origin = new Vector3(_center.x - sizeRows/2, _center.y, _center.z - sizeCols/2)

  for(let i=0; i < _rows; i++){
    for (let j=0; j< _cols; j++){
      let column = new ColumnScreen(
        ScreenGrpColumns,  
        new Vector3(origin.x + j*columnSpacing + Math.random()-0.5, columnBaseHeight, origin.z + i*columnSpacing + Math.random()-0.5), 
        columnScale*Math.random()+0.5, 
        columnHeight,
        false,
        uvMat)
    }
  }

  // let origin = new Vector3(_center.x , _center.y, _center.z )

  // for(let i=0; i < _rows+_cols; i++){
    
  //     let column = new ColumnScreen(ScreenGrpColumns,  new Vector3(origin.x , columnBaseHeight, origin.z), i/columnScale*0.75 + 0.1, columnHeight)
    
  // }
}

let columnsRight:ColumnScreen[] = []
let columnsLeft:ColumnScreen[] = []

function addColumnCircle(count:number, center:Vector3, radius:number){ 

  for(let i=0; i < count; i++){

    let angle = 320/count *i

    let column = new ColumnScreen(
      ScreenGrpColumns,  
     center.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius,radius,radius)), 
      columnScale, 
      columnHeight,
      false,
      uvMat)

      columnsRight.push(column)
   
  }

  for(let i=0; i < count; i++){

    let angle = 320/count *i

    let column = new ColumnScreen(
      ScreenGrpColumns,  
     center.add(Vector3.Backward().rotate(Quaternion.Euler(0,angle,0)).multiplyByFloats(radius,radius,radius)), 
      columnScale, 
      columnHeight,
      false,
      uvMat)

      columnsLeft.push(column)
   
  }

  // let origin = new Vector3(_center.x , _center.y, _center.z )

  // for(let i=0; i < _rows+_cols; i++){
    
  //     let column = new ColumnScreen(ScreenGrpColumns,  new Vector3(origin.x , columnBaseHeight, origin.z), i/columnScale*0.75 + 0.1, columnHeight)
    
  // }
}
addColumnCircle(10, scene.venueCenter,3)
//addColumnGrid(3,3, scene.columnsCenter)
//addRandomScreens(8)
//let cube1 = new CubeScreen(ScreenGrp1,  new Vector3(scene.center.x - 10, 5, scene.center.z - 10), cubeScale)


class rotateTestSystem {

  angleRight:number = 0
  angleLeft:number = 0

  update(dt:number){
    
    
  const projectorColumnsTransfrom = projectorColumns.getComponent(Transform)
  const projectorScatterTransfrom = projectorScatter.getComponent(Transform)

   // projectorTransfrom.rotate(Vector3.Up(),20*dt)
   //projectorTransfrom.position = player.position
   //projectorTransfrom.rotation = player.rotation
    projectorColumnsTransfrom.lookAt(player.position)
    projectorScatterTransfrom.lookAt(player.position)

   ScreenGrpColumns.updateScreens(player.position)
   ScreenGrpScatter.updateScreens(player.position)

   
   //ScreenGroupFloor.updateScreens(player.position)


   for(let i = 0; i< columnsRight.length; i++){
     this.angleRight -= 4* dt
     let radius = 2.2     
    let offset = 360/columnsRight.length *i
      
     let pos =  scene.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,this.angleRight +offset ,0)).multiplyByFloats(radius,radius,radius))
     columnsRight[i].updateColumn(pos, Quaternion.Euler(0, 180 + this.angleRight + offset, 30),1.2, columnHeight, uvMat )
   }

   for(let i = 0; i< columnsLeft.length; i++){
     this.angleLeft += 4* dt
     let radius = 2.2     
    let offset = 360/columnsLeft.length *i
      
     let pos =  scene.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,this.angleLeft +offset ,0)).multiplyByFloats(radius,radius,radius))
     columnsLeft[i].updateColumn(pos, Quaternion.Euler(0, 180 + this.angleLeft + offset, -30),1.2, columnHeight, uvMat )
   }
 
  }
}
engine.addSystem(new rotateTestSystem())


