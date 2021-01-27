import { scene } from "./scene";
import { Projector } from "./projector";
import { Screen, ScreenGroup, PlaneUVData} from "./screens";

const player = Camera.instance

let uvCheckerTexture = new Texture('textures/uv_checker.png', {samplingMode: 2})
let alphaBlackTexture = new Texture('textures/alpha.png', {samplingMode: 2})
export let kittyTexture = new Texture('textures/kitty.png', {samplingMode: 2, wrap:0})
export let dclLogoTexture = new Texture('textures/dcl_logo.png', {samplingMode: 2, wrap:0})
let ledMaskTexture = new Texture('textures/led_wall_mask.png', {samplingMode:2})
//let aoShape =  new GLTFShape('models/ao_column.glb')

const myVideoClip1 = new VideoClip(
  'textures/test.mp4'
)
const myVideoTexture = new VideoTexture(myVideoClip1)

let screenBGShape = new GLTFShape("models/screen_bg.glb")

let uvMat = new Material()
uvMat.albedoTexture = dclLogoTexture
uvMat.emissiveTexture = dclLogoTexture
//uvMat.alphaTexture = alphaBlackTexture
uvMat.transparencyMode = 2
uvMat.emissiveColor = Color3.Gray()
uvMat.roughness = 0.5
uvMat.specularIntensity = 0
uvMat.metallic = 0.1


let screen1StretchUV = new PlaneUVData(
  new Vector2(0.33, 0.33),
  new Vector2(0, 0.33),
  new Vector2(0, 0.66 ),
  new Vector2(0.33, 0.66)
)

let screen2StretchUV = new PlaneUVData(
  new Vector2(0.66, 0.33),
  new Vector2(0.33, 0.33),
  new Vector2(0.33, 0.66 ),
  new Vector2(0.66, 0.66)
)

let screen3StretchUV = new PlaneUVData(
  new Vector2(1, 0.33),
  new Vector2(0.66, 0.33),
  new Vector2(0.66, 0.66 ),
  new Vector2(1, 0.66)
)

let ledWallMat = new Material()
ledWallMat.albedoTexture = myVideoTexture
ledWallMat.emissiveTexture = myVideoTexture
//ledWallMat.alphaTexture = ledMaskTexture
ledWallMat.transparencyMode = 2
ledWallMat.emissiveColor = Color3.White()
ledWallMat.roughness = 1
ledWallMat.specularIntensity = 0
ledWallMat.metallic = 0



export function changeTexture(texture:Texture){
  uvMat.albedoTexture = texture
  uvMat.emissiveTexture = texture
}

myVideoTexture.loop = true
myVideoTexture.playing = true

 const ledWallHeight = 2.9

// let ledWall = new Screen({
//   position: new Vector3(scene.venueCenter.x + 15.5, scene.venueCenter.y + ledWallHeight, scene.venueCenter.z),
//   rotation: Quaternion.Euler(0,-90,180),
//   scale: new Vector3(8,4,1)
// },
// false,
// ledWallMat,
// screen2StretchUV
// )

// let ledWall2 = new Screen({
//   position: new Vector3(scene.venueCenter.x + 13, scene.venueCenter.y + ledWallHeight, scene.venueCenter.z-7.8),
//   rotation: Quaternion.Euler(0,-55,180),
//   scale: new Vector3(8,4,1)
// },
// false,
// ledWallMat,
// screen3StretchUV
// )

// let ledWall3 = new Screen({
//   position: new Vector3(scene.venueCenter.x + 13, scene.venueCenter.y + ledWallHeight, scene.venueCenter.z+7.8),
//   rotation: Quaternion.Euler(0,-125,180),
//   scale: new Vector3(8,4,1)
// },
// false,
// ledWallMat,
// screen1StretchUV
// )

// let ledWallBG = new Entity()
// ledWallBG.addComponent(new Transform({
//   position: new Vector3(0,0,0),
//   rotation: Quaternion.Euler(0,0,0),
//   scale: new Vector3(1,1,1)
// }))
// ledWallBG.addComponent( screenBGShape)
// ledWallBG.setParent(ledWall)


// engine.addEntity(ledWall2)

// let ledWall2BG = new Entity()
// ledWall2BG.addComponent(new Transform({
//   position: new Vector3(0,0,0),
//   rotation: Quaternion.Euler(0,0,0),
//   scale: new Vector3(1,1,1)
// }))
// ledWall2BG.addComponent( screenBGShape)
// ledWall2BG.setParent(ledWall2)

