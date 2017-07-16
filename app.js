// Gitter NodeJS client:
// https://github.com/gitterHQ/node-gitter
var Gitter = require('node-gitter')
// Twitter nodejs client:
// https://github.com/desmondmorris/node-twitter
var Twitter = require('twitter')
var config = require('./config')

var TwitterClient = new Twitter(config.twitter)
var GitterClient = new Gitter(config.gitter)

//var params = { screen_name: 'nodejs' }
//TwitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
//  if (!error) {
//    console.log(tweets)
//  }
//})
//
//GitterClient.currentUser()
//  .then(function (user) {
//    console.log('You are logged in as:', user.username)
//  })
