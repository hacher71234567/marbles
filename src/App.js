import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';
import fireworks from 'canvas-confetti';
class TicTacToeClient {
  constructor(rootElement) {
    this.client = Client({ game: TicTacToe });
    this.client.start();
    this.rootElement = rootElement;
    this.attachListeners();
    this.client.subscribe((state) => this.update(state));
  }

  attachListeners() {
    const handleCellClick = (event) => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id);
    };
    const cells = this.rootElement.querySelectorAll('.cellB, .cellC');
    cells.forEach((cell) => {
      cell.onclick = handleCellClick;
    });
  }

  update(state) {
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll('.cellA, .cellB, .cellC');
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
      fireworks();
    } else {
      messageEl.textContent = '';
    }
  }S
}

const appElement = document.getElementById('app');
const app = new TicTacToeClient(appElement);
