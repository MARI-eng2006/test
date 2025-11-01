import React from 'react';
function App() {
  const NEON_GREEN = '#22ff55';
  const NEON_PURPLE = '#bb33ff';
  const NEON_RED = '#ff2244';
  const BLACK_BG = '#010103';
  const DARK_BG = '#020202';
  const SOFT_GREEN = '#114422';
  const SOFT_PURPLE = '#3a1a4a';
  const SOFT_RED = '#4a101a';

  const [showGame, setShowGame] = React.useState(false);
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [currentLevel, setCurrentLevel] = React.useState(1);
  const [showLevelSelect, setShowLevelSelect] = React.useState(false);
  const [showModeSelect, setShowModeSelect] = React.useState(false);
  const [gameMode, setGameMode] = React.useState('solo');
  const [numPlayers, setNumPlayers] = React.useState(2);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [showCard, setShowCard] = React.useState(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowInstructions(false);
        setShowLevelSelect(false);
        setShowModeSelect(false);
        setShowCard(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const game = { 
    id: 'cyber_safe_adventures', 
    title: "Cyber-Safe Adventures: The Race to the Secure Clubhouse!", 
    description: "A 'Snakes and Ladders' style board game where smart online choices advance you, and digital dangers send you backward. Roll the die, answer challenging scenario cards, and be the first to reach the Secure Clubhouse!", 
    status: "New: Solo & Multiplayer Modes" 
  };

  const playerCharacters = [
    { id: 1, name: "Cyber Knight", emoji: "🛡️", color: "text-blue-400", bgColor: "bg-blue-500", shadow: "shadow-blue-500/50" },
    { id: 2, name: "Hacker Hero", emoji: "💻", color: "text-green-400", bgColor: "bg-green-500", shadow: "shadow-green-500/50" },
    { id: 3, name: "Tech Ninja", emoji: "🥷", color: "text-purple-400", bgColor: "bg-purple-500", shadow: "shadow-purple-500/50" },
    { id: 4, name: "Data Guardian", emoji: "🔐", color: "text-yellow-400", bgColor: "bg-yellow-500", shadow: "shadow-yellow-500/50" },
  ];

  const useTypingEffect = (text, speed = 50) => {
    const [displayedText, setDisplayedText] = React.useState('');
    React.useEffect(() => {
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

  const AsciiRobot = () => (
    <pre className="text-center text-sm md:text-base" style={{color: SOFT_GREEN}}>
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
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="p-6 md:p-8 border-2" style={{borderColor: NEON_GREEN, boxShadow: '0 6px 30px rgba(0,255,85,0.9)', backgroundColor: DARK_BG}}>
        <button 
          onClick={() => setShowModeSelect(false)} 
          className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center text-2xl font-bold leading-none rounded-full border-2"
          aria-label="Close"
          title="Close (Esc)"
          style={{color: NEON_GREEN, borderColor: NEON_GREEN, backgroundColor: BLACK_BG, position: 'absolute', right: '1rem', top: '1rem', zIndex: 1000}}
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl mb-6 text-center" style={{color:NEON_GREEN}}>// SELECT_GAME_MODE //</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => { setGameMode('solo'); setNumPlayers(1); setShowModeSelect(false); setShowLevelSelect(true); }}
            className="w-full bg-[#061211] font-bold py-4 px-6 rounded-lg border-2 hover:from-[#0e5a43] hover:to-[#0c7b5a] text-left transform hover:scale-102 transition-all"
            style={{color: NEON_GREEN, borderColor: NEON_GREEN}}
          >
            <div className="text-2xl mb-2">🎮 SOLO MODE</div>
            <div className="text-sm">Play alone and master cybersecurity skills at your own pace</div>
          </button>
          
          <button 
            onClick={() => { setGameMode('multiplayer'); setShowModeSelect(false); setShowLevelSelect(true); }}
            className="w-full bg-[#1a0b1d] font-bold py-4 px-6 rounded-lg border-2 hover:from-[#3a1b6a] hover:to-[#5b2db1] text-left transform hover:scale-102 transition-all"
            style={{color: NEON_PURPLE, borderColor: NEON_PURPLE}}
          >
            <div className="text-2xl mb-2">👥 MULTIPLAYER MODE</div>
            <div className="text-sm">Race against 2-4 players to reach the Secure Clubhouse first!</div>
          </button>
        </div>
      </div>
    </div>
  );

  const LevelSelectModal = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="p-6 md:p-8 border-2 relative" style={{borderColor: NEON_PURPLE, boxShadow: '0 6px 30px rgba(187,51,255,0.9)', backgroundColor: DARK_BG}}>
        <button 
          onClick={() => { setShowLevelSelect(false); setShowModeSelect(true); }} 
          className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center text-3xl font-bold leading-none rounded-full border-2"
          aria-label="Back"
          style={{color: NEON_RED, borderColor: NEON_RED, backgroundColor: BLACK_BG}}
        >
          ←
        </button>
        
        <h2 className="text-2xl md:text-3xl mb-6 text-center" style={{color:NEON_PURPLE}}>// SELECT_DIFFICULTY //</h2>
        
        <div className="space-y-4">
          <button 
            onClick={() => { setCurrentLevel(1); setShowLevelSelect(false); setShowGame(true); setGameStarted(true); }}
            className="w-full font-bold py-4 px-6 rounded-lg border-2 hover:from-[#0a623e] hover:to-[#0c7250] text-left transform hover:scale-102 transition-all"
            style={{color: NEON_GREEN, borderColor: NEON_GREEN, backgroundColor: '#061211'}}
          >
            <div className="text-2xl mb-2">🌟 LEVEL 1: BEGINNER</div>
            <div className="text-sm">Basic cybersecurity awareness • 36 squares • Easy scenarios</div>
            <div className="text-xs mt-1" style={{color: SOFT_GREEN}}>🎨 Theme: Bright Learning Academy</div>
          </button>
          
          <button 
            onClick={() => { setCurrentLevel(2); setShowLevelSelect(false); setShowGame(true); setGameStarted(true); }}
            className="w-full font-bold py-4 px-6 rounded-lg border-2 hover:from-[#5a3e13] hover:to-[#7b5418] text-left transform hover:scale-102 transition-all"
            style={{color: NEON_RED, borderColor: NEON_RED, backgroundColor: '#1a0e07'}}
          >
            <div className="text-2xl mb-2">⚡ LEVEL 2: INTERMEDIATE</div>
            <div className="text-sm">Advanced threats • 49 squares • Medium scenarios</div>
            <div className="text-xs mt-1" style={{color: SOFT_RED}}>🎨 Theme: Warning Zone Command</div>
          </button>
          
          <button 
            onClick={() => { setCurrentLevel(3); setShowLevelSelect(false); setShowGame(true); setGameStarted(true); }}
            className="w-full font-bold py-4 px-6 rounded-lg border-2 hover:from-[#5b2db1] hover:to-[#7b3a9f] text-left transform hover:scale-102 transition-all"
            style={{color: NEON_PURPLE, borderColor: NEON_PURPLE, backgroundColor: '#12060a'}}
          >
            <div className="text-2xl mb-2">🔥 LEVEL 3: EXPERT</div>
            <div className="text-sm">Elite security operations • 64 squares • Hard scenarios</div>
            <div className="text-xs mt-1" style={{color: SOFT_PURPLE}}>🎨 Theme: Dark Ops Matrix</div>
          </button>
        </div>
      </div>
    </div>
  );

  const InstructionsModal = () => (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="p-6 md:p-8 border-2 max-w-3xl w-full my-8 relative rounded-xl" style={{borderColor: NEON_GREEN, boxShadow: '0 10px 60px rgba(0,255,85,0.95)', backgroundColor: DARK_BG}}>
        <button 
          onClick={() => setShowInstructions(false)} 
          className="absolute top-3 right-3 w-12 h-12 flex items-center justify-center text-2xl font-bold leading-none rounded-full border-2"
          aria-label="Close"
          title="Close (Esc)"
          style={{color: NEON_GREEN, borderColor: NEON_GREEN, backgroundColor: BLACK_BG}}
        >
          ×
        </button>
        <h2 className="text-2xl md:text-3xl neon-text mb-6 text-center font-bold" style={{color:NEON_GREEN}}>// HOW_TO_PLAY.txt //</h2>
        <div className="space-y-4 text-sm md:text-base" style={{color:SOFT_GREEN}}>
          <div className="border-l-4" style={{borderColor: SOFT_GREEN, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_GREEN}}>🎯 OBJECTIVE</h3>
            <p>Navigate from Node 01 to the final node (Secure Clubhouse) by making smart cybersecurity decisions. In multiplayer, be the FIRST to reach the end!</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_PURPLE, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_PURPLE}}>🎮 GAME MODES</h3>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>Solo Mode:</span> Play alone and improve your score</p>
            <p><span style={{color:NEON_RED}}>Multiplayer Mode:</span> Race against 2-4 friends! Take turns rolling the die</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_RED, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_RED}}>🎚️ LEVELS</h3>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>Level 1 - Beginner:</span> 36 squares, basic security scenarios</p>
            <p className="mb-2"><span style={{color:NEON_RED}}>Level 2 - Intermediate:</span> 49 squares, advanced threats</p>
            <p><span style={{color:NEON_PURPLE}}>Level 3 - Expert:</span> 64 squares, elite security operations</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_PURPLE, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_PURPLE}}>🎲 GAMEPLAY</h3>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>1. Roll the Die:</span> Click the roll button (in multiplayer, wait your turn!)</p>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>2. Move Forward:</span> Advance the number of nodes shown on the die</p>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>3. Follow Instructions:</span> Land on special squares for bonuses or challenges</p>
            <p><span style={{color:NEON_GREEN}}>4. Win:</span> First to reach the final node wins in multiplayer!</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_GREEN, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_GREEN}}>👥 PLAYER CHARACTERS</h3>
            <p className="mb-1">🛡️ Cyber Knight (Blue) • 💻 Hacker Hero (Green)</p>
            <p>🥷 Tech Ninja (Purple) • 🔐 Data Guardian (Yellow)</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_RED, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_RED}}>🗺️ SPECIAL SQUARES</h3>
            <p className="mb-2"><span style={{color:NEON_GREEN}}>↑ Secure Ports (Green):</span> Jump ahead! (+20 points)</p>
            <p className="mb-2"><span style={{color:NEON_RED}}>⚠ Firewall Traps (Red):</span> Fall back! (-10 points)</p>
            <p><span style={{color:NEON_PURPLE}}> ? Security Audits (Purple):</span> Answer correctly to advance 3 nodes (+30 points) or fall back 4 nodes (-15 points)</p>
          </div>
          <div className="border-l-4" style={{borderColor: SOFT_GREEN, paddingLeft: '1rem'}}>
            <h3 className="text-xl font-bold mb-2" style={{color: NEON_GREEN}}>📊 SCORING SYSTEM</h3>
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
            className="font-bold py-3 px-8 rounded-lg border-2 hover:brightness-125"
            style={{borderColor: NEON_GREEN, color: NEON_GREEN, backgroundColor: BLACK_BG}}
          >
            CLOSE_INSTRUCTIONS
          </button>
        </div>
      </div>
    </div>
  );

  const CyberSafeAdventuresGame = () => {
    const levelConfig = {
      1: { squares: 36, gridCols: 6, gridRows: 6, name: "BEGINNER", color: NEON_GREEN },
      2: { squares: 49, gridCols: 7, gridRows: 7, name: "INTERMEDIATE", color: NEON_RED },
      3: { squares: 64, gridCols: 8, gridRows: 8, name: "EXPERT", color: NEON_PURPLE }
    };
    const config = levelConfig[currentLevel];
    const totalSquares = config.squares;
    const [players, setPlayers] = React.useState(() => {
      return Array.from({ length: numPlayers }, (_, i) => ({
        ...playerCharacters[i],
        position: 1,
        score: 0,
        moves: 0,
        correctAnswers: 0
      }));
    });
    const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
    const [actionLog, setActionLog] = React.useState([`[SYSTEM_BOOT] Level ${currentLevel}: ${config.name}. ${gameMode === 'multiplayer' ? players[0].name : 'Player'}, roll to begin!`]);
    const [gameOver, setGameOver] = React.useState(false);
    const [winner, setWinner] = React.useState(null);
    const [isInteracting, setIsInteracting] = React.useState(false);
    const [dieValue, setDieValue] = React.useState(1);
    const [isRolling, setIsRolling] = React.useState(false);
    const [showStats, setShowStats] = React.useState(false);
    const [showCelebration, setShowCelebration] = React.useState(false);

    const currentPlayer = players[currentPlayerIndex];

    const levelData = {
      1: {
        shortcuts: { 4: 14, 9: 21, 17: 27, 20: 32 },
        hazards: { 11: 6, 18: 10, 26: 13, 31: 19 },
        cardSquares: [7, 15, 22, 28, 33]
      },
      2: {
        shortcuts: { 5: 20, 10: 25, 15: 35, 22: 40, 30: 45 },
        hazards: { 13: 4, 19: 8, 28: 12, 37: 18, 44: 25 },
        cardSquares: [8, 16, 24, 32, 38, 42, 46]
      },
      3: {
        shortcuts: { 5: 25, 10: 29, 18: 38, 21: 42, 28: 50, 33: 51, 37: 55, 45: 61, 52: 63 },
        hazards: { 15: 4, 23: 8, 31: 11, 39: 20, 44: 26, 48: 28, 56: 35, 59: 38, 62: 42 },
        cardSquares: [7, 13, 22, 27, 36, 40, 43, 49, 54, 58, 60]
      }
    };

    const shortcuts = levelData[currentLevel].shortcuts;
    const hazards = levelData[currentLevel].hazards;
    const cardSquares = levelData[currentLevel].cardSquares;

    const beginnerScenarios = [
      { text: "Email says 'Click here to claim your prize!' from unknown sender. What do you do?", options: ["Click immediately", "Delete email", "Reply asking for details"], correct: 1, success: "[ACCESS_GRANTED] Phishing email identified! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Phishing link clicked! Fall back 4." },
      { text: "Your password is 'password123'. Is this secure?", options: ["Yes, it's fine", "No, use strong password", "Add one symbol"], correct: 1, success: "[ACCESS_GRANTED] Strong password is essential! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Weak password cracked! Fall back 4." },
      { text: "Friend request from someone you don't know. They can see your posts. Accept?", options: ["Accept request", "Ignore request", "Accept and message"], correct: 1, success: "[ACCESS_GRANTED] Privacy protected! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Privacy compromised! Fall back 4." },
      { text: "Public computer at library. You need to check email. Log out after?", options: ["Leave it logged in", "Always log out", "Just close browser"], correct: 1, success: "[ACCESS_GRANTED] Session secured! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Account accessed by stranger! Fall back 4." },
      { text: "App asks for access to your camera, contacts, and location to use a calculator. Grant?", options: ["Grant all access", "Deny access", "Grant camera only"], correct: 1, success: "[ACCESS_GRANTED] Privacy invasion prevented! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Data harvested! Fall back 4." },
    ];

    const intermediateScenarios = [
      { text: "Email from 'CEO' requests immediate wire transfer. Unusual request. Action?", options: ["Process immediately", "Verify via known contact", "Reply to confirm"], correct: 1, success: "[ACCESS_GRANTED] Business Email Compromise thwarted! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Spear phishing successful! Fall back 4." },
      { text: "USB drive found in parking lot labeled 'Executive Salaries 2025'. Plug in?", options: ["Plug into work PC", "Use sandbox environment", "Plug into home PC"], correct: 1, success: "[ACCESS_GRANTED] USB drop attack avoided! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Malware infected system! Fall back 4." },
      { text: "Two-factor authentication code received. You didn't request login. Action?", options: ["Ignore it", "Reply STOP", "Change password immediately"], correct: 2, success: "[ACCESS_GRANTED] Account secured! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Account takeover attempt! Fall back 4." },
      { text: "Smart home camera uses default password 'admin123'. Change it?", options: ["Keep default", "Change to strong password", "Change to simple password"], correct: 1, success: "[ACCESS_GRANTED] IoT device secured! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Device compromised! Fall back 4." },
      { text: "Browser extension 'AdBlock_Ultimate' requests read all website data permission. Install?", options: ["Grant all permissions", "Check reviews first", "Deny and research"], correct: 2, success: "[ACCESS_GRANTED] Malicious extension blocked! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Spyware installed! Fall back 4." },
    ];

    const expertScenarios = [
      { text: "Ransomware encrypts all files. Demands $5000 Bitcoin within 48hrs. Best response?", options: ["Pay immediately", "Restore from backup", "Negotiate price"], correct: 1, success: "[ACCESS_GRANTED] Backup restored, no ransom paid! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Paid but files still encrypted! Fall back 4." },
      { text: "Video call from 'boss' requests password reset. Face/voice correct but feels off. Action?", options: ["Provide password", "Request in-person meeting", "Reset via email"], correct: 1, success: "[ACCESS_GRANTED] Deepfake detected and thwarted! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Deepfake successful! Fall back 4." },
      { text: "CPU at 100%, unknown process 'svchost32.exe' consuming resources. Action?", options: ["Ignore it", "End process immediately", "Scan for cryptominer"], correct: 2, success: "[ACCESS_GRANTED] Cryptojacking malware removed! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Cryptominer mining! Fall back 4." },
      { text: "Security researcher discloses zero-day vulnerability. No patch available. Response?", options: ["Wait for patch", "Implement workarounds", "Disable affected feature"], correct: 2, success: "[ACCESS_GRANTED] Attack surface reduced! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Exploit successful! Fall back 4." },
      { text: "GitHub repo for popular tool has suspicious commit from new contributor. Install?", options: ["Install immediately", "Review commit changes", "Wait for feedback"], correct: 1, success: "[ACCESS_GRANTED] Supply chain attack detected! Advancing 3 nodes.", failure: "[CONNECTION_INTERRUPTED] Backdoor installed! Fall back 4." },
    ];

    const scenariosByLevel = { 1: beginnerScenarios, 2: intermediateScenarios, 3: expertScenarios };
    const cyberSmartCards = scenariosByLevel[currentLevel];

    const logAction = (message, callback) => {
      setIsInteracting(true);
      setActionLog(prev => [message, ...prev.slice(0, 4)]);
      setTimeout(() => {
        setIsInteracting(false);
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
        const nextIndex = (currentPlayerIndex + 1) % numPlayers;
        setCurrentPlayerIndex(nextIndex);
        logAction(`[TURN_CHANGE] ${players[nextIndex].name}'s turn!`);
      }
    };

    const handleDieRoll = () => {
      if (gameOver || showCard || isInteracting || isRolling) return;
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

    const processMove = (roll) => {
      const startPosition = currentPlayer.position;
      let newPosition = startPosition + roll;
      if (newPosition > totalSquares) {
        logAction(`Roll of ${roll} exceeds target node ${totalSquares}. Turn ends.`, nextTurn);
        return;
      }
      updatePlayer({ position: newPosition }, () => {
        if (newPosition === totalSquares) {
          const finalScore = currentPlayer.score + 100;
          updatePlayer({ score: finalScore });
          logAction(`[VICTORY] ${currentPlayer.name} reached the Secure Clubhouse!`);
          setGameOver(true);
          setWinner(currentPlayer);
          setShowCelebration(true);
        } else if (cardSquares.includes(newPosition)) {
          logAction(`[SECURITY_AUDIT] ${currentPlayer.name} must answer a question!`, () => setShowCard(cyberSmartCards[Math.floor(Math.random() * cyberSmartCards.length)]));
        } else if (shortcuts[newPosition]) {
          const tip = `Secure Port: Jump ahead from ${newPosition} to ${shortcuts[newPosition]}. Remember to keep your software updated!`;
          logAction(tip, () => {
            updatePlayer({ position: shortcuts[newPosition], score: currentPlayer.score + 20 }, nextTurn);
          });
        } else if (hazards[newPosition]) {
          const warning = `Firewall Trap: Fall back from ${newPosition} to ${hazards[newPosition]}. Beware of phishing scams!`;
          logAction(warning, () => {
            updatePlayer({ position: hazards[newPosition], score: Math.max(0, currentPlayer.score - 10) }, nextTurn);
          });
        } else {
          logAction(`${currentPlayer.name} moved to node ${newPosition}.`, nextTurn);
        }
      });
    };

    const handleAnswer = (choice) => {
      const card = showCard;
      setShowCard(null);
      let moveAmount = 0;
      let message = "";
      if (choice === card.correct) {
        message = `[${currentPlayer.name}] ${card.success}`;
        moveAmount = 3;
        updatePlayer({ score: currentPlayer.score + 30, correctAnswers: currentPlayer.correctAnswers + 1 });
      } else {
        message = `[${currentPlayer.name}] ${card.failure}`;
        moveAmount = -4;
        updatePlayer({ score: Math.max(0, currentPlayer.score - 15) });
      }
      logAction(message, () => {
        const targetPosition = Math.max(1, currentPlayer.position + moveAmount);
        updatePlayer({ position: targetPosition }, nextTurn);
      });
    };

    const handleRestart = () => {
      setPlayers(Array.from({ length: numPlayers }, (_, i) => ({ ...playerCharacters[i], position: 1, score: 0, moves: 0, correctAnswers: 0 })));
      setCurrentPlayerIndex(0);
      setActionLog([`[SYSTEM_REBOOT] Level ${currentLevel}: ${config.name}. ${players[0].name}, roll to begin!`]);
      setGameOver(false);
      setWinner(null);
      setShowCard(null);
      setDieValue(1);
      setShowCelebration(false);
    };

    const handleNextLevel = () => {
      if (currentLevel < 3) {
        setCurrentLevel(currentLevel + 1);
        setPlayers(Array.from({ length: numPlayers }, (_, i) => ({ ...playerCharacters[i], position: 1, score: 0, moves: 0, correctAnswers: 0 })));
        setCurrentPlayerIndex(0);
        setActionLog([`[LEVEL_UP] Level ${currentLevel + 1} initialized!`]);
        setGameOver(false);
        setWinner(null);
        setShowCard(null);
        setDieValue(1);
        setShowCelebration(false);
      }
    };

    const handleExitToHome = () => {
      setShowGame(false);
      setShowCelebration(false);
      setShowModeSelect(false);
      setShowLevelSelect(false);
      setShowInstructions(false);
      setShowCard(null);
    };

    const LogMessage = ({ text }) => {
      const displayedText = useTypingEffect(text, 30);
      return <p className="text-sm md:text-base font-mono" style={{color: NEON_GREEN}}>{`> ${displayedText}`}<span style={{color: NEON_GREEN}} className="animate-ping">█</span></p>;
    };

    const levelThemes = {
      1: { containerBg: `bg-[${BLACK_BG}]`, containerBorder: NEON_GREEN, containerShadow: 'shadow-2xl', headerBg: `bg-[${DARK_BG}]`, headerText: NEON_GREEN, boardBg: `bg-[${BLACK_BG}]`, boardBorder: NEON_GREEN, logBg: `bg-[${DARK_BG}]`, logBorder: NEON_GREEN, logText: SOFT_GREEN, dieBg: `bg-[${DARK_BG}]`, dieText: NEON_GREEN, dieBorder: NEON_GREEN, rollButton: `bg-[${DARK_BG}] text-[${NEON_GREEN}]`, normalSquare: `bg-[${DARK_BG}] border-[${NEON_GREEN}]`, normalText: NEON_GREEN, shortcutSquare: `bg-[${SOFT_GREEN}]`, shortcutText: BLACK_BG, hazardSquare: `bg-[${SOFT_RED}]`, hazardText: BLACK_BG, cardSquare: `bg-[${SOFT_PURPLE}]`, cardText: BLACK_BG, emoji: "🌐" },
      2: { containerBg: `bg-[${BLACK_BG}]`, containerBorder: NEON_RED, containerShadow: 'shadow-2xl', headerBg: `bg-[${DARK_BG}]`, headerText: NEON_RED, boardBg: `bg-[${BLACK_BG}]`, boardBorder: NEON_RED, logBg: `bg-[${DARK_BG}]`, logBorder: NEON_RED, logText: SOFT_RED, dieBg: `bg-[${DARK_BG}]`, dieText: NEON_RED, dieBorder: NEON_RED, rollButton: `bg-[${DARK_BG}] text-[${NEON_RED}]`, normalSquare: `bg-[${DARK_BG}] border-[${NEON_RED}]`, normalText: NEON_RED, shortcutSquare: `bg-[${SOFT_GREEN}]`, shortcutText: BLACK_BG, hazardSquare: `bg-[${SOFT_RED}]`, hazardText: BLACK_BG, cardSquare: `bg-[${SOFT_PURPLE}]`, cardText: BLACK_BG, emoji: "⚡" },
      3: { containerBg: `bg-[${BLACK_BG}]`, containerBorder: NEON_PURPLE, containerShadow: 'shadow-2xl', headerBg: `bg-[${DARK_BG}]`, headerText: NEON_PURPLE, boardBg: `bg-[${BLACK_BG}]`, boardBorder: NEON_PURPLE, logBg: `bg-[${DARK_BG}]`, logBorder: NEON_PURPLE, logText: SOFT_PURPLE, dieBg: `bg-[${DARK_BG}]`, dieText: NEON_PURPLE, dieBorder: NEON_PURPLE, rollButton: `bg-[${DARK_BG}] text-[${NEON_PURPLE}]`, normalSquare: `bg-[${DARK_BG}] border-[${NEON_PURPLE}]`, normalText: NEON_PURPLE, shortcutSquare: `bg-[${SOFT_GREEN}]`, shortcutText: BLACK_BG, hazardSquare: `bg-[${SOFT_RED}]`, hazardText: BLACK_BG, cardSquare: `bg-[${SOFT_PURPLE}]`, cardText: BLACK_BG, emoji: "🔥" }
    };

    const theme = levelThemes[currentLevel];

    const renderBoard = () => {
      let squares = [];
      for (let i = 1; i <= totalSquares; i++) {
        let content = i.toString().padStart(2, '0');
        let colorStyle = { color: theme.normalText, fontSize: '0.75rem' };
        let bgClass = theme.normalSquare;
        let icon = "";

        if (hazards[i]) {
          colorStyle = { color: theme.hazardText, fontWeight: '700', fontSize: '0.95rem' };
          bgClass = theme.hazardSquare;
          icon = "⚠";
        } else if (shortcuts[i]) {
          colorStyle = { color: theme.shortcutText, fontWeight: '700', fontSize: '0.95rem' };
          bgClass = theme.shortcutSquare;
          icon = "↑";
        } else if (cardSquares.includes(i)) {
          colorStyle = { color: NEON_PURPLE, fontWeight: '700', fontSize: '0.95rem' };
          bgClass = theme.cardSquare;
          icon = "?";
        }

        const playersOnSquare = players.filter(p => p.position === i);

        squares.push(
          <div key={i} className={`relative flex flex-col items-center justify-center ${bgClass} border-2 rounded-md`} style={{padding: '6px'}}>
            {playersOnSquare.length > 0 && (
              <div className="absolute z-10 flex gap-1" style={{top: '-10px'}}>
                {playersOnSquare.map(player => (
                  <span key={player.id} style={{filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))', fontSize: '1.4rem'}}>{player.emoji}</span>
                ))}
              </div>
            )}
            <span className="relative z-0" style={colorStyle}>{icon}</span>
            <span className="relative z-0 font-bold" style={colorStyle}>{content}</span>
          </div>
        );
      }
      return squares;
    };

    return (
      <div className={`p-4 md:p-6 rounded-2xl max-w-6xl mx-auto font-mono`} style={{backgroundColor: BLACK_BG, border: `4px solid ${theme.containerBorder}`, boxShadow: '0 6px 30px rgba(0,0,0,0.85)'}}>
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="lg:w-2/3">
            <div className={`mb-4 flex justify-between items-center p-4 rounded-xl`} style={{backgroundColor: DARK_BG, border: `2px solid ${theme.containerBorder}`, color: theme.headerText}}>
              <div className="text-sm md:text-base font-bold">
                <span className="text-2xl mr-2">{theme.emoji}</span>
                <span>LEVEL {currentLevel}: {config.name}</span>
                {gameMode === 'solo' && (
                  <>
                    <span className="ml-4">SCORE:</span> <span className="font-black">{currentPlayer.score}</span>
                    <span className="ml-4">NODE:</span> <span className="font-black">{currentPlayer.position}/{totalSquares}</span>
                  </>
                )}
              </div>
              <button onClick={() => setShowStats(!showStats)} className="text-xs px-3 py-1 rounded-md border-2" style={{borderColor: theme.containerBorder, color: theme.containerBorder, backgroundColor: BLACK_BG}}>
                {showStats ? 'HIDE' : 'INFO'}
              </button>
            </div>

            {gameMode === 'multiplayer' && (
              <div className={`mb-4 p-3 rounded-xl border-2`} style={{borderColor: theme.logBorder, backgroundColor: DARK_BG}}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {players.map((player, idx) => (
                    <div key={player.id} className={`p-2 rounded-lg border-2`} style={{borderColor: idx === currentPlayerIndex ? NEON_GREEN : 'transparent', backgroundColor: BLACK_BG}}>
                      <div className="flex items-center gap-1">
                        <span className="text-xl">{player.emoji}</span>
                        <span className="text-xs font-bold" style={{color: NEON_GREEN}}>{player.name}</span>
                      </div>
                      <div className="text-xs mt-1" style={{color: NEON_GREEN}}>
                        <div>Node: {player.position}/{totalSquares}</div>
                        <div>Score: {player.score}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showStats && (
              <div className={`mb-4 p-4 rounded-xl text-xs md:text-sm`} style={{borderColor: theme.logBorder, backgroundColor: DARK_BG, color: theme.logText}}>
                <p className="font-bold mb-2 text-lg">// GAME LEGEND //</p>
                <p><span className="font-bold">↑ Secure Ports:</span> Fast-track advancement</p>
                <p><span className="font-bold">⚠ Firewall Traps:</span> Security setbacks</p>
                <p><span className="font-bold">? Security Audits:</span> Test your knowledge</p>
                <p className="mt-2 font-bold">Moves: {currentPlayer.moves} | Correct: {currentPlayer.correctAnswers}</p>
              </div>
            )}
            <div className={`grid gap-1 md:gap-2 w-full aspect-square p-3 rounded-xl`} style={{backgroundColor: BLACK_BG, border: `4px solid ${theme.boardBorder}`, display: 'grid', gridTemplateColumns: `repeat(${config.gridCols}, 1fr)`, gridTemplateRows: `repeat(${config.gridRows}, 1fr)`}}>
              {renderBoard()}
            </div>
          </div>
          <div className={`lg:w-1/3 flex flex-col justify-between p-4 rounded-xl`} style={{backgroundColor: DARK_BG, border: `4px solid ${theme.logBorder}`}}>
            <div>
              <h2 className={`text-lg md:text-xl text-center mb-3 font-bold`} style={{color: theme.logText}}>// ACTION_LOG //</h2>
              <div className={`p-3 rounded-lg min-h-[100px] md:min-h-[150px] max-h-[200px] overflow-y-auto border-2`} style={{borderColor: theme.logBorder, backgroundColor: BLACK_BG}}>
                {actionLog.slice(0, 1).map((log, idx) => <LogMessage key={idx} text={log} />)}
                {actionLog.slice(1, 5).map((log, idx) => (
                  <p key={idx} className="text-xs md:text-sm font-mono opacity-60" style={{color: theme.logText}}>{`> ${log}`}</p>
                ))}
              </div>
            </div>

            {gameMode === 'multiplayer' && !gameOver && (
              <div className="text-center my-3">
                <div style={{backgroundColor: DARK_BG, padding: '12px', borderRadius: '12px', border: `2px solid ${theme.containerBorder}`}}>
                  <div style={{color: NEON_GREEN}} className="font-bold text-sm">CURRENT TURN:</div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="text-3xl">{currentPlayer.emoji}</span>
                    <span style={{color: NEON_GREEN}} className="font-bold text-lg">{currentPlayer.name}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center my-4">
              <div className={`inline-block text-5xl md:text-6xl font-black`} style={{backgroundColor: DARK_BG, padding: '28px 48px', border: `4px solid ${theme.dieBorder}`, color: theme.dieText, borderRadius: '1rem'}}>
                {dieValue}
              </div>
            </div>
            <div className="text-center space-y-2">
              {gameOver ? (
                <button disabled className={`w-full font-bold py-4 px-4 rounded-xl text-sm md:text-base opacity-30 cursor-not-allowed`} style={{backgroundColor: DARK_BG, color: theme.dieText}}>
                  {theme.emoji} GAME OVER {theme.emoji}
                </button>
              ) : (
                <button onClick={handleDieRoll} disabled={isInteracting || isRolling} className={`w-full font-bold py-4 px-4 rounded-xl text-sm md:text-base transform hover:scale-105 transition-all`} style={{backgroundColor: DARK_BG, color: theme.dieText, border: `4px solid ${theme.dieBorder}`}}>
                  {isRolling ? 'ROLLING...' : `${theme.emoji} ROLL DIE ${theme.emoji}`}
                </button>
              )}
              <button onClick={() => setShowInstructions(true)} className="w-full font-bold py-2 px-4 rounded-xl border-2" style={{borderColor: NEON_GREEN, color: NEON_GREEN, backgroundColor: BLACK_BG}}>
                HOW TO PLAY
              </button>
              <button onClick={() => setShowModeSelect(true)} className="w-full font-bold py-2 px-4 rounded-xl border-2" style={{borderColor: NEON_PURPLE, color: NEON_PURPLE, backgroundColor: BLACK_BG}}>
                CHANGE MODE
              </button>
              <button onClick={handleExitToHome} className="w-full font-bold py-2 px-4 rounded-xl border-2" style={{borderColor: NEON_RED, color: NEON_RED, backgroundColor: BLACK_BG}}>
                EXIT TO HOME
              </button>
            </div>
          </div>
        </div>

        {showCard && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
            <div className="p-6 md:p-8 border-4 max-w-2xl w-full rounded-2xl" style={{borderColor: NEON_PURPLE, boxShadow: '0 10px 60px rgba(187,51,255,0.95)', backgroundColor: DARK_BG}}>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-center" style={{color: NEON_PURPLE}}>
                🔐 SECURITY AUDIT
              </h3>
              <p className="text-base md:text-lg mb-6 text-center" style={{color: SOFT_GREEN}}>
                {showCard.text}
              </p>
              <div className="space-y-3">
                {showCard.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left font-bold py-4 px-6 rounded-xl border-2 transform hover:scale-102 transition-all"
                    style={{
                      borderColor: NEON_GREEN,
                      color: NEON_GREEN,
                      backgroundColor: BLACK_BG
                    }}
                  >
                    {String.fromCharCode(65 + idx)}. {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {showCelebration && winner && (
          <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
            <div className="p-8 md:p-12 border-4 max-w-2xl w-full rounded-3xl text-center" style={{background: `linear-gradient(90deg,${NEON_PURPLE}, ${NEON_RED})`, borderColor: NEON_PURPLE}}>
              <div className="text-6xl md:text-8xl mb-4">
                🎉 {winner.emoji} 🎉
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-4" style={{color: BLACK_BG}}>
                {gameMode === 'multiplayer' ? `${winner.name} WINS!` : 'VICTORY!'}
              </h2>
              <div className="bg-white/6 backdrop-blur-sm p-6 rounded-2xl border-2 mb-6" style={{borderColor: '#ffffff11'}}>
                <p className="text-2xl md:text-3xl font-bold mb-3" style={{color: BLACK_BG}}>🏆 LEVEL {currentLevel} COMPLETE! 🏆</p>
                <p className="text-xl md:text-2xl font-bold" style={{color: BLACK_BG}}>Final Score: {winner.score}</p>
                <p className="text-lg" style={{color: BLACK_BG}}>Moves: {winner.moves}</p>
                <p className="text-lg" style={{color: BLACK_BG}}>Correct Answers: {winner.correctAnswers}</p>
                {gameMode === 'multiplayer' && (
                  <div className="mt-4 space-y-2" style={{color: BLACK_BG}}>
                    <p className="font-bold text-lg">Final Standings:</p>
                    {[...players].sort((a, b) => b.score - a.score).map((p, idx) => (
                      <div key={p.id}>
                        {idx + 1}. {p.emoji} {p.name}: {p.score} pts
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {currentLevel < 3 && (
                  <button onClick={handleNextLevel} className="w-full font-bold py-4 px-6 rounded-xl text-lg md:text-xl" style={{backgroundColor: DARK_BG, color: NEON_GREEN}}>
                    🚀 NEXT LEVEL
                  </button>
                )}
                <button onClick={handleRestart} className="w-full font-bold py-4 px-6 rounded-xl text-lg md:text-xl" style={{backgroundColor: SOFT_RED, color: BLACK_BG}}>
                  🔄 RETRY LEVEL
                </button>
                <button onClick={handleExitToHome} className="w-full font-bold py-3 px-6 rounded-xl text-base md:text-lg" style={{backgroundColor: BLACK_BG, color: NEON_RED}}>
                  🏠 EXIT TO HOME
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  const Website = () => (
    <div style={{backgroundColor: DARK_BG, color: SOFT_GREEN, minHeight: '100vh'}} className="font-mono">
      <header className="p-4 border-b-2" style={{borderColor: BLACK_BG}}>
        <h1 style={{color: NEON_GREEN}} className="text-2xl md:text-3xl">CyberSmart_Games</h1>
      </header>
      <section className="py-8 md:py-12 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <AsciiRobot />
          <h2 style={{color: SOFT_GREEN}} className="text-3xl md:text-5xl font-bold mt-4">INITIATE_SIMULATION</h2>
          <p className="mt-4 text-lg md:text-xl" style={{color: SOFT_GREEN}}>// A multi-level training module to inoculate operators against digital threats //</p>
        </div>
      </section>
      <main id="games" className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="p-4 md:p-6 flex flex-col md:flex-row items-center rounded-xl" style={{border: `2px solid ${NEON_GREEN}`, backgroundColor: DARK_BG}}>
            <div className="md:w-2/3 mb-4 md:mb-0">
              <span className="text-xs md:text-sm font-semibold px-3 py-1 rounded-full" style={{color: NEON_GREEN, backgroundColor: BLACK_BG}}>{game.status}</span>
              <h3 style={{color: SOFT_GREEN}} className="text-xl md:text-2xl font-bold mt-3">{game.title}</h3>
              <p className="text-sm md:text-base mt-2" style={{color: SOFT_GREEN}}>{game.description}</p>
            </div>
            <div className="md:w-1/3 text-center">
              <button onClick={() => setShowModeSelect(true)} className="font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all" style={{backgroundColor: SOFT_GREEN, color: BLACK_BG}}>
                LAUNCH_GAME
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t-2 text-center text-sm" style={{borderColor: BLACK_BG, color: SOFT_GREEN}}>
        <p>© 2025 CyberSmart Games | Developed by <a href="https://github.com/salmasherif060-commits" target="_blank" rel="noopener noreferrer" style={{color: NEON_PURPLE}}>Salma Sherif</a></p>
      </footer>
    </div>
  );

  return (
    <>
      {showInstructions && <InstructionsModal />}
      {showModeSelect && <ModeSelectModal />}
      {showLevelSelect && <LevelSelectModal />}
      {showGame && gameStarted ? <CyberSafeAdventuresGame /> : <Website />}
    </>
  );
}

export default App;