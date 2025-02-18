import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText } from 'lucide-react';

const ExpandableCard = ({ title, isExpanded, onToggle, children }) => {
  return (
    <motion.div
      layout
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{
        layout: {duration: 0.3, ease: "easeOut"},
      }}
      className="bg-[#2D2B3D] rounded-lg overflow-hidden"
    >
      <motion.div
        layout="position"
        className="p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <motion.h3 layout="position" className="text-white font-semibold">
            {title}
          </motion.h3>
          <motion.div
            animate={{rotate: isExpanded ? 180 : 0}}
            transition={{duration: 0.3}}
          >
            <ChevronDown className="text-[#7C3AED]" size={20}/>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {isExpanded && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{
                height: "auto",
                opacity: 1,
                transition: {
                  height: {duration: 0.3},
                  opacity: {duration: 0.2, delay: 0.1}
                }
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {duration: 0.3},
                  opacity: {duration: 0.2}
                }
              }}
            >
              <motion.div
                initial={{y: -10}}
                animate={{y: 0}}
                exit={{y: -10}}
                className="mt-4 pt-4 border-t border-gray-700"
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ExpandableCard;