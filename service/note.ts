import request from '../lib/request';
import { IResponse } from '../lib/type';

interface CreateNoteRequest {
  id: string;
  content: string;
}

interface CreateNoteResponse {
  noteCreateCommonNote: {
    note: {
      id: string;
      targetId: string;
    };
  };
}

/**
 * 创建一篇学习笔记
 *
 * @export
 * @param {CreateNoteRequest} {
 *   id,
 *   content,
 * }
 * @return {*}  {Promise<IResponse<CreateNoteResponse>>}
 */
export async function createNote({ id, content }: CreateNoteRequest) {
  console.log(`创建笔记中... targetId=${id}`);
  const res = await request.post<
    IResponse<CreateNoteResponse>,
    IResponse<CreateNoteResponse>
  >('/graphql', {
    operationName: 'NoteCreateCommonNote',
    query:
      'mutation NoteCreateCommonNote($content: String!, $summary: String!, $noteType: NoteCommonTypeEnum!, $targetId: String!) {\n  noteCreateCommonNote(content: $content, summary: $summary, noteType: $noteType, targetId: $targetId) {\n    __typename\n    note {\n      __typename\n      config\n      content\n      id\n      noteType\n      status\n      targetId\n      updatedAt\n    }\n    ok\n  }\n}',
    variables: {
      content: content + '\n',
      noteType: 'COMMON_QUESTION',
      summary: content,
      targetId: id,
    },
  });
  console.log('学习笔记创建成功!');
  return res;
}

/**
 * 删除指定 id 的笔记
 *
 * @export
 * @param {{ id: string }} { id }
 * @return {*}
 */
export async function delNoteById({ id }: { id: string }) {
  console.log(`删除笔记执行中... id=${id}`);
  await request.post('/graphql', {
    operationName: 'NoteDeleteUserNote',
    query:
      'mutation NoteDeleteUserNote($noteId: ID!) {\n  noteDeleteUserNote(noteId: $noteId) {\n    __typename\n    ok\n  }\n}',
    variables: { noteId: id },
  });
  console.log(`笔记删除成功!`);
}
