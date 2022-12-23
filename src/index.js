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

const LINES = {
  '─': {
    STANDARD: '─',
    BOLD: '━',
    DOUBLE: '═',
  },
  '│': {
    STANDARD: '│',
    BOLD: '┃',
    DOUBLE: '║',
  },
  '┌': {
    STANDARD: '┌',
    BOLD: '┏',
    DOUBLE: '╔',
  },
  '┐': {
    STANDARD: '┐',
    BOLD: '┓',
    DOUBLE: '╗',
  },
  '┘': {
    STANDARD: '┘',
    BOLD: '┛',
    DOUBLE: '╝',
  },
  '└': {
    STANDARD: '└',
    BOLD: '┗',
    DOUBLE: '╚',
  },
};

const getLine = function(lineId, lineType) {
  if (LINES[lineId] !== undefined && lineType !== undefined) {
    return LINES[lineId][lineType.toUpperCase()];
  } else if (LINES[lineId] !== undefined) {
    return LINES[lineId].STANDARD;
  } else {
    return ' ';
  }
}

const getLineType = function(line) {
  if (line !== undefined && (line.toLowerCase() === 'standard' || line.toLowerCase() === 'double' || line.toLowerCase() === 'bold')) {
    return line.toLowerCase();
  }
  return 'standard';
}

const isValidRotation = function(rotation) {
  return rotation !== undefined && (rotation.toLowerCase() === 'left' || rotation.toLowerCase() === 'right' || rotation.toLowerCase() === 'flip' || rotation.toLowerCase() === 'standard');
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

const getSquare = function() {
  return [ [ '└', '─', '┘' ], [ '┌', '─', '┐' ] ];
}

const draw = function(board, lineType) {
  var result = '\n ';
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      result += getLine(board[board.length - i - 1][j], lineType);
    }
    result += '\n ';
  }
  return result;
}

const create = function(n, config) {
  if (n === undefined || isNaN(n) || n < 1) {
    return '';
  }

  const rotate = config !== undefined && isValidRotation(config.rotate) ? config.rotate.toLowerCase() : 'standard';
  const lineType = config !== undefined ? getLineType(config.line) : undefined;
  const closed = config !== undefined && config.closed === true;

  if (n === 1) {
    if (closed) {
      return draw(getSquare(), lineType);
    } else {
      return hilbert_curve.create(n, { rotate: rotate, line: lineType });
    }
  }

  const board = createBoard(getWidth(n), getHeight(n));

  if (rotate === 'left') {
    hilbert_curve.hilbert(n, board, { x: 0, y: getHeight(n) / 2 }, 'standard', { end1: 'down', end2: 'right' });
    hilbert_curve.hilbert(n, board, { x: 0, y: 0 }, 'flip', { end1: 'up', end2: 'right' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: getHeight(n) / 2 }, 'standard', { end1: 'left', end2: closed ? 'down' : 'right' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: 0 }, 'flip', { end1: 'left', end2: closed ? 'up' : 'right' });
  } else if (rotate === 'right') {
    hilbert_curve.hilbert(n, board, { x: 0, y: getHeight(n) / 2 }, 'standard', { end1: closed ? 'down' : 'left', end2: 'right' });
    hilbert_curve.hilbert(n, board, { x: 0, y: 0 }, 'flip', { end1: closed ? 'up' : 'left', end2: 'right' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: getHeight(n) / 2 }, 'standard', { end1: 'left', end2: 'down' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: 0 }, 'flip', { end1: 'left', end2: 'up' });
  } else if (rotate === 'flip') {
    hilbert_curve.hilbert(n, board, { x: 0, y: getHeight(n) / 2 }, 'left', { end1: closed ? 'right' : 'up', end2: 'down' });
    hilbert_curve.hilbert(n, board, { x: 0, y: 0 }, 'left', { end1: 'up', end2: 'right' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: getHeight(n) / 2 }, 'right', { end1: closed ? 'left' : 'up', end2: 'down' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: 0 }, 'right', { end1: 'up', end2: 'left' });
  } else {
    hilbert_curve.hilbert(n, board, { x: 0, y: getHeight(n) / 2 }, 'left', { end1: 'right', end2: 'down' });
    hilbert_curve.hilbert(n, board, { x: 0, y: 0 }, 'left', { end1: 'up', end2: closed ? 'right' : 'down' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: getHeight(n) / 2 }, 'right', { end1: 'left', end2: 'down' });
    hilbert_curve.hilbert(n, board, { x: parseInt(getWidth(n) / 2) + 1, y: 0 }, 'right', { end1: 'up', end2: closed ? 'left' : 'down' });
  }

  return draw(board, lineType);
}

module.exports = {
  create: create,
};