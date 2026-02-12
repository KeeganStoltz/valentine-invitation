import { useState, useMemo, useRef } from 'react'
import Confetti from 'react-confetti'
import { motion, AnimatePresence } from 'framer-motion'
import './index.css'

// Detect if device is mobile
const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768
}

// Static background elements distributed across the screen
const BACKGROUND_ELEMENTS = [
  { id: 0, emoji: '❤️', x: 5, y: 10, size: 'text-2xl', opacity: 0.15 },
  { id: 1, emoji: '🌹', x: 15, y: 20, size: 'text-3xl', opacity: 0.2 },
  { id: 2, emoji: '💕', x: 25, y: 15, size: 'text-2xl', opacity: 0.12 },
  { id: 3, emoji: '💖', x: 35, y: 30, size: 'text-3xl', opacity: 0.18 },
  { id: 4, emoji: '🌸', x: 45, y: 25, size: 'text-2xl', opacity: 0.25 },
  { id: 5, emoji: '❤️', x: 55, y: 40, size: 'text-3xl', opacity: 0.14 },
  { id: 6, emoji: '🌹', x: 65, y: 35, size: 'text-2xl', opacity: 0.2 },
  { id: 7, emoji: '💕', x: 75, y: 50, size: 'text-3xl', opacity: 0.16 },
  { id: 8, emoji: '💖', x: 85, y: 45, size: 'text-2xl', opacity: 0.22 },
  { id: 9, emoji: '🌸', x: 95, y: 60, size: 'text-3xl', opacity: 0.18 },
  { id: 10, emoji: '❤️', x: 10, y: 55, size: 'text-2xl', opacity: 0.2 },
  { id: 11, emoji: '🌹', x: 20, y: 70, size: 'text-3xl', opacity: 0.13 },
  { id: 12, emoji: '💕', x: 30, y: 65, size: 'text-2xl', opacity: 0.19 },
  { id: 13, emoji: '💖', x: 40, y: 80, size: 'text-3xl', opacity: 0.28 },
  { id: 14, emoji: '🌸', x: 50, y: 75, size: 'text-2xl', opacity: 0.17 },
  { id: 15, emoji: '❤️', x: 60, y: 90, size: 'text-3xl', opacity: 0.21 },
  { id: 16, emoji: '🌹', x: 70, y: 85, size: 'text-2xl', opacity: 0.15 },
  { id: 17, emoji: '💕', x: 80, y: 18, size: 'text-3xl', opacity: 0.2 },
  { id: 18, emoji: '💖', x: 90, y: 28, size: 'text-2xl', opacity: 0.24 },
  { id: 19, emoji: '🌸', x: 8, y: 48, size: 'text-3xl', opacity: 0.16 },
  { id: 20, emoji: '❤️', x: 18, y: 38, size: 'text-2xl', opacity: 0.23 },
  { id: 21, emoji: '🌹', x: 28, y: 58, size: 'text-3xl', opacity: 0.19 },
  { id: 22, emoji: '💕', x: 38, y: 68, size: 'text-2xl', opacity: 0.21 },
  { id: 23, emoji: '💖', x: 48, y: 12, size: 'text-3xl', opacity: 0.17 },
  { id: 24, emoji: '🌸', x: 58, y: 22, size: 'text-2xl', opacity: 0.26 },
  { id: 25, emoji: '❤️', x: 68, y: 62, size: 'text-3xl', opacity: 0.14 },
  { id: 26, emoji: '🌹', x: 78, y: 72, size: 'text-2xl', opacity: 0.18 },
  { id: 27, emoji: '💕', x: 88, y: 82, size: 'text-3xl', opacity: 0.22 },
  { id: 28, emoji: '💖', x: 92, y: 52, size: 'text-2xl', opacity: 0.15 },
  { id: 29, emoji: '🌸', x: 12, y: 92, size: 'text-3xl', opacity: 0.2 }
]


function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [dialogType, setDialogType] = useState('') // 'yes' or 'no'
  const mobile = useMemo(() => isMobile(), [])
  const confettiCount = mobile ? 150 : 250
  const confettiTimerRef = useRef(null)

  const handleCardClick = () => {
    if (!isOpen) {
      setIsOpen(true)
      setShowConfetti(true)
      // Stop confetti after pieces have fallen
      confettiTimerRef.current = setTimeout(() => setShowConfetti(false), 10000)
    }
  }

  const handleCloseCard = (e) => {
    e.stopPropagation()
    setIsOpen(false)
    setShowConfetti(false)
    // Clear the confetti timer
    if (confettiTimerRef.current) {
      clearTimeout(confettiTimerRef.current)
      confettiTimerRef.current = null
    }
  }

  const handleYes = () => {
    setDialogType('yes')
    setShowDialog(true)
  }

  const handleNo = () => {
    setDialogType('no')
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
    if (dialogType === 'yes') {
      setIsOpen(false)
      setShowConfetti(false)
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current)
        confettiTimerRef.current = null
      }
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-red-100">
      {/* Decorative bokeh circles - reduced blur */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/15 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-300/15 rounded-full blur-2xl"></div>
      </div>
      
      {/* Background hearts and roses */}
      <BackgroundElements />
      
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
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // Closed Card
            <motion.div
              key="closed"
              className="relative cursor-pointer w-full max-w-sm sm:max-w-md md:max-w-lg"
              onClick={handleCardClick}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
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
            </motion.div>
          ) : (
            // Opened Card
            <motion.div
              key="open"
              className="relative w-full max-w-sm sm:max-w-md md:max-w-lg"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
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
                  
                  {/* Yes/No Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 }}
                    className="mt-6 flex justify-center gap-4"
                  >
                    <button
                      onClick={handleYes}
                      className="px-8 py-3 bg-pink-500 hover:bg-red-500 text-white rounded-full transition-colors duration-200 text-base sm:text-lg font-semibold shadow-lg"
                    >
                      Yes! 💕
                    </button>
                    <button
                      onClick={handleNo}
                      className="px-8 py-3 bg-pink-500 hover:bg-red-500 text-white rounded-full transition-colors duration-200 text-base sm:text-lg font-semibold shadow-lg"
                    >
                      No 😢
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dialog Modal */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={closeDialog}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {dialogType === 'yes' ? (
                <div className="text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h2 className="text-3xl font-bold text-red-500 mb-4">
                    Thank You!
                  </h2>
                  <p className="text-red-500 text-lg mb-6">
                    You've made me the happiest person in the world! I promise not to disappoint you. 💕
                  </p>
                  <button
                    onClick={closeDialog}
                    className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors duration-200 font-medium"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-6xl mb-4">🤔</div>
                  <h2 className="text-3xl font-bold text-red-500 mb-4">
                    Oops!
                  </h2>
                  <p className="text-gray-700 text-lg mb-6">
                    Sorry, did you mean to click "Yes"?
                  </p>
                  <button
                    onClick={closeDialog}
                    className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 font-medium"
                  >
                    Let me try again
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Component for static background hearts and roses
function BackgroundElements() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {BACKGROUND_ELEMENTS.map((element) => (
        <div
          key={element.id}
          className={`absolute ${element.size}`}
          style={{ 
            left: `${element.x}%`, 
            top: `${element.y}%`, 
            opacity: element.opacity
          }}
        >
          {element.emoji}
        </div>
      ))}
    </div>
  )
}

export default App

