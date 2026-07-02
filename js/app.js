// Main Application Controller

import { GameState } from './game/gamestate.js';
import { ChessBoard } from './board/board.js';
import { BoardRenderer } from './board/renderer.js';
import { MoveGenerator } from './board/moves.js';
import { ChessEngine } from './engine/engine.js';
import { SidebarUI } from './ui/sidebar.js';
import { EvaluationGraph } from './ui/graph.js';
import { ControlsUI } from './ui/controls.js';
import { GameLoader } from './pgn-parser.js';

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
        this.gameLoader = new GameLoader(this);
        this.currentTheme = 'dark';
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderBoard();
        this.loadSampleGame();
    }

    setupEventListeners() {
        // Game events
        document.addEventListener('flipBoard', () => this.flipBoard());
        document.addEventListener('previousMove', () => this.previousMove());
        document.addEventListener('nextMove', () => this.nextMove());
        document.addEventListener('goToMove', (e) => this.goToMove(e.detail.index));
        document.addEventListener('moveSelected', (e) => this.goToMove(e.detail.index));
        document.addEventListener('playGame', () => this.autoPlay());
        document.addEventListener('pauseGame', () => this.stopAutoPlay());
        
        // PGN Import
        document.getElementById('pgnInput')?.addEventListener('change', (e) => this.handlePGNImport(e));
        document.getElementById('importPgnBtn')?.addEventListener('click', () => {
            document.getElementById('pgnInput').click();
        });
        
        // Sample game
        document.getElementById('loadSampleBtn')?.addEventListener('click', () => this.loadSampleGame());
        
        this.graph.onHover((index, evaluation) => this.onGraphHover(index, evaluation));
    }

    handlePGNImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const pgnText = e.target.result;
            if (this.gameLoader.loadFromPGN(pgnText)) {
                this.updateDisplay();
                console.log('PGN loaded successfully');
            } else {
                alert('Error loading PGN file. Please check the format.');
            }
        };
        reader.readAsText(file);
    }

    renderBoard() {
        this.renderer.render();
        this.updateDisplay();
    }

    flipBoard() {
        this.renderer.flipBoard();
    }

    loadSampleGame() {
        this.gameLoader.loadSampleGame();
        this.updateDisplay();
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