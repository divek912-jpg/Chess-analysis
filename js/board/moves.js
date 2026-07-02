// Move Generation and Validation

class MoveGenerator {
    constructor(board) {
        this.board = board;
    }

    generateLegalMoves(isWhiteToMove) {
        const moves = [];
        
        for (let square = 0; square < 64; square++) {
            const piece = this.board.getPiece(square);
            if (!piece) continue;
            
            const isWhitePiece = piece === piece.toUpperCase();
            if (isWhitePiece !== isWhiteToMove) continue;
            
            const pieceMoves = this.getPieceMoves(square, piece);
            moves.push(...pieceMoves);
        }
        
        return moves;
    }

    getPieceMoves(square, piece) {
        const moves = [];
        const type = piece.toLowerCase();
        
        switch (type) {
            case 'p':
                return this.getPawnMoves(square, piece);
            case 'n':
                return this.getKnightMoves(square, piece);
            case 'b':
                return this.getBishopMoves(square, piece);
            case 'r':
                return this.getRookMoves(square, piece);
            case 'q':
                return this.getQueenMoves(square, piece);
            case 'k':
                return this.getKingMoves(square, piece);
        }
        
        return moves;
    }

    getPawnMoves(square, piece) {
        const moves = [];
        const isWhite = piece === 'P';
        const direction = isWhite ? -8 : 8;
        const startRank = isWhite ? 48 : 8;
        
        // Forward move
        const forward = square + direction;
        if (forward >= 0 && forward < 64 && this.board.isSquareEmpty(forward)) {
            moves.push(forward);
            
            // Double move from start
            if (square === startRank) {
                const doubleForward = square + direction * 2;
                if (this.board.isSquareEmpty(doubleForward)) {
                    moves.push(doubleForward);
                }
            }
        }
        
        // Captures
        [-1, 1].forEach(offset => {
            const target = square + direction + offset;
            if (target >= 0 && target < 64) {
                const targetPiece = this.board.getPiece(target);
                if (targetPiece && this.isOpponentPiece(targetPiece, piece)) {
                    moves.push(target);
                }
            }
        });
        
        return moves;
    }

    getKnightMoves(square, piece) {
        const moves = [];
        const offsets = [-17, -15, -10, -6, 6, 10, 15, 17];
        const file = square % 8;
        
        offsets.forEach(offset => {
            const target = square + offset;
            if (target >= 0 && target < 64) {
                const targetFile = target % 8;
                if (Math.abs(targetFile - file) <= 2) {
                    const targetPiece = this.board.getPiece(target);
                    if (!targetPiece || this.isOpponentPiece(targetPiece, piece)) {
                        moves.push(target);
                    }
                }
            }
        });
        
        return moves;
    }

    getBishopMoves(square, piece) {
        return this.getSlidingMoves(square, piece, [-9, -7, 7, 9]);
    }

    getRookMoves(square, piece) {
        return this.getSlidingMoves(square, piece, [-8, -1, 1, 8]);
    }

    getQueenMoves(square, piece) {
        return this.getSlidingMoves(square, piece, [-9, -8, -7, -1, 1, 7, 8, 9]);
    }

    getSlidingMoves(square, piece, directions) {
        const moves = [];
        const file = square % 8;
        
        directions.forEach(direction => {
            let target = square + direction;
            
            while (target >= 0 && target < 64) {
                const targetFile = target % 8;
                
                // Check if we've wrapped around the board
                if (Math.abs(targetFile - file) > 4) break;
                
                const targetPiece = this.board.getPiece(target);
                
                if (!targetPiece) {
                    moves.push(target);
                } else if (this.isOpponentPiece(targetPiece, piece)) {
                    moves.push(target);
                    break;
                } else {
                    break;
                }
                
                target += direction;
            }
        });
        
        return moves;
    }

    getKingMoves(square, piece) {
        const moves = [];
        const directions = [-9, -8, -7, -1, 1, 7, 8, 9];
        const file = square % 8;
        
        directions.forEach(direction => {
            const target = square + direction;
            if (target >= 0 && target < 64) {
                const targetFile = target % 8;
                if (Math.abs(targetFile - file) <= 1) {
                    const targetPiece = this.board.getPiece(target);
                    if (!targetPiece || this.isOpponentPiece(targetPiece, piece)) {
                        moves.push(target);
                    }
                }
            }
        });
        
        return moves;
    }

    isOpponentPiece(targetPiece, piece) {
        const isTargetWhite = targetPiece === targetPiece.toUpperCase();
        const isPieceWhite = piece === piece.toUpperCase();
        return isTargetWhite !== isPieceWhite;
    }
}

export { MoveGenerator };