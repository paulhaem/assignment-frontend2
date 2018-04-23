import capitalize from 'lodash/capitalize'
import pluralize from 'pluralize'

const BASE_URL = 'https://ergast.com/api/f1'
const tableNames = new Map([
  ['results', 'races'],
])

export default function resource(path, id = undefined) {
  const idPath = id ? `/${id}` : ''
  const url = `${BASE_URL}/${path}${idPath}.json`

	return fetch(url)
		.then(res => {
			if(res.status >= 200 && res.status < 300) {
				return res
			}
			else {
				throw new Error(res.statusText)
			}
		})
		.then(res => res.json())
		.then(data => {
      const lookupPath = lookUpTableName(path)

			const table = `${capitalize(pluralize.singular(lookupPath))}Table`
      const list = capitalize(pluralize(lookupPath))

      if(id) {
        return data.MRData[table][list][0]
      }

      return data.MRData[table][list]
		})
}

function lookUpTableName(name) {
  if(tableNames.has(name)) {
    return tableNames.get(name)
  }
  else {
    return name
  }
}
