const Screen = require('./screen');
const screen = new Screen();

let outputParameters = []

class Arcade {
    constructor() {
        this.paddlePos = [];
        this.ballPos = [];
        this.previousBallPos = [];
        this.score = 0;
        this.inputPrediction = 0;
    }

    pushOutput(value) {
        outputParameters.push(Number(value));
        if (outputParameters.length >= 3) {
            this.out(...outputParameters);
            outputParameters = [];
        }
    }

    out(x, y, tileId) {
        if (x == -1 && y == 0) {
            this.score = tileId;
            return;
        }

        screen.draw(x, y, tileId);

        switch (tileId) {
            case 3:
                this.paddlePos = [x, y];
                break;
            case 4:
                this.previousBallPos = this.ballPos;
                this.ballPos = [x, y];
                this.calculateInput();
                break;
        }
    }

    getInput() {
        return this.inputPrediction;
    }

    calculateInput() {
        const [targetPos, _] = this.ballPos;
        const [paddleX, paddleY] = this.paddlePos;
        if (paddleX > targetPos) {
            this.inputPrediction = -1;
        } else if (paddleX < targetPos) {
            this.inputPrediction = 1;
        } else {
            this.inputPrediction = 0;
        }
    }
}

module.exports = Arcade;
