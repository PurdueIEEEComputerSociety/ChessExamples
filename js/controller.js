
var onDrop = function(source, target, piece, newPos, oldPos, orientation) {
  console.log("Source: " + source);
  console.log("Target: " + target);
  console.log("Piece: " + piece);
  console.log("New position: " + ChessBoard.objToFen(newPos));
  console.log("Old position: " + ChessBoard.objToFen(oldPos));
  console.log("Orientation: " + orientation);
  console.log("--------------------");
};

var cfg = {
  draggable: true,
  position: 'start',
  onDrop: onDrop,
  sparePieces: false
};

var board1 = ChessBoard('board1', cfg);