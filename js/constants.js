// Constants - Chess Pieces and Board

const PIECES = {
    WHITE_PAWN: 'wp',
    WHITE_KNIGHT: 'wn',
    WHITE_BISHOP: 'wb',
    WHITE_ROOK: 'wr',
    WHITE_QUEEN: 'wq',
    WHITE_KING: 'wk',
    BLACK_PAWN: 'bp',
    BLACK_KNIGHT: 'bn',
    BLACK_BISHOP: 'bb',
    BLACK_ROOK: 'br',
    BLACK_QUEEN: 'bq',
    BLACK_KING: 'bk'
};

const PIECE_UNICODE = {
    'wp': '♙',
    'wn': '♘',
    'wb': '♗',
    'wr': '♖',
    'wq': '♕',
    'wk': '♔',
    'bp': '♟',
    'bn': '♞',
    'bb': '♝',
    'br': '♜',
    'bq': '♛',
    'bk': '♚'
};

const PIECE_VALUES = {
    'p': 1,
    'n': 3,
    'b': 3,
    'r': 5,
    'q': 9,
    'k': 0
};

const BOARD_SIZE = 8;
const SQUARE_COUNT = 64;

const COLORS = {
    WHITE: 'white',
    BLACK: 'black'
};

const MOVE_TYPES = {
    NORMAL: 'normal',
    CAPTURE: 'capture',
    PAWN_PUSH: 'pawn_push',
    CASTLING: 'castling',
    EN_PASSANT: 'en_passant',
    PROMOTION: 'promotion'
};

const MOVE_QUALITY = {
    BRILLIANT: 'brilliant',
    GREAT: 'great',
    BEST: 'best',
    EXCELLENT: 'excellent',
    GOOD: 'good',
    BOOK: 'book',
    INACCURACY: 'inaccuracy',
    MISTAKE: 'mistake',
    MISS: 'miss',
    BLUNDER: 'blunder'
};

const OPENING_PHASES = {
    OPENING: 'opening',
    MIDDLEGAME: 'middlegame',
    ENDGAME: 'endgame'
};

const INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const SQUARE_NAMES = (() => {
    const names = [];
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            names.push(String.fromCharCode(97 + file) + (8 - rank));
        }
    }
    return names;
})();

const ANIMATION_DURATION = {
    MOVE: 250,
    CAPTURE: 200,
    CHECK: 300,
    TRANSITION: 350
};

const EVALUATION_THRESHOLDS = {
    BLUNDER: -200,
    MISTAKE: -50,
    INACCURACY: -15,
    BOOK: 0,
    GOOD: 20,
    EXCELLENT: 50,
    BEST: 100,
    BRILLIANT: 150
};

export {
    PIECES,
    PIECE_UNICODE,
    PIECE_VALUES,
    BOARD_SIZE,
    SQUARE_COUNT,
    COLORS,
    MOVE_TYPES,
    MOVE_QUALITY,
    OPENING_PHASES,
    INITIAL_FEN,
    SQUARE_NAMES,
    ANIMATION_DURATION,
    EVALUATION_THRESHOLDS
};