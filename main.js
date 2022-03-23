// const chalk = require('chalk');
// const log = console.log;
 
// // Combine styled and normal strings
// log(chalk.blue('Hello') + ' World' + chalk.red('!'));
 
// // Compose multiple styles using the chainable API
// log(chalk.blue.bgRed.bold('Hello world!'));
 
// // Pass in multiple arguments
// log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));
 
// // Nest styles
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
 
// // Nest styles of the same type even (color, underline, background)
// log(chalk.green(
//     'I am a green line ' +
//     chalk.blue.underline.bold('with a blue substring') +
//     ' that becomes green again!'
// ));

// log(chalk.white.bgBlue.bold("my name is krishna ahari"));
// log(chalk.red.bgWhite.bold("my name")+chalk.blueBright.bgWhite.bold("is a")+chalk.green.bgWhite.bold("krishna ahari"));

// var validator = require('validator');
// const chalk=require("chalk");
// const vali=validator.isEmail('mitchatchain@gmail.c');
// console.log(vali ? chalk.greenBright.bold.inverse(vali):chalk.redBright.bold.inverse(vali));

// const http=require("http");

// const server=http.createServer((req,res)=>{
//     console.log(req.url);
//    res.end("hello Aarti jii how are you ?");
// });

// server.listen(8000,"127.0.0.1",()=>{
//   console.log("this is running port no. 8000");
// });
// const fs=require("fs")
// const biodata={
//   name:"krishna",
//   age:22,
//   address:"indira colony sagwara",
//   channel:"codgame",
// };

// const biofetch=JSON.stringify(biodata);
// console.log(biofetch);
// const filewrt=fs.writeFile("json1.json",biofetch,(err)=>{
//   console.log("done");
// });
// const read=fs.readFile("json1.json","utf-8",(err,data)=>{
//   console.log(data);
// });
// const readfile=JSON.parse(read);
// console.log(readfile);

// const http=require("http");

// const network=http.createServer((req,res)=>{
//     if(req.url=="/"){
//       console.log(req.url);
//       res.end("hyy this is an empty page");
//     }else if(req.url == "/about"){
//       console.log(req.url);
//       res.end("this is an about section");
//     }
//     else if(req.url =="/contact"){
//       console.log(req.url);
//       res.end("this is about the about section");
//     }

//     else{
//       res.end("<h1>404 is forbidden page</h1>");
//     }
// })

// network.listen(7000,"127.0.0.1",()=>{
//   console.log("server lisitinig to the port number 7000");
// })



const fs=require("fs");
const http=require("http");
var requests=require("requests");
const readhomefile=fs.readFileSync("homt.html","utf-8");
const replaceval=(tempval,orgval)=>{
   let temperature=tempval.replace("{%tempval%}",orgval.main.temp);
   temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);
   temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
   temperature=temperature.replace("{%country%}",orgval.sys.country);
   temperature=temperature.replace("{%state%}",orgval.name);

   return temperature;
};
const createnet=http.createServer((req,res)=>{
  if(req.url == "/"){
    requests('https://api.openweathermap.org/data/2.5/weather?q=Rajasthan&limit=5&appid=fad7972d6ef6d25f65a5ba63edbde296',)
    .on('data', function (chunk) {
      const objdata=JSON.parse(chunk);
      const array=[objdata];
      // console.log(array[0].main.temp);
      const realtime=array.map((val)=>replaceval(readhomefile,val)).join("");
      res.write(realtime);
      // console.log(realtime);
    })
    .on('end', function (err) {
      if (err) return console.log('connection closed due to errors', err);
     res.end();
    });
  }
});

createnet.listen(8000,"127.0.0.1");

