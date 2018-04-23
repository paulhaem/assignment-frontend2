import $ from 'jquery'
import resource from '../util/resource'
import tpl from '../templates/constructors.hbs'

export default function constructors() {
	const $app = $('#app')

  resource('constructors')
		.then(data => tpl({constructors: data}))
    .then(html => $app.html(html))
    .catch(error => console.error('Constructors Error:', error))
}
