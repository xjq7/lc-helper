import Schedule from './lib/schedule';
import login from './runner/login';
import {
  obtainDailyLoginReward,
  obtainReadSolutionReward,
  obtainCreateNoteRewards,
  obtainReadThreeLeetBookRewards,
  obtainVisitProgress,
  obtainGetTwoFreeLeetBook,
  obtainStarLeetBookComment,
} from './runner/reward';
import { injectTaskList } from './runner/task';

process.on('uncaughtException', (error) => {
  console.log('uncaughtException 全局异常捕获', error);
});

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection 全局异常捕获', error);
});

const schedule = new Schedule();
schedule.addRunner({ runner: login, priority: 999 });
schedule.addRunner({ runner: injectTaskList, priority: 998 });
schedule.addRunner({ runner: obtainDailyLoginReward, priority: 997 });
schedule.addRunner(obtainReadSolutionReward);
schedule.addRunner(obtainCreateNoteRewards);
schedule.addRunner(obtainVisitProgress);
schedule.addRunner(obtainStarLeetBookComment);
schedule.addRunner({ runner: obtainGetTwoFreeLeetBook, priority: 101 });
schedule.addRunner({ runner: obtainReadThreeLeetBookRewards, priority: 99 });

export default schedule;
