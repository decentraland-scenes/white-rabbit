export function distance(pos1: Vector3, pos2: Vector3): number {
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return a * a + b * b
}
  
export function realDistance(pos1: Vector3, pos2: Vector3): number 
{
    const a = pos1.x - pos2.x
    const b = pos1.z - pos2.z
    return Math.sqrt(a * a + b * b)
}
  
export function ToDegrees(radians)
{
    var pi = Math.PI;
    return radians * (180/pi);
}

export function ToRadian(degrees)
{
    var pi = Math.PI;
    return degrees * (pi/180);
}
