#!/usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import schedule from '../index';
import { Config } from '../lib/config';

program.version(`v${packageJson.version}`, '-v,--version');

program
  .command('start <session> <authorization>')
  .action((session, authorization, _program) => {
    Config.set({ session, authorization });
    schedule.run();
  });

program.parse();
