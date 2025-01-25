'use client'

import { motion } from 'framer-motion'
import { BookOpen, BookOpenText } from 'lucide-react'

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <BookOpenText className="h-12 w-12 text-primary mr-2" />
          <h1 className="text-4xl items-center font-bold text-primary"> <span className=" dark:text-white text-black">Study</span>
              Sync</h1>
              
        </div>
        <p className="text-lg text-muted-foreground mb-8">Preparing your learning experience...</p>
      </motion.div>
      
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
      />
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 text-sm text-muted-foreground"
      >
        This may take a few moments
      </motion.p>
    </div>
  )
}