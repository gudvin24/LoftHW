const http = require('http');

const PORT = process.env.NODE_PORT || 3000;
const INTERVAL = process.env.NODE_INTERVAL;
const DURATION = process.env.NODE_DURATION;

ticTac = (req, res) => {
  return new Promise(function(resolve, reject) {
    var timerId = setInterval(function() {
      let time = new Date();
      console.log(time.toUTCString());
      res.write(time.toUTCString() + '\n');
    }, INTERVAL);

    setTimeout(function() {
      clearInterval(timerId);
      res.end();
      resolve('success');
    }, DURATION);
    
    req.on('close', () => {
      clearInterval(timerId);
      res.end();
      reject('Request has been interrupted');
    });
    
  })
}

if (PORT && INTERVAL && DURATION) {
  http.createServer(function (req, res) {

    if (req.method == 'GET' && req.url == '/') {
      console.log('NEW REQUEST: ' + req.url);
      ticTac(req, res).then((result) => 
        {
          console.log(result);
        }, (err) => {
          console.log('ERROR: ' + err);
        })
    }
  }).listen(PORT, () => {
    console.log('listening to port: ' + PORT);
  });  
}
