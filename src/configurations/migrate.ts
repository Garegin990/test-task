#!/usr/bin/env node
import {
  Users,
  Hairdressers,
} from '../database';

const models = {
  Users,
  Hairdressers,
};

async function migrate() {
  for (const i in models) {
    console.log(`Migrate ${i}`);
    await models[i].sync({ alter: true});
  }
  process.exit(0);
}

migrate().then((success)=>{
  console.log('success', success)
}).catch((e) => {
  console.log('ERROR', e)
});


