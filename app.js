// Gitter NodeJS client:
// https://github.com/gitterHQ/node-gitter
const Gitter = require('node-gitter')
// Twitter nodejs client:
// https://github.com/desmondmorris/node-twitter
const Twitter = require('twitter')
// Fichier de onfiguration
const config = require('./config')
// Fonctions propres au bot
const gb = require('./functions')

// Création des clients
const TwitterClient = new Twitter(config.twitter)
const GitterClient = new Gitter(config.gitter)

//var params = { screen_name: 'nodejs' }
//TwitterClient.get('statuses/user_timeline', params, function (error, tweets, response) {
//  if (!error) {
//    console.log(tweets)
//  }
//})
//

// Test du login
GitterClient.currentUser()
  .then(function (user) {
    console.log('[G] - Identifié en tant que : ' + user.username)
    config.states.currentUser = user.username
  })

GitterClient.rooms.join(config.gitterRoom)
  .then(function (room) {
    console.log('[G] Salon rejoint : ' + room.name)
    // message de bienvenue;
    //gb.sendGitterMessage(room, 'Hello, je viens d\'arriver sur ce salon')

    // Ecoute des messages:
    const events = room.streaming().chatMessages()
    events.on('chatMessages', function (message) {
      gb.parseGitterMessage(room, message)
    })

    // Message d'au revoir
    //gb.sendGitterMessage(room, 'Je m\'en vais, à la prochaine !')

  })
  .fail(function (err) {
    console.log('[G] Impossible de rejoindre le salon : ', err)
  })