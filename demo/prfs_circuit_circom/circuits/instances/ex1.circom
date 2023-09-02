pragma circom 2.1.2;

/*This circuit template checks that c is the multiplication of a and b.*/  
template Multiplier2 () {  
 /* signal input a; */
 /* signal output b; */
 /* var x = a^3; */
 /* x = x + a; */
 /* b <== x; */
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

 component main = Multiplier2();
