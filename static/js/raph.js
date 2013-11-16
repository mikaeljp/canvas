Function.prototype.bind = function(object){
  var fn = this;
  return function(){
    return fn.apply(object, arguments);
  };
};

function init() {
  var paper = Raphael('table', 500,500);
  var a = new Box(paper,100,100,'orange');
  var b = new Box(paper,200,200,'orange');
  var c = new Box(paper,100,200,'blue');
  var d = new Box(paper,200,100,'blue');
  a.addNeighbor(c);
  a.addNeighbor(d);
  b.addNeighbor(c);
  b.addNeighbor(d);
  c.addNeighbor(a);
  c.addNeighbor(b);
  d.addNeighbor(a);
  d.addNeighbor(b);
  a.shape.node.onclick = a.toggle.bind(a, false);
  b.shape.node.onclick = b.toggle.bind(b, false);
  c.shape.node.onclick = c.toggle.bind(c, false);
  d.shape.node.onclick = d.toggle.bind(d, false);
};

function Box(parent,x,y,color) {
  this.color = color;
  this.neighbors = [];
  this.shape = parent.rect(x,y,99,99,10);
  this.shape.attr({fill:color});
};

Box.prototype.addNeighbor = function(box) {
  if (this.neighbors.indexOf(box) == -1) {
    this.neighbors.push(box);
  }
};

Box.prototype.toggle = function(evt) {
  this.color = (this.color=='orange'?'blue':'orange');
  this.shape.animate({fill:this.color},1000,"linear");
  if (evt) {
    for (var i = 0; i < this.neighbors.length; i += 1) {
      this.neighbors[i].toggle()
    } 
  }
};
