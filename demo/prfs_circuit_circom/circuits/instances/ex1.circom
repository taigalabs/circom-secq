pragma circom 2.1.2;

/*This circuit template checks that c is the multiplication of a and b.*/  
template Multiplier2 () {  

   // Declaration of signals.  
   signal input a;  
   signal input b;  
   signal output c;  

   // Constraints.  
   signal d;
   d <== a * 2;
   c <== d * b;  
}

 component main = Multiplier2();
