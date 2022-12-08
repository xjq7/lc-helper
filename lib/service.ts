import request from './request';
import { IResponse, Task, TaskType } from './type';

interface LoginRequest {
  account?: string;
  password?: string;
}

interface LoginResponse {
  authSignInWithPassword: { token: string };
}

/**
 * 登录
 *
 * @export
 * @param {LoginRequest} { account, password }
 */
export async function login({ account, password }: LoginRequest) {
  console.log(`登录进行中...`);
  const authData = await request.post<
    IResponse<LoginResponse>,
    IResponse<LoginResponse>
  >('/graphql', {
    operationName: 'AccountLogin',
    query: `
        mutation AccountLogin($account: String!, $passWord: String!, $clientId: String!, $clientSecret: String!) {
          authSignInWithPassword(client: {clientId: $clientId, clientSecret: $clientSecret}, data: {username: $account, password: $passWord}) {
            token
            ok
          }
        }
      `,
    variables: {
      account,
      clientId: 'JVuUJLldV3WqJ0pJF27QQOeiWUEWRcJoWrkocJmG',
      clientSecret:
        'cc0Dqqz7V9n1x5W2KqoencG1OekATWJwpXpL2Y0bZciQrGwMMdidSqsaSZN38urEsai3UJ0ki3lfRqek0inlTqw1LEszf2GRu5O4fllD4gVzqH4bNVoaItkkn3JF6b0M',
      passWord: password,
    },
  });
  console.log('登录成功!');
  return authData;
}

export async function getTaskList() {
  console.log(`获取任务列表数据...`);
  const res = await request.post<
    IResponse<{ taskList: Task[] }>,
    IResponse<{ taskList: Task[] }>
  >(
    '/graphql',
    {
      operationName: 'taskList',
      query:
        'query taskList {\n  taskList {\n    __typename\n    action\n    desc\n    endAt\n    id\n    name\n    needNum\n    order\n    link\n    prize {\n      __typename\n      cover\n      hint\n      name\n      number\n      prizeType\n    }\n    startAt\n    style\n    userTask {\n      __typename\n      completedNum\n      status\n    }\n  }\n}',
      variables: null,
    },
    {
      headers: {
        'X-APOLLO-OPERATION-NAME': 'taskList',
        'X-APOLLO-OPERATION-TYPE': 'query',
      },
    }
  );
  console.log(`获取任务列表数据成功!`);
  return res;
}

export async function visitPage(url: string) {
  await request.get('/', { baseURL: url });
}
