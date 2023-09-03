export interface DataJSON {
  [key: string]: Data;
}

export interface Data {
  fileContent: string[];
  analysis: {
    [key: string]: { constraints: Constraints };
  };
}

export interface Constraints {
  [key: string]: [Poly, Poly, Poly];
}

export interface Poly {
  [key: string]: string;
}
