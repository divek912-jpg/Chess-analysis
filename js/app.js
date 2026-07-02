// Main Application Controller

import { GameState } from './game/gamestate.js';
import { ChessBoard } from './board/board.js';
import { BoardRenderer } from './board/renderer.js';
import { MoveGenerator } from './board/moves.js';
import { ChessEngine } from './engine/engine.js';
import { SidebarUI } from './ui/sidebar.js';
import { EvaluationGraph } from './ui/graph.js';
import { ControlsUI } from './ui/controls.js';

class ChessAnalysisApp {
    constructor() {
        this.gameState = new GameState();
        this.board = new ChessBoard();
        this.moveGenerator = new MoveGenerator(this.board);
        this.engine = new ChessEngine();
        this.boardElement = document.getElementById('chessboard');
        this.renderer = new BoardRenderer(this.boardElement, this);
        this.sidebar = new SidebarUI();
        this.graph = new EvaluationGraph('evaluationGraph');
        this.controls = new ControlsUI(this.gameState);
        this.currentTheme = 'dark';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderBoard();
        this.loadSampleGame();
    }

    setupEventListeners() {
        document.addEventListener('flipBoard', () => this.flipBoard());
        document.addEventListener('previousMove', () => this.previousMove());
        document.addEventListener('nextMove', () => this.nextMove());
        document.addEventListener('goToMove', (e) => this.goToMove(e.detail.index));
        document.addEventListener('moveSelected', (e) => this.goToMove(e.detail.index));
        document.addEventListener('playGame', () => this.autoPlay());
        document.addEventListener('pauseGame', () => this.stopAutoPlay());
        
        this.graph.onHover((index, evaluation) => this.onGraphHover(index, evaluation));
    }

    renderBoard() {
        this.renderer.render();
    }

    flipBoard() {
        this.renderer.flipBoard();
    }

    loadSampleGame() {
        // Load a sample game for demonstration
        const sampleMoves = [
            { from: 52, to: 36, piece: 'P', notation: '1.e4' },
            { from: 12, to: 28, piece: 'p', notation: '1...e5' },
            { from: 62, to: 45, piece: 'N', notation: '2.Nf3' },
            { from: 1, to: 18, piece: 'n', notation: '2...Nc6' }
        ];
        
        sampleMoves.forEach(move => {
            this.gameState.addMove(move);
        });
        
        // Update UI
        this.sidebar.updateMovesList(this.gameState.moves, -1);
        this.updateGraph();
        this.updateSidebar();
    }

    nextMove() {
        if (this.gameState.nextMove()) {
            this.updateDisplay();
        }
    }

    previousMove() {
        if (this.gameState.previousMove()) {
            this.updateDisplay();
        }
    }

    goToMove(index) {
        if (this.gameState.goToMove(index)) {
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.renderer.renderPieces();
        this.sidebar.highlightMove(this.gameState.currentMoveIndex);
        this.updateSidebar();
    }

    updateSidebar() {
        const currentMove = this.gameState.getCurrentMove();
        if (currentMove) {
            this.sidebar.updateMoveExplanation({
                notation: currentMove.notation || 'Move',
                evaluation: this.gameState.evaluation,
                explanation: 'Strong move that develops the piece.',
                quality: 'good',
                positiveTip: 'Controls the center',
                negativeTip: 'None',
                difficulty: 'Beginner'
            });
        }
    }

    updateGraph() {
        // Generate sample evaluations
        const evaluations = this.gameState.moves.map((_, i) => Math.sin(i * 0.5) * 100);
        this.graph.setEvaluations(evaluations);
    }

    onGraphHover(index, evaluation) {
        const tooltip = document.getElementById('graphTooltip');
        if (tooltip) {
            tooltip.style.display = 'block';
            document.getElementById('tooltipMoveNum').textContent = index + 1;
            document.getElementById('tooltipEval').textContent = evaluation.toFixed(2);
        }
    }

    autoPlay() {
        this.autoPlayInterval = setInterval(() => {
            if (!this.nextMove()) {
                this.stopAutoPlay();
            }
        }, 1500);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ChessAnalysisApp();
});

export { ChessAnalysisApp };