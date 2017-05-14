var pieces = require ('./pieces');
var colors = require('colors');

function Board(size) {
	this._size = size;
	this._board = this._createBoard();

	// Output formatting
	this._cellSeparator = '|';
}

Board.prototype._createBoard = function() {
	var board = new Array(this._size);

	return board.fill(new Array(this._size).fill(pieces.EMPTY));
}

Board.prototype._rowToString = function(row) {
	var rowStr = this._cellSeparator +
				row.join(this._cellSeparator) +
				this._cellSeparator + '\n';

	return rowStr.replace(/Q/, colors.green(pieces.QUEEN));
}

Board.prototype._isPlacementAllowed = function(x, y) {
	// 1. Look horizontally
	var isAllowedHorizontaly = this._board[x].every(function(cell) {
		return cell === pieces.EMPTY;
	});

	if (!isAllowedHorizontaly) {
		// console.log('horizontal fail', this._board[x]);
	}

	// 2. Look vertically
	var isAllowedVerticaly = true;
	var searchDepthVert = 0;

	for (; searchDepthVert < this._size; searchDepthVert++) {
		if (this._board[searchDepthVert][y] !== pieces.EMPTY) {
			isAllowedVerticaly = false;
			// console.log('vertical fail', searchDepthVert, y, this._board[searchDepthVert][y])
		}
	}

	// 3. Look diagonally
	// 3. a) 45deg
	var isAllowedDiagonally = true;
	var positionDiff = x - y;
	var offset = {
		x: 0,
		y: 0
	};

	if (positionDiff > 0) {
		offset.x = positionDiff;
		offset.y = 0;
	}

	if (positionDiff < 0) {
		offset.x = 0;
		offset.y = Math.abs(positionDiff);
	}

	while (offset.x !== this._size && offset.y !== this._size) {
		if (this._board[offset.x][offset.y] !== pieces.EMPTY) {
			isAllowedDiagonally = false;
			// console.log('45deg fail', offset, this._board[offset.x][offset.y])
		}

		// this._updateCell(offset.x, offset.y, '\\');

		offset.x++;
		offset.y++;
	}

	// 3. b) 135deg
	offset.x = x;
	offset.y = y;

	while (offset.x < (this._size - 1) && offset.y !== 0) {
		offset.x++;
		offset.y--;
	}

	while (offset.x !== this._size && offset.y !== this._size) {
		if (this._board[offset.x][offset.y] !== pieces.EMPTY) {
			isAllowedDiagonally = false;
			// console.log('135 deg fail', offset.x, offset.y, this._board[offset.x][offset.y]);
		}

		// if (cell === '\\') {
		// 	this._updateCell(offset.x, offset.y, 'X');
		// } else {
		// 	this._updateCell(offset.x, offset.y, '/');
		// }

		if (offset.x === 0 || offset.y === (this._size - 1)) {
			break;
		}

		offset.x--;
		offset.y++;
	}

	return isAllowedHorizontaly && isAllowedVerticaly && isAllowedDiagonally;
}

Board.prototype._updateCell = function(x, y, piece) {
	this._board[x] = this._board[x].map(function(cell, index) {
		if (y === index) {
			return piece;
		}

		return cell;
	});
};

Board.prototype.toString = function() {
	var str = '\n';

	this._board.forEach(function(row, index) {
		str += (this._showIndexes ? index + this._cellSeparator : '') + this._rowToString(row);
	}, this);

	if (this.getQueenCount() === this._size) {
		str += colors.bgGreen('\nYAY\n');
	} else {
		str += colors.bgRed('\nFAILED HORRIBLY\n');
	}

	return colors.bold(str);
}

Board.prototype.placeQueen = function(x, y) {
	var isAllowed = this._isPlacementAllowed(x, y);

	if (isAllowed) {
		this._updateCell(x, y, pieces.QUEEN);
	}

	return isAllowed;
}

Board.prototype.getQueenCount = function() {
	return this._board.reduce(function(prev, curr) {
		if (curr.indexOf(pieces.QUEEN) !== -1) {
			return prev + 1;
		}

		return prev;
	}, 0)
}

Board.prototype.getBoard = function() {
	return this._board.map(function(row) {
		return row;
	})
}

Board.prototype.getSize = function() {
	return this._size;
}

Board.prototype.isEqualTo = function(otherBoard) {
	var _otherBoard = otherBoard.getBoard();

	if (this._size !== otherBoard.getSize()) {
		return false;
	}

	return this._board.every(function(row, rowIndex) {
		return row.every(function(cell, cellIndex) {
			return cell === _otherBoard[rowIndex][cellIndex];
		})
	});
}

module.exports = Board;
