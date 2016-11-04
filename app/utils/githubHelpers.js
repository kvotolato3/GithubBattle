var axios = require('axios');

var id = "YOUR_CLIENT_ID";
var sec = "YOUR_SECRET_ID";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo (username) {
  //axios.get returns a promise
  return axios.get('https://api.github.com/users/' + username + param)
}

var helpers = {
  getPlayersInfo: function (players) {
    //axios.all takes an array of promises
    //when each of those promises are resolved, .then will fire
    return axios.all(players.map(function (username) {
      return getUserInfo(username)
    }))
    .then(function (info) {
      return info.map(function (user) {
        return user.data //When you keep returning promises, within
        //a promise, you end up with a promise
      })
    })
    .catch(function (err) {
      console.warn('Error in getPlayersInfo', err)
    })
  }
};

module.exports = helpers;




