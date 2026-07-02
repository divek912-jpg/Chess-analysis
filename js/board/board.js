// Chess Board Logic

class ChessBoard {
    constructor() {
        this.squares = new Array(64).fill(null);
        this.initializeBoard();
    }

    initializeBoard() {
        // Set up initial position
        const position = [
            'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
            'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            null, null, null, null, null, null, null, null,
            'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
            'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
        ];
        this.squares = position;
    }

    getPiece(square) {
        if (square < 0 || square > 63) return null;
        return this.squares[square];
    }

    setPiece(square, piece) {
        if (square < 0 || square > 63) return false;
        this.squares[square] = piece;
        return true;
    }

    movePiece(from, to) {
        const piece = this.getPiece(from);
        const captured = this.getPiece(to);
        
        this.setPiece(from, null);
        this.setPiece(to, piece);
        
        return captured;
    }

    isSquareEmpty(square) {
        return this.getPiece(square) === null;
    }

    indexToSquare(index) {
        const rank = Math.floor(index / 8);
        const file = index % 8;
        return String.fromCharCode(97 + file) + (8 - rank);
    }

    squareToIndex(square) {
        const file = square.charCodeAt(0) - 97;
        const rank = 8 - parseInt(square[1]);
        return rank * 8 + file;
    }

    isValidSquare(square) {
        if (typeof square !== 'string' || square.length !== 2) return false;
        const file = square.charCodeAt(0);
        const rank = parseInt(square[1]);
        return file >= 97 && file <= 104 && rank >= 1 && rank <= 8;
    }

    getDistance(from, to) {
        const fromFile = from % 8;
        const fromRank = Math.floor(from / 8);
        const toFile = to % 8;
        const toRank = Math.floor(to / 8);
        
        return {
            files: Math.abs(toFile - fromFile),
            ranks: Math.abs(toRank - fromRank)
        };
    }

    isPathClear(from, to) {
        const distance = this.getDistance(from, to);
        const stepFile = distance.files === 0 ? 0 : (to % 8 > from % 8 ? 1 : -1);
        const stepRank = distance.ranks === 0 ? 0 : (Math.floor(to / 8) > Math.floor(from / 8) ? 1 : -1);
        
        let current = from + stepFile + stepRank * 8;
        const maxSteps = Math.max(distance.files, distance.ranks);
        
        for (let i = 0; i < maxSteps - 1; i++) {
            if (!this.isSquareEmpty(current)) return false;
            current += stepFile + stepRank * 8;
        }
        
        return true;
    }

    getSquareColor(square) {
        const file = square % 8;
        const rank = Math.floor(square / 8);
        return (file + rank) % 2 === 0 ? 'light' : 'dark';
    }

    reset() {
        this.initializeBoard();
    }
}

export { ChessBoard };