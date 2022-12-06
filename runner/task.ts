import { Ctx } from '../lib/schedule';
import { getTaskList } from '../lib/service';
import { TaskStatus } from '../lib/type';

export async function injectTaskList(ctx: Ctx) {
  const taskListRes = await getTaskList();
  const { taskList } = taskListRes.data;
  ctx.task = taskList.map(({ id, name, link, userTask, prize }) => {
    let status = TaskStatus.starting;
    if (userTask && userTask.status) status = userTask.status;
    let _prize = prize.number;
    return { id, name, link, status, prize: _prize };
  });

  console.log(`ctx 挂载 任务列表数据`);
  console.log(`taskList: ${JSON.stringify(ctx.task)}`);
}
