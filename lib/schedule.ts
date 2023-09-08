import { AuthConfig } from './config';
import PriorityQueue from './PriorityQueue';
import { Merge, Task, TaskStatus } from './type';
import { authConfig } from '../lib/config';

type Run = (ctx: Ctx) => Promise<any>;

interface Runner {
  runner: Run;
  priority: number;
}

export type CtxTask = Merge<
  Pick<Task, 'id' | 'name' | 'link'> & { prize: number; status: TaskStatus }
>;

export interface Config {
  session?: string;
}

export interface Ctx {
  authConfig: AuthConfig;
  task?: CtxTask[];
  config: Config;
}

class Schedule {
  private runners;
  private ctx: Ctx;

  constructor(props?: { ctx: Ctx }) {
    this.runners = new PriorityQueue<{ runner: Run; priority: number }>({
      compare: (a, b) => a.priority > b.priority,
    });
    const { ctx } = props || {};
    const { config = {} } = ctx || {};
    this.ctx = { config, authConfig };
  }

  setConfig(config: Config) {
    this.ctx.config = Object.assign(this.ctx.config || {}, config);
  }

  addRunner(runner: Runner | Run) {
    if (typeof runner === 'function') {
      runner = { priority: 1, runner };
    }
    this.runners.push(runner);
  }

  async run() {
    while (!this.runners.empty()) {
      const { runner } = this.runners.top() || {};
      this.runners.pop();
      if (runner) await runner(this.ctx);
    }
  }
}

export default Schedule;
