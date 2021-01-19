import { isBundle } from '../../node_modules/typescript/lib/typescript'
import { Projector } from './projector'

export class Screen extends Entity {

    screenMesh:Entity
    screenPlane:PlaneShape
    isTwoSided:boolean = true
    isCollider:boolean = false
  
    corner00:Vector3 
    corner10:Vector3 
    corner11:Vector3 
    corner01:Vector3 
  
    corner00Mesh:Entity
    corner10Mesh:Entity
    corner11Mesh:Entity
    corner01Mesh:Entity
  
    constructor(_transform:TranformConstructorArgs, _twoSided:boolean, _mat:Material ){
      super()

      this.isTwoSided = _twoSided

      this.screenPlane = new PlaneShape()
      this.screenPlane.withCollisions = this.isCollider  
          
      this.screenMesh = new Entity()
      this.screenMesh.addComponent(new Transform({rotation: Quaternion.Euler(0,0,0)}))
      this.screenMesh.setParent(this)
      this.screenMesh.addComponent(this.screenPlane)
      this.screenMesh.addComponent ( _mat)
      
      this.addComponent(new Transform(_transform))        
  
      //DEBUG
      // this.corner00Mesh = new Entity()
      // this.corner10Mesh = new Entity()
      // this.corner11Mesh = new Entity()
      // this.corner01Mesh = new Entity()
  
      // this.corner00Mesh.addComponent(new SphereShape())
      // this.corner10Mesh.addComponent(new SphereShape())
      // this.corner11Mesh.addComponent(new SphereShape())
      // this.corner01Mesh.addComponent(new SphereShape())
  
      //bottom left
      this.corner00 = new Vector3(_transform.scale.x/2, -_transform.scale.y/2 , 0)   
      this.corner00.rotate(_transform.rotation)    
      this.corner00.addInPlace(_transform.position)
      
      
      //bottom right
      this.corner10 = new Vector3(-_transform.scale.x/2, -_transform.scale.y/2 , 0)   
      this.corner10.rotate(_transform.rotation)    
      this.corner10.addInPlace(_transform.position)        
      
      //top right
      this.corner11 = new Vector3(-_transform.scale.x/2, _transform.scale.y/2 , 0)   
      this.corner11.rotate(_transform.rotation)    
      this.corner11.addInPlace(_transform.position)        
      
  
      //top left
      this.corner01 = new Vector3(_transform.scale.x/2, _transform.scale.y/2 , 0)   
      this.corner01.rotate(_transform.rotation)    
      this.corner01.addInPlace(_transform.position)        
      
  
      // this.corner00Mesh.addComponent(new Transform({position:new Vector3(this.corner00.x,this.corner00.y,this.corner00.z), scale: new Vector3(0.1,0.1,0.1)}))     
      // this.corner10Mesh.addComponent(new Transform({position:new Vector3(this.corner10.x,this.corner10.y,this.corner10.z), scale: new Vector3(0.1,0.1,0.1)}))
      // this.corner11Mesh.addComponent(new Transform({position:new Vector3(this.corner11.x,this.corner11.y,this.corner11.z), scale: new Vector3(0.1,0.1,0.1)}))
      // this.corner01Mesh.addComponent(new Transform({position:new Vector3(this.corner01.x,this.corner01.y,this.corner01.z), scale: new Vector3(0.1,0.1,0.1)}))
  
      // engine.addEntity(this.corner00Mesh)  
      // engine.addEntity(this.corner10Mesh)
      // engine.addEntity(this.corner11Mesh)
      // engine.addEntity(this.corner01Mesh)    
  
      engine.addEntity(this)
      
    }
    getNormal():Vector3{
  
      let normal = Vector3.Forward().rotate(this.getComponent(Transform).rotation) 
      return normal
    }
  
    setUVs(_uv00:Vector2, _uv10:Vector2, _uv11:Vector2, _uv01:Vector2 ){
  
      this.screenPlane.uvs = [
        _uv00.x,
        _uv00.y,
  
        _uv10.x,
        _uv10.y,
  
        _uv11.x,
        _uv11.y,
  
        _uv01.x,
        _uv01.y,
      //----
        _uv00.x,
        _uv00.y,
  
        _uv10.x,
        _uv10.y,
  
        _uv11.x,
        _uv11.y,
  
        _uv01.x,
        _uv01.y
      ]    
    }
  
