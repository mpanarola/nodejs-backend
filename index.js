var findServer = require('findServer');

var serverSet = [
{
  "url": "https://does-not-work.perfume.new",
  "priority": 1
},
{
  "url": "https://gitlab.com",
  "priority": 4
},
{
  "url": "http://app.scnt.me",
  "priority": 3
},
{
  "url": "https://offline.scentronix.com",
  "priority": 2
}

];


findServer.findServer(serverSet).then(result => {
  if(result){
     console.log(JSON.stringify(result))
  }
}).catch(function(error){
 console.log('error ', error);
});




