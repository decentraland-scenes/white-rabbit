import { RunEvents, ShowScripts } from './eventScripts'
//import { Music } from './modules/music'

export let showPlaying: number = 0

export const sceneMessageBus = new MessageBus()

export let awsServer = 'https://genesis-plaza.s3.us-east-2.amazonaws.com/'

export function showPlayingFalse() {
  showPlaying = 0
}

export function showPlayingTrue(show?: number) {
  showPlaying = show ? show : 1
}

export class CheckServer implements ISystem {
  eventTimer: number
  totalEventTimer: number
  constructor(checkInterval: number) {
    this.eventTimer = 0
    this.totalEventTimer = checkInterval
  }
  update(dt: number) {
    if (showPlaying != 0) return

    this.eventTimer += dt

    if (this.eventTimer > this.totalEventTimer) {
      this.eventTimer = 0

      checkEventServer()
    }
  }
}

export async function checkEventServer() {
  try {
    let url = awsServer + 'event/partyevent.json'
    let response = await fetch(url).then()
    let json = await response.json()

    //log(json)

    if (json.value != 0) {
      if (json.value == 54) {
        // music = new Music(
        //   'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3'
        // )
        // music.activate()
        StartShow(3, json.time)
        showPlaying = 0
        return
      } else {
        // if (music && music.deactivate) {
        //   music.deactivate()
        // }

        StartShow(json.value, json.time)
        log('last show played ', json)
      }
    }
  } catch {
    log('error fetching from AWS server')
  }
}

//let music: Music

sceneMessageBus.on('startShow', (e) => {
  if (e.value == 0 || showPlaying == e.value) return
  showPlaying = e.value
  StartShow(e.value, e.time)
})

export function StartShow(index: number, time: number) {
  var dateObject = new Date()
  let currentTime = dateObject.getTime()

  let timeDiff = (currentTime - time) / 1000

  log('show started ', timeDiff, ' seconds ago, show playing: ', showPlaying)

  let show
  switch (index) {
    case 0:
      show = null
      return
      break
    case 1:
      show = ShowScripts.LUCY
      break
    case 2:
      show = ShowScripts.RAC
      break
    case 3:
      show = ShowScripts.TEST
      break
  }

  if (timeDiff >= show[show.length - 1].time) {
    log('show ended')
    return
  } else {
    log('starting show, ', timeDiff, ' seconds late')

    showPlayingTrue(index)
    //engine.addSystem(new RunEvents(show, timeDiff, index))
    RunEvents.createAndAddToEngine(show, timeDiff)

    //sceneMessageBus.emit('startShow', { value: index, time: time })
  }
}
