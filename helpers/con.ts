const { MongoClient } = require("mongodb");
import dotenv from "dotenv";
import { Api, client, TelegramClient } from "telegram";
import { NewMessageEvent } from "telegram/events";
import { Upt } from "../helpers";
dotenv.config();

let cons: any = null

export default class Con {
  client: TelegramClient | any | undefined
  e: NewMessageEvent | any | undefined
  m: Api.Message | undefined
  upt: Upt | any | undefined

  // constructor(client: TelegramClient | undefined, e: NewMessageEvent, upt: Upt) {
  //   this.client = client;
  //   this.e = e;
  //   this.upt = upt
  //   this.m = e.message
  // }

  con() {
    const uri: any = process.env.URI;
    if(!cons){
    cons = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cons.connect();
  }
    return cons
  }

  close(){
    // const uri: any = process.env.URI;
    // const cn: any = new MongoClient(uri, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    // cons.db('db').serverStatus().connections

    cons.close();
    return cons
  }

  insert = async ({ ob = undefined, t = null }: any) => {
    let cn: any = this.con()
    try {
      if (!ob)
        return console.log('object null')
      let db = cn.db('db');
      // let db = cn.db('admin');


      // db.command({ serverStatus: 1 }, (err: any, res: any) => {
      //   console.log(res);
      //   cn.close();
      // });
      // return
      // console.log(db.serverStatus().connections)
      const col = db.collection('col');
      const inserted = await col.insertOne(ob);
      console.log(inserted);
      return inserted;
    } catch (err: any) {
      console.log(err.message)
    } finally {
      // await cn.close();
    }
  }

  del = async ({ ob = undefined, t = null }: any) => {
    let cn: any = this.con()
    try {
      if (!ob)
        return console.log('object null')

      let db = cn.db('db');
      const col = db.collection('col');
      let deleted: any;
      if (t == null)
        deleted = await col.deleteMany(ob);
      console.log(deleted);
      return deleted
    } catch (err: any) {
      console.log(err.message)
    }
  }

  find = async ({ ob = undefined, t = null }: any) => {
    let cn: any = this.con()
    try {
      if (!ob)
        return console.log('object null')

      await cn.connect();
      let db = cn.db('db');
      const col = db.collection('col');
      let found: any;
      if (t == null)
        found = await col.findOne(ob);
      console.log(found);
      return found;
    } catch (error: any) {
      console.log(error.message);
    }
  }

}