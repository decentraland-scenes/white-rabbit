
class Scene {
  public center:Vector3 = new Vector3(6*16/2, 0, 4*16/2)
}

let scene = new Scene()

let shroomShape = new GLTFShape("models/shroom_building.glb")

let shroomBuilding = new Entity()
shroomBuilding.addComponent(new Transform({position: scene.center}))
shroomBuilding.addComponent(shroomShape)
engine.addEntity(shroomBuilding)