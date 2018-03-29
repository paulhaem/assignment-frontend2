import $ from 'jquery'
import tpl from '../templates/constructor.hbs'

function processConstructor(data) {
	return data.MRData.ConstructorTable.Constructors[0]
}

function processDrivers(data) {
	return data.MRData.DriverTable.Drivers
}

export default function detail(context) {
  const $app = $('#app')

  const constructorId = context.params.id

  const constructor = fetch(`http://ergast.com/api/f1/constructors/${constructorId}.json`)
  const drivers = fetch(`http://ergast.com/api/f1/constructors/${constructorId}/drivers.json`)

  Promise
    .all([constructor, drivers])
    .then(([constructorStream, driversStream]) => {
      return Promise.all([constructorStream.json(), driversStream.json()])
    })
    // ToDo: improve process
    .then(([constructor, drivers]) => {
      return {
        constructor: processConstructor(constructor),
        drivers: processDrivers(drivers),
      }
    })
    .then(data => tpl({constructor: data.constructor, drivers: data.drivers}))
    .then(html => $app.html(html))
    .catch(error => console.error('Constructor Detail Error:', error))
}
