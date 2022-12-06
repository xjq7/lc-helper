import { Ctx } from '../lib/schedule';
import { login } from '../lib/service';

export default async function (ctx: Ctx) {
  const { account, password } = ctx.config;

  const authData = await login({
    account,
    password,
  });

  const { authSignInWithPassword } = authData.data || {};
  const { token } = authSignInWithPassword || {};
  const parseToken = JSON.parse(token);
  const { access_token } = parseToken;
  ctx.authConfig.access_token = access_token;
  console.log(`access_token: ${access_token}`);
}
