import schedule from './index';
const [account, password] = process.argv.slice(2);

schedule.setConfig({ account, password });
schedule.run();
