import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
  setup: () => {
    const G = { cells: Array(14).fill(3) };
    G.cells[0] = 0;
    G.cells[7] = 0;
    return G;
  },

  turn: {
    minMoves: 1,
  },

  moves: {
    clickCell: ({G, ctx, events}, id) => {
      if ([1, 2, 3, 4, 5, 6].includes(id) && ctx.currentPlayer == 1)
        return INVALID_MOVE;
      if ([8, 9, 10, 11, 12, 13].includes(id) && ctx.currentPlayer == 0)
        return INVALID_MOVE;
      if (G.cells[id] == 0) return INVALID_MOVE;
      const nmarbles = G.cells[id];
      for (let index = 0; index < nmarbles; index++) {
        const eindex = (id + 1 + index) % 14;
        const m = G.cells[eindex];
        G.cells[eindex] = m + 1;
      }
      G.cells[id] = 0;
      const lastCell = (id + nmarbles) % 14;
      if (lastCell == 0 || lastCell == 7) return;
      events.endPhase();
    },
  },

  endIf: ({G, ctx}) => {
    if ([1, 2, 3, 4, 5, 6].every((x) => G.cells[x] == 0))
      return { winner: 0 };
      if ([8, 9, 10, 11, 12, 13].every((x) => G.cells[x] == 0))
      return { winner: 1 };
  },

  ai: {
    enumerate: ({G, ctx}) => {
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
