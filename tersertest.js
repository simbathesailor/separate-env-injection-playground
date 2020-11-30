if (false) {
  console.log("hello");
}

if (true) {
  console.log("I should get rid of enclosing tag");
}

if (2 == 2) {
  console.log("I should get rid of enclosing tag 2==2");
}

if (!0) {
  console.log("I should get rid of enclosing tag !0");
}

if (!undefined) {
  console.log("I should get rid of enclosing tag !undefined");
}

if (undefined || 0) {
  console.log("I shouild get rid of entire code itself undefined || 0");
}
