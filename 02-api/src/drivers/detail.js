import $ from 'jquery'
import resource from '../util/resource'
import tpl from '../templates/driver.hbs'

export default function detail(context) {
  const $app = $('#app')

  const driverId = context.params.id

  Promise
    .all([resource('drivers', driverId), resource('constructors'), resource('results')])
    .then(([driver, constructors, results]) => tpl({driver, constructors, results}))
    .then(html => $app.html(html))
    .catch(error => console.error('Driver Detail Error:', error))
}
