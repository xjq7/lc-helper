export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function refreshUUID() {
  const uuid = getUUID();
  return uuid;
}

export function sleep(delay: number) {
  return new Promise((r) => setTimeout(r, delay));
}

// export function setCookie(cookie: Record<string, string>) {
//   console.log('写入 cookie: ');

//   Object.entries(cookie).forEach(([key, value]) => {
//     if ((cookies as any)[key] === value) {
//       delete cookie[key];
//     }
//   });
//   if (!Object.keys(cookie).length) {
//     console.log('cookie 未更新, 跳过写入');
//     return;
//   }

//   Object.entries(cookie).forEach(([key, value]) => {
//     console.log(key + '=' + value);
//   });

//   fs.unlinkSync('config/cookie.json');
//   fs.writeFileSync('config/cookie.json', JSON.stringify(cookie));
//   console.log('写入 cookie 完成!');
// }

// export function setAuthConfig(config: Record<string, string>) {
//   console.log('写入 token: ');
//   console.log('token:', config.access_token);
//   console.log('过期时间:', new Date(Number(config.expires_time)));

//   fs.unlinkSync('config/auth.json');
//   fs.writeFileSync('config/auth.json', JSON.stringify(config));
//   console.log('写入 token 完成!');
// }
