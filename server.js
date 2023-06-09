const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('student' in params){
      if(params['student']=== 'rock' || params['student']=== 'paper' || params['student']=== 'scissors' ){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const computerThrows = num => {
          if (num === 3){
            return "rock";
          }
          else if (num === 2){
            return 'scissors';
          }
          else if (num === 1) {
            return "paper";
          }
        }
        let throwPicker = Math.ceil(Math.random() * 3);
        let computerResult = computerThrows(throwPicker);
        const checkWinner = (humanPlayer, computerPlayer) => {
          if ((humanPlayer === 'rock' && computerPlayer === 'scissors') || (humanPlayer === 'paper' && computerPlayer === 'rock') || (humanPlayer === 'scissors' && computerPlayer === 'paper')){
            return 'You Win!'
          }
          else if (humanPlayer === computerPlayer) {
            return "Tie"
          }
          else {
            return "You Lose"
          }
        }
        let winner = checkWinner(params['student'], computerResult)
        const objToJson = {
          computerThrows: computerResult,
          whoWins: winner
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if(params['student'] != 'leon'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        const objToJson = {
          invalid: "Invalid input: only accepts rock, paper, or scissors",
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.log('Something went wrong...');
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
