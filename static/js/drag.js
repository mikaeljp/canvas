function Card(x, y, img) {
	this.x = x || 0;
	this.y = y || 0;
	this.w = 45;
	this.h = 64;
	this.loaded = false;
	this.visible = true;
	source = new Image();
	source.src = img;
	source.onload = this.load(source);
}

Card.prototype.load = function(img) {
	this.loaded = true;
	this.img = img;
}

Card.prototype.draw = function(ctx) {
	if (this.loaded) {
		if (this.visible) {
			ctx.drawImage(this.img, this.x, this.y)
		}
	} else {
		ctx.valid = false;
	}
}

Card.prototype.contains = function(mx, my) {
	return (this.x <= mx) && (this.x + this.w >= mx) &&
				 (this.y <= my) && (this.y + this.h >= my);
}

function Deck() {
	this.cards = [
		new Card(100, 100, 'static/img/1.png'),
		new Card(150, 100, 'static/img/2.png'),
		new Card(200, 100, 'static/img/3.png'),
		new Card(250, 100, 'static/img/4.png'),
		new Card(300, 100, 'static/img/5.png'),
		new Card(350, 100, 'static/img/6.png')
	];
	this.cardList = this.cards;
}

Deck.prototype.initCard = function(cardex) {
	this.cardList.push(this.cards[cardex]);
	console.log('added card');
}

Deck.prototype.initCards = function(cardexArray) {
  count = cardexArray.length;
  for (var i = 0; i < count; i += 1) {
  	this.initCard(cardexArray[i]);
  }
}

function CanvasState(canvas) {
	//setup
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext('2d');

	var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
	if (document.defaultView && document.defaultView.getComputedStyle) {
		this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
		this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
		this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
		this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
	}
	//fix for fixed-position bars
	var html = document.body.parentNode;
	this.htmlTop = html.offsetTop;
	this.htmlLeft = html.offsetLeft;

	//state
	this.valid = false;
	this.deck = new Deck();
	this.cards = this.deck.cards;
	this.dragging = false;
	this.selection = null;
	this.dragoffx = 0;
	this.dragoffy = 0;

	//events
	var myState = this;
	canvas.addEventListener('selectstart', function(e) { 
		e.preventDefault(); return false; 
	}, false);

	canvas.addEventListener('mousedown', function(e) {
		var mouse = myState.getMouse(e);
		var mx = mouse.x;
		var my = mouse.y;
		var cards = myState.cards;
		var l = cards.length;
		for (var i = l-1; i >= 0; i--) {
			if (cards[i].contains(mx, my)) {
				var mySel = cards[i];
				myState.dragoffx = mx - mySel.x;
				myState.dragoffy = my - mySel.y;
				myState.dragging = true;
				myState.selection = mySel;
				myState.valid = false;
				return;
			}
		}
		if (myState.selection) {
			myState.selection = null;
			myState.valid = false;
		}
	}, true);

	canvas.addEventListener('mousemove', function(e) {
		if (myState.dragging) {
			var mouse = myState.getMouse(e);
			myState.selection.x = mouse.x - myState.dragoffx;
			myState.selection.y = mouse.y - myState.dragoffy;
			myState.valid = false;
		}
	}, true);

	canvas.addEventListener('mouseup', function(e) {
		myState.dragging = false;
	}, true);

	canvas.addEventListener('dblclick', function(e) {
		var mouse = myState.getMouse(e);
		myState.addShape(new Card(mouse.x-22, mouse.y-32, 'img/1.png'));
	}, true);
	// shape defaults
	this.selectionColor = '#CC0000';
	this.selectionWidth = 2;
	this.interval = 30;
	setInterval(function() { myState.draw(); }, myState.interval);
}

CanvasState.prototype.drawTo = function(x, y) {
	
	this.valid = false;
}

CanvasState.prototype.clear = function() {
	this.ctx.clearRect(0, 0, this.width, this.height);
}

CanvasState.prototype.draw = function() {
	if (!this.valid) {
		var ctx = this.ctx;
		var cards = this.cards;
		this.clear();

		//draw all
		var l = cards.length;
		for (var i=0; i < l; i++) {
			var card = cards[i];
			if (card.x > this.width || card.y > this.height || 
				  card.x + card.w < 0 || card.y + card.j < 0) continue;
			shapes[i].draw(ctx);
		}

		//draw selection
		if (this.selection != null) {
			ctx.strokeStyle = this.selectionColor;
			ctx.lineWidth = this.selectionWidth;
			var mySel = this.selection;
			ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
		}
		this.valid = true;
	}
}

CanvasState.prototype.getMouse = function(e) {
	var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
	//compute offset
	if (element.offsetParent !== undefined) {
		do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;;
		} while ((element = element.offsetParent));
	}

	//add padding
	offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
	offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

	mx = e.pageX - offsetX;
	<img src='static/img/6.png' />
	my = e.pageY - offsetY;

	return {x: mx, y: my};
}

function init() {
	var s1 = new CanvasState(document.getElementById('canvas1'));
	var s2 = new CanvasState(document.getElementById('table'));
	s1.initCards([0,0,1,1,2,2,3,3,4,4,5,5,5,5,5,5]);
	var c = new Card(350, 100, 'static/img/6.png')
	//s1.drawTo(100,100);
}
