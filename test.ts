import schedule from './index';
import { Config } from './lib/config';
const [session, authorization] = process.argv.slice(2);

Config.set({ session, authorization });
schedule.run();
