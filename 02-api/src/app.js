import $ from 'jquery'
import router from 'page'
import Handlebars from 'hbsfy/runtime'

// templates
import homeTpl from './templates/home.hbs'
import drivers from './drivers/index'
import driver from './drivers/detail'
import constructors from './constructors/index'
import constructor from './constructors/detail'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'

const $app = $('#app')

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

router('/', index)
router('/drivers', drivers)
router('/driver/:id', driver)
router('/constructors', constructors)
router('/constructor/:id', constructor)
router('/contact', contact)
router('*', notFound)
router()
