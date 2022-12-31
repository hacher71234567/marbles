import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
  setup: () => ({ cells: Array(14).fill(3) }),

  turn: {
    moveLimit: 1,
  },

  moves: {
    clickCell: (G, ctx, id) => {
      if ([1,2,3,4,5,6].includes(id) && ctx.currentPlayer == 1)
        return INVALID_MOVE;
      if ([8,9,10, 11, 12,13].includes(id) && ctx.currentPlayer == 0)
        return INVALID_MOVE;
      if (G.cells[id] == 0) return INVALID_MOVE;
    },
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: 'clickCell', args: [i] });
        }
      }
      return moves;
    },
  },
};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}
