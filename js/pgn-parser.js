// PGN Parser and Loader

class PGNParser {
    constructor() {
        this.moves = [];
        this.headers = {};
        this.currentMove = 0;
    }

    parse(pgnText) {
        this.headers = this.parseHeaders(pgnText);
        this.moves = this.parseMoves(pgnText);
        return {
            headers: this.headers,
            moves: this.moves
        };
    }

    parseHeaders(pgnText) {
        const headers = {};
        const headerRegex = /\[(\w+)\s+"([^"]*)"/g;
        let match;

        while ((match = headerRegex.exec(pgnText)) !== null) {
            headers[match[1]] = match[2];
        }

        return headers;
    }

    parseMoves(pgnText) {
        // Extract moves section (after headers)
        const movesMatch = pgnText.match(/\n\s*([1-9].*?)(?:\n|$)/s);
        if (!movesMatch) return [];

        const movesText = movesMatch[1];
        const moves = [];

        // Remove comments and variations
        const cleaned = movesText
            .replace(/\{[^}]*\}/g, '') // Remove comments
            .replace(/\([^)]*\)/g, '') // Remove variations
            .replace(/\$\d+/g, '') // Remove NAG symbols
            .trim();

        // Parse moves
        const moveRegex = /(?:\d+\.)\s*([\w\-O\+#=]+)(?:\s+([\w\-O\+#=]+))?/g;
        let match;
        let moveNumber = 1;
        let isWhiteMove = true;

        while ((match = moveRegex.exec(cleaned)) !== null) {
            if (match[1]) {
                moves.push({
                    notation: match[1],
                    moveNumber: moveNumber,
                    isWhiteMove: isWhiteMove,
                    index: moves.length
                });
                isWhiteMove = false;
            }

            if (match[2]) {
                moves.push({
                    notation: match[2],
                    moveNumber: moveNumber,
                    isWhiteMove: false,
                    index: moves.length
                });
                moveNumber++;
                isWhiteMove = true;
            } else if (match[1]) {
                moveNumber++;
                isWhiteMove = true;
            }
        }

        return moves;
    }

    algebraicToIndex(notation) {
        // Convert algebraic notation to board index
        // e.g., "e4" -> 52
        if (notation.length < 2) return -1;

        const file = notation.charCodeAt(notation.length - 2) - 97; // a-h
        const rank = parseInt(notation[notation.length - 1]) - 1; // 1-8

        if (file < 0 || file > 7 || rank < 0 || rank > 7) return -1;

        return (7 - rank) * 8 + file;
    }

    generateMoveFromAlgebraic(notation, board, isWhiteToMove) {
        // This is a simplified version - a full implementation would
        // need to handle all move types (castling, en passant, promotions)
        const notation_lower = notation.toLowerCase();

        // Handle castling
        if (notation_lower === 'o-o' || notation_lower === '0-0') {
            return { type: 'castling', isKingside: true };
        }
        if (notation_lower === 'o-o-o' || notation_lower === '0-0-0') {
            return { type: 'castling', isKingside: false };
        }

        // Extract to square
        const toSquare = this.algebraicToIndex(notation_lower);
        if (toSquare === -1) return null;

        // For simplified version, we'll return the to square
        // A full implementation would determine the from square
        return { toSquare, notation: notation };
    }
}

class GameLoader {
    constructor(app) {
        this.app = app;
        this.parser = new PGNParser();
    }

    loadFromPGN(pgnText) {
        try {
            const parsed = this.parser.parse(pgnText);
            
            // Update game info
            this.updateGameInfo(parsed.headers);
            
            // Load moves
            this.loadMoves(parsed.moves);
            
            return true;
        } catch (error) {
            console.error('Error parsing PGN:', error);
            return false;
        }
    }

    updateGameInfo(headers) {
        const whiteName = headers['White'] || 'White';
        const blackName = headers['Black'] || 'Black';
        const whiteRating = headers['WhiteElo'] || '2400';
        const blackRating = headers['BlackElo'] || '2380';
        const event = headers['Event'] || 'Game';
        const date = headers['Date'] || '?';

        // Update UI
        document.getElementById('whiteName').textContent = whiteName;
        document.getElementById('blackName').textContent = blackName;
        document.getElementById('whiteRating').textContent = whiteRating;
        document.getElementById('blackRating').textContent = blackRating;
        document.querySelector('.board-title').textContent = `${event} (${date})`;
    }

    loadMoves(moves) {
        // Reset game state
        this.app.gameState.reset();
        this.app.gameState.moves = [];

        // Add sample moves (simplified version)
        // In a full implementation, we'd convert algebraic notation to actual moves
        const sampleMoves = [
            { from: 52, to: 36, piece: 'P', notation: '1.e4', evaluation: 0.5 },
            { from: 12, to: 28, piece: 'p', notation: '1...e5', evaluation: 0.3 },
            { from: 62, to: 45, piece: 'N', notation: '2.Nf3', evaluation: 0.4 },
            { from: 1, to: 18, piece: 'n', notation: '2...Nc6', evaluation: 0.3 },
            { from: 58, to: 42, piece: 'B', notation: '3.Bc4', evaluation: 0.5 },
            { from: 8, to: 24, piece: 'p', notation: '3...a6', evaluation: 0.2 },
            { from: 59, to: 43, piece: 'Q', notation: '4.Qe2', evaluation: 0.7 },
            { from: 5, to: 21, piece: 'b', notation: '4...Nf6', evaluation: 0.5 }
        ];

        sampleMoves.forEach(move => {
            this.app.gameState.addMove(move);
        });

        // Update display
        this.app.sidebar.updateMovesList(this.app.gameState.moves, -1);
        this.app.updateGraph();
        this.app.renderBoard();
    }

    loadSampleGame() {
        const samplePGN = `[Event "World Championship"]
[Site "Dubai"]
[Date "2023.11.24"]
[Round "?"]
[White "Magnus Carlsen"]
[Black "Ian Nepomniachtchi"]
[WhiteElo "2835"]
[BlackElo "2769"]
[Result "1-0"]

1.e4 c5 2.Nf3 d6 3.d4 cxd4 4.Nxd4 Nf6 5.Nc3 a6 6.Be3 e5 7.Nb3 Be6 8.f3 Be7 9.Qd2 O-O 10.O-O-O Nbd7
`;
        this.loadFromPGN(samplePGN);
    }
}

export { PGNParser, GameLoader };