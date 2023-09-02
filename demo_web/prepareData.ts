import path from "path";
import fs from "fs";

const demoCircuitDir = path.resolve("../demo");
const dataJsonPath = path.resolve("data.json");
const circuitBls12381 = path.resolve("./circuit_bls12381");
const circuitSecq256k1 = path.resolve("./circuit_secq256k1");

const circuitNames = ["vitalik", "multiplier2", "multiplier3"];

function loadCircuitData() {
  const data = {} as DataJSON;

  circuitNames.forEach((circuitName) => {
    const filename = path.join(demoCircuitDir, `${circuitName}.circom`);
    const fd = fs.readFileSync(filename);
    const content = fd.toString().split("\n");

    data[circuitName] = {} as any;
    data[circuitName].fileContent = content;

    data[circuitName].analysis = {} as any;
    const bls12381Filename = path.join(
      circuitBls12381,
      `${circuitName}_constraints_ext.json`
    );

    data[circuitName].analysis.bls12381 = require(bls12381Filename);

    const secq256k1Filename = path.join(
      circuitSecq256k1,
      `${circuitName}_constraints_ext.json`
    );

    data[circuitName].analysis.secq256k1 = require(secq256k1Filename);
  });

  fs.writeFileSync(dataJsonPath, JSON.stringify(data));
}

loadCircuitData();

interface DataJSON {
  [key: string]: Data;
}

interface Data {
  fileContent: string[];
  analysis: {
    [key: string]: { [key: string]: string }[][];
  };
}
