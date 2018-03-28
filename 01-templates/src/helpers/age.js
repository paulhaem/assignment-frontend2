import Handlebars from 'hbsfy/runtime'
import moment from 'moment'

export default function(dayOfBirth) {
  return new Handlebars.SafeString(moment().diff(dayOfBirth, 'years'))
}
