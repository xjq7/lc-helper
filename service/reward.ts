import request from '../lib/request';
import { TaskType } from '../lib/type';

/**
 * 领取奖励的构造方法
 *
 * @export
 * @param {{ taskId: string }} { taskId }
 * @return {*}
 */
export async function taskClaimPrize({ taskId }: { taskId: string }) {
  const res = await request.post('/graphql', {
    operationName: 'taskClaimPrize',
    query: `mutation taskClaimPrize($taskId: ID!) {
        taskClaimPrize(taskId: $taskId) {
          ok
        }
      }`,
    variables: { taskId },
  });
  return res;
}

/**
 * 阅读 3 篇题解领取 1 积分
 *
 * @export
 */
export async function readSolutionRewards() {
  console.log('领取阅读 3 篇题解积分 任务执行开始...');
  await taskClaimPrize({ taskId: TaskType.readSolution });
  console.log('领取 1 积分成功! ');
}

/**
 * App 每日登录领取 1 积分
 *
 * @export
 */
export async function dailyLoginRewards() {
  console.log('领取App 每日登录积分 任务执行开始...');
  await taskClaimPrize({ taskId: TaskType.dailyLogin });
  console.log('领取 1 积分成功! ');
}

/**
 * 保存 1 则学习笔记领取 3 积分
 *
 * @export
 */
export async function createNoteRewards() {
  console.log('领取保存学习笔记积分 任务执行开始...');
  await taskClaimPrize({ taskId: TaskType.createNote });
  console.log('领取 3 积分成功! ');
}

/**
 * 阅读 3 章 LeetBook 领取 2 积分
 *
 * @export
 */
export async function readThreeLeetBookRewards() {
  console.log('领取阅读 LeetBook 积分 任务执行开始...');
  await taskClaimPrize({ taskId: TaskType.readThreeLeetBook });
  console.log('领取 2 积分成功! ');
}

/**
 * 获取 2 本 LeetBook 领取 3 积分
 *
 * @export
 */
export async function getTwoFreeLeetBookRewards() {
  console.log('领取获取 2 本LeetBook 任务执行开始...');
  await taskClaimPrize({ taskId: TaskType.getTwoFreeLeetBook });
  console.log('领取 3 积分成功! ');
}

/**
 * 查看 1 次学习进度 领取 1 积分
 *
 * @export
 */
export async function viewProgressRewards() {
  console.log(`领取查看 1 次学习进度...`);
  await taskClaimPrize({ taskId: TaskType.viewProgress });
  console.log('领取 3 积分成功! ');
}
/**
 * 点赞 1 则 LeetBook 讨论 领取 1 积分
 *
 * @export
 */
export async function starLeetBookComment() {
  console.log(`领取点赞 1 则 LeetBook 讨论...`);
  await taskClaimPrize({ taskId: TaskType.starLeetBookComment });
  console.log(`领取 1 积分成功! `);
}
