import request from '../lib/request';

export async function visitLeetBookPageDetail(pageId: string) {
  console.log(`查看 LeetBook 章节...`);
  await request.post('/graphql', {
    operationName: 'leetbookPageDetail',
    variables: { pageId },
    query:
      'query leetbookPageDetail($pageId: ID!) {\n  leetbookPage(pageId: $pageId) {\n    title\n    subtitle\n    id\n    pageType\n    blocks {\n      type\n      value\n      __typename\n    }\n    commonTags {\n      nameTranslated\n      name\n      slug\n      __typename\n    }\n    qaQuestionUuid\n    ...leetbookQuestionPageNode\n    __typename\n  }\n}\n\nfragment leetbookQuestionPageNode on LeetbookQuestionPage {\n  question {\n    questionId\n    envInfo\n    judgeType\n    metaData\n    enableRunCode\n    sampleTestCase\n    judgerAvailable\n    langToValidPlayground\n    questionFrontendId\n    style\n    content\n    translatedContent\n    questionType\n    questionTitleSlug\n    editorType\n    mysqlSchemas\n    codeSnippets {\n      lang\n      langSlug\n      code\n      __typename\n    }\n    topicTags {\n      slug\n      name\n      translatedName\n      __typename\n    }\n    jsonExampleTestcases\n    __typename\n  }\n  __typename\n}\n',
  });
  console.log(`查看 LeetBook 章节成功! pageId=${pageId}`);
}

export async function getFreeLeetBook(bookId: string) {
  console.log(`获取 free LeetBook...`);
  await request.post('/graphql', {
    operationName: 'leetbookPurchaseFreeBook',
    query:
      'mutation leetbookPurchaseFreeBook($bookId: ID!) {\n  leetbookPurchaseFreeBook(bookId: $bookId) {\n    __typename\n    ok\n    error\n  }\n}',
    variables: { bookId },
  });
  console.log(`获取 free LeetBook 成功! bookId=${bookId}`);
}

export async function leetBookDiscussUpStar() {
  console.log(`点赞 LeetBook 讨论中...`);
  await request.post('/graphql', {
    operationName: 'qaAddAnswerReaction',
    variables: {
      articleId: 'ao81Ob',
      reactionType: 'UPVOTE',
    },
    query:
      'mutation qaAddAnswerReaction($articleId: ID!, $reactionType: ReactionTypeEnum!) {\n  columnsAddReaction(articleId: $articleId, reactionType: $reactionType) {\n    ok\n    article {\n      ... on QAAnswerNode {\n        uuid\n        reactionType\n        reactionsV2 {\n          reactionType\n          count\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
  });
  console.log(`点赞 LeetBook 讨论成功!`);
}

export async function leetBookDiscussDownStar() {
  console.log(`取消点赞 LeetBook 讨论中...`);

  await request.post('/graphql', {
    operationName: 'qaRemoveAnswerReaction',
    variables: { articleId: 'ao81Ob' },
    query:
      'mutation qaRemoveAnswerReaction($articleId: ID!) {\n  columnsRemoveReaction(articleId: $articleId) {\n    ok\n    article {\n      ... on QAAnswerNode {\n        uuid\n        reactionType\n        reactionsV2 {\n          reactionType\n          count\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n',
  });
  console.log(`取消点赞 LeetBook 讨论成功!`);
}
