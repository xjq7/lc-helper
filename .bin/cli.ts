#!/usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import schedule from '../index';

program.version(`v${packageJson.version}`, '-v,--version');

program.command('start <session>').action((session, _program) => {
  schedule.setConfig({ session });
  schedule.run();
});

program.parse();
