import { motion } from 'motion/react';

import { useAppStore } from '../../lib/store';
import { Progress } from '../common/progress';

export const BookStatistics = () => {
  const {
    books: { statistics },
  } = useAppStore();
  if (!statistics) return null;
  return (
    <motion.div
      className="p-4 rounded-lg shadow-md space-y-2 dark:bg-slate-700 mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold">Overall Progress</h2>
      <div>
        <Progress
          value={Math.round(
            (statistics.totalPagesRead / statistics.totalPages) * 100,
          )}
        />
        <div className="text-right p-2">
          {statistics.totalPagesRead} / {statistics.totalPages} pages read
        </div>
      </div>
      <div>
        <Progress
          value={Math.round((statistics.completed / statistics.total) * 100)}
        />
        <div className="text-right p-2">
          {statistics.completed} / {statistics.total} books completed
        </div>
      </div>
    </motion.div>
  );
};
