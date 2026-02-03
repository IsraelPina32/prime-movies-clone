import React from 'react';
import { motion } from 'framer-motion';

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="col-span-full flex flex-col items-center justify-center p-12 text-center"
    >
      <div className="bg-red-500/10 p-6 rounded-full mb-4">
        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="text-xl font-bold text-white mb-2">Ops! Algo deu errado</h2>
      <p className="text-gray-400 max-w-xs mb-6">{message}</p>
      
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-6 py-2 bg-prime-blue hover:bg-blue-600 text-white font-bold rounded-md transition-colors"
        >
          Tentar Novamente
        </button>
      )}
    </motion.div>
  );
};