const pieces = require('./pieces');
const colors = require('colors');

class Board {

	constructor(size) {
		this._size = size;
		this._board = this._createBoard();
		this._changes = [];

		// Output formatting
		this._cellSeparator = '|';
	}

	_createBoard() {
		let board = new Array(this._size);

		return board.fill(new Array(this._size).fill(pieces.EMPTY));
	}

	_rowToString(row) {
		let rowStr = this._cellSeparator;
		rowStr += row.join(this._cellSeparator);
		rowStr += this._cellSeparator + '\n';

		return rowStr.replace(/Q/, colors.green(pieces.QUEEN));
	}

	_isQueenAllowedHorizontal(x) {
		return this._board[x].every(cell => cell === pieces.EMPTY);
	}

	_isQueenAllowedVertical(x, y) {
		let searchDepthVert = 0;
		let isAllowed = true;

		for (; searchDepthVert < this._size; searchDepthVert++) {
			if (this._board[searchDepthVert][y] !== pieces.EMPTY) {
				isAllowed = false;
			}
		}

		return isAllowed;
	}

	_isQueenAllowedDiag(x, y) {
		// Look diagonally
		// a) 45deg
		let isAllowedDiagonally = true;
		let positionDiff = x - y;
		let offset = { x: 0, y: 0 };

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
			}

			offset.x++;
			offset.y++;
		}

		// b) 135deg
		offset.x = x;
		offset.y = y;

		while (offset.x < (this._size - 1) && offset.y !== 0) {
			offset.x++;
			offset.y--;
		}

		while (offset.x !== this._size && offset.y !== this._size) {
			if (this._board[offset.x][offset.y] !== pieces.EMPTY) {
				isAllowedDiagonally = false;
			}

			if (offset.x === 0 || offset.y === (this._size - 1)) {
				break;
			}

			offset.x--;
			offset.y++;
		}

		return isAllowedDiagonally;
	}

	_isPlacementAllowed(x, y) {
		return this._isQueenAllowedHorizontal(x) &&
			this._isQueenAllowedVertical(x, y) &&
			this._isQueenAllowedDiag(x, y);
	}

	_updateCell(x, y, piece) {
		this._board[x] = this._board[x].map((cell, index) => {
			if (y !== index) {
				return cell;
			}

			// Don't record clearing cells
			if (piece !== pieces.EMPTY) {
				this._changes.push({
					type: 'ADD',
					piece: piece,
					x: x,
					y: y
				})
			}

			return piece;
		});

		return this;
	}

	toString() {
		let str = '\n';

		this._board.forEach((row, index) => {
			str += (this._showIndexes ? index + this._cellSeparator : '');
			str += this._rowToString(row);
		}, this);

		return colors.bold(str);
	}

	placeQueen(x, y) {
		const isAllowed = this._isPlacementAllowed(x, y);

		if (isAllowed) {
			this._updateCell(x, y, pieces.QUEEN);
		}

		return isAllowed;
	}

	getQueenCount() {
		return this._board.reduce((prev, curr) => {
			if (curr.indexOf(pieces.QUEEN) !== -1) {
				return prev + 1;
			}

			return prev;
		}, 0);
	}

	undoPreviousPlacement() {
		let previousAction = null;

		if (!this._changes.length) {
			return false;
		} else {
			previousAction = this._changes.pop();
		}

		this._updateCell(previousAction.x, previousAction.y, pieces.EMPTY);

		return previousAction;
	}

	get changes() {
		return this._changes;
	}
}

module.exports = Board;
