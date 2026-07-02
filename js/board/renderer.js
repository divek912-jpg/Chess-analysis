// Board Rendering

class BoardRenderer {
    constructor(boardElement, game) {
        this.boardElement = boardElement;
        this.game = game;
        this.boardFlipped = false;
        this.squares = [];
    }

    render() {
        this.boardElement.innerHTML = '';
        this.squares = [];
        
        for (let i = 0; i < 64; i++) {
            const square = this.createSquare(i);
            this.boardElement.appendChild(square);
            this.squares.push(square);
        }
        
        this.renderPieces();
    }

    createSquare(index) {
        const square = document.createElement('div');
        square.className = 'square';
        square.id = `square-${index}`;
        square.dataset.index = index;
        
        const file = index % 8;
        const rank = Math.floor(index / 8);
        const isLight = (file + rank) % 2 === 0;
        
        square.classList.add(isLight ? 'light' : 'dark');
        
        // Add coordinates
        if (file === 0) {
            const label = document.createElement('div');
            label.className = 'coordinate';
            label.textContent = (8 - rank).toString();
            square.appendChild(label);
        }
        
        if (rank === 7) {
            const label = document.createElement('div');
            label.className = 'coordinate';
            label.textContent = String.fromCharCode(97 + file);
            square.appendChild(label);
        }
        
        return square;
    }

    renderPieces() {
        this.squares.forEach(square => {
            const index = parseInt(square.dataset.index);
            const piece = this.game.board.getPiece(index);
            
            const existingPiece = square.querySelector('.piece');
            if (existingPiece) existingPiece.remove();
            
            if (piece) {
                const pieceElement = this.createPieceElement(piece, index);
                square.appendChild(pieceElement);
            }
        });
    }

    createPieceElement(piece, index) {
        const pieceEl = document.createElement('div');
        pieceEl.className = 'piece';
        pieceEl.dataset.piece = piece;
        pieceEl.dataset.index = index;
        pieceEl.textContent = this.getPieceSymbol(piece);
        pieceEl.draggable = true;
        
        pieceEl.addEventListener('dragstart', (e) => this.handlePieceDragStart(e, index));
        pieceEl.addEventListener('dragend', () => this.handlePieceDragEnd());
        
        return pieceEl;
    }

    getPieceSymbol(piece) {
        const symbols = {
            'P': '♙', 'N': '♘', 'B': '♗', 'R': '♖', 'Q': '♕', 'K': '♔',
            'p': '♟', 'n': '♞', 'b': '♝', 'r': '♜', 'q': '♛', 'k': '♚'
        };
        return symbols[piece] || '';
    }

    highlightSquare(index, className = 'selected') {
        const square = this.squares[index];
        if (square) square.classList.add(className);
    }

    clearHighlights(className = 'selected') {
        this.squares.forEach(square => square.classList.remove(className));
    }

    highlightLegalMoves(moves) {
        moves.forEach(move => {
            const square = this.squares[move];
            if (square) square.classList.add('legal-move');
        });
    }

    highlightLastMove(from, to) {
        [from, to].forEach(index => {
            const square = this.squares[index];
            if (square) square.classList.add('last-move');
        });
    }

    animateMove(from, to, duration = 250) {
        return new Promise(resolve => {
            const fromSquare = this.squares[from];
            const toSquare = this.squares[to];
            const piece = fromSquare.querySelector('.piece');
            
            if (!piece) {
                resolve();
                return;
            }
            
            piece.style.transition = `all ${duration}ms ease-in-out`;
            
            const fromRect = fromSquare.getBoundingClientRect();
            const toRect = toSquare.getBoundingClientRect();
            
            const deltaX = toRect.left - fromRect.left;
            const deltaY = toRect.top - fromRect.top;
            
            piece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            setTimeout(() => {
                piece.style.transform = '';
                piece.style.transition = '';
                resolve();
            }, duration);
        });
    }

    flipBoard() {
        this.boardFlipped = !this.boardFlipped;
        const squares = Array.from(this.squares);
        squares.reverse();
        this.boardElement.innerHTML = '';
        squares.forEach(square => this.boardElement.appendChild(square));
    }

    handlePieceDragStart(e, index) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', index.toString());
    }

    handlePieceDragEnd() {
        // Handle drag end
    }

    clear() {
        this.boardElement.innerHTML = '';
        this.squares = [];
    }
}

export { BoardRenderer };