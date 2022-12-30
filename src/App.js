import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';

class TicTacToeClient {
  constructor(rootElement) {
    this.client = Client({ game: TicTacToe });
    this.client.start();
    this.rootElement = rootElement;
    this.attachListeners();
    this.client.subscribe((state) => this.update(state));
  }

  

  attachListeners() {
    // Attach event listeners to the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // This event handler will read the cell id from the cell’s
    // `data-id` attribute and make the `clickCell` move.
    const handleCellClick = (event) => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id);
    };
    cells.forEach((cell) => {
      cell.onclick = handleCellClick;
    });
  }

  update(state) {
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll('.cell');
    // Update cells to display the values in game state.
    cells.forEach((cell) => {
      const cellId = parseInt(cell.dataset.id);
      const cellValue = state.G.cells[cellId];
      cell.textContent = cellValue !== null ? cellValue : '';
    });
    // Get the gameover message element.
    const messageEl = this.rootElement.querySelector('.winner');
    // Update the element to show a winner if any.
    if (state.ctx.gameover) {
      messageEl.textContent =
        state.ctx.gameover.winner !== undefined
          ? 'Winner: ' + state.ctx.gameover.winner
          : 'Draw!';
    } else {
      messageEl.textContent = '';
    }
  }
}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
