import $ from 'jquery'
import resource from '../util/resource'
import tpl from '../templates/constructor.hbs'

export default function detail(context) {
  const $app = $('#app')

  const constructorId = context.params.id

  Promise
    .all([resource('constructors', constructorId), resource('drivers')])
    .then(([constructor, drivers]) => tpl({constructor, drivers}))
    .then(html => $app.html(html))
    .catch(error => console.error('Constructor Detail Error:', error))
}
