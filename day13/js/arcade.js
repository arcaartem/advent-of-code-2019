class Arcade {

    constructor() {
        const X = 50;
        const Y = 20;
        this.panel = Array.from(Array(Y)).map(e => Array.from(Array(X), e => ' '));
    }

    draw(x, y, tileId) {
        switch (tileId) {
            case 0:
                this.panel[y][x] = ' ';
                break;
            case 1:
                this.panel[y][x] = '@';
                break;
            case 2:
                this.panel[y][x] = '#';
                break;
            case 3:
                this.panel[y][x] = '_';
                break;
            case 4:
                this.panel[y][x] = '*';
                break;
            default:
                throw `Unknown tile id: ${ tileId }`;

        }
    }

    showPanel(panel) {
        console.log(this.panel.map(p => p.join("")).join("\n"));
    }
}

module.exports = Arcade;
