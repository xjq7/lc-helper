import request from '../lib/request';

export async function getQuestionSolution(slug: string) {
  console.log(`查看题解中...`);
  await request.post('/graphql', {
    operationName: 'SolutionDetailArticle',
    query:
      'query SolutionDetailArticle($slug: String!, $orderBy: SolutionArticleOrderBy!) {\n  solutionArticle(slug: $slug, orderBy: $orderBy) {\n    __typename\n    prev {\n      __typename\n      uuid\n      slug\n      title\n    }\n    next {\n      __typename\n      uuid\n      slug\n      title\n    }\n    ...solutionArticleFragment\n    ipRegion\n  }\n}fragment solutionArticleFragment on SolutionArticleNode {\n  __typename\n  uuid\n  title\n  content\n  slug\n  createdAt\n  isMyFavorite\n  canEdit\n  isEditorsPick\n  byLeetcode\n  summary\n  thumbnail\n  reactionType\n  reactionsV2 {\n    __typename\n    count\n    reactionType\n  }\n  hasVideo\n  videosInfo {\n    __typename\n    coverUrl\n    duration\n    status\n    videoId\n  }\n  topic {\n    __typename\n    id\n    commentCount\n    title\n  }\n  contentAuthor {\n    __typename\n    avatar\n    username\n    realName\n    userSlug\n  }\n  author {\n    __typename\n    profile {\n      __typename\n      certificationLevel\n    }\n  }\n  tags {\n    __typename\n    slug\n    name\n    nameTranslated\n  }\n  question {\n    __typename\n    title\n    titleSlug\n    questionTitleSlug\n    questionTitle\n    translatedTitle\n    questionFrontendId\n  }\n  rewardEnabled\n  hitCount\n}',
    variables: {
      orderBy: 'DEFAULT',
      slug,
    },
  });
  console.log(`查看题解成功! slug=${slug}`);
}
