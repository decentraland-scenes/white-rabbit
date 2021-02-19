import { scene } from './scene'
import { distance } from "modules/utilities/utilities";

// ------------------------------------------------------------

/* ===================================================
* ====== 1. Water plane, material, texture, uvs ======
* ==================================================== */

// Create shape component
const waterPlane = new PlaneShape()

// Create material
const waterMaterial = new Material()
let waterTexture = new Texture("images/textures/water.png", {wrap: 1})
waterMaterial.albedoTexture = waterTexture
waterMaterial.albedoColor = new Color4(1.2,1.5,1.5,0.5)
waterMaterial.metallic = 0.6
waterMaterial.roughness = 0.4
waterMaterial.reflectivityColor = new Color3(0,0,0)

let currentScroll = 1 // Current scrolling amount (move this value to scroll)

// Calculated variables
let yFactor = 0.5
let xFactor = 0.5

// Set the starting UV's
let xStart = 2 - Math.floor((currentScroll-1)/2)
let yStart = ((currentScroll-1)%2)

waterPlane.uvs = [
  (yStart+1)*yFactor, (xStart-1)*xFactor,
  yStart*yFactor, (xStart-1)*xFactor,
  
  yStart*yFactor, xStart*xFactor,
  (yStart+1)*yFactor, xStart*xFactor,
  
  (yStart+1)*yFactor, (xStart-1)*xFactor,
  yStart*yFactor, (xStart-1)*xFactor,
  
  yStart*yFactor, xStart*xFactor,
  (yStart+1)*yFactor, xStart*xFactor
]

// ------------------------------------------------------------


/* =======================
* ====== 2. Grasses ======
* ======================== */

const Grasses: Entity[] =
[
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity(),
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity(),
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity(),
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity(),
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity(),
  new Entity(), new Entity(), new Entity(), new Entity(), new Entity()
]

var GrassesLocations: Vector3[] = 
[
  // Left Side from 0,0
  new Vector3(6.680, 0.315, 19.972), 
  new Vector3(6.650, 0.595, 24.972), 
  new Vector3(6.555, 0.311, 30.247), 
  new Vector3(5.793, 0.222, 37.688), 
  new Vector3(6.525, 0.187, 44.006), 

  new Vector3(9.688, 0.840, 49.775), 
  new Vector3(15.972, 0.619, 53.236), 
  new Vector3(21.913, 0.177, 53.401), 
  new Vector3(27.399, 0.635, 52.430), 
  new Vector3(20.088, 0.944, 6.423),  // 10

  new Vector3(20.760, 2.726, 10.625), 
  new Vector3(22.670, 4.062, 15.496), 

  // Forest (right side of venue)
  new Vector3(26.263, 1.778, 10.632), 
  new Vector3(40.681, 1.141, 9.068),
  new Vector3(61.581, 1.141, 9.268),

  new Vector3(73.081, 0.141, 53.268),

  // Forest (left side of venue)
  new Vector3(33.946, 1.320, 49.593),
  new Vector3(38.193, 1.474, 47.106),
  new Vector3(50.113, 0.111, 56.835),
  new Vector3(55.850, 0.190, 56.345), // 20
  new Vector3(82.875, 0.060, 44.301), 
  new Vector3(83.556, 0.060, 39.430),

  new Vector3(85.780, 0.060, 25.206),
  new Vector3(85.142, 0.060, 30.860),
  new Vector3(70.847, 0.060, 11.219),

  new Vector3(80.847, 0.060, 9.219),
  new Vector3(88.847, 0.060, 18.219),
]

  
// ------------------------------------------------------------

/* ======================================================
* ====== 3. Spawning Environment & scrolling water ======
* ======================================================= */

