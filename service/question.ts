import request from '../lib/request';

export async function getQuestionSolution(slug: string) {
  console.log(`查看题解中...`);
  console.log(
    await request.post('/graphql', {
      operationName: 'SolutionDetailSummary',
      query:
        'query SolutionDetailSummary($slug: String!) {\n  solutionArticle(slug: $slug) {\n    __typename\n    title\n    slug\n    author {\n      __typename\n      profile {\n        __typename\n        userAvatar\n        realName\n        userSlug\n      }\n      username\n    }\n    topic {\n      __typename\n      id\n      commentCount\n    }\n    hitCount\n  }\n}',
      variables: { slug: 'qiao-yong-jszhong-de-mapdui-xiang-by-ber-qegl' },
    })
  );

  console.log(`查看题解成功! slug=${slug}`);
}

export async function hitQuestionResource(entityId: string) {
  console.log(`上报查看题解事件...`);
  console.log(
    await request.post(
      '/',
      {
        operationName: 'hitResource',
        query:
          'mutation hitResource($entityId: ID!, $entityType: EntityType!) {\n  hitResource(entityId: $entityId, entityType: $entityType) {\n    __typename\n    ok\n    error\n  }\n}',
        variables: {
          entityId,
          entityType: 'ARTICLE',
        },
      },
      {
        headers: {
          'X-APOLLO-OPERATION-TYPE': 'mutation',
          'X-APOLLO-OPERATION-NAME': 'hitResource',
        },
      }
    )
  );

  console.log(`上报查看题解事件成功! entityId=${entityId}`);
}
