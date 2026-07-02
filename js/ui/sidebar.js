// Sidebar UI Management

class SidebarUI {
    constructor() {
        this.gameHeader = document.querySelector('.game-header');
        this.accuracySection = document.querySelector('.accuracy-section');
        this.statsSection = document.querySelector('.stats-section');
        this.moveExplanation = document.querySelector('.move-explanation');
        this.movesList = document.querySelector('#movesList');
    }

    updateGameInfo(whitePlayer, blackPlayer, whiteAccuracy, blackAccuracy) {
        const whiteAccCard = document.querySelector('.white-accuracy .accuracy-value');
        const blackAccCard = document.querySelector('.black-accuracy .accuracy-value');
        
        if (whiteAccCard) whiteAccCard.textContent = whiteAccuracy.toFixed(1) + '%';
        if (blackAccCard) blackAccCard.textContent = blackAccuracy.toFixed(1) + '%';
    }

    updateStats(stats) {
        const statCards = document.querySelectorAll('.stat-card');
        const statNames = ['Brilliant', 'Great', 'Best', 'Mistake', 'Blunder', 'Acpl'];
        
        statCards.forEach((card, index) => {
            const label = card.querySelector('.stat-label');
            const value = card.querySelector('.stat-value');
            
            if (label && stats[statNames[index].toLowerCase()]) {
                value.textContent = stats[statNames[index].toLowerCase()];
            }
        });
    }

    updateMoveExplanation(moveData) {
        if (!moveData) return;
        
        const moveNum = document.querySelector('#moveNumber');
        const evaluation = document.querySelector('#moveEvaluation');
        const explanation = document.querySelector('#explanationText');
        const badge = document.querySelector('#moveBadge');
        const positiveTip = document.querySelector('#positiveTip');
        const negativeTip = document.querySelector('#negativeTip');
        const difficulty = document.querySelector('#difficultyRating');
        
        if (moveNum) moveNum.textContent = moveData.notation || 'Move 1';
        if (evaluation) evaluation.textContent = (moveData.evaluation || 0).toFixed(2);
        if (explanation) explanation.textContent = moveData.explanation || 'No explanation available';
        if (badge) {
            badge.textContent = moveData.quality || 'Standard';
            badge.className = 'move-badge';
            if (moveData.quality) badge.classList.add(`badge-${moveData.quality}`);
        }
        if (positiveTip) positiveTip.textContent = moveData.positiveTip || 'Good move';
        if (negativeTip) negativeTip.textContent = moveData.negativeTip || 'No concerns';
        if (difficulty) difficulty.textContent = moveData.difficulty || 'Intermediate';
    }

    updateMovesList(moves, currentIndex) {
        this.movesList.innerHTML = '';
        
        moves.forEach((move, index) => {
            const moveItem = document.createElement('div');
            moveItem.className = 'move-item';
            if (index === currentIndex) moveItem.classList.add('active');
            
            const notation = document.createElement('span');
            notation.className = 'move-notation';
            notation.textContent = move.notation || `${index + 1}`;
            
            const icon = document.createElement('span');
            icon.className = 'move-icon';
            icon.textContent = this.getMoveBadgeIcon(move.quality);
            
            moveItem.appendChild(notation);
            if (move.quality) moveItem.appendChild(icon);
            
            moveItem.addEventListener('click', () => {
                window.dispatchEvent(new CustomEvent('moveSelected', { detail: { index } }));
            });
            
            this.movesList.appendChild(moveItem);
        });
    }

    getMoveBadgeIcon(quality) {
        const icons = {
            'brilliant': '⭐',
            'great': '💡',
            'best': '✔',
            'mistake': '⚠',
            'blunder': '❌'
        };
        return icons[quality] || '';
    }

    highlightMove(index) {
        const moveItems = this.movesList.querySelectorAll('.move-item');
        moveItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
}

export { SidebarUI };