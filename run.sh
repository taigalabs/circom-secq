#!/bin/bash
cargo run --release demo/vitalik.circom \
 --json --O0 --wasm --prime bls12381 -o demo_web/circuit_bls12381

cargo run --release demo/vitalik.circom \
 --json --O0 --wasm --prime secq256k1 -o demo_web/circuit_secq256k1

cargo run --release demo/multiplier2.circom \
 --json --O0 --wasm --prime bls12381 -o demo_web/circuit_bls12381

cargo run --release demo/multiplier2.circom \
 --json --O0 --wasm --prime secq256k1 -o demo_web/circuit_secq256k1

cargo run --release demo/multiplier3.circom \
 --json --O0 --wasm --prime bls12381 -o demo_web/circuit_bls12381

cargo run --release demo/multiplier3.circom \
 --json --O0 --wasm --prime secq256k1 -o demo_web/circuit_secq256k1
