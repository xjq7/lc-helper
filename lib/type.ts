export enum TaskType {
  dailyLogin = '25tg',
  readSolution = '5gy1',
  createNote = 'rdg2',
  readThreeLeetBook = 'ao3e',
  getTwoFreeLeetBook = '9q17',
  starLeetBookComment = 'olz6',
  viewProgress = 'pn6c',
}

export interface IResponse<T = any> {
  data: T;
  code: number;
  errors: string;
}

export enum TaskStatus {
  completed = 'COMPLETED',
  starting = 'STARTING',
  claimed = 'CLAIMED',
}

export interface Task {
  id: string;
  name: string;
  link: string;
  prize: {
    number: number;
  };
  userTask?: {
    status: TaskStatus;
  };
}

export enum LeetBookQueueStack {
  circleQueue = 'kgtj7',
  designCircleQueue = 'kzlb5',
  queueAchieve = 'kkqf1',
}

export enum LeetBookArrayAndString {
  clpgd = 'clpgd',
  ciekh = 'ciekh',
  cuxq3 = 'cuxq3',
}

export enum LeetBookBinaryTree {
  xeywh5 = 'xeywh5',
  xecaj6 = 'xecaj6',
  xebrb2 = 'xebrb2',
}

export enum LeetBook {
  arrayAndString = 'z71v',
  binaryTree = 'fkl1',
  trie = 'xpjov',
  binarySearchTree = 'xxu05',
}

export type Merge<T> = {
  [K in keyof T]: T[K];
};
