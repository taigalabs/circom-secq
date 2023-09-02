#!/bin/bash
cargo run --release demo/prfs_circuit_circom/circuits/instances/addr_membership2.circom \
  --r1cs --wasm --prime secq256k1 -o build/
