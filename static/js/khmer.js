var imageRepo = new function() {
	this.background = new Image();
	this.background.src = "img/bg.jpg"
}

function Drawable() {
	this.init = function(x,y) {
		this.x = x;
		this.y = y;
	};

	this.canvasWidth = 0;
	this.canvasHeight = 0;

	this.draw = function() {
	};
}

function Background() {
	this.draw = function() {
		this.context.drawImage(imageRepo.background this.x, this.y);
	};
}

Background.prototype = new Drawable();

function Game() {
	this.init = function() {
		this.bgCanvas = document.getElementById('table');
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
		
		Background.prototype.context = this.bgContext;
		Background.prototype.canvasWidth = this.bgCanvas.width;
		Background.prototype.canvasHeight = this.bgCanvas.height;

		this.background = new Background();
		this.background.init(0,0);
		return true;
	} else {
		return false;
	}
	};
	this.start = function() {
		animate();
	};
}

function animate() {
	requestAnimFrame( animate );
	game.background.draw();
}

window.requestAnimFrame = (function(){
	return window.requesAnimationFrame 		||
		window.webkitRequestAnimationFrame	||
		window.mozRequestAnimationFrame		||
		window.oRequestAnimationFrame		||
		window.msRequestAnimationFrame		||
		function(/* function */ callback, /* DOMElement */element ){
			window.setTimeout(callback, 1000/60);
		};
})();

var game = new Game();

function init() {
	if (game.init())
		game.start();
}