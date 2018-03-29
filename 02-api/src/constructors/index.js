import $ from 'jquery'
import tpl from '../templates/constructors.hbs'

function process(data) {
	return data.MRData.ConstructorTable.Constructors
}

export default function constructors() {
	const $app = $('#app')

	fetch('http://ergast.com/api/f1/constructors.json')
		.then(res => res.json())
		.then(process)
		.then(data => tpl({constructors: data}))
    .then(html => $app.html(html))
    .catch(error => console.error('Constructors Error:', error))
}
