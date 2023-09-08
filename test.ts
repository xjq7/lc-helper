import schedule from './index';
const [session] = process.argv.slice(2);

schedule.setConfig({ session });
schedule.run();
