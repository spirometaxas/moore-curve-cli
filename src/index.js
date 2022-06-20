const hilbert_curve = require('hilbert-curve-cli');

const getWidth = function(n) {
  if (n < 1) {
    return 0;
  }
  return Math.pow(2, n + 2) - 1;
}

const getHeight = function(n) {
  if (n < 1) {
    return 0;
  }
  return Math.pow(2, n + 1);
}

const createBoard = function(w, h) {
  let board = [];
  for (let i = 0; i < h; i++) {
    let row = [];
    for (let j = 0; j < w; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

const draw = function(board) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += board[board.length - i - 1][j];
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, closeCurve = false) {
  if (n === undefined || isNaN(n) || n < 1) {
    return '';
  }

  if (n === 1) {
    return hilbert_curve.create(n);
  }

  const board = createBoard(getWidth(n), getHeight(n));
  hilbert_curve.hilbert(n, board, { x: 0, y: getHeight(n) / 2 }, 'B', { end1: 'right', end2: 'down' });
  hilbert_curve.hilbert(n, board, { x: 0, y: 0 }, 'B', { end1: 'up', end2: 'right' });
  hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: getHeight(n) / 2 }, 'D', { end1: 'left', end2: 'down' });
  hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: 0 }, 'D', { end1: 'up', end2: 'left' });

  if (!closeCurve) {
    if (n % 2 === 0) {
      board[0][parseInt(board[0].length / 2) - 1] = '│';
      board[0][parseInt(board[0].length / 2) + 1] = '│';
    }
    board[0][parseInt(board[0].length / 2)] = ' ';
  }

  return draw(board);
}

module.exports = {
  create: create,
};