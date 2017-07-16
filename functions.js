const config = require('./config')

module.exports = {
  /**
   * Préfixe un message avec le gitterPrefix et l'envoie dans le salon
   * @param room Objet représentant le salon
   * @param message Message à envoyer
   */
  sendGitterMessage: function (room, message) {
    room.send(config.gitterPrefix + ' ' + message)
  },
  /**
   * Analyse un message et réagit en conséquence.
   * @param room Objet représentant le salon
   * @param message Objet représentant le message
   */
  parseGitterMessage: function (room, message) {
    // Si c'est un nouveau message:
    if (message.operation === 'create') {
      // On recherche si le bot doit réagir à ce message

      const text = message.model.text.toLowerCase()
      console.log(text)
      const sender = message.model.fromUser.username

      // Message du bot
      if (config.regexes.botPrefix.exec(text)) {
        console.log('[G] Message du bot, on ne fait rien.')
        return
      }

      // Message de salutation
      if (config.regexes.greeting.exec(text)) {
        this.sendGitterMessage(room, 'Salut @' + sender + '!')
        return
      }

      // Demande au bot
      if (config.regexes.botCall.exec(text)) {
        const actions = text.split(' ')
        if (['status', 'trotg', 'help', 'random', 'rm'].indexOf(actions[1]) === -1) {
          this.sendGitterMessage(room, 'Oui @' + sender + ' ? Que veux tu ?')
        } else {
          switch (actions[1]) {
            case 'status':
              break
            case 'ghorg':
              this.sendGitterMessage(room, 'Lien vers l\'organisation de la classe sur Gitter : ' + config.links.gitterOrg)
              break
            case 'trorg':
              this.sendGitterMessage(room, 'Lien vers les tableaux Trello de la classe : ' + config.links.trelloOrg)
              break
            case 'rm':
              console.log(actions)
              var prepa = ''
              var raison = ''
              if (actions.length >= 4 && actions[2] === '-rf' && /^@/g.exec(actions[3])) {
                prepa = '\n# Anihilation totale ! Bye ' + actions[3] + ' !\n'
                actions.splice(0, 4)
                raison = '\n_' + actions.join(' ') + '_'
              }
              this.sendGitterMessage(room, prepa + raison + '\n![rm -rf](' + config.links.boom + ')')
              break
            case 'help':
              this.sendGitterMessage(room, 'Commandes disponibles : **`/bot ...`**\n\n  - `'
                + [
                  'ghorg',
                  'trorg',
                  'help',
                  'random',
                  'random list',
                  'random reset',
                ].join('`\n  - `') + '`')
              break
            case 'random':
              console.log('[G] Random')

              // Actions spéciales
              if (actions.length === 3) {
                console.log('[B] Random : action spéciale')
                if (actions[2] === 'reset') {
                  if (config.states.currentUser === sender) {
                    this.resetRandomList()
                    this.sendGitterMessage(room, 'Liste aléatoire remise à zéro')
                  } else {
                    this.sendGitterMessage(room, 'Bien essayé, mais non :)')
                  }
                }
                if (actions[2] === 'list') {
                  this.sendGitterMessage(room, '\n**Personnes déjà interrogées :** '
                    + config.states.random.done.join(', ')
                    + '\n**Personnes restantes :** '
                    + config.states.random.students.join(', ')
                  )
                }
              } else {
                console.log('[B] Random : action normale')
                // On prend un nom au hasard:
                if (config.states.random.students.length === 0) {
                  // initialisation de la liste;
                  this.resetRandomList()
                }
                const rdm = Math.floor(Math.random() * config.states.random.students.length)
                const student = config.states.random.students[rdm]

                // Permutation de liste
                config.states.random.done.push(student)
                config.states.random.students.splice(rdm, 1)

                this.sendGitterMessage(room, 'Au hasard, ce sera ... ' + student)
              }
              return
          }
        }

        return
      }

      // Status du bot:
      if (config.regexes.botStatus.exec(text)) {
        this.sendGitterMessage(room, 'Oui @' + sender + ', je suis toujours là')
      }
    }
  },
  resetRandomList: function () {
    console.log('[B] Reset de la liste random')
    config.states.random.students = JSON.parse(JSON.stringify(config.students))
    config.states.random.done = []
  },
}