const board = require('../chess/board');

const DISPLAY_SOLUTIONS_COUNT = 4;

class Solver {
	constructor(options) {
		this._boardSize = options.size;
		this._boardInstance = new board(options.size);

		this._solutions = [];
		this._printAllSolutions = !!options.printAll;
		this._callCounter = 0;
	}

	_runSolution(doneCallback) {
		const placeFn = (startX, startY) => {
			const N = this._boardSize;
			let prevChange = null;
			let tempX = startX;
			let tempY = startY;
			let newPos = { x: 0, y: 0 };

			this._callCounter++;

			for (let x = tempX; x < N; x++) {
				for (let y = tempY; y < N; y++) {
					this._boardInstance.placeQueen(x, y)
				}

				// Reset column in case we get <startX = x, startY = n>
				// otherwise we would loop only rows <0, n>, <1, n>
				tempY = 0;
			}

			// We got a solution if board has N queens
			// since they can be placed only if allowed
			if (this._boardInstance.getQueenCount() === N) {
				this._solutions.push(this._boardInstance.toString());
			}

			// End if we can't undo any change, there is nothing more to try
			if (!this._boardInstance.changes.length) {
				doneCallback();
				return;
			}

			// Undo the previous queen placement, and store the action
			prevChange = this._boardInstance.undoPreviousPlacement();

			// Try the next cell
			if (prevChange.y === (N - 1)) {
				newPos.x = prevChange.x + 1;
				newPos.y = 0;
			} else {
				newPos.x = prevChange.x;
				newPos.y = prevChange.y + 1;
			}

			// Avoid exceeding the Node call stack limit
			// and call the function recursively in nextTick
			process.nextTick(() => {
				placeFn(newPos.x, newPos.y)
			});
		};

		placeFn(0, 0);
	}

	_printResults() {
		if (this._printAllSolutions) {
			console.log(`${this._solutions.join('')}`);
		} else {
			console.log(`${this._solutions.slice(0, DISPLAY_SOLUTIONS_COUNT).join('')}`);
		}

		console.log(`function calls: ${this._callCounter}`);
		console.log(`solutions: ${this._solutions.length}`);
		console.timeEnd('time');
	}

	start() {
		console.time('time');
		this._runSolution(this._printResults.bind(this));
	}
}

module.exports = Solver;
