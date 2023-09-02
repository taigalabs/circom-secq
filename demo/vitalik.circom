pragma circom 2.1.2;

template Vitalik () {  
 signal input a;
 signal output b;
 signal x;
 signal y;
 signal z;

 x <== a * a;
 y <== x * a;
 z <== y + 5;
 z === 35;
}

 component main = Vitalik();
