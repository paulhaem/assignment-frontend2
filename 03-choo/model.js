const WAGON_LIMIT = 10
const TRAIN = 'steam_locomotive'
const WAGON = 'train'

module.exports = {
  state: {
    currentTrack: 0,
    locomotives: [TRAIN, TRAIN, TRAIN, TRAIN],
    wagons: [WAGON, WAGON, WAGON, WAGON, WAGON, WAGON, WAGON, WAGON],
    tracks: [
      {
        limit: 4,
        wagons: []
      },
      {
        limit: 5,
        wagons: []
      },
    ]
  },
  reducers: {
    addWagonToPool: addWagonToPool,
    changeTrackToX: changeTrackToX,
    moveWageonToTrackX: moveWageonToTrackX,
    dispatchTrainFromTrackX: dispatchTrainFromTrackX,
  }
}

// Reducers

function addWagonToPool(data, state) {
  if(state.wagons.length < WAGON_LIMIT) {
    return {
      wagons: [...state.wagons, WAGON]
    }
  }
}

function changeTrackToX(data, state) {
  return {
    currentTrack: parseInt(data.track)
  }
}

function moveWageonToTrackX(data, state) {
  if(state.wagons.length > 0 && state.tracks[state.currentTrack].wagons.length <= state.tracks[state.currentTrack].limit) {
    console.log('true')

    const newWagons = state.wagons.splice(0, state.wagons.length - 1)
    const newTracks = state.tracks

    if(state.tracks[state.currentTrack].wagons.length === 0) {
      console.log('true true')
      console.log(state.locomotives.length)
      console.log(state.tracks[0].wagons.length)

      if(state.locomotives.length > 0) {
        console.log('true true true')

        newTracks[state.currentTrack].wagons.push(TRAIN, WAGON)
        const newLocomotives = state.locomotives.splice(0, state.locomotives.length - 1)

        return {
          locomotives: newLocomotives,
          wagons: newWagons,
          tracks: newTracks
        }
      }
    } else {
      console.log('true false')

      newTracks[state.currentTrack].wagons = [...newTracks[state.currentTrack].wagons, WAGON]

      return {
        wagons: newWagons,
        tracks: newTracks
      }
    }
  }
}

function dispatchTrainFromTrackX(data, state) {
  const newTracks = state.tracks

  newTracks[data.track].wagons = []

  return {
    tracks: newTracks
  }
}