// engine.addEntity(ledWall3)

// let ledWall3BG = new Entity()
// ledWall3BG.addComponent(new Transform({
//   position: new Vector3(0,0,0),
//   rotation: Quaternion.Euler(0,0,0),
//   scale: new Vector3(1,1,1)
// }))
// ledWall3BG.addComponent( screenBGShape)
// ledWall3BG.setParent(ledWall3)




let projectorColumns = new Projector(new Vector3(scene.columnsCenter.x, scene.columnsCenter.y+ 4 ,scene.columnsCenter.z), new Vector3(4,4,1), Quaternion.Euler(0,0,0), false)
let projectorScatter = new Projector(new Vector3(scene.venueCenter.x, scene.venueCenter.y + 3 ,scene.venueCenter.z), new Vector3(24,6,1), Quaternion.Euler(0,-90,0), true)


let ScreenGrpColumns = new ScreenGroup(projectorColumns)
let ScreenGrpScatter = new ScreenGroup(projectorScatter)



function addScatterScreens(_rows:number, _columns:number, radius:number, center:Vector3){

  let pos = new Vector3(0,0,1)
  let screenHeight = 1.5
  let screenWidth = 3.8
  let heightStep = screenHeight*1.1
  let angleRange = 75
  let centerAngle = -90

  let heightBase = 0.735 + screenHeight/2
  let height = 0
  let angleStep = angleRange/(_columns-1)
  let angle = centerAngle - angleStep * (_columns/2) + angleStep/2
  
  let currentAngle = -125


  for (let i=0; i< _rows; i++){

    height = heightBase + i*heightStep 

    for(let j=0; j< _columns - i%2; j++){

      currentAngle = angle + j*angleStep      

      if(i%2 == 1){
        currentAngle = angle + j*angleStep + angleStep/2
      }
      let offset = Math.random()*0.75

      pos = center.add(Vector3.Backward().rotate(Quaternion.Euler(0,currentAngle,0) ).multiplyByFloats(radius - offset ,radius - offset,radius - offset) )

      let screen = new Screen({
        position: new Vector3(pos.x, center.y + height, pos.z),
        rotation: Quaternion.Euler(0,currentAngle + Math.random()*10 -5, 1),
        scale: new Vector3(screenWidth - Math.random()*0.1, screenHeight - Math.random()*0.1, 1)},
        true, 
        ledWallMat)

        ScreenGrpScatter.addSCreen(screen)

      let ledWallBG = new Entity()
      ledWallBG.addComponent(new Transform({
        position: new Vector3(0,0,0),
        rotation: Quaternion.Euler(0,0,0),
        scale: new Vector3(1,1,1)
      }))
      ledWallBG.addComponent( screenBGShape)
      ledWallBG.setParent(screen)
    }
  }


}

addScatterScreens(3,6, 16, scene.venueCenter)
ScreenGrpScatter.updateScreens(projectorScatter.getComponent(Transform).position)

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
addColumnCircle(10, scene.venueCenter, 8)
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
    //projectorScatterTransfrom.lookAt(projectorScatterTransfrom.position)

   ScreenGrpColumns.updateScreens(player.position)
  

   
   //ScreenGroupFloor.updateScreens(player.position)


   for(let i = 0; i< columnsRight.length; i++){
     this.angleRight -= 4* dt
     let radius = 1.8     
    let offset = 360/columnsRight.length *i
      
     let pos =  scene.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,this.angleRight +offset ,0)).multiplyByFloats(radius,radius,radius))
     columnsRight[i].updateColumn(pos, Quaternion.Euler(0, 180 + this.angleRight + offset, 30),1.2, columnHeight, uvMat )
   }

   for(let i = 0; i< columnsLeft.length; i++){
     this.angleLeft += 4* dt
     let radius = 1.8     
    let offset = 360/columnsLeft.length *i
      
     let pos =  scene.venueCenter.add(Vector3.Backward().rotate(Quaternion.Euler(0,this.angleLeft +offset ,0)).multiplyByFloats(radius,radius,radius))
     columnsLeft[i].updateColumn(pos, Quaternion.Euler(0, 180 + this.angleLeft + offset, -30), 1.2, columnHeight, uvMat )
   }
 
  }
}
engine.addSystem(new rotateTestSystem())


