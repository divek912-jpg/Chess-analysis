# Utility Functions and Helpers

/**
 * Converts square index (0-63) to algebraic notation (a1-h8)
 * @param {number} index - Square index (0-63)
 * @returns {string} Algebraic notation
 */
function indexToSquare(index) {
    const file = String.fromCharCode(97 + (index % 8));
    const rank = 8 - Math.floor(index / 8);
    return file + rank;
}

/**
 * Converts algebraic notation (a1-h8) to square index (0-63)
 * @param {string} square - Algebraic notation
 * @returns {number} Square index (0-63)
 */
function squareToIndex(square) {
    const file = square.charCodeAt(0) - 97;
    const rank = 8 - parseInt(square[1]);
    return rank * 8 + file;
}

/**
 * Formats evaluation in centipawns to readable format
 * @param {number} evaluation - Evaluation in centipawns
 * @returns {string} Formatted evaluation
 */
function formatEvaluation(evaluation) {
    if (Math.abs(evaluation) >= 1000) {
        return (evaluation / 100).toFixed(1);
    }
    return (evaluation / 100).toFixed(2);
}

/**
 * Gets the quality of a move based on evaluation change
 * @param {number} current - Current evaluation
 * @param {number} previous - Previous evaluation
 * @returns {string} Move quality
 */
function getMoveQuality(current, previous) {
    const diff = current - previous;
    
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

/**
 * Determines the game phase based on material count
 * @param {Array} board - Board state
 * @returns {string} Game phase ('opening', 'middlegame', 'endgame')
 */
function getGamePhase(board) {
    const materialCount = board.filter(piece => piece !== null).length;
    
    if (materialCount > 24) return 'opening';
    if (materialCount > 8) return 'middlegame';
    return 'endgame';
}

/**
 * Gets piece value for material evaluation
 * @param {string} piece - Piece character (P, N, B, R, Q, K)
 * @returns {number} Piece value
 */
function getPieceValue(piece) {
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

/**
 * Checks if a square is light or dark
 * @param {number} index - Square index
 * @returns {string} 'light' or 'dark'
 */
function getSquareColor(index) {
    const file = index % 8;
    const rank = Math.floor(index / 8);
    return (file + rank) % 2 === 0 ? 'light' : 'dark';
}

/**
 * Validates if a square index is valid
 * @param {number} index - Square index
 * @returns {boolean} True if valid
 */
function isValidSquareIndex(index) {
    return index >= 0 && index < 64;
}

/**
 * Calculates distance between two squares
 * @param {number} from - From square index
 * @param {number} to - To square index
 * @returns {Object} Distance object {files, ranks}
 */
function calculateDistance(from, to) {
    const fromFile = from % 8;
    const fromRank = Math.floor(from / 8);
    const toFile = to % 8;
    const toRank = Math.floor(to / 8);
    
    return {
        files: Math.abs(toFile - fromFile),
        ranks: Math.abs(toRank - fromRank)
    };
}

/**
 * Generates a FEN string from current board state
 * @param {Array} board - Board state
 * @param {boolean} isWhiteToMove - Whose turn it is
 * @returns {string} FEN string
 */
function boardToFEN(board, isWhiteToMove) {
    let fen = '';
    let emptyCount = 0;
    
    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            const index = rank * 8 + file;
            const piece = board[index];
            
            if (piece) {
                if (emptyCount > 0) {
                    fen += emptyCount;
                    emptyCount = 0;
                }
                fen += piece;
            } else {
                emptyCount++;
            }
        }
        if (emptyCount > 0) {
            fen += emptyCount;
            emptyCount = 0;
        }
        if (rank < 7) fen += '/';
    }
    
    fen += ' ' + (isWhiteToMove ? 'w' : 'b');
    return fen;
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Safely get localStorage item with fallback
 * @param {string} key - Key to retrieve
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Retrieved value or default
 */
function getStorageItem(key, defaultValue) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch (e) {
        return defaultValue;
    }
}

/**
 * Safely set localStorage item
 * @param {string} key - Key to set
 * @param {*} value - Value to store
 * @returns {boolean} True if successful
 */
function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (e) {
        console.warn('LocalStorage write failed:', e);
        return false;
    }
}

/**
 * Request animation frame wrapper
 * @param {Function} callback - Callback function
 * @returns {number} Animation frame ID
 */
const requestFrame = (() => {
    return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame || 
           function(callback) { return setTimeout(callback, 16); };
})();

/**
 * Cancel animation frame wrapper
 * @param {number} id - Animation frame ID
 */
const cancelFrame = (() => {
    return window.cancelAnimationFrame || 
           window.webkitCancelAnimationFrame || 
           function(id) { return clearTimeout(id); };
})();

/**
 * Format time in milliseconds to MM:SS
 * @param {number} ms - Milliseconds
 * @returns {string} Formatted time
 */
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export {
    indexToSquare,
    squareToIndex,
    formatEvaluation,
    getMoveQuality,
    getGamePhase,
    getPieceValue,
    getSquareColor,
    isValidSquareIndex,
    calculateDistance,
    boardToFEN,
    debounce,
    throttle,
    getStorageItem,
    setStorageItem,
    requestFrame,
    cancelFrame,
    formatTime
};