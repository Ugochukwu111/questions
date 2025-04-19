let countEl = document.querySelector('.countEl')
console.log(countEl);


let count = 0;

function addone() {
  count = count + 1;
  console.log(count)
}

addone()
var box = document.querySelector('#box');
var MoveX = box.offsetLeft;
var MoveY = box.offsetTop;
var x, y = 0;
function update(){
  box.style.top = box.offsetTop;
  box.style.left = box.offsetLeft;
};
alert(MoveY);
function rotate(elem, angle){
  
}