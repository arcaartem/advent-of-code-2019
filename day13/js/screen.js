const Canvas = require('terminal-canvas');
const canvas = new Canvas();

class Screen {
    draw(x, y, tileId) {
        let tile = ' ';
        switch (tileId) {
            case 0:
                tile = ' ';
                break;
            case 1:
                tile = '@';
                break;
            case 2:
                tile = '#';
                break;
            case 3:
                tile = '⎺';
                break;
            case 4:
                tile = '*';
                break;
            default:
                throw `Unknown tile id: ${ tileId }`;
        }
        canvas.moveTo(x, y).write(tile).flush();
    }
}

module.exports = Screen;
