const express = require('express');
import axios from "axios"
const jju = require('jju');
const keep_alive = () =>{
const app = express();
const port = 3000;
app.get('/', (req: any, res: any)=>{
   res.status(200).send("bot running..")
//    res.sendStatus(200)
})

setInterval(async ()=> {
  try {
    let jss: any = await axios.get('https://tgubot.iscteam.repl.co/')
    // jss = ("" + jss).substring(2)
 console.log(jss.data)
      } catch (error) {
    console.log(error)
  }
}, 25000);


  
  
app.listen(port, () => console.log(`Bot running on http://localhost:${port}`));
}
export default keep_alive