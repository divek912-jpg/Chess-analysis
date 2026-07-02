// Game State Management

class GameState {
    constructor() {
        this.moves = [];
        this.currentMoveIndex = -1;
        this.board = this.initializeBoard();
        this.isWhiteToMove = true;
        this.castlingRights = { white: 'KQ', black: 'kq' };
        this.enPassantSquare = null;
        this.halfmoveClock = 0;
        this.fullmoveNumber = 1;
        this.selectedSquare = null;
        this.legalMoves = [];
        this.lastMove = null;
        this.capturedPieces = { white: [], black: [] };
        this.position = [];
        this.evaluation = 0;
        this.annotations = [];
    }

    initializeBoard() {
        const board = Array(64).fill(null);
        
        // Set up pieces from FEN
        const setupPieces = [
            'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
            'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
            ...Array(32).fill(null),
            'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
            'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
        ];
        
        return setupPieces;
    }

    addMove(moveData) {
        // Remove any moves after current index (if we're not at the end)
        if (this.currentMoveIndex < this.moves.length - 1) {
            this.moves = this.moves.slice(0, this.currentMoveIndex + 1);
        }
        
        this.moves.push(moveData);
        this.currentMoveIndex++;
        this.updateBoardState(moveData);
    }

    updateBoardState(moveData) {
        const { from, to, piece, captured, promotion } = moveData;
        
        // Execute move on board
        this.board[to] = piece;
        this.board[from] = null;
        
        // Track captured pieces
        if (captured) {
            const color = this.isWhiteToMove ? 'black' : 'white';
            this.capturedPieces[color].push(captured);
        }
        
        this.isWhiteToMove = !this.isWhiteToMove;
        this.lastMove = { from, to };
    }

    getMove(index) {
        return this.moves[index] || null;
    }

    getCurrentMove() {
        return this.moves[this.currentMoveIndex] || null;
    }

    goToMove(index) {
        if (index < -1 || index >= this.moves.length) return false;
        this.currentMoveIndex = index;
        this.rebuildBoardState();
        return true;
    }

    nextMove() {
        if (this.currentMoveIndex < this.moves.length - 1) {
            this.currentMoveIndex++;
            this.rebuildBoardState();
            return true;
        }
        return false;
    }

    previousMove() {
        if (this.currentMoveIndex > -1) {
            this.currentMoveIndex--;
            this.rebuildBoardState();
            return true;
        }
        return false;
    }

    rebuildBoardState() {
        // Rebuild board from scratch up to current move
        this.board = this.initializeBoard();
        this.isWhiteToMove = true;
        this.capturedPieces = { white: [], black: [] };
        
        for (let i = 0; i <= this.currentMoveIndex; i++) {
            if (i < this.moves.length) {
                this.updateBoardState(this.moves[i]);
            }
        }
    }

    getLegalMoves(square) {
        // This will be connected to the actual chess engine
        return this.legalMoves;
    }

    setEvaluation(evaluation) {
        this.evaluation = evaluation;
    }

    getEvaluation() {
        return this.evaluation;
    }

    getGamePhase() {
        const materialCount = this.board.filter(piece => piece !== null).length;
        
        if (materialCount > 24) return 'opening';
        if (materialCount > 8) return 'middlegame';
        return 'endgame';
    }

    reset() {
        this.moves = [];
        this.currentMoveIndex = -1;
        this.board = this.initializeBoard();
        this.isWhiteToMove = true;
        this.selectedSquare = null;
        this.legalMoves = [];
        this.lastMove = null;
        this.capturedPieces = { white: [], black: [] };
    }
}

export { GameState };