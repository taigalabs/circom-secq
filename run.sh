#!/bin/bash
# cargo run --release demo/prfs_circuit_circom/circuits/instances/addr_membership2.circom \
#  --json --O0 --wasm --prime secq256k1 -o build/

# cargo run --release demo/prfs_circuit_circom/circuits/instances/addr_membership2.circom \
#  --r1cs --wasm --prime secq256k1 -o build/
#
cargo run --release demo/ex1.circom \
 --json --O0 --wasm --prime bls12381 -o demo_web/circuit_bls12381

cargo run --release demo/ex1.circom \
 --json --O0 --wasm --prime secq256k1 -o demo_web/circuit_secq256k1
