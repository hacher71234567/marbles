import { INVALID_MOVE } from 'boardgame.io/core';
const Player0Cells = [1, 2, 3, 4, 5, 6];
const Player1Cells = [8, 9, 10, 11, 12, 13];

export const TicTacToe = {
  setup: () => {
    const G = {
      cells: Array(14)
        .fill(undefined)
        .map((x,i) => ({
          value: 3,
          enabled: Player0Cells.includes(i),
        })),
    };
    G.cells[0].value = 0;
    G.cells[7].value = 0;
    return G;
  },

  turn: {
    minMoves: 1,
  },

  moves: {
    clickCell: ({ G, ctx, events }, id) => {
      if ([1, 2, 3, 4, 5, 6].includes(id) && ctx.currentPlayer == 1)
        return INVALID_MOVE;
      if ([8, 9, 10, 11, 12, 13].includes(id) && ctx.currentPlayer == 0)
        return INVALID_MOVE;
      const nmarbles = G.cells[id].value;
      if (nmarbles == 0) return INVALID_MOVE;
      for (let index = 0; index < nmarbles; index++) {
        const eindex = (id + 1 + index) % 14;
        const m = G.cells[eindex].value;
        G.cells[eindex].value = m + 1;
      }
      G.cells[id].value = 0;
      const lastCell = (id + nmarbles) % 14;
      if (lastCell == 0 || lastCell == 7) return;
      events.endPhase();
      if (ctx.currentPlayer == 1) {
        Player0Cells.forEach((x) => (G.cells[x].enabled = true));
        Player1Cells.forEach((x) => (G.cells[x].enabled = false));
      } else {
        Player0Cells.forEach((x) => (G.cells[x].enabled = false));
        Player1Cells.forEach((x) => (G.cells[x].enabled = true));
      }
    },
  },

  endIf: ({ G, ctx }) => {
    if ([1, 2, 3, 4, 5, 6].every((x) => G.cells[x].value == 0))
      return { winner: 0 };
    if ([8, 9, 10, 11, 12, 13].every((x) => G.cells[x].value == 0))
      return { winner: 1 };
  },
};
