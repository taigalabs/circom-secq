#!/bin/bash
# cargo run --release demo/prfs_circuit_circom/circuits/instances/addr_membership2.circom \
#  --json --O0 --wasm --prime secq256k1 -o build/

# cargo run --release demo/prfs_circuit_circom/circuits/instances/addr_membership2.circom \
#  --r1cs --wasm --prime secq256k1 -o build/
#
cargo run --release demo/prfs_circuit_circom/circuits/instances/ex1.circom \
 --json --O0 --wasm --prime secq256k1 -o build/
