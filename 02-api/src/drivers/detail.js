import $ from 'jquery'
import tpl from '../templates/driver.hbs'

function processDriver(data) {
	return data.MRData.DriverTable.Drivers[0]
}

function processConstructors(data) {
	return data.MRData.ConstructorTable.Constructors
}

function processResults(data) {
	return data.MRData.RaceTable.Races
}

export default function detail(context) {
  const $app = $('#app')

  const driverId = context.params.id

  const driver = fetch(`http://ergast.com/api/f1/drivers/${driverId}.json`)
  const constructors = fetch(`http://ergast.com/api/f1/drivers/${driverId}/constructors.json`)
  const results = fetch(`http://ergast.com/api/f1/drivers/${driverId}/results.json`)

  Promise
    .all([driver, constructors, results])
    .then(([driverStream, constructorsStream, resultsStream]) => {
      return Promise.all([driverStream.json(), constructorsStream.json(), resultsStream.json()])
    })
    // ToDo: improve process
    .then(([driverJson, constructorsJson, resultsJson]) => {
      return Promise.all([processDriver(driverJson), processConstructors(constructorsJson), processResults(resultsJson)])
    })
    .then(([driver, constructors, results]) => tpl({driver, constructors, results}))
    .then(html => $app.html(html))
    .catch(error => console.error('Driver Detail Error:', error))
}
