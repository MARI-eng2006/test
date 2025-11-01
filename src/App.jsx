import React, { useState, useEffect, useCallback } from 'react'; 

const App = () => {
  // --- Global State Management ---
  const [showGame, setShowGame] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(false);
  const [gameMode, setGameMode] = useState('solo'); 
  const [numPlayers, setNumPlayers] = useState(2);

  // --- Global Constants ---
  const game = { 
    id: 'cyber_safe_adventures', 
    title: "Cyber-Safe Adventures: The Race to the Secure Clubhouse!", 
    description: "A 'Snakes and Ladders' style board game where smart online choices advance you, and digital dangers send you backward. Featuring Gemini-powered dynamic scenario generation.", 
    status: "New: Gemini AI Integrated" 
  };

  const playerCharacters = [
    { id: 1, name: "Cyber Knight", emoji: "🛡️", color: "text-blue-400", bgColor: "bg-blue-500", shadow: "shadow-blue-500/50" },
    { id: 2, name: "Hacker Hero", emoji: "💻", color: "text-green-400", bgColor: "bg-green-500", shadow: "shadow-green-500/50" },
    { id: 3, name: "Tech Ninja", emoji: "🥷", color: "text-purple-400", bgColor: "bg-purple-500", shadow: "shadow-purple-500/50" },
    { id: 4, name: "Data Guardian", emoji: "🔐", color: "text-yellow-400", bgColor: "bg-yellow-500", shadow: "shadow-yellow-500/50" },
  ];

  // --- Custom Hook for Typing Effect (UI Polish) ---
  const useTypingEffect = (text, speed = 50) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
      setDisplayedText('');
      if (text) {
        let i = 0;
        const typingInterval = setInterval(() => {
          if (i < text.length) {
            setDisplayedText(prev => prev + text.charAt(i));
            i++;
          } else {
            clearInterval(typingInterval);
          }
        }, speed);
        return () => clearInterval(typingInterval);
      }
    }, [text, speed]);
    return displayedText;
  };

  // --- UI Components (Menu/Instructions) ---

  const AsciiRobot = () => (
    <pre className="text-cyan-400 text-center text-sm md:text-base">
{`
    d8888b. d88888b d8888b. 
    88  '8D 88'     88  '8D 
    88   88 88ooooo 88oobY' 
    88   88 88~~~~~ 88'  b. 
    88  .8D 88.     88'  .8D 
    Y8888D' Y88888P Y8888D' 
`}
    </pre>
  );

  const ModeSelectModal = () => (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="bg-black p-6 md:p-8 border-2 border-cyan-500 shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 text-center font-mono">// SELECT_GAME_MODE //</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => { setGameMode('solo'); setNumPlayers(1); setShowModeSelect(false); setShowLevelSelect(true); }}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-blue-600 hover:from-blue-400 hover:to-cyan-400 text-left transform hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/30"
          >
            <div className="text-2xl mb-2">🎮 SOLO MODE</div>
            <div className="text-sm text-gray-100">Play alone and master cybersecurity skills at your own pace</div>
          </button>
          
          <button 
            onClick={() => { setGameMode('multiplayer'); }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-lg border-2 border-purple-600 hover:from-purple-400 hover:to-pink-400 text-left transform hover:scale-[1.02] transition-all shadow-lg shadow-purple-500/30"
          >
            <div className="text-2xl mb-2">👥 MULTIPLAYER MODE</div>
            <div className="text-sm text-gray-100">Race against 2-4 players to reach the Secure Clubhouse first!</div>
          </button>
        </div>

        {gameMode === 'multiplayer' && (
          <div className="mt-6 p-4 border border-gray-700 rounded-lg bg-gray-900">
            <h3 className="text-xl text-green-400 mb-4 text-center font-mono">// SELECT_PLAYER_COUNT //</h3>
            <div className="grid grid-cols-3 gap-3">
              {[2, 3, 4].map(count => (
                <button 
                  key={count}
                  onClick={() => setNumPlayers(count)}
                  className={`py-3 px-4 rounded-lg border-2 font-bold transition-all transform hover:scale-105 ${
                    numPlayers === count 
                      ? 'bg-green-500 text-black border-green-600 shadow-md shadow-green-500/50' 
                      : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600'
                  }`}
                >
                  {count} Players
                </button>
              ))}
            </div>
            <button 
              onClick={() => { setShowModeSelect(false); setShowLevelSelect(true); }}
              className="w-full mt-4 bg-green-500 text-black font-bold py-3 px-6 rounded-lg border-2 border-green-600 hover:bg-green-400 transform hover:scale-[1.01] transition-all shadow-lg shadow-green-500/50"
            >
              CONTINUE →
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const LevelSelectModal = () => (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="bg-black p-6 md:p-8 border-2 border-cyan-500 shadow-lg max-w-2xl w-full relative">
        <button 
          onClick={() => { setShowLevelSelect(false); setShowModeSelect(true); }} 
          className="absolute top-4 left-4 bg-cyan-500 hover:bg-cyan-400 text-black w-10 h-10 flex items-center justify-center text-xl font-bold rounded-full border-2 border-cyan-700 transition-all"
          aria-label="Back"
        >
          ←
        </button>
        
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 text-center font-mono">// SELECT_DIFFICULTY //</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => { setCurrentLevel(1); setShowLevelSelect(false); setShowGame(true); }}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-4 px-6 rounded-lg border-2 border-green-700 hover:from-green-500 hover:to-blue-500 text-left transform hover:scale-[1.02] transition-all shadow-lg shadow-green-500/30"
          >
            <div className="text-2xl mb-2">🌟 LEVEL 1: BEGINNER</div>
            <div className="text-sm text-gray-100">Basic cybersecurity awareness • 36 squares • Easy scenarios</div>
            <div className="text-xs text-gray-300 mt-1">🎨 Theme: Bright Learning Academy</div>
          </button>
          
          <button 
            onClick={() => { setCurrentLevel(2); setShowLevelSelect(false); setShowGame(true); }}
            className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg border-2 border-orange-700 hover:from-orange-500 hover:to-yellow-500 text-left transform hover:scale-[1.02] transition-all shadow-lg shadow-orange-500/30"
          >
            <div className="text-2xl mb-2">⚡ LEVEL 2: INTERMEDIATE</div>
            <div className="text-sm text-gray-100">Advanced threats • 49 squares • Medium scenarios</div>
            <div className="text-xs text-gray-300 mt-1">🎨 Theme: Warning Zone Command</div>
          </button>
          
          <button 
            onClick={() => { setCurrentLevel(3); setShowLevelSelect(false); setShowGame(true); }}
            className="w-full bg-gradient-to-r from-red-700 to-purple-700 text-white font-bold py-4 px-6 rounded-lg border-2 border-red-800 hover:from-red-600 hover:to-purple-600 text-left transform hover:scale-[1.02] transition-all shadow-lg shadow-red-500/30"
          >
            <div className="text-2xl mb-2">🔥 LEVEL 3: EXPERT</div>
            <div className="text-sm text-gray-100">Elite security operations • 64 squares • Hard scenarios</div>
            <div className="text-xs text-gray-300 mt-1">🎨 Theme: Dark Ops Matrix</div>
          </button>
        </div>
      </div>
    </div>
  );

  const InstructionsModal = () => (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-black p-6 md:p-8 border-2 border-cyan-500 shadow-lg max-w-3xl w-full my-8 relative">
        <button 
          onClick={() => setShowInstructions(false)} 
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-500 text-white w-10 h-10 flex items-center justify-center text-3xl font-bold leading-none rounded-full border-2 border-red-700 transition-all"
          aria-label="Close"
        >
          ×
        </button>
        
        <h2 className="text-2xl md:text-3xl text-cyan-400 mb-6 text-center font-mono">// HOW_TO_PLAY.txt //</h2>
        
        <div className="text-green-400 space-y-4 text-sm md:text-base">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">🎯 OBJECTIVE</h3>
            <p>Navigate from Node 01 to the final node (Secure Clubhouse) by making smart cybersecurity decisions. In multiplayer, be the FIRST to reach the end!</p>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">🎮 GAME MODES</h3>
            <p className="mb-2"><span className="text-blue-400 font-semibold">Solo Mode:</span> Play alone and master cybersecurity skills at your own pace</p>
            <p><span className="text-pink-400 font-semibold">Multiplayer Mode:</span> Race against 2-4 friends! Take turns rolling the die</p>
          </div>

          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">🎚️ LEVELS</h3>
            <p className="mb-2"><span className="text-green-500 font-semibold">Level 1 - Beginner:</span> 36 squares, basic security scenarios</p>
            <p className="mb-2"><span className="text-yellow-500 font-semibold">Level 2 - Intermediate:</span> 49 squares, advanced threats</p>
            <p><span className="text-red-500 font-semibold">Level 3 - Expert:</span> 64 squares, elite security operations</p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">🎲 GAMEPLAY</h3>
            <p className="mb-2"><span className="text-cyan-400 font-semibold">1. Roll the Die:</span> Click the roll button (in multiplayer, wait your turn!)</p>
            <p className="mb-2"><span className="text-cyan-400 font-semibold">2. Move Forward:</span> Advance the number of nodes shown on the die</p>
            <p className="mb-2"><span className="text-cyan-400 font-semibold">3. Follow Instructions:</span> Land on special squares for bonuses or challenges</p>
            <p><span className="text-cyan-400 font-semibold">4. Win:</span> First to reach the final node wins in multiplayer!</p>
          </div>

          <div className="border-l-4 border-pink-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">🗺️ SPECIAL SQUARES</h3>
            <p className="mb-2"><span className="text-green-500 font-semibold">↑ Secure Ports (Green):</span> Jump ahead! (+20 points)</p>
            <p className="mb-2"><span className="text-red-500 font-semibold">⚠ Firewall Traps (Red):</span> Fall back! (-10 points)</p>
            <p><span className="text-purple-500 font-semibold">? Security Audits (Purple):</span> Triggers a **Gemini-generated** scenario. Answer correctly to advance 3 nodes (+30 points) or fall back 4 nodes (-15 points)</p>
          </div>

          <div className="border-l-4 border-cyan-500 pl-4">
            <h3 className="text-xl text-white mb-2 font-bold">📊 SCORING SYSTEM</h3>
            <p className="mb-1">✅ Correct Answer: +30 points, advance 3 nodes</p>
            <p className="mb-1">❌ Wrong Answer: -15 points, fall back 4 nodes</p>
            <p className="mb-1">🚀 Secure Port: +20 points, jump forward</p>
            <p className="mb-1">🔥 Firewall Trap: -10 points, fall backward</p>
            <p>🏆 Complete Level: +100 bonus points</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setShowInstructions(false)} 
            className="bg-cyan-500 text-black font-bold py-3 px-8 rounded-lg border-2 border-cyan-700 hover:bg-cyan-400 transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/50"
          >
            CLOSE_INSTRUCTIONS
          </button>
        </div>
      </div>
    </div>
  );
  
  // --- Game Sub-Components (Defined here for scope) ---

  const PlayerToken = ({ player }) => (
    <div 
        className={`w-4 h-4 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs md:text-sm 
                    font-bold transition-all duration-500 ease-out transform scale-110 
                    ${player.bgColor} ${player.shadow} shadow-lg absolute -top-1 -right-1 z-20`}
        style={{ animation: 'bounce 1s infinite alternate' }}
    >
        {player.emoji}
    </div>
  );

  const Square = ({ number, playersOnSquare, config, shortcuts, hazards, cardSquares }) => {
    const isShortcutStart = shortcuts[number];
    const isHazardStart = hazards[number];
    const isCardSquare = cardSquares.includes(number);
    const isStart = number === 1;
    const isEnd = number === config.squares;

    let bgColor = 'bg-gray-800 hover:bg-gray-700';
    let content = number;
    let icon = null;
    let borderColor = 'border-gray-600';
    let textColor = 'text-gray-400';

    if (isStart) {
        bgColor = 'bg-blue-900/70 hover:bg-blue-800/70';
        content = "START";
        borderColor = 'border-blue-500';
        textColor = 'text-white';
    } else if (isEnd) {
        bgColor = 'bg-cyan-900/70 hover:bg-cyan-800/70';
        content = "CLUBHOUSE";
        borderColor = 'border-cyan-500';
        textColor = 'text-cyan-400';
    } else if (isShortcutStart) {
        bgColor = 'bg-green-900/70 hover:bg-green-800/70';
        icon = '↑';
        content = `${number} → ${shortcuts[number]}`;
        borderColor = 'border-green-500';
        textColor = 'text-green-300';
    } else if (isHazardStart) {
        bgColor = 'bg-red-900/70 hover:bg-red-800/70';
        icon = '⚠';
        content = `${number} → ${hazards[number]}`;
        borderColor = 'border-red-500';
        textColor = 'text-red-300';
    } else if (isCardSquare) {
        bgColor = 'bg-purple-900/70 hover:bg-purple-800/70';
        icon = '?';
        borderColor = 'border-purple-500';
        textColor = 'text-purple-300';
    }

    return (
        <div 
            className={`
                relative flex flex-col items-center justify-center w-full h-full
                p-1 text-xs md:text-sm font-bold
                border-2 ${borderColor} rounded-lg transition-colors duration-300
                ${bgColor} shadow-inner shadow-black/50
            `}
        >
            <span className={`absolute top-1 left-1 text-xs font-mono ${textColor}`}>{number}</span>
            {icon && <span className="text-xl md:text-2xl mt-1">{icon}</span>}
            <span className="text-center text-[0.6rem] md:text-xs leading-none mt-1 text-white">{content}</span>
            
            {playersOnSquare.map(player => (
                <PlayerToken key={player.id} player={player} />
            ))}
        </div>
    );
  };

  const Board = ({ config, players, shortcuts, hazards, cardSquares }) => {
    // Generate board cells and calculate their physical grid position based on the S-pattern
    const boardCells = Array.from({ length: config.squares }, (_, i) => i + 1).map(num => {
        const row = Math.floor((num - 1) / config.gridCols);
        const col = (num - 1) % config.gridCols;

        // Visual row (0 is top, config.gridRows - 1 is bottom)
        const visualRow = config.gridRows - 1 - row;
        
        let visualCol;
        // Even visual rows (0, 2, 4...) are left-to-right (standard order)
        if (visualRow % 2 === 0) {
            visualCol = col;
        } else {
            // Odd visual rows (1, 3, 5...) are right-to-left (reversed order)
            visualCol = config.gridCols - 1 - col;
        }

        const playersOnSquare = players.filter(p => p.position === num);
        
        return (
            <div 
                key={num} 
                style={{ 
                    gridRow: visualRow + 1, // 1-indexed
                    gridColumn: visualCol + 1 // 1-indexed
                }}
            >
                <Square 
                    number={num} 
                    playersOnSquare={playersOnSquare} 
                    config={config}
                    shortcuts={shortcuts}
                    hazards={hazards}
                    cardSquares={cardSquares}
                />
            </div>
        );
    });

    return (
        <div 
            className="grid gap-1 md:gap-2 p-1 md:p-4 bg-gray-900 border-4 border-cyan-700 rounded-xl shadow-2xl"
            style={{
                gridTemplateColumns: `repeat(${config.gridCols}, 1fr)`,
                gridTemplateRows: `repeat(${config.gridRows}, 1fr)`,
                aspectRatio: '1 / 1', // Keep it square
                maxWidth: '600px',
                width: '100%',
                minWidth: '200px'
            }}
        >
            {boardCells}
        </div>
    );
  };

  const Die = ({ value, isRolling, handleDieRoll, isInteracting, gameOver }) => {
    
    // Simple Die Face with dots
    const DieFace = ({ num }) => {
        const dotStyle = "absolute bg-white w-1.5 h-1.5 rounded-full";
        switch(num) {
            case 1: return <div className={dotStyle} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />;
            case 2: return (<> <div className={dotStyle} style={{ top: '15%', left: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', right: '15%' }} /> </>);
            case 3: return (<> <div className={dotStyle} style={{ top: '15%', left: '15%' }} /> <div className={dotStyle} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> <div className={dotStyle} style={{ bottom: '15%', right: '15%' }} /> </>);
            case 4: return (<> <div className={dotStyle} style={{ top: '15%', left: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', right: '15%' }} /> <div className={dotStyle} style={{ top: '15%', right: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', left: '15%' }} /> </>);
            case 5: return (<> <div className={dotStyle} style={{ top: '15%', left: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', right: '15%' }} /> <div className={dotStyle} style={{ top: '15%', right: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', left: '15%' }} /> <div className={dotStyle} style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} /> </>);
            case 6: return (<> <div className={dotStyle} style={{ top: '15%', left: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', right: '15%' }} /> <div className={dotStyle} style={{ top: '15%', right: '15%' }} /> <div className={dotStyle} style={{ bottom: '15%', left: '15%' }} /> <div className={dotStyle} style={{ top: '50%', left: '15%' }} /> <div className={dotStyle} style={{ bottom: '50%', right: '15%' }} /> </>);
            default: return <span className="text-sm text-red-500">ERR</span>;
        }
    }
    
    return (
        <div className="flex flex-col items-center">
            <button
                onClick={handleDieRoll}
                disabled={isInteracting || isRolling || gameOver}
                className={`
                    w-20 h-20 md:w-28 md:h-28 rounded-xl bg-gray-700 border-4 border-cyan-500 shadow-xl relative
                    flex items-center justify-center p-2 mb-4 text-3xl font-extrabold text-white
                    transition-all duration-200 transform
                    ${isRolling ? 'animate-pulse scale-110 border-pink-500' : 'hover:scale-105'}
                    ${(isInteracting || gameOver) ? 'opacity-50 cursor-not-allowed' : ''}
                `}
            >
                <div 
                    className={`
                        w-full h-full bg-cyan-600 rounded-lg relative
                        flex items-center justify-center text-black transition-all duration-100
                        ${isRolling ? 'rotate-[360deg]' : ''}
                    `}
                >
                    {/* The Die face itself */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-900 rounded-md shadow-inner shadow-black/50 relative">
                        {isRolling ? 
                            <span className="absolute inset-0 flex items-center justify-center text-cyan-400 text-2xl animate-spin">⛁</span> :
                            <DieFace num={value} />
                        }
                    </div>
                </div>
            </button>
            <p className={`text-sm md:text-base font-mono ${isRolling ? 'text-pink-400' : 'text-cyan-400'}`}>
                {isRolling ? 'ROLLING...' : `ROLLED: ${value}`}
            </p>
        </div>
    );
  };
  
  // --- Game Component with LLM Logic ---
  const CyberSafeAdventuresGame = () => {
    
    // --- Configuration and Data ---
    const levelConfig = {
      1: { squares: 36, gridCols: 6, gridRows: 6, name: "BEGINNER", color: "green", prompt: "Generate a simple, everyday scenario for basic online safety, password hygiene, or phishing identification." },
      2: { squares: 49, gridCols: 7, gridRows: 7, name: "INTERMEDIATE", color: "yellow", prompt: "Generate a scenario involving advanced threats like spear phishing, public Wi-Fi security, or credential stuffing." },
      3: { squares: 64, gridCols: 8, gridRows: 8, name: "EXPERT", color: "red", prompt: "Generate an expert-level scenario involving APTs, zero-day vulnerabilities, or deepfake/supply chain attacks." }
    };
    
    const config = levelConfig[currentLevel];
    const totalSquares = config.squares;
    
    // Level-specific shortcuts and hazards (fixed)
    const levelData = {
      1: { shortcuts: { 4: 14, 9: 21, 17: 27, 20: 32 }, hazards: { 11: 6, 18: 10, 26: 13, 31: 19 }, cardSquares: [7, 15, 22, 28, 33] },
      2: { shortcuts: { 5: 20, 10: 25, 15: 35, 22: 40, 30: 45 }, hazards: { 13: 4, 19: 8, 28: 12, 37: 18, 44: 25 }, cardSquares: [8, 16, 24, 32, 38, 42, 46] },
      3: { shortcuts: { 5: 25, 10: 29, 18: 38, 21: 42, 28: 50, 33: 51, 37: 55, 45: 61, 52: 63 }, hazards: { 15: 4, 23: 8, 31: 11, 39: 20, 44: 26, 48: 28, 56: 35, 59: 38, 62: 42 }, cardSquares: [7, 13, 22, 27, 36, 40, 43, 49, 54, 58, 60] }
    };
    const shortcuts = levelData[currentLevel].shortcuts;
    const hazards = levelData[currentLevel].hazards;
    const cardSquares = levelData[currentLevel].cardSquares;

    // --- State Management ---
    const [players, setPlayers] = useState(() => {
      const count = gameMode === 'solo' ? 1 : numPlayers;
      return Array.from({ length: count }, (_, i) => ({
        ...playerCharacters[i],
        position: 1, score: 0, moves: 0, correctAnswers: 0
      }));
    });
    
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [actionLog, setActionLog] = useState([`[SYSTEM_BOOT] Level ${currentLevel}: ${config.name}. ${players[0].name}, roll to begin!`]);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const [showCard, setShowCard] = useState(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [dieValue, setDieValue] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [showStats, setShowStats] = useState(true);
    const [isGeneratingCard, setIsGeneratingCard] = useState(false); 
    const [isSpeaking, setIsSpeaking] = useState(false); 

    const currentPlayer = players[currentPlayerIndex];

    // --- Gemini API Functions ---

    // Structured JSON Schema for scenario generation
    const scenarioSchema = {
        type: "OBJECT",
        properties: {
            text: { type: "STRING", description: "The cybersecurity scenario question." },
            options: { type: "ARRAY", description: "Three distinct answer options for the scenario.", items: { type: "STRING" } },
            correct: { type: "INTEGER", description: "The 0-based index of the correct option (0, 1, or 2)." },
            success: { type: "STRING", description: "A concise, motivating message for a correct answer, e.g., 'Phishing avoided!'" },
            failure: { type: "STRING", description: "A concise, corrective message for a wrong answer, e.g., 'Data compromised!'" }
        },
        required: ["text", "options", "correct", "success", "failure"]
    };

    /**
     * Calls Gemini API to generate a new, structured scenario card.
     */
    const generateScenario = useCallback(async () => {
        setIsGeneratingCard(true);
        const systemPrompt = `You are a cybersecurity educator. Your task is to generate a single, realistic cybersecurity scenario based on the player's difficulty level. The scenario must have exactly 3 multiple-choice options, one of which is the clear best practice. The success and failure messages must be short and game-like.`;
        const userQuery = `${config.prompt} Ensure the output strictly follows the JSON schema provided.`;
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        const payload = {
            contents: [{ parts: [{ text: userQuery }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] },
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: scenarioSchema,
            },
        };

        const fallbackCard = {
            text: "Fallback: You found a suspicious file. Do you run it, scan it, or delete it?",
            options: ["Run immediately", "Scan with antivirus", "Delete it"],
            correct: 1,
            success: "Fallback success! Scanned and secured!",
            failure: "Fallback failure! Malicious code executed!"
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();

            if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                const jsonText = result.candidates[0].content.parts[0].text;
                const scenario = JSON.parse(jsonText);
                return scenario;
            } else {
                console.error("API response missing content:", result);
                return fallbackCard;
            }
        } catch (error) {
            console.error("Gemini API call failed, using fallback:", error);
            return fallbackCard;
        } finally {
            setIsGeneratingCard(false);
        }
    }, [config.prompt]);
    
    /**
     * Calls Gemini TTS API to read the given text aloud.
     */
    const speakText = useCallback(async (textToSpeak) => {
        if (isSpeaking) return;
        setIsSpeaking(true);
        
        const payload = {
            contents: [{ parts: [{ text: textToSpeak }] }],
            generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: "Fenrir" }
                    }
                }
            },
            model: "gemini-2.5-flash-preview-tts"
        };
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const result = await response.json();
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const base64ToArrayBuffer = (base64) => {
                    const binaryString = atob(base64);
                    const len = binaryString.length;
                    const bytes = new Uint8Array(len);
                    for (let i = 0; i < len; i++) {
                        bytes[i] = binaryString.charCodeAt(i);
                    }
                    return bytes.buffer;
                };

                const pcmToWav = (pcm16, sampleRate = 16000) => {
                    const numChannels = 1;
                    const bytesPerSample = 2;
                    const blockAlign = numChannels * bytesPerSample;
                    const byteRate = sampleRate * blockAlign;
                    const dataSize = pcm16.byteLength;
                    const buffer = new ArrayBuffer(44 + dataSize);
                    const view = new DataView(buffer);
                    let offset = 0;

                    const writeString = (str) => {
                        for (let i = 0; i < str.length; i++) {
                            view.setUint8(offset++, str.charCodeAt(i));
                        }
                    };

                    // RIFF chunk
                    writeString('RIFF'); offset += 4; // ChunkSize (later)
                    writeString('WAVE');

                    // FMT chunk
                    writeString('fmt ');
                    view.setUint32(offset, 16, true); offset += 4; // Subchunk1Size
                    view.setUint16(offset, 1, true); offset += 2; // AudioFormat (1=PCM)
                    view.setUint16(offset, numChannels, true); offset += 2;
                    view.setUint32(offset, sampleRate, true); offset += 4;
                    view.setUint32(offset, byteRate, true); offset += 4;
                    view.setUint16(offset, blockAlign, true); offset += 2;
                    view.setUint16(offset, 16, true); offset += 2; // BitsPerSample

                    // Data chunk
                    writeString('data'); offset += 4; // Subchunk2Size (later)

                    // Write PCM data
                    // Correcting the size issue for the Int16Array
                    const byteLength = pcm16.byteLength;
                    const correctByteLength = byteLength % 2 !== 0 ? byteLength - 1 : byteLength; // Ensure even length
                    
                    const pcmDataBuffer = pcm16.slice(0, correctByteLength);
                    
                    const pcmDataView = new DataView(pcmDataBuffer);
                    const pcm16Array = new Int16Array(pcmDataView.buffer);
                    
                    const pcmDataDestination = new Int16Array(buffer, offset + 4, pcm16Array.length);
                    pcmDataDestination.set(pcm16Array);
                    
                    const finalDataSize = pcm16Array.byteLength;
                    offset += finalDataSize;

                    // Fill in the blank sizes
                    view.setUint32(4, 36 + finalDataSize, true); // ChunkSize
                    view.setUint32(40, finalDataSize, true); // Subchunk2Size

                    return new Blob([buffer], { type: 'audio/wav' });
                };

                const pcmData = base64ToArrayBuffer(audioData);
                
                // Safety check for odd byte length before creating Int16Array
                const byteLength = pcmData.byteLength;
                const correctByteLength = byteLength % 2 !== 0 ? byteLength - 1 : byteLength;
                const safePcmData = pcmData.slice(0, correctByteLength);
                
                const pcm16 = new Int16Array(safePcmData);
                const wavBlob = pcmToWav(pcm16);
                const audioUrl = URL.createObjectURL(wavBlob);
                
                const audio = new Audio(audioUrl);
                audio.onended = () => {
                    setIsSpeaking(false);
                    URL.revokeObjectURL(audioUrl); // Clean up
                };
                audio.play();

            } else {
                console.error("TTS failed or audio data missing.");
            }
        } catch (error) {
            console.error("TTS API call error:", error);
        } finally {
            if (isSpeaking) setIsSpeaking(false);
        }
    }, [isSpeaking]);

    // --- Core Game Logic Handlers ---

    const logAction = (message, callback) => {
        setIsInteracting(true);
        setActionLog(prev => [message, ...prev.slice(0, 4)]);
        setTimeout(() => {
            if (!showCard && !isGeneratingCard) setIsInteracting(false);
            if (callback) callback();
        }, message.length * 25 + 400);
    };

    const updatePlayer = (updates, callback) => {
        setPlayers(prevPlayers => {
            const newPlayers = [...prevPlayers];
            newPlayers[currentPlayerIndex] = { ...newPlayers[currentPlayerIndex], ...updates };
            return newPlayers;
        });
        if (callback) setTimeout(callback, 300);
    };

    const nextTurn = () => {
        if (gameMode === 'multiplayer') {
            const nextIndex = (currentPlayerIndex + 1) % players.length;
            setCurrentPlayerIndex(nextIndex);
            logAction(`[TURN_CHANGE] ${players[nextIndex].name}'s turn!`);
        } else {
            setIsInteracting(false);
        }
    };

    const handleDieRoll = () => {
        if (gameOver || showCard || isInteracting || isRolling || isGeneratingCard) return;
        setIsRolling(true);
        setIsInteracting(true);
        updatePlayer({ moves: currentPlayer.moves + 1 });
        
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            setDieValue(Math.floor(Math.random() * 6) + 1);
            rollCount++;
            if (rollCount >= 10) {
                clearInterval(rollInterval);
                const finalRoll = Math.floor(Math.random() * 6) + 1;
                setDieValue(finalRoll);
                setIsRolling(false);
                logAction(`[${currentPlayer.name}] Rolled a ${finalRoll}.`, () => processMove(finalRoll));
            }
        }, 100);
    };

    const processMove = async (roll) => { // Made async to handle LLM call
        let newPosition = currentPlayer.position + roll;

        // Check for victory
        if (newPosition >= totalSquares) {
            newPosition = totalSquares;
            updatePlayer({ position: newPosition, score: currentPlayer.score + 100 }, () => {
                logAction(`[VICTORY] ${currentPlayer.name} reached the Secure Clubhouse and completed Level ${currentLevel}!`);
                setGameOver(true);
                setWinner(currentPlayer);
            });
            return;
        }
        
        updatePlayer({ position: newPosition }, async () => {
            // Check for special squares after initial move
            if (shortcuts[newPosition]) {
                const endSquare = shortcuts[newPosition];
                updatePlayer({ score: currentPlayer.score + 20, position: endSquare });
                logAction(`[SECURE_PORT] ${currentPlayer.name} jumped from ${newPosition} to ${endSquare}! (+20 pts)`, nextTurn);
            } else if (hazards[newPosition]) {
                const endSquare = hazards[newPosition];
                updatePlayer({ score: Math.max(0, currentPlayer.score - 10), position: endSquare });
                logAction(`[FIREWALL_TRAP] ${currentPlayer.name} fell back from ${newPosition} to ${endSquare}! (-10 pts)`, nextTurn);
            } else if (cardSquares.includes(newPosition)) {
                // LLM FEATURE 1: DYNAMIC SCENARIO GENERATION
                logAction(`[SECURITY_AUDIT] ${currentPlayer.name} must answer a question! Generating scenario...`, async () => {
                    const dynamicCard = await generateScenario();
                    // Keep interaction locked until card is answered
                    setIsInteracting(true);
                    setShowCard(dynamicCard);
                });
            } else {
                logAction(`${currentPlayer.name} moved to node ${newPosition}.`, nextTurn);
            }
        });
    };

    const handleAnswer = (choice) => {
        const card = showCard;
        setShowCard(null);
        setIsInteracting(true); // Keep interaction locked until move is processed
        let moveAmount = 0;
        let message = "";
        
        if (choice === card.correct) {
            message = `[${currentPlayer.name}] ${card.success} (+30 pts). Advancing 3 nodes.`;
            moveAmount = 3;
            updatePlayer({ 
              score: currentPlayer.score + 30,
              correctAnswers: currentPlayer.correctAnswers + 1
            });
        } else {
            message = `[${currentPlayer.name}] ${card.failure} (-15 pts). Falling back 4 nodes.`;
            moveAmount = -4;
            updatePlayer({ score: Math.max(0, currentPlayer.score - 15) });
        }
        
        logAction(message, () => {
            const targetPosition = Math.max(1, currentPlayer.position + moveAmount);
            updatePlayer({ position: targetPosition }, nextTurn);
        });
    };

    // --- UI/Modal Components that need local state/handlers ---

    const CardModal = ({ card, handleAnswer, currentPlayer }) => {
      // LLM FEATURE 2: TEXT-TO-SPEECH
      const fullText = `Security Audit for ${currentPlayer.name}. Scenario: ${card.text}. Your options are: ${card.options.join(', ')}.`;
      return (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 p-6 md:p-8 border-4 border-purple-500 shadow-2xl max-w-lg w-full rounded-xl">
                  <div className={`text-xl md:text-2xl text-purple-400 font-bold mb-4 text-center border-b-2 border-purple-600 pb-2 font-mono ${currentPlayer.color}`}>
                      [SECURITY_AUDIT] {currentPlayer.name}
                  </div>
                  
                  <div className='flex justify-between items-center mb-6'>
                    <h3 className="text-white text-lg md:text-xl font-mono flex-grow">{card.text}</h3>
                    <button
                        onClick={() => speakText(fullText)}
                        disabled={isSpeaking}
                        className={`ml-4 p-2 rounded-full font-bold transition-all transform hover:scale-105 ${
                            isSpeaking 
                            ? 'bg-red-500 text-white animate-pulse' 
                            : 'bg-yellow-400 text-black shadow-md shadow-yellow-500/50'
                        }`}
                        aria-label="Read scenario aloud"
                    >
                        {isSpeaking ? '🛑' : '✨🔊'}
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                      {card.options.map((option, index) => (
                          <button
                              key={index}
                              onClick={() => handleAnswer(index)}
                              className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg border-2 border-gray-700 hover:bg-purple-700 hover:border-purple-500 transition-all text-left transform hover:scale-[1.01]"
                          >
                              <span className="text-purple-400 mr-2">({String.fromCharCode(65 + index)})</span> {option}
                          </button>
                      ))}
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-6 text-center">Choose wisely! Correct answer advances 3 nodes, wrong answer retreats 4 nodes.</p>
              </div>
          </div>
      );
    };

    const LoadingModal = () => (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 p-8 border-4 border-pink-500 shadow-2xl max-w-sm w-full rounded-xl text-center">
              <div className="text-6xl mb-4 animate-spin text-pink-400">⚙️</div>
              <h2 className="text-xl text-white font-bold mb-2 font-mono">GENERATING_SCENARIO...</h2>
              <p className="text-gray-400">The Gemini AI is crafting a unique cybersecurity challenge for Level {currentLevel}.</p>
          </div>
      </div>
    );

    const Scoreboard = ({ players, currentPlayer, actionLog, totalSquares, showStats, setShowStats }) => (
      <div className="flex flex-col space-y-4">
          {/* Current Turn & Roll Button */}
          <div className="p-4 bg-gray-800 border-2 border-cyan-700 rounded-lg shadow-lg">
              <h3 className="text-xl text-cyan-400 font-mono mb-2">// CURRENT_TURN //</h3>
              <div className={`flex items-center p-2 rounded-md ${currentPlayer.bgColor} bg-opacity-30 border-2 border-cyan-500`}>
                  <span className={`text-2xl mr-3 ${currentPlayer.color}`}>{currentPlayer.emoji}</span>
                  <span className="text-lg font-bold text-white">{currentPlayer.name}</span>
              </div>
          </div>
          
          {/* Player Score Table */}
          <div className="p-4 bg-gray-800 border-2 border-cyan-700 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-2 border-b border-gray-600 pb-2">
                   <h3 className="text-xl text-cyan-400 font-mono">// PLAYER_STATS //</h3>
                   <button 
                      onClick={() => setShowStats(!showStats)} 
                      className="text-sm text-cyan-500 hover:text-cyan-400 font-mono"
                   >
                      [{showStats ? 'HIDE' : 'SHOW'}_DETAILS]
                   </button>
              </div>
             
              <div className="space-y-2">
                  {players.map(player => (
                      <div 
                          key={player.id} 
                          className={`p-2 rounded-md transition-all duration-300 ${player.id === currentPlayer.id ? 'bg-cyan-900 border border-cyan-500' : 'bg-gray-700'}`}
                      >
                          <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                  <span className={`text-xl mr-2 ${player.color}`}>{player.emoji}</span>
                                  <span className="text-white font-semibold">{player.name}</span>
                              </div>
                              <span className="text-lg font-bold text-yellow-400">{player.score} pts</span>
                          </div>
                          <div className="text-sm text-gray-400 mt-1 flex justify-between">
                              <span>Node: <span className="text-white font-bold">{player.position}/{totalSquares}</span></span>
                              {showStats && (
                                  <>
                                      <span>Rolls: {player.moves}</span>
                                      <span>Correct: {player.correctAnswers}</span>
                                  </>
                              )}
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Action Log */}
          <div className="p-4 bg-gray-800 border-2 border-cyan-700 rounded-lg shadow-lg flex-grow">
              <h3 className="text-xl text-cyan-400 font-mono mb-2 border-b border-gray-600 pb-2">// ACTION_LOG //</h3>
              <div className="h-48 overflow-y-auto space-y-1 text-sm font-mono scrollbar-thin scrollbar-thumb-cyan-700 scrollbar-track-gray-900">
                  {actionLog.map((log, index) => (
                      <p key={index} className="text-gray-300 break-words">
                          {log}
                      </p>
                  ))}
              </div>
          </div>
      </div>
    );
    
    // --- Other Handlers (Restart, Next Level, Go Home) ---

    const handleRestart = () => {
        setPlayers(Array.from({ length: players.length }, (_, i) => ({
          ...playerCharacters[i],
          position: 1, score: 0, moves: 0, correctAnswers: 0
        })));
        setCurrentPlayerIndex(0);
        setActionLog([`[SYSTEM_REBOOT] Level ${currentLevel}: ${config.name}. ${players[0].name}, roll to begin!`]);
        setGameOver(false); setWinner(null); setShowCard(null); setDieValue(1); setIsInteracting(false);
    };
    
    const handleGoHome = () => {
        setGameOver(false); setWinner(null); setShowCard(null); setIsInteracting(false); setDieValue(1);
        setCurrentLevel(1); setShowGame(false); setShowModeSelect(false);
    };

    const handleNextLevel = () => {
        if (currentLevel < 3) {
            setCurrentLevel(currentLevel + 1); 
            setPlayers(prevPlayers => prevPlayers.map(p => ({ ...p, position: 1 })));
            setCurrentPlayerIndex(0);
            setActionLog([`[LEVEL_UP] Level ${currentLevel + 1} initialized! ${players[0].name}, start the audit!`]);
            setGameOver(false); setWinner(null); setShowCard(null); setDieValue(1); setIsInteracting(false);
        }
    };
    
    const GameOverModal = () => (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
            <div className={`bg-gray-900 p-8 border-4 ${winner?.id === 1 ? 'border-green-500' : 'border-cyan-500'} shadow-2xl max-w-md w-full rounded-xl text-center`}>
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-3xl text-green-400 font-bold mb-4 font-mono">// GAME_COMPLETE //</h2>
                
                <p className="text-xl text-white mb-6">
                    {winner.name} successfully reached the Secure Clubhouse!
                </p>
                <p className="text-2xl text-yellow-400 mb-6 font-mono">FINAL SCORE: {winner.score} pts</p>
                
                <div className="space-y-4">
                    {currentLevel < 3 && winner.id === currentPlayer.id && (
                        <button 
                            onClick={handleNextLevel}
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg border-2 border-green-700 hover:bg-green-500 transition-all transform hover:scale-[1.01]"
                        >
                            PROCEED TO LEVEL {currentLevel + 1}
                        </button>
                    )}
                    <button 
                        onClick={handleRestart}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg border-2 border-blue-700 hover:bg-blue-500 transition-all transform hover:scale-[1.01]"
                    >
                        RESTART LEVEL {currentLevel}
                    </button>
                    <button 
                        onClick={handleGoHome}
                        className="w-full bg-gray-600 text-white font-bold py-3 px-6 rounded-lg border-2 border-gray-700 hover:bg-gray-500 transition-all transform hover:scale-[1.01]"
                    >
                        BACK TO MAIN MENU
                    </button>
                </div>
            </div>
        </div>
    );

    // --- Main Game Render ---
    return (
        <div className="flex flex-col h-screen overflow-hidden p-2 md:p-6 bg-gray-950 text-white font-sans">
            <header className="flex justify-between items-center mb-4 p-2 border-b-2 border-cyan-500 bg-gray-900 rounded-lg">
                <h1 className="text-xl md:text-3xl font-extrabold text-cyan-400 font-mono leading-tight">
                    {game.title} - <span className={`text-${config.color}-400`}>L{currentLevel}: {config.name}</span>
                </h1>
                <button 
                    onClick={handleGoHome}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg border-2 border-red-700 hover:bg-red-500 transition-all text-sm shadow-md shadow-red-500/50"
                >
                    EXIT
                </button>
            </header>

            <main className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
                {/* Left/Center: Game Board and Die Control (Main Focus) */}
                <div className="flex flex-col items-center justify-center lg:w-3/5 xl:w-2/3 p-2 space-y-4 overflow-y-auto custom-scrollbar">
                    <Board 
                        config={config} 
                        players={players} 
                        shortcuts={shortcuts} 
                        hazards={hazards} 
                        cardSquares={cardSquares}
                    />
                    
                    <div className="mt-4 p-4 bg-gray-800 border-2 border-cyan-700 rounded-lg shadow-xl flex flex-col items-center">
                        <Die 
                            value={dieValue} 
                            isRolling={isRolling} 
                            handleDieRoll={handleDieRoll} 
                            isInteracting={isInteracting || isGeneratingCard} // Block die roll during generation
                            gameOver={gameOver}
                        />
                    </div>
                </div>

                {/* Right: Scoreboard and Action Log */}
                <aside className="lg:w-2/5 xl:w-1/3 p-2 overflow-y-auto custom-scrollbar">
                    <Scoreboard 
                        players={players} 
                        currentPlayer={currentPlayer} 
                        actionLog={actionLog}
                        totalSquares={totalSquares}
                        showStats={showStats}
                        setShowStats={setShowStats}
                    />
                </aside>
            </main>

            {/* Modals */}
            {isGeneratingCard && <LoadingModal />}
            {showCard && <CardModal card={showCard} handleAnswer={handleAnswer} currentPlayer={currentPlayer} />}
            {gameOver && winner && <GameOverModal />}
            
            {/* Custom Styles for Animation and Scrollbar */}
            <style>{`
                @keyframes bounce {
                    0% { transform: translateY(0) scale(1.1); }
                    100% { transform: translateY(-5px) scale(1.15); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1f2937;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #06b6d4;
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #22d3ee;
                }
            `}</style>
        </div>
    );
  };
  
  // --- Main Menu Component ---
  const MainMenu = () => {
    const displayedTitle = useTypingEffect(game.title, 60);

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-950 text-white">
        <div className="max-w-4xl w-full p-6 md:p-10 bg-black border-4 border-cyan-500 rounded-xl shadow-2xl shadow-cyan-500/30 text-center">
          
          <AsciiRobot />
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-cyan-400 mb-4 font-mono">
            {displayedTitle}
          </h1>
          
          <p className="text-green-400 text-lg md:text-xl mb-8 font-mono">
            // {game.description} //
          </p>
          
          <div className="space-y-4 max-w-xs mx-auto">
            <button 
              onClick={() => setShowModeSelect(true)}
              className="w-full bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold py-3 md:py-4 px-6 rounded-lg border-2 border-green-700 hover:from-green-400 hover:to-cyan-400 transition-all transform hover:scale-105 shadow-lg shadow-green-500/50"
            >
              START NEW GAME
            </button>
            <button 
              onClick={() => setShowInstructions(true)}
              className="w-full bg-gray-700 text-white font-bold py-3 md:py-4 px-6 rounded-lg border-2 border-gray-600 hover:bg-gray-600 transition-all transform hover:scale-105 shadow-md shadow-gray-700/50"
            >
              INSTRUCTIONS
            </button>
            <div className="text-sm text-gray-500 pt-4 font-mono">
              {game.status}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Main App Renderer ---
  if (showGame) {
    return <CyberSafeAdventuresGame />;
  }
  if (showInstructions) {
    return <InstructionsModal />;
  }
  if (showModeSelect) {
    return <ModeSelectModal />;
  }
  if (showLevelSelect) {
    return <LevelSelectModal />;
  }
  
  return <MainMenu />;
};

export default App;
