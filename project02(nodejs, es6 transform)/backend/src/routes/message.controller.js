import request from "request";

function get (url){
  return new Promise(function(resolve, reject){
    request({
      method: 'GET',
      url: url,
      json: true,
      headers: {
        'User-Agent': 'request'
      }
    }, function(err, resp, body){
      if(err){
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
}


export const message = async (req, res) => {
  var gists = await get('https://api.github.com/gists/public');
  res.json({
    text: gists,
    alert:"hello world"
  })
}
