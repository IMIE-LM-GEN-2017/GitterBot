/**
 Configuration file
 */
module.exports = {
  name: 'GitterBot',
  // Twitter Api KEYS
  twitter: {
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: '',
  },
  // Gitter API Key
  gitter: '',
  gitterRoom: '',
  // Préfixe pour les messages
  gitterPrefix: '`[bot] > `',
  regexes: {
    // gitterPrefix, sous forme d'expression régulière
    botPrefix: /^`\[bot\] > `/g,
    greeting: /hello|salut|plop|bonjour|bonsoir/g,
    botCall: /\/bot /g,
    botStatus: /^\/bot$/g
  },
  links: {
    // Lien vers la page Github de la classe
    gitterOrg: '',
    // Lien vers la page Trello de la classe
    trelloOrg: ''
  },
  // Nom des étudiants
  students: [],
  // Différents états, à garder pendant le déroulement du process
  states: {
    random: {
      students: [],
      current: null,
      done: []
    },
    currentUser: ''
  }
}