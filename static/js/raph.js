Function.prototype.bind = function(object){
  var fn = this;
  return function(){
    return fn.apply(object, arguments);
  };
};

function init() {
  var paper = Raphael('table', 800,400);
  //add tile experiment
  var f = new Field(paper,0,0);
  var s = paper.circle(250,100,50);
  s.attr({fill:'pink'});
  var t = paper.text(250,100,"click to\nadd tile");
  t.attr({"font-size":20});
  var clickMe = function(){
    a = new Box(paper,100,200,'orange');
    f.addTile(a);
  }
  s.node.onclick = clickMe;
  t.node.onclick = clickMe;

  //neighbor experiment
  var a = new Box(paper,500,100,'orange');
  var b = new Box(paper,600,200,'orange');
  var c = new Box(paper,500,200,'blue');
  var d = new Box(paper,600,100,'blue');

  a.addNeighbor(c);
  a.addNeighbor(d);
  b.addNeighbor(c);
  b.addNeighbor(d);
};

var start = function(){
  var inFlight = {
    width:120,
    height:120,
    x:this.attr("x") - 10,
    y:this.attr("y") - 10
  };
  this.ox = this.attr("x");
  this.oy = this.attr("y");
  this.toFront();
  this.animate(inFlight,100,">");
}

var move = function(dx, dy){
  this.attr({x: this.ox + dx -10, y: this.oy + dy-10});
}

var up = function(){
  var placement = {
    width:100,
    height:100,
    x:this.ox,
    y:this.oy
  };
  this.animate(placement,100,">");
}

function Field(parent,x,y) {
  //fields are always 400px sq. 
  //tiles should appear centered and clustered
  this.body = parent.rect(x,y,400,400)
  this.body.attr({fill:null})
  this.source = {'x':x, 'y':y};
  this.tiles = [];
}

Field.prototype.jostle = function(){
  //need to re-calculate each tile's location, then animate each one to that spot
  // |------[]------|
  // |----[]----[]----|
  // |---[]---[]---[]---|
  // x = [totalSpace / (nodes + 1)] * nodeNumber
  tileCount = this.tiles.length;
  tileOffset = 400/(tileCount+1);
  for (var i=0; i<this.tiles.length; i+=1){
    this.tiles[i].shape.animate({x:this.source['x'] + tileOffset*(i+1) - 50},500,">");
  }
}

Field.prototype.addTile = function(tile){
  for (var i=0; i<this.tiles.length; i+=1){
    tile.addNeighbor(this.tiles[i])
  }
  this.tiles.push(tile);
  this.jostle();
}

function Box(parent,x,y,color) {
  this.color = color;
  this.neighbors = [];
  this.shape = parent.rect(x,y,99,99,10);
  this.shape.attr({fill:color});
  this.shape.node.onclick = this.toggle.bind(this);
  this.shape.drag(move, start, up);
  // this.shape.onDragOver(this.over.bind(this));
};

Box.prototype.addNeighbor = function(box) {
  if (this.neighbors.indexOf(box) == -1) {
    this.neighbors.push(box);
    box.addNeighbor(this);
  }
};

// Box.prototype.over = function(target){
//   target.animate({fill:this.color},500,">");
// };


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

Box.prototype.fade = function(evnt) {
  this.shape.attr({fill:"black"});
}
