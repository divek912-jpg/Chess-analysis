# Premium Chess Analysis Platform

A professional-grade chess game review and analysis platform inspired by Chess.com's Game Review feature, built with vanilla HTML5, CSS3, and JavaScript—no frameworks.

## Features

### 🎮 Interactive Chessboard
- **Large responsive board** with premium wood-themed styling
- **Piece animation** with smooth 60fps transitions
- **Legal move highlighting** with visual indicators
- **Coordinates display** for board orientation
- **Flip board** functionality
- **Last move highlighting** in distinct color
- **Check state** with animated highlighting
- **Captured pieces** display with semi-transparency
- **Move arrows** for annotating key variations

### 📊 Game Analysis Dashboard
- **Player profiles** with avatars, ratings, and names
- **Accuracy percentages** for both players
- **Interactive evaluation graph** with smooth animations
- **Hover tooltips** showing move evaluation details
- **Move quality badges** (Brilliant, Great, Mistake, Blunder, etc.)

### 📈 Evaluation & Statistics
- **Real-time evaluation bar** tracking position assessment
- **Advanced statistics** including:
  - Brilliant moves
  - Great moves
  - Best moves
  - Mistakes and blunders
  - Average centipawn loss (ACPL)
- **Phase ratings** (Opening, Middlegame, Endgame)
- **Game rating** calculation

### 💡 Move Explanation System
- **Detailed move analysis card**
- **Move notation** and evaluation
- **AI-generated explanations**:
  - Positive aspects of the move
  - Negative considerations
  - Strategic context
  - Tactical warnings
- **Difficulty rating** system
- **Action buttons** for deeper analysis

### 🎯 Move List Navigation
- **Scrollable move history** with annotations
- **Quality badges** on each move (✔️ Best, ⭐ Brilliant, 💡 Great, ⚠️ Mistake, ❌ Blunder)
- **Current move highlighting**
- **Click-to-navigate** functionality

### ⌨️ Keyboard Controls
- **Left Arrow**: Previous move
- **Right Arrow**: Next move
- **Spacebar**: Play/Pause auto-review
- **Navigation buttons** for manual control:
  - First move
  - Previous move
  - Play/Pause
  - Next move
  - Last move

### 🎨 Design System

#### Color Palette
```
Background Primary:    #1e1f22 (Very Dark Gray)
Background Secondary:  #2b2d31 (Dark Gray)
Background Tertiary:   #313338 (Slightly Lighter)
Accent Green:          #81b64c (Premium Green)
Accent Orange:         #f4b400 (Warning Orange)
Accent Red:            #e53935 (Error Red)
Accent Blue:           #3ea6ff (Info Blue)
Text Primary:          #ffffff (White)
Text Secondary:        #b5bac1 (Light Gray)
Text Tertiary:         #949ba4 (Medium Gray)
```

#### Typography
- **Headings**: Poppins (Bold, 600-700 weight)
- **Body**: Inter (Regular, 400-500 weight)
- **Fallback**: Segoe UI, -apple-system, BlinkMacSystemFont

#### Spacing & Radius
- **Spacing Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px
- **Border Radius**: 8px, 12px, 16px, 24px, 9999px (full)
- **Shadows**: Multiple levels from 1px to 50px blur

### ✨ Animations & Interactions
- **Piece movement**: Smooth 250ms transitions
- **Button hover**: Scale and glow effects
- **Card interactions**: Lift on hover with shadow increase
- **Graph animations**: Smooth line drawing on load
- **Fade, slide, and scale** entrance animations
- **Ripple effects** on button click
- **Reduced motion** support for accessibility

### 📱 Responsive Design
- **Desktop** (>1200px): Multi-column sidebar layout
- **Tablet** (768px-1199px): Stacked sidebar sections
- **Mobile** (<768px): Board-focused layout with hidden sidebar
- **Flexible chessboard** sizing
- **Touch-friendly** button sizes

### 🌙 Theme Support
- **Dark mode** (default)
- **Light mode** (optional)
- **Theme persistence** via localStorage
- **CSS variable** based theming system

### ♿ Accessibility
- **Semantic HTML5** structure
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Focus indicators** on all interactive elements
- **Color contrast** compliance
- **Reduced motion** preferences respected

## File Structure

```
chess-analysis/
├── index.html                 # Main HTML structure
├── css/
│   ├── reset.css             # CSS reset and normalization
│   ├── variables.css         # CSS custom properties (design system)
│   ├── base.css              # Base styles and typography
│   ├── components/
│   │   ├── buttons.css       # Button component styles
│   │   ├── cards.css         # Card component styles
│   │   ├── chessboard.css    # Chessboard component styles
│   │   ├── graph.css         # Evaluation graph styles
│   │   └── sidebar.css       # Sidebar component styles
│   ├── layouts/
│   │   └── main.css          # Main layout and responsive
│   └── animations.css        # Animation keyframes
├── js/
│   ├── constants.js          # Game constants and configuration
│   ├── app.js                # Main application controller
│   ├── board/
│   │   ├── board.js          # Chess board logic
│   │   ├── moves.js          # Move generation and validation
│   │   └── renderer.js       # Board rendering and animation
│   ├── game/
│   │   └── gamestate.js      # Game state management
│   ├── engine/
│   │   └── engine.js         # Chess engine integration
│   └── ui/
│       ├── sidebar.js        # Sidebar UI management
│       ├── graph.js          # Evaluation graph rendering
│       └── controls.js       # Control panel management
└── README.md                 # This file
```

