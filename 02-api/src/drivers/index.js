import $ from 'jquery'
import tpl from '../templates/drivers.hbs'

function process(data) {
	return data.MRData.DriverTable.Drivers
}

export default function drivers() {
	const $app = $('#app')

	fetch('http://ergast.com/api/f1/drivers.json')
		.then(res => res.json())
		.then(process)
		.then(data => tpl({drivers: data}))
    .then(html => $app.html(html))
    .catch(error => console.error('Drivers Error:', error))
}
