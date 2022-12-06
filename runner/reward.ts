import { Ctx, CtxTask } from '../lib/schedule';
import { visitPage } from '../lib/service';

import { getQuestionSolution } from '../service/question';

import {
  readSolutionRewards,
  dailyLoginRewards,
  readThreeLeetBookRewards,
  createNoteRewards,
  getTwoFreeLeetBookRewards,
  viewProgressRewards,
  starLeetBookComment,
} from '../service/reward';

import { visitLeetBookPageDetail, getFreeLeetBook } from '../service/leetbook';

import { createNote, delNoteById } from '../service/note';

import {
  LeetBook,
  LeetBookBinaryTree,
  TaskStatus,
  TaskType,
} from '../lib/type';

function canReward(fn: (ctx: Ctx, task: CtxTask) => any, taskType: TaskType) {
  return async function (ctx: Ctx) {
    const tasks = ctx.task;
    const task = tasks?.find((o) => o.id === taskType);
    if (!task) {
      console.log(`未下发任务: ${taskType}`);
      return;
    }

    let result;
    console.log(`执行任务: ${task.name}...`);
    try {
      result = await fn(ctx, task);
      console.log(`${task.name} 执行完成!`);
    } catch (error) {
      console.log(error);
    }
    return result;
  };
}

export const obtainDailyLoginReward = canReward(async function (ctx: Ctx) {
  await dailyLoginRewards();
}, TaskType.dailyLogin);

export const obtainReadSolutionReward = canReward(async function (ctx: Ctx) {
  await Promise.all(
    [
      'liang-shu-zhi-he-de-si-chong-jie-fa-pai-6vatw',
      'jie-suan-fa-1-liang-shu-zhi-he-by-guanpengchn',
      'xiao-bai-pythonji-chong-jie-fa-by-lao-la-rou-yue-j',
      'liang-shu-zhi-he-by-gpe3dbjds1',
    ].map((slug) => getQuestionSolution(slug))
  );
  await readSolutionRewards();
}, TaskType.readSolution);

export const obtainReadThreeLeetBookRewards = canReward(async function (
  ctx: Ctx
) {
  await Promise.all(
    [
      LeetBookBinaryTree.xebrb2,
      LeetBookBinaryTree.xecaj6,
      LeetBookBinaryTree.xeywh5,
    ].map((pageId) => visitLeetBookPageDetail(pageId))
  );
  await readThreeLeetBookRewards();
},
TaskType.readThreeLeetBook);

export const obtainCreateNoteRewards = canReward(async function (
  ctx: Ctx,
  task: CtxTask
) {
  // const
  const questionId = '1900',
    content = 'lc-helper';
  const createNoteRes = await createNote({
    id: questionId,
    content,
  });
  const {
    noteCreateCommonNote: { note },
  } = createNoteRes?.data || {};
  const { id: r_id } = note;
  console.log(`笔记 id=${r_id}`);
  try {
    await createNoteRewards();
  } catch (error) {
    console.log(error);
  }
  await delNoteById({ id: r_id });
},
TaskType.createNote);

export const obtainVisitProgress = canReward(async function (
  ctx: Ctx,
  task: CtxTask
) {
  const link = task.link;
  console.log(`查看学习进度: ${link}`);
  await visitPage(link);
  console.log(`查看学习进度成功!`);
  await viewProgressRewards();
},
TaskType.viewProgress);

export const obtainGetTwoFreeLeetBook = canReward(async function (
  ctx: Ctx,
  task: CtxTask
) {
  await Promise.all(
    [LeetBook.arrayAndString, LeetBook.binaryTree].map((bookId) =>
      getFreeLeetBook(bookId)
    )
  );

  await getTwoFreeLeetBookRewards();
},
TaskType.getTwoFreeLeetBook);

export const obtainStarLeetBookComment = canReward(async function (
  ctx: Ctx,
  task: CtxTask
) {
  await starLeetBookComment();
},
TaskType.starLeetBookComment);
