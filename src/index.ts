import chalk from 'chalk';
import clear from 'clear';
import figlet from 'figlet';

require('dotenv').config()

import { scrape } from './services/mac_rumors_scraper'

console.log(process.argv);

async function run(args: Array<string>): Promise<boolean> {
  // const myArgs = args.slice(2)
  console.log(`my args: ${args}`);
  // TODO: pass these in as params
  await scrape();
  return true;
}

clear();
console.log(
  chalk.red(
    figlet.textSync('macrumors-cli', { horizontalLayout: 'full' })
  )
);
run(process.argv);
