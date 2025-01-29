export interface BondingBox {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface DetectedObject {
  score: number;
  label: string;
  box: BondingBox;
}
