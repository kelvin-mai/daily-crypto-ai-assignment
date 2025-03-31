import { useAppStore } from '../../lib/store';
import { Progress } from '../common/progress';

export const BookStatistics = () => {
  const {
    books: { statistics },
  } = useAppStore();
  if (!statistics) return null;
  return (
    <div className="p-4 rounded-lg shadow-md space-y-2 dark:bg-slate-700 mb-4">
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
    </div>
  );
};
