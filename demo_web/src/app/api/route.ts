import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const demoCircuitDir = path.resolve("../../../../demo");
const circuitBuildDir = path.resolve("../../../circuit_build/");
console.log("circuitBuildDir: %s", circuitBuildDir);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");
  // const res = await fetch(`https://data.mongodb-api.com/product/${id}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     "API-Key": process.env.DATA_API_KEY,
  //   },
  // });
  const product = { powre: 1 };

  return NextResponse.json({ product });
}
