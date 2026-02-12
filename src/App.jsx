import { useState } from 'react'
import Confetti from 'react-confetti'
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import './App.css'

// Generate floating elements data once at module level
const generateFloatingElements = () => {
  const items = []
  for (let i = 0; i < 20; i++) {
    const isHeart = Math.random() > 0.5
    items.push({
      id: i,
      emoji: isHeart ? '❤️' : '🌹',
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: isHeart ? 'text-2xl' : 'text-3xl'
    })
  }
  return items
}

const FLOATING_ELEMENTS = generateFloatingElements()


function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setShowConfetti(true)
      // Stop confetti after 5 seconds
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background animated hearts and roses */}
      <FloatingElements />
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={500}
          recycle={false}
          colors={['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']}
        />
      )}

      {/* Valentine Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleCardClick}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!isOpen ? (
            // Closed Card
            <motion.div
              className="w-80 h-96 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/50 to-transparent"></div>
              <div className="text-center z-10">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-8xl mb-4"
                >
                  💕
                </motion.div>
                <h2 className="text-white text-2xl font-bold mb-2">Valentine's Day</h2>
                <p className="text-white/90 text-sm">Click to open</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 text-4xl opacity-50">🌹</div>
              <div className="absolute bottom-4 right-4 text-4xl opacity-50">🌹</div>
              <div className="absolute top-4 right-4 text-3xl opacity-50">❤️</div>
              <div className="absolute bottom-4 left-4 text-3xl opacity-50">❤️</div>
            </motion.div>
          ) : (
            // Opened Card
            <motion.div
              className="w-96 bg-white rounded-2xl shadow-2xl p-8 border-4 border-red-400"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 10, 0] }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-6xl mb-6"
                >
                  💖
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-4xl font-bold text-red-600 mb-4"
                >
                  Will You Be My Valentine?
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="space-y-4"
                >
                  <p className="text-gray-700 text-lg italic">
                    Dear Catherine,
                  </p>
                  
                  <p className="text-gray-600">
                    I wanted to create something special for you this Valentine's Day. 
                    You bring so much joy and happiness into my life, and I can't imagine 
                    celebrating this day with anyone else.
                  </p>
                  
                  <div className="flex justify-center space-x-2 text-3xl my-4">
                    <span>🌹</span>
                    <span>💕</span>
                    <span>🌹</span>
                  </div>
                  
                  <p className="text-gray-700 text-lg font-semibold">
                    With all my love,
                  </p>
                  <p className="text-red-600 text-2xl font-bold">
                    Keegan
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

// Component for floating hearts and roses
function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {FLOATING_ELEMENTS.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} opacity-30`}
          style={{ left: `${element.x}%`, top: '-10%' }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(element.id) * 50],
            rotate: [0, 360]
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  )
}

export default App