    updateCorners(){
  
      const transform = this.getComponent(Transform)
  
      this.updateCorner(this.corner00, this.corner00Mesh, new Vector3( transform.scale.x/2, -transform.scale.y/2 , 0) )
      this.updateCorner(this.corner10, this.corner10Mesh, new Vector3(-transform.scale.x/2, -transform.scale.y/2 , 0) )
      this.updateCorner(this.corner11, this.corner11Mesh, new Vector3(-transform.scale.x/2,  transform.scale.y/2 , 0) )
      this.updateCorner(this.corner01, this.corner01Mesh, new Vector3( transform.scale.x/2,  transform.scale.y/2 , 0) )
    
    }
  
    updateCorner(cornerVec:Vector3, cornerMesh:Entity, offsetVec:Vector3){
      const _transform = this.getComponent(Transform)
  
      cornerVec.copyFrom(offsetVec)
      cornerVec.rotate(_transform.rotation)    
      cornerVec.addInPlace(_transform.position)    
  
      //cornerMesh.getComponent(Transform).position.set(cornerVec.x, cornerVec.y, cornerVec.z)
    }
  
    projectPoints(normal:Vector3, planePos:Vector3){
      
      this.updateCorners()
      this.getProjectedCorner("00", normal, planePos)
      this.getProjectedCorner("10", normal, planePos)
      this.getProjectedCorner("11", normal, planePos)
      this.getProjectedCorner("01", normal, planePos)    
  
      
     }
    getProjectedCorner(cornerID, normal:Vector3, planePos:Vector3):Vector3{
  
      const transform = this.getComponent(Transform)
  
      let cornerVec = Vector3.Up()
      let cornerMesh = this.corner00Mesh
      let offsetVec = Vector3.Zero()
  
      switch (cornerID) {
        case "00":
          {
            offsetVec = new Vector3(transform.scale.x/2, -transform.scale.y/2 , 0)
            cornerMesh = this.corner00Mesh
            break
          }
        case "10":
          {
            offsetVec = new Vector3(-transform.scale.x/2, -transform.scale.y/2 , 0)
            cornerMesh = this.corner10Mesh
            break
          }
        case "11":
          {
            offsetVec = new Vector3(-transform.scale.x/2, transform.scale.y/2 , 0)
            cornerMesh = this.corner11Mesh
            break
          }
        case "01":
          {
            offsetVec = new Vector3(transform.scale.x/2, transform.scale.y/2 , 0)
            cornerMesh = this.corner01Mesh
            break
          }
      }
  
      cornerVec.copyFrom(offsetVec)
      cornerVec.rotate(transform.rotation)    
      cornerVec.addInPlace(transform.position)
  
      let vecToPoint = cornerVec.subtract(planePos)
      let scaler = Vector3.Dot(vecToPoint, normal) / Math.pow(normal.length(), 2 )     
      let result = normal.scale(scaler)   
      result.scaleInPlace(-1)
  
     // cornerMesh.getComponent(Transform).position.set(cornerVec.x + result.x, cornerVec.y + result.y, cornerVec.z + result.z)
  
      return new Vector3(cornerVec.x+ result.x, cornerVec.y + result.y, cornerVec.z + result.z)
    }  
  }

  export class ScreenGroup {
    screens:Screen[] = []
    projectorReference:Projector 
  
    constructor(_projector:Projector){
      this.projectorReference = _projector
    }
  
    addSCreen(_screen:Screen){
      this.screens.push(_screen)
  
    }
    updateScreens(_targetPos:Vector3){
      const projectorTransfrom = this.projectorReference.getComponent(Transform)
      const projectorPos = this.projectorReference.getPos()        
      const projectorNormal = this.projectorReference.getNormalVector()     
  
      for(let i=0; i< this.screens.length; i++){
        
        if(!this.screens[i].isTwoSided){
            let facingPLayerFactor = Vector3.Dot(this.screens[i].getNormal(), _targetPos.subtract(this.screens[i].getComponent(Transform).position)) 
  
            if(facingPLayerFactor >= 0){
                this.screens[i].screenPlane.visible = true
                this.screens[i].projectPoints(this.projectorReference.getNormalVector(), this.projectorReference.getPos())
      
                this.screens[i].setUVs(
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("00", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("10", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("11", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("01", projectorNormal, projectorPos))
              )
            }else{
                this.screens[i].screenPlane.visible = false
            }
        }else{
            this.screens[i].projectPoints(this.projectorReference.getNormalVector(), this.projectorReference.getPos())
      
              this.screens[i].setUVs(
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("00", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("10", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("11", projectorNormal, projectorPos)),
                this.projectorReference.getUVfromCoords(this.screens[i].getProjectedCorner("01", projectorNormal, projectorPos))
              )
        }
        
        
        
        
      }
    }
  }