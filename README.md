# 🎮 Cyber-Safe Adventures: The Race to the Secure Clubhouse!

A **'Snakes and Ladders' style cybersecurity board game** where smart online choices advance you, and digital dangers send you backward. Roll the die, answer challenging scenario cards, and be the first to reach the Secure Clubhouse!

## ✨ Features

- **🎯 Solo & Multiplayer Modes**: Play alone or race against 2-4 friends
- **🎚️ 3 Difficulty Levels**: Beginner, Intermediate, and Expert
- **🔐 Security Scenarios**: Learn real cybersecurity concepts through interactive questions
- **🎨 Cyberpunk Neon Design**: Beautiful dark theme with neon accents
- **📱 Responsive**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎮 How to Play

1. **Choose Game Mode**: Solo or Multiplayer (2-4 players)
2. **Select Difficulty**: Beginner (36 squares), Intermediate (49 squares), or Expert (64 squares)
3. **Roll the Die**: Take turns rolling and moving across the board
4. **Answer Questions**: Land on Security Audit squares to test your knowledge
5. **Win**: Be the first to reach the Secure Clubhouse!

## 🎯 Game Elements

- **↑ Secure Ports (Green)**: Jump ahead! (+20 points)
- **⚠ Firewall Traps (Red)**: Fall back! (-10 points)
- **? Security Audits (Purple)**: Answer correctly to advance 3 nodes (+30 points) or fall back 4 nodes (-15 points)

## 🛠️ Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool (rolldown-vite 7.1.14)
- **TailwindCSS v4** - Styling
- **PostCSS** - CSS processing

## 📁 Project Structure

```
cyber-game/
├── src/
│   ├── App.jsx         # Main game component
│   ├── main.jsx        # App entry point
│   ├── index.css       # Global styles & Tailwind
│   └── App.css         # Component styles
├── public/             # Static assets
├── index.html          # HTML template
├── postcss.config.js   # PostCSS configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## 👨‍💻 Developer

Developed by [Salma Sherif](https://github.com/salmasherif060-commits)

## 📝 License

This project is open source and available under the MIT License.
