import { Client } from 'boardgame.io/client';
import { TicTacToe } from './Game';
import { setupfireworks } from './fireworks';
import Fireworks from 'fireworks-js';
import {
  ClientState,
  _ClientImpl,
} from 'boardgame.io/dist/types/src/client/client';
type G = ReturnType<typeof TicTacToe.setup>;
class TicTacToeClient {
  fireworks: Fireworks | null;
  client: _ClientImpl<{ cells: any[] } | undefined, Record<string, unknown>>;
  rootElement: HTMLElement;
  fireworksE: HTMLCanvasElement | null;
  constructor(rootElement: HTMLElement) {
    this.client = Client({ game: TicTacToe });
    this.client.start();
    this.rootElement = rootElement;
    this.fireworksE =
      this.rootElement.querySelector<HTMLCanvasElement>('.fireworks');
    this.fireworks = setupfireworks(this.fireworksE);
    this.attachListeners();
    this.client.subscribe((state) => this.update(state));
  }

  attachListeners() {
    const handleCellClick = (event) => {
      const id = parseInt(event.target.dataset.id);
      this.client.moves.clickCell(id);
    };
    const cells =
      this.rootElement.querySelectorAll<HTMLElement>('.cellB, .cellC');
    cells.forEach((cell) => {
      cell.onclick = handleCellClick;
    });
  }

  
  update(state: ClientState<G |  undefined>) {
    // Get all the board cells.
    const cells = this.rootElement.querySelectorAll<HTMLElement>(
      '.cellA, .cellB, .cellC'
    );
    // Update cells to display the values in game state.
    cells.forEach((cell) => {
      if (cell.dataset.id == null) throw new Error('data-id is not present.');
      const cellId = parseInt(cell.dataset.id);
      const cellValue = state!.G!.cells[cellId];
      cell.textContent =
        cellValue.value !== 0 ? cellValue.value.toString() : '0';
      if (cellValue.enabled && cell.hasAttribute('disabled'))
        cell.removeAttribute('disabled');
      if (!cellValue.enabled && !cell.hasAttribute('disabled'))
        cell.setAttribute('disabled', '');
    });
    // Get the gameover message element.
    // Update the element to show a winner if any.
    if (state!.ctx.gameover) {
      this.fireworksE?.classList.toggle('showing');
      this.fireworks?.launch(5);
      this.fireworksE?.classList.toggle('showing');
    } else {
    }
  }
}

const appElement = document.getElementById('app');
if (appElement == null) throw new Error('missing app element.');
const app = new TicTacToeClient(appElement);
