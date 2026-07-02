// Control Interface Management

class ControlsUI {
    constructor(game) {
        this.game = game;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.flipBoardBtn = document.getElementById('flipBoardBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.firstMoveBtn = document.getElementById('firstMoveBtn');
        this.prevMoveBtn = document.getElementById('prevMoveBtn');
        this.playBtn = document.getElementById('playBtn');
        this.nextMoveBtn = document.getElementById('nextMoveBtn');
        this.lastMoveBtn = document.getElementById('lastMoveBtn');
        this.isPlaying = false;
    }

    setupEventListeners() {
        this.flipBoardBtn?.addEventListener('click', () => this.handleFlipBoard());
        this.fullscreenBtn?.addEventListener('click', () => this.handleFullscreen());
        this.firstMoveBtn?.addEventListener('click', () => this.handleFirstMove());
        this.prevMoveBtn?.addEventListener('click', () => this.handlePreviousMove());
        this.playBtn?.addEventListener('click', () => this.handlePlayPause());
        this.nextMoveBtn?.addEventListener('click', () => this.handleNextMove());
        this.lastMoveBtn?.addEventListener('click', () => this.handleLastMove());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleFlipBoard() {
        window.dispatchEvent(new CustomEvent('flipBoard'));
        this.animateButton(this.flipBoardBtn);
    }

    handleFullscreen() {
        const boardContainer = document.querySelector('.board-section');
        if (!boardContainer) return;
        
        if (!document.fullscreenElement) {
            boardContainer.requestFullscreen().catch(() => {
                console.log('Fullscreen request denied');
            });
        } else {
            document.exitFullscreen();
        }
        this.animateButton(this.fullscreenBtn);
    }

    handleFirstMove() {
        window.dispatchEvent(new CustomEvent('goToMove', { detail: { index: -1 } }));
        this.animateButton(this.firstMoveBtn);
    }

    handlePreviousMove() {
        if (this.game.currentMoveIndex > -1) {
            window.dispatchEvent(new CustomEvent('previousMove'));
            this.animateButton(this.prevMoveBtn);
        }
    }

    handleNextMove() {
        if (this.game.currentMoveIndex < this.game.moves.length - 1) {
            window.dispatchEvent(new CustomEvent('nextMove'));
            this.animateButton(this.nextMoveBtn);
        }
    }

    handleLastMove() {
        window.dispatchEvent(new CustomEvent('goToMove', { detail: { index: this.game.moves.length - 1 } }));
        this.animateButton(this.lastMoveBtn);
    }

    handlePlayPause() {
        this.isPlaying = !this.isPlaying;
        window.dispatchEvent(new CustomEvent(this.isPlaying ? 'playGame' : 'pauseGame'));
        this.updatePlayButtonState();
    }

    updatePlayButtonState() {
        if (!this.playBtn) return;
        
        if (this.isPlaying) {
            this.playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>';
        } else {
            this.playBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
        }
    }

    handleKeyboard(e) {
        switch (e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                this.handlePreviousMove();
                break;
            case 'ArrowRight':
                e.preventDefault();
                this.handleNextMove();
                break;
            case ' ':
                e.preventDefault();
                this.handlePlayPause();
                break;
        }
    }

    animateButton(btn) {
        if (!btn) return;
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 100);
    }

    disableButton(btn) {
        if (btn) btn.disabled = true;
    }

    enableButton(btn) {
        if (btn) btn.disabled = false;
    }
}

export { ControlsUI };