## Core Classes

### `ChessAnalysisApp`
Main application controller that orchestrates all components.

```javascript
const app = new ChessAnalysisApp();
app.nextMove();
app.previousMove();
app.goToMove(index);
app.flipBoard();
app.autoPlay();
```

### `GameState`
Manages game state, move history, and board position.

```javascript
const gameState = new GameState();
gameState.addMove(moveData);
gameState.nextMove();
gameState.goToMove(moveIndex);
```

### `ChessBoard`
Core chess board logic and piece management.

```javascript
const board = new ChessBoard();
const piece = board.getPiece(square);
board.movePiece(from, to);
```

### `BoardRenderer`
Handles board rendering and animations.

```javascript
const renderer = new BoardRenderer(boardElement, game);
renderer.render();
renderer.animateMove(from, to);
renderer.highlightLegalMoves(moves);
```

### `MoveGenerator`
Generates legal moves for all pieces.

```javascript
const generator = new MoveGenerator(board);
const moves = generator.generateLegalMoves(isWhiteToMove);
```

### `ChessEngine`
Chess engine for position evaluation and analysis.

```javascript
const engine = new ChessEngine();
engine.analyze(board, isWhiteToMove, (evaluation) => {
  console.log('Position evaluation:', evaluation);
});
```

### `EvaluationGraph`
Renders interactive evaluation graph.

```javascript
const graph = new EvaluationGraph('evaluationGraph');
graph.setEvaluations([0.5, 1.2, -0.3, ...]);
graph.draw();
```

### `SidebarUI`
Manages sidebar content and updates.

```javascript
const sidebar = new SidebarUI();
sidebar.updateGameInfo(white, black, whiteAcc, blackAcc);
sidebar.updateMovesList(moves, currentIndex);
```

### `ControlsUI`
Manages playback controls and keyboard input.

```javascript
const controls = new ControlsUI(gameState);
controls.handlePlayPause();
controls.handleFlipBoard();
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No external dependencies required

### Installation

1. Clone the repository:
```bash
git clone https://github.com/divek912-jpg/Chess-analysis.git
cd Chess-analysis
```

2. Open `index.html` in your browser:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx http-server

# Or simply double-click index.html
```

### Usage

#### Loading a Game
```javascript
const moves = [
  { from: 52, to: 36, piece: 'P', notation: '1.e4', evaluation: 0.5 },
  { from: 12, to: 28, piece: 'p', notation: '1...e5', evaluation: 0.3 }
];

moves.forEach(move => app.gameState.addMove(move));
app.updateDisplay();
```

#### Navigation
```javascript
app.nextMove();        // Go to next move
app.previousMove();    // Go to previous move
app.goToMove(index);   // Jump to specific move
app.flipBoard();       // Toggle board orientation
app.autoPlay();        // Start auto-review
```

#### Custom Styling
Modify CSS variables in `css/variables.css`:

```css
:root {
  --color-accent-green: #81b64c;
  --color-accent-red: #e53935;
  --font-size-base: 16px;
  /* ... */
}
```

## Performance

- **60fps animations** using CSS transforms and GPU acceleration
- **Lazy rendering** of board elements
- **Efficient event delegation** for move list
- **Canvas-based** graph rendering for smooth animations
- **Optimized move generation** with early termination
- **Memoization** of board evaluation

## Browser Support

- Chrome/Edge: ✅ (Recommended)
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅ (Responsive)

## Future Enhancements

- [ ] Stockfish engine integration via WebAssembly
- [ ] PGN import/export functionality
- [ ] Opening database integration
- [ ] Custom engine depth selection
- [ ] Move commentary and annotations
- [ ] Game comparison tools
- [ ] Statistics export (PDF/CSV)
- [ ] Blunder detection with suggested improvements
- [ ] Multi-language support
- [ ] Cloud save functionality

## API Reference

### Event Listeners

The app dispatches custom events for major actions:

```javascript
// Listen for move navigation
document.addEventListener('nextMove', () => {});
document.addEventListener('previousMove', () => {});
document.addEventListener('goToMove', (e) => {
  const moveIndex = e.detail.index;
});

// Listen for board actions
document.addEventListener('flipBoard', () => {});

// Listen for playback control
document.addEventListener('playGame', () => {});
document.addEventListener('pauseGame', () => {});

// Listen for move selection
document.addEventListener('moveSelected', (e) => {
  const index = e.detail.index;
});
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

- Inspired by Chess.com's Game Review interface
- Built with vanilla web technologies
- Premium UI design principles applied

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

## Changelog

### v1.0.0 (Initial Release)
- Complete chessboard implementation
- Move generation and validation
- Interactive evaluation graph
- Game replay functionality
- Responsive design
- Dark/Light theme support
- Keyboard shortcuts
- Accessibility features