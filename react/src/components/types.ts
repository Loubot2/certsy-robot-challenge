// enum Direction {
//   Up,
//   Down,
//   Left,
//   Right,
// }

export enum Facing  {
  NORTH, 
  EAST, 
  SOUTH, 
  WEST
}

export type Robot =  {
  x: number;
  y: number;
  facing: Facing;
}