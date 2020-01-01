/*
function Person(fullName, favColor){
	this.name = fullName;
	this.favoriteColor = favColor;
	this.greet=function(){
	console.log("hello object, my name is " + this.name + "and my color is " + this.favoriteColor);
}

}
*/

class Person {
  constructor(fullName, favColor) {
    this.name = fullName;
    this.favoriteColor = favColor;
  }

  greet() {
    console.log("hell babel !!!!!PPP");
  }
}

module.exports = Person;