export function spawnEnvironment() {
  
  // Spawn ground
  const ground: Entity        = InstantiateEntOrigin("models/ground_level.glb")

  // Spawn mana mushroom
  const manaMushroom: Entity  = InstantiateEnt("models/mana_mushroom.glb", new Vector3(27,1,36), new Vector3(1,1,1), new Quaternion(0,0,0,1))

  // Spawn leaf boat 
  const leafBoat: Entity      = InstantiateEnt("models/leaf_boat.glb", new Vector3(0,0,0), new Vector3(1,1,1), new Quaternion(0,0,0,1))

  const animName = "LeafyAction"
  leafBoat.addComponent(new Animator())
  leafBoat.getComponent(Animator).addClip(new AnimationState(animName, { looping: false }))
    
  let leafBoatAnim = leafBoat.getComponent(Animator).getClip(animName)
  leafBoatAnim.stop()
  leafBoatAnim.play()
  leafBoatAnim.stop()
  
  // Grass
  let randVal = 0
  let randRot = 0
  let randScale = 0

  for (let i = 0; i < 27; i++) 
  {
    randScale = randomIntIntervalInclusive(80, 90) // Warning increasing size too much might create out of bounds grass
    Grasses[i].addComponent(new GLTFShape("models/grass_bundle.glb"))
    Grasses[i].addComponent(new Transform({
      position: GrassesLocations[i],
      scale: new Vector3(randScale/100,randScale/100,randScale/100),
      rotation:new Quaternion(0,i*35,0,1)
    }))
    engine.addEntity(Grasses[i]) 
  }

  // Water
  const water = new Entity()
  water.addComponent(waterPlane)
  water.addComponent(new Transform({
    position: new Vector3(20, 1.1, 37),
    rotation: Quaternion.Euler(90, 0, 270),
    scale: new Vector3(32,24,1)
  }))
  water.addComponentOrReplace(waterMaterial)
  engine.addEntity(water)

  const TILING_FACTOR = 16    // How much texture repeats
  const SCROLL_SPEED = 0.001  // How fast water scrolls


  class Update {
  
    ticks     = 0
    seconds   = 0
    camPos    = Camera.instance.position
    leafPos   = new Vector3(12.25, 5.75, 19.25)
    animPlayed  = false
    
    update(dt: number): void {
      this.ticks    += 1
      this.seconds  += dt

      currentScroll += SCROLL_SPEED

      // Check if player is on leaf, then start ride
      if (this.ticks % 48 == 0)
      {
        if (distance(this.camPos, this.leafPos) < 12 && !this.animPlayed)
        {
          leafBoatAnim.play()
          this.animPlayed = true
        }
      }

      let currRowStart = 2 - ((currentScroll-1)/2)
      let currColStart = ((currentScroll-1)%2)

      waterPlane.uvs = [
        (currColStart+1)*yFactor*TILING_FACTOR, (currRowStart-1)*xFactor*TILING_FACTOR,
        currColStart*yFactor*TILING_FACTOR, (currRowStart-1)*xFactor*TILING_FACTOR,
        currColStart*yFactor*TILING_FACTOR, currRowStart*xFactor*TILING_FACTOR,
        (currColStart+1)*yFactor*TILING_FACTOR, currRowStart*xFactor*TILING_FACTOR,
        (currColStart+1)*yFactor*TILING_FACTOR, (currRowStart-1)*xFactor*TILING_FACTOR,
        currColStart*yFactor*TILING_FACTOR, (currRowStart-1)*xFactor*TILING_FACTOR,
        currColStart*yFactor*TILING_FACTOR, currRowStart*xFactor*TILING_FACTOR,
        (currColStart+1)*yFactor*TILING_FACTOR, currRowStart*xFactor*TILING_FACTOR
      ]

    }
    
  }
  
  engine.addSystem(new Update())

}

// ------------------------------------------------------------

// Create Entity Helper
export function InstantiateEnt( path , pos, scale, rot )
{
  const newEnt: Entity = new Entity()
  newEnt.addComponent(new GLTFShape(path))
  newEnt.addComponent(new Transform({
    position: pos,
    scale: scale,
    rotation: rot
  }))
  engine.addEntity(newEnt)
  return newEnt
}

// Create Entity at Origin Helper
export function InstantiateEntOrigin( path )
{
  const newEnt: Entity = new Entity()
  newEnt.addComponent(new GLTFShape(path))
  newEnt.addComponent(new Transform({
    position: new Vector3(0,0,0),
    scale: new Vector3(1,1,1),
    rotation: new Quaternion(0,0,0,1)
  }))
  engine.addEntity(newEnt)
  return newEnt
}

// Random number function
function randomIntIntervalInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
