function init() {
  var paper = Raphael('table', 500,500);
  var a = new Box(paper,100,100,'orange');
  var b = new Box(paper,200,200,'orange');
  var c = new Box(paper,100,200,'blue');
  var d = new Box(paper,200,100,'blue');
}

function Box(parent,x,y,color) {
  shape = parent.rect(x,y,100,100,10);
  shape.attr({fill:color});
  shape.node.onclick = function() {
    var thisShape = shape;
    var thisColor = color;
    return function() {
      thisColor = thisColor=='orange'?'blue':'orange';
      thisShape.animate({fill: thisColor}, 1000, "linear");
    }
  }();
}


var toggle = function(evt) {
  alert('clicked');
}
