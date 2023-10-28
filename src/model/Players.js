import { Random } from '@woowacourse/mission-utils';
import { GAME_RULL } from '../constants/gameRules.js';

export default class Players {
  #tryCount = 0;
  #players = [];

  addPlayer(player) {
    this.#players.push(player);
  }

  setTryCount(tryCount) {
    this.#tryCount = tryCount;
  }

  getTryCount() {
    return this.#tryCount;
  }

  generateRandomNumber() {
    return Random.pickNumberInRange(
      GAME_RULL.START_PICK_NUMBER,
      GAME_RULL.END_PICK_NUMBER,
    );
  }

  setMoveCount() {
    this.#players.forEach((player) => {
      const pickedNumber = this.generateRandomNumber();
      if (pickedNumber >= GAME_RULL.MOVE_CONDITION_COUNT) {
        player.increaseMoveCount();
      }
    });
  }

  makeTemplatePlayer(player) {
    return {
      name: player.name,
      count: player.getMoveCount(),
    };
  }

  getPlayers() {
    return this.#players.map((player) => this.makeTemplatePlayer(player));
  }

  getMaxMoveCount() {
    return Math.max(...this.getPlayers().map((player) => player.count));
  }

  checkMoveCountNotZero(maxMoveCount) {
    return maxMoveCount > 0;
  }

  getWinner() {
    const winnerCandidates = this.getPlayers().filter(
      (player) => player.count === this.getMaxMoveCount(),
    );

    const winners = winnerCandidates.reduce((acc, cur) => {
      if (!this.checkMoveCountNotZero(cur.count)) return acc;
      return [...acc, cur];
    }, []);

    return winners;
  }
}
