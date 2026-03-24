import { motion, AnimatePresence } from "framer-motion";
import { X } from 'lucide-react';
import { FilterBar } from "./components/FilterBar";

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
};

export const FilterSidebar = ({ isOpen, onClose}:FilterSidebarProps ) => {
    return (
        <AnimatePresence>
            { isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-[300px] sm:w-[400px] bg-[#1a242f] shadow-2xl z-[70] p-6 border-l border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-white">Refinar Busca</h2>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="text-white" size={24} />
              </button>
            </div>

    
            <div className="overflow-y-auto h-[calc(100vh-120px)] no-scrollbar">
              <FilterBar isSidebar />
            </div>
          </motion.div>
        </>
            )}
        </AnimatePresence>
    );
};