import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// helper
import age from './helpers/age'

// templates
import homeTpl from './templates/home.hbs'
import playersTpl from './templates/players.hbs'
import playerTpl from './templates/player.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'

// json
import playersJson from './players.json'

Handlebars.registerHelper('age', age)

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function players() {
  $app.html(playersTpl(playersJson))
}

function player(context) {
  const slug = context.params.id
  let index = -1

  const playerFound = (slug) => {
    let i = null;
    for (i = 0; playersJson.players.length > i; i += 1) {
        if (playersJson.players[i].slug === slug) {
            index = i
            return true
        }
    }

    return false;
  }

  if(playerFound(slug)) {
    // load player template with corresponding player data
    $app.html(playerTpl(playersJson.players[index]))
  }
  else {
    // redirect to 404 page
    router.redirect('*')
  }
}

function contact() {
  $app.html(contactTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/players', players)
router('/player/:id', player)
router('/contact', contact)
router('*', notFound)
router()
