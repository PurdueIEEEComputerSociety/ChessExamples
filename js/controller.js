//Global variable Listing
var turn = 'w';
var position;
var boardID = 0;
var color = 'w';

var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
	console.log("Source: " + source);
	console.log("Target: " + target);
	console.log("Piece: " + piece);
	console.log("Orientation: " + orientation);
	console.log("--------------------");
	position = board.position();
	tryMove(source, target, piece[0]);
	return 'snapback';
};

var cfg = {
	draggable: true,
	position: 'start',
	onDrop: onDrop,
	sparePieces: false
};

var tryMove = function(source, target, color) {
	var moveRequest = $.post( "/games/"+boardID+"/move", {source: source, target: target, color: color}, function(data) {
		board.move(source + '-' + target);
	})
	.done(function() {
		
	})
	.fail(function(e) {
		console.log("Server returned a "+ e.status +" "+ e.statusText)
		//ADD MORE FOR DIFFERENT ERRORS
	})
	.always(function() {
		
	});
	
	
}


var board = ChessBoard('board1', cfg);

var getBoard = function() {
	var statusRequest = $.get( "/games/"+boardID+"/status", function(data) {
		
	})
	.done(function() {
		
	})
	.fail(function() {
		
	})
	.always(function() {
		
	});

}