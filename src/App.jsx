import { useState, useMemo } from 'react'
import Confetti from 'react-confetti'
import { motion } from 'framer-motion'
import './index.css'

// Detect if device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
}

// Predefined floating elements for better performance (reduced to 15)
const FLOATING_ELEMENTS = [
  { id: 0, emoji: '❤️', x: 8, delay: 0, duration: 12, size: 'text-2xl', opacity: 0.2 },
  { id: 1, emoji: '🌹', x: 22, delay: 1.5, duration: 13, size: 'text-3xl', opacity: 0.25 },
  { id: 2, emoji: '💕', x: 35, delay: 3, duration: 11, size: 'text-2xl', opacity: 0.18 },
  { id: 3, emoji: '💖', x: 48, delay: 4.5, duration: 14, size: 'text-3xl', opacity: 0.22 },
  { id: 4, emoji: '🌸', x: 62, delay: 6, duration: 12, size: 'text-2xl', opacity: 0.3 },
  { id: 5, emoji: '❤️', x: 75, delay: 0.8, duration: 13, size: 'text-3xl', opacity: 0.17 },
  { id: 6, emoji: '🌹', x: 88, delay: 2.3, duration: 11, size: 'text-2xl', opacity: 0.24 },
  { id: 7, emoji: '💕', x: 15, delay: 3.8, duration: 14, size: 'text-3xl', opacity: 0.19 },
  { id: 8, emoji: '💖', x: 42, delay: 5.3, duration: 12, size: 'text-2xl', opacity: 0.28 },
  { id: 9, emoji: '🌸', x: 55, delay: 6.8, duration: 13, size: 'text-3xl', opacity: 0.21 },
  { id: 10, emoji: '❤️', x: 68, delay: 1.2, duration: 11, size: 'text-2xl', opacity: 0.26 },
  { id: 11, emoji: '🌹', x: 82, delay: 2.7, duration: 14, size: 'text-3xl', opacity: 0.16 },
  { id: 12, emoji: '💕', x: 28, delay: 4.2, duration: 12, size: 'text-2xl', opacity: 0.23 },
  { id: 13, emoji: '💖', x: 92, delay: 5.7, duration: 13, size: 'text-3xl', opacity: 0.33 },
  { id: 14, emoji: '🌸', x: 5, delay: 7.2, duration: 11, size: 'text-2xl', opacity: 0.2 }
]


function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const mobile = useMemo(() => isMobile(), [])
  const confettiCount = mobile ? 150 : 250

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setShowConfetti(true)
      // Stop confetti after pieces have fallen
      setTimeout(() => setShowConfetti(false), 10000)
    }
  }

  const handleCloseCard = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-100">
      {/* Decorative bokeh circles - reduced blur */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-300/15 rounded-full blur-2xl"></div>
      </div>
      
      {/* Background animated hearts and roses */}
      {!isOpen && <FloatingElements />}
      
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={confettiCount}
          recycle={false}
          colors={['#ff0000', '#ff69b4', '#ff1493', '#ffc0cb', '#ffffff']}
        />
      )}

      {/* Valentine Card */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4">
        <motion.div
          className="relative cursor-pointer w-full max-w-sm sm:max-w-md md:max-w-lg"
          onClick={handleCardClick}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!isOpen ? (
            // Closed Card
            <motion.div
              className="w-full h-96 sm:h-[28rem] bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/50 to-transparent"></div>
              <div className="text-center z-10 px-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl sm:text-9xl mb-4 sm:mb-6"
                >
                  💕
                </motion.div>
                <h2 className="text-white text-2xl sm:text-3xl font-bold mb-2 sm:mb-3">Valentine's Day</h2>
                <p className="text-white/90 text-sm sm:text-base">Click to open</p>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 text-3xl sm:text-5xl opacity-50">🌹</div>
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-3xl sm:text-5xl opacity-50">🌹</div>
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-2xl sm:text-4xl opacity-50">❤️</div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-2xl sm:text-4xl opacity-50">❤️</div>
            </motion.div>
          ) : (
            // Opened Card
            <motion.div
              className="w-full bg-white rounded-2xl shadow-2xl p-6 sm:p-10 border-4 border-red-400"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{ duration: 0.8 }}
              style={{ 
                backfaceVisibility: 'hidden',
                perspective: 1000,
                transform: 'translateZ(0)'
              }}
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: [0, 10, -10, 10, 0] }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-6xl sm:text-7xl mb-6 sm:mb-8"
                >
                  💖
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-3xl sm:text-5xl font-bold text-red-600 mb-4 sm:mb-6"
                >
                  Will You Be My Valentine?
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="space-y-3 sm:space-y-5"
                >
                  <p className="text-gray-700 text-lg sm:text-xl italic">
                    Dear Catherine,
                  </p>
                  
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    I wanted to create something special for you this Valentine's Day. 
                    You bring so much joy and happiness into my life, and I can't imagine 
                    celebrating this day with anyone else. I love you to the moon and back, and I hope this card brings you a smile as big as the one you put on my face every day.
                  </p>
                  
                  <div className="flex justify-center space-x-2 sm:space-x-3 text-3xl sm:text-4xl my-4 sm:my-6">
                    <span>🌹</span>
                    <span>💕</span>
                    <span>🌹</span>
                  </div>
                  
                  <p className="text-gray-700 text-lg sm:text-xl font-semibold">
                    With all my love,
                  </p>
                  <p className="text-red-600 text-2xl sm:text-3xl font-bold">
                    Keegan
                  </p>
                  
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    onClick={handleCloseCard}
                    className="mt-6 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 text-sm sm:text-base font-medium"
                  >
                    Close Card
                  </motion.button>
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
    <div className="fixed inset-0 pointer-events-none" style={{ contain: 'layout style paint' }}>
      {FLOATING_ELEMENTS.map((element) => (
        <motion.div
          key={element.id}
          className={`absolute ${element.size} will-change-transform`}
          style={{ 
            left: `${element.x}%`, 
            top: '-10%', 
            opacity: element.opacity,
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden'
          }}
          animate={{
            y: ['0vh', '110vh']
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

