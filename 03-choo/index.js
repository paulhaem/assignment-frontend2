const choo = require('choo')
const html = require('choo/html')
const emoji = require('node-emoji')
const css = require('sheetify')
const model = require('./model')

const app = choo()
app.model(model)

css('bootstrap')

const styles = css`
  h1 {
    color: blue
  }
`

const mainView = (state, prev, send) => html`
  <main class=${styles}>
    <h1>Rangierbahnhof</h1>
    <hr>
    <div class="form-inline">
      <div class="form-group">
        <button onclick=${() => send('addWagonToPool')} class="btn btn-primary">Add wagon</button>
      </div>

      <div class="form-group">
        <select onchange=${(e) => send('changeTrackToX', { track: e.target.value })} class="form-control">
        ${state.tracks.map((v, idx) => {
          return html`<option ${state.currentTrack === idx ? 'selected' : ''} value="${idx}">Gleis ${idx + 1}</option>`
        })}
        </select>

        <button onclick=${() => send('moveWageonToTrackX')} class="btn btn-danger">Shunt</button>
      </div>
    </div>

    <div class="track">
      Verfügbare Züge: ${state.locomotives.map((locomotive) => emoji.get(locomotive))}
    </div>

    <div class="track">
      Verfügbare Wagons: ${state.wagons.map((wagon) => emoji.get(wagon))}
    </div>

    ${state.tracks.map((track, idx) => {
      return html`<div class="gleis">Gleis ${idx + 1}: ${track.wagons.map((wagon) => emoji.get(wagon))} <button onclick=${() => send('dispatchTrainFromTrackX', { track: idx })} class="btn btn-success">Go!</button></div>`
    })}

  </main>
`

app.router((route) => [route('/', mainView)])

const tree = app.start()
document.body.appendChild(tree)
