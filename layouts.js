/*----------- Game State Data ----------*/

const boards =
{
    'Default': {
        board: [
            null, null, 37, 47, 57, null, null,
            null, null, 36, 46, 56, null, null,
            15, 25, 35, 45, 55, 65, 75,
            14, 24, 34, null, 54, 64, 74,
            13, 23, 33, 43, 53, 63, 73,
            null, null, 32, 42, 52, null, null,
            null, null, 31, 41, 51, null, null
        ],
        boardWidth: 7,
        boardName: 'Default'
    }
    , 'GreekCross': {
    board: [
        null, null, null, null, null, null, null,
        null, null, null, 46, null, null, null,
        null, null, null, 45, null, null, null,
        null, 24, 34, 44, 54, 64, null,
        null, null, null, 43, null, null, null,
        null, null, null, 42, null, null, null,
        null, null, null, null, null, null, null
    ],
    boardWidth: 7,
    boardName: 'Greek Cross'
}
    , 'LatinCross': {
    board: [
        null, null, null, null, null, null, null,
        null, null, null, 46, null, null, null,
        null, null, 35, 45, 55, null, null,
        null, null, null, 44, null, null, null,
        null, null, null, 43, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null
    ],
    boardWidth: 7,
    boardName: 'Latin Cross'
}
    , 'Pyramid': {
    board: [
        null, null, null, null, null, null, null,
        null, null, null, 46, null, null, null,
        null, null, 35, 45, 55, null, null,
        null, 24, 34, 44, 54, 64, null,
        13, 23, 33, 43, 53, 63, 73,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null
    ],
    boardWidth: 7,
    boardName: 'Pyramid'
}
    , 'Stove': {
    board: [
        null, null, 37, 47, 57, null, null,
        null, null, 36, 46, 56, null, null,
        null, null, 35, 45, 55, null, null,
        null, null, 34, null, 54, null, null,
        null, null,null, null,null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
    ],
    boardWidth: 7,
    boardName: 'Stove'
}
};

let selectedBoard = 'Default';