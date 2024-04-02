
let x = prompt("Enter A Value");
let y = prompt("Enter B Value");
document.write("Before Swapping A = "+x+"B = " +y );
x = x + y;
y = x - y;
x = x - y;
document.write("After swapping:"+ " x = " + x + ", y = " + y);