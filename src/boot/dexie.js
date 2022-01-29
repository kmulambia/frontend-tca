import { boot } from 'quasar/wrappers'
import Dexie from "dexie";

export class Database extends Dexie {
  constructor() {
    //Enter Database Name
    super("db-amp-frontend");
  }
}
// Create Database
const database = new Database();
//Tables
database.version(1).stores({
  todo: `
    id++,
    name`
});
// "async" is optional;

// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

export default  boot(({app, router, store }) => {
  app.config.globalProperties.$database = database ;
  store.$database = database;
})


export { database }

