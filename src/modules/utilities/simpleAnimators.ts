

@Component("ScalePulse")
export class ScalePulse{  

   active:boolean = false
   x:boolean
   y:boolean
   z:boolean

   xAmp:number = 1
   yAmp:number = 1
   zAmp:number = 1

   xBase:number = 1
   yBase:number = 1
   zBase:number = 1

   xFreq:number = 2
   yFreq:number = 2
   zFreq:number = 2

   constructor(_xPulse:boolean, _yPulse:boolean, _zPulse:boolean, _amp:Vector3, _base:Vector3, _freq:Vector3){
       this.x = _xPulse
       this.y = _yPulse
       this.z = _zPulse

       this.xAmp = _amp.x
       this.yAmp = _amp.y
       this.zAmp = _amp.z

       this.xBase = _base.x
       this.yBase = _base.y
       this.zBase = _base.z
       
       this.xFreq = _freq.x
       this.yFreq = _freq.y
       this.zFreq = _freq.z
   }
     
    activate(){
        this.active = true
    }
    deactivate(){
        this.active = false
    }

}

@Component("YRotator")
export class YRotator{  

   active:boolean = false
   speed:number = 2

   constructor(_speed:number){
       this.speed = _speed
   }
     
    setActive(_active:boolean){
        this.active = _active
    }

}

@Component("SwayRotator")
export class SwayRotator{  

   active:boolean = false
   speed:number = 2
   freq:number = 2
   amp:number = 20
   startRot:Quaternion
   endRot:Quaternion
   fraction

   constructor( _freq:number, _startRot:Quaternion, _endRot:Quaternion){  
        
        this.freq = _freq
        this.startRot = _startRot
        this.endRot = _endRot
   }
     
    setActive(_active:boolean){
        this.active = _active
    }

}

class SimpleAnimatorSystem {

    scaleGroup = engine.getComponentGroup(ScalePulse, Transform)
    rotateYGroup = engine.getComponentGroup(YRotator, Transform)
    swayRotatorGroup = engine.getComponentGroup(SwayRotator, Transform)

    elapsedTime = 0

    update(dt:number){

        this.elapsedTime += dt

        for(let entity of this.scaleGroup.entities){
            const info = entity.getComponent(ScalePulse)
            const transform = entity.getComponent(Transform)

            if(info.active){
                if(info.x) {
                    transform.scale.x = info.xBase + Math.sin(this.elapsedTime * info.xFreq)* info.xAmp 
                }
                if(info.y) {
                    transform.scale.y = info.yBase +  Math.sin(this.elapsedTime * info.yFreq)* info.yAmp   
                }
                if(info.z) {
                    transform.scale.z = info.zBase + Math.sin(this.elapsedTime * info.zFreq)* info.zAmp
                }
            }
            else{
                transform.scale.set(info.xBase, info.yBase, info.zBase)
            }
           
        }

        for(let entity of this.rotateYGroup.entities){
            const info = entity.getComponent(YRotator)
            const transform = entity.getComponent(Transform)

            
            transform.rotate(Vector3.Up(), dt * info.speed)
            
        }

        for(let entity of this.swayRotatorGroup.entities){
            const info = entity.getComponent(SwayRotator)
            const transform = entity.getComponent(Transform)

            
           info.fraction = (Math.sin(this.elapsedTime * info.freq) + 1) *0.5

            transform.rotation = Quaternion.Slerp(info.startRot, info.endRot, info.fraction)
            
        }

    }
}
engine.addSystem( new SimpleAnimatorSystem())


