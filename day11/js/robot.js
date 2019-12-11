class Robot {
    constructor(panel, initialX, initialY) {
        this.heading = 0;
        this.positionX = initialX;
        this.positionY = initialY;
        this.panel = panel;
        this.trail = {};
    }

    move (direction) {
        if (direction == 0) {
            this.turnLeft();
        } else {
            this.turnRight();
        }

        this.moveForward();
    }

    look() {
        return (this.panel[this.positionY][this.positionX] == '#') ? 1 : 0;
        const key = `${this.positionX},${this.positionY}`;
        if (this.trail.hasOwnProperty(key)) {
            return this.trail[key];
        }

        return 0;
    }

    paint(color) {
        const key = `${this.positionX},${this.positionY}`;
        this.trail[key] = color;
        this.panel[this.positionY][this.positionX] = (color == 0) ? '.' : '#';
    }

    turnLeft () {
        this.heading = (this.heading + 360 - 90) % 360;
    }

    turnRight () {
        this.heading = (this.heading + 90) % 360;
    }

    moveForward () {
        switch (this.heading) {
            case 0:
                this.positionY++;
                break;
            case 90:
                this.positionX++;
                break;
            case 180:
                this.positionY--;
                break;
            case 270:
                this.positionX--;
                break;
        }
    }
}

module.exports = Robot;
