#!/usr/bin/env node
import { program } from 'commander';
import packageJson from '../package.json';
import schedule from '../index';

program.version(`v${packageJson.version}`, '-v,--version');

program
  .command('start <account> <password>')
  .action((account, password, _program) => {
    schedule.setConfig({ account, password });
    schedule.run();
  });

program.parse();
