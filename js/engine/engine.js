// Chess Engine Integration

class ChessEngine {
    constructor() {
        this.depth = 15;
        this.evaluating = false;
        this.bestMove = null;
        this.bestEvaluation = 0;
        this.moveHistory = [];
    }

    analyze(board, isWhiteToMove, callback) {
        if (this.evaluating) return;
        this.evaluating = true;
        
        // Simulate engine analysis
        setTimeout(() => {
            const evaluation = this.evaluatePosition(board, isWhiteToMove);
            this.bestEvaluation = evaluation;
            this.evaluating = false;
            if (callback) callback(evaluation);
        }, 100);
    }

    evaluatePosition(board, isWhiteToMove) {
        let evaluation = 0;
        
        for (let i = 0; i < 64; i++) {
            const piece = board.getPiece(i);
            if (!piece) continue;
            
            const isWhite = piece === piece.toUpperCase();
            const value = this.getPieceValue(piece);
            const positionBonus = this.getPositionBonus(i, piece);
            
            let squareEval = value + positionBonus;
            evaluation += isWhite ? squareEval : -squareEval;
        }
        
        return evaluation;
    }

    getPieceValue(piece) {
        const values = {
            'P': 1, 'p': 1,
            'N': 3, 'n': 3,
            'B': 3, 'b': 3,
            'R': 5, 'r': 5,
            'Q': 9, 'q': 9,
            'K': 0, 'k': 0
        };
        return values[piece] || 0;
    }

    getPositionBonus(square, piece) {
        // Simple position bonus based on piece type
        const type = piece.toLowerCase();
        const center = 27 + 28 + 35 + 36; // Center squares
        
        if (type === 'p') {
            // Pawns better in center
            return Math.abs(square - 27.5) < 4 ? 0.5 : 0;
        } else if (type === 'n') {
            // Knights better in center
            return Math.abs(square - 27.5) < 8 ? 0.3 : 0;
        }
        
        return 0;
    }

    getMoveQuality(evaluation, previousEvaluation) {
        const diff = evaluation - previousEvaluation;
        
        if (diff > 150) return 'brilliant';
        if (diff > 100) return 'excellent';
        if (diff > 50) return 'great';
        if (diff > 20) return 'good';
        if (diff > 0) return 'book';
        if (diff > -15) return 'inaccuracy';
        if (diff > -50) return 'mistake';
        if (diff > -200) return 'blunder';
        return 'miss';
    }

    getOpeningName(moves) {
        // Simple opening database
        const openings = {
            '1.e4': 'Italian Game',
            '1.e4 e5': 'Open Game',
            '1.d4': 'Queen\'s Gambit',
            '1.c4': 'English Opening',
            '1.Nf3': 'Reti Opening'
        };
        
        const moveStr = moves.slice(0, 2).join(' ');
        return openings[moveStr] || 'Unknown Opening';
    }

    setDepth(depth) {
        this.depth = Math.min(Math.max(depth, 1), 30);
    }
}

export { ChessEngine };