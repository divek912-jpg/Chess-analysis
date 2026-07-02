// Evaluation Graph Component

class EvaluationGraph {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.evaluations = [];
        this.moveNumbers = [];
        this.setupCanvas();
    }

    setupCanvas() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.canvas.width = rect.width - 16; // Account for padding
        this.canvas.height = 120;
        this.padding = 20;
    }

    addEvaluation(moveNumber, evaluation) {
        this.moveNumbers.push(moveNumber);
        this.evaluations.push(evaluation);
    }

    setEvaluations(evaluations) {
        this.evaluations = evaluations;
        this.moveNumbers = evaluations.map((_, i) => i + 1);
        this.draw();
    }

    draw() {
        if (this.evaluations.length === 0) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw background
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();
        
        // Draw line
        this.drawLine();
        
        // Draw points
        this.drawPoints();
    }

    drawGrid() {
        const width = this.canvas.width - 2 * this.padding;
        const height = this.canvas.height - 2 * this.padding;
        
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.lineWidth = 1;
        
        // Horizontal line at middle (evaluation = 0)
        const midY = this.padding + height / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.padding, midY);
        this.ctx.lineTo(this.canvas.width - this.padding, midY);
        this.ctx.stroke();
        
        // Vertical grid lines
        for (let i = 0; i <= 5; i++) {
            const x = this.padding + (width / 5) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(x, this.padding);
            this.ctx.lineTo(x, this.canvas.height - this.padding);
            this.ctx.stroke();
        }
    }

    drawLine() {
        if (this.evaluations.length < 2) return;
        
        const width = this.canvas.width - 2 * this.padding;
        const height = this.canvas.height - 2 * this.padding;
        
        const minEval = -500;
        const maxEval = 500;
        const range = maxEval - minEval;
        
        this.ctx.strokeStyle = '#81b64c';
        this.ctx.lineWidth = 2;
        this.ctx.lineJoin = 'round';
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        
        this.evaluations.forEach((eval, index) => {
            const x = this.padding + (width / (this.evaluations.length - 1 || 1)) * index;
            const normalized = (eval - minEval) / range;
            const y = this.canvas.height - this.padding - normalized * height;
            
            if (index === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        });
        
        this.ctx.stroke();
    }

    drawPoints() {
        const width = this.canvas.width - 2 * this.padding;
        const height = this.canvas.height - 2 * this.padding;
        
        const minEval = -500;
        const maxEval = 500;
        const range = maxEval - minEval;
        
        this.evaluations.forEach((eval, index) => {
            const x = this.padding + (width / (this.evaluations.length - 1 || 1)) * index;
            const normalized = (eval - minEval) / range;
            const y = this.canvas.height - this.padding - normalized * height;
            
            this.ctx.fillStyle = this.getPointColor(eval);
            this.ctx.beginPath();
            this.ctx.arc(x, y, 3, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    getPointColor(evaluation) {
        if (evaluation > 150) return '#81b64c'; // Green for brilliant
        if (evaluation > 50) return '#3ea6ff'; // Blue for good
        if (evaluation < -150) return '#e53935'; // Red for blunder
        if (evaluation < -50) return '#f4b400'; // Orange for mistake
        return '#b5bac1'; // Gray for neutral
    }

    onHover(callback) {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            
            const width = this.canvas.width - 2 * this.padding;
            if (x > this.padding && x < this.canvas.width - this.padding) {
                const index = Math.round(
                    ((x - this.padding) / width) * (this.evaluations.length - 1)
                );
                if (index >= 0 && index < this.evaluations.length) {
                    callback(index, this.evaluations[index]);
                }
            }
        });
    }

    clear() {
        this.evaluations = [];
        this.moveNumbers = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export { EvaluationGraph };