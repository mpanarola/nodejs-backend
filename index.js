
//brings in http script availability
var request = require('request');

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
]


function serverTest(url, priority) {
    //creates options to allow for request timeout
    var options = {
        url: url,
        timeout: 5000
    };
    return new Promise (
        function(resolve, reject) {
            request(options, function(err, res, body) {
                //if (err) {console.log("There was an error: " + err)};
                //test if server responds with a positive status
                if (res !== undefined) {
                    if (res.statusCode >= 200 && res.statusCode <= 299) {
                        //console.log("response from online server is " + res.statusCode);
                        resolve({"url": url, "priority": priority});
                    } else
                    if (res.statusCode >= 300 && res.statusCode <= 399) {
                        //console.log("response from redirected server is " + res.statusCode);
                        reject("The server is not working");
                    } else
                    if (res.statusCode >= 400 && res.statusCode <= 499) {
                        //console.log("response from not working server is " + res.statusCode);
                        reject("The server is broken");
                    }//==> end of inner if/else statement
                } else {
                    reject("Server is unresponsive");
                }//==> end of outer if/else statement
            });//==> end of get request
        }
    );
};


// function serverTest(url, priority) {
//   var options = {
//     url: url,
//     timeout: 5000
//   }
//   return new Promise((resolve, reject) => {
//     // Always resolve for testing purposes
//     resolve({
//       "url": url,
//       "priority": priority
//     })
//   })
// }

function findServer(servers) {
  var build = []
  var promises = servers.map(server => {
    return serverTest(server.url, server.priority)
      .then(resolve => {
        // Do your validation of resolve here
        build.push(resolve)
      })
      .catch(error => {
        // By using catch, you ensure this promise chain will continue to 
        // resolve as long as you don't throw an error here or return another
        // Promise that will reject
        console.log("Server " + server.url + " failed with : " + error)
      })
  })

  return Promise.all(promises).then(values => {
    // At this point you know that all your promises have resolved, and
    // the successful ones have added an element to 'build'
    return build
  });
};

findServer(serverSet).then(result => {
  console.log("result is : " + JSON.stringify(result))
})