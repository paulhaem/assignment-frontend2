import $ from 'jquery'
import resource from '../util/resource'
import tpl from '../templates/drivers.hbs'

export default function drivers() {
	const $app = $('#app')

  resource('drivers')
		.then(data => tpl({drivers: data}))
    .then(html => $app.html(html))
    .catch(error => console.error('Drivers Error:', error))
}
