//Game Constants used in app.js
var CONSTANTS = (function (global) {
    global.Constants = {
        MAP_ROWS: 6,
        MAP_COLUMNS: 5,
        BLOCK_WIDTH: 101,
        BLOCK_HEIGHT: 83
    };
    global.Constants.CHAR_INIT_POSITION_X = 2 * global.Constants.BLOCK_WIDTH;
    global.Constants.CHAR_INIT_POSITION_Y = 5 * global.Constants.BLOCK_HEIGHT - 30;
})(this);