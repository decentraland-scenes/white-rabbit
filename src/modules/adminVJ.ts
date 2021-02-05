import * as ui from '@dcl/ui-scene-utils'
import { getUserData, UserData } from '@decentraland/Identity'
import { Action, runAction } from './eventScripts'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'

import {
  checkEventServer,
  checkTime,
  freeMode,
  setFreeMode,
  showPlayingFalse,
  StartShow,
} from './showPlaying'

export let userData: UserData

export async function fetchUserData() {
  const data = await getUserData()
  log(data.displayName)
  return data
}

export async function setUserData() {
  const data = await getUserData()
  log(data.displayName)
  userData = data
}

export let whiteListedIds = ['NicoE', 'Crench#22cb']

export const sceneMessageBus = new MessageBus()

let VJUI: ui.CustomPrompt

export async function initiateVJUI() {
  if (!userData) {
    await setUserData()
  }

  let authorized = false

  if (await isPreviewMode()) {
    authorized = true
  } else {
    for (let id of whiteListedIds) {
      if (userData && id == userData.displayName) {
        authorized = true
        break
      }
    }
  }

  if (authorized) {
    VJUI = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, null, null, true)
    VJUI.background.positionX = 200

    VJUI.addText('VJTron 2000', 0, 170, Color4.Gray(), 25)

    VJUI.addText('Make Announcement', -80, 140)

    let submittedText: string = ''
    let textBox = VJUI.addTextBox(-50, 80, 'Announcement', (e: string) => {
      submittedText = e
    })
    VJUI.addButton('Send MSG', -100, 20, () => {
      sceneMessageBus.emit('announcement', { text: submittedText })
    })

    VJUI.addButton(
      'Break Glass',
      100,
      20,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.GLASSBREAK,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    // switches
    VJUI.addSwitch(
      'SMOKE',
      -190,
      -40,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SMOKE,
          freeMode: freeMode,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SMOKESTOP,
          freeMode: freeMode,
        })
      }
    )

    let dots = VJUI.addSwitch(
      'DOTS',
      -190,
      -75,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.DOTSSHOW,
          freeMode: freeMode,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.DOTSHIDE,
          freeMode: freeMode,
        })
      }
    )

    VJUI.addSwitch(
      'PULSE',
      -60,
      -75,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.DOTSPULSE,
          freeMode: freeMode,
        })
        dots.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.DOTSSTOPPULSE,
          freeMode: freeMode,
        })
      }
    )

    let laser = VJUI.addSwitch(
      'LASER',
      -190,
      -110,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERSHOW,
          freeMode: freeMode,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERHIDE,
          freeMode: freeMode,
        })
      }
    )

    VJUI.addSwitch(
      'ROT',
      -60,
      -110,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERROT,
          freeMode: freeMode,
        })
        laser.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERROTOFF,
          freeMode: freeMode,
        })
      }
    )

    VJUI.addSwitch(
      'PULSE',
      0,
      -110,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERPULSE,
          freeMode: freeMode,
        })
        laser.check()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.LASERPULSEOFF,
          freeMode: freeMode,
        })
      }
    )

    let spiral = VJUI.addSwitch(
      'SPIRAL',
      -190,
      -145,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRALSHOW,
          freeMode: freeMode,
        })
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRALHIDE,
          freeMode: freeMode,
        })
        s1.uncheck()
        s2.uncheck()
      }
    )

    let s1 = VJUI.addSwitch(
      '1',
      -100,
      -145,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRAL1SHOW,
          freeMode: freeMode,
        })

        s2.uncheck()
        spiral.uncheck()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRAL1HIDE,
          freeMode: freeMode,
        })
      }
    )

    let s2 = VJUI.addSwitch(
      '2',
      -0,
      -145,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRAL2SHOW,
          freeMode: freeMode,
        })
        s1.uncheck()
        spiral.uncheck()
      },
      () => {
        sceneMessageBus.emit('action', {
          action: Action.SPIRAL2HIDE,
          freeMode: freeMode,
        })
      }
    )

    VJUI.addButton(
      'Clap',
      140,
      -150,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERCLAP,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    // laser fast / slow

    // player actions

    VJUI.addSwitch(
      'FREE MODE',
      70,
      125,
      () => {
        sceneMessageBus.emit('playshow', { show: 'free' })
      },
      () => {
        sceneMessageBus.emit('playshow', { show: 'default' })
      },
      ui.SwitchStyles.SQUARERED,
      true
    )

    // VJUI.addButton('DEFAULT SHOW', -130, -60, () => {
    //   sceneMessageBus.emit('playshow', { show: 'default' })
    // })

    // VJUI.addButton('FROM SERVER', -150, -70, () => {
    //   sceneMessageBus.emit('playshow', { show: 'server' })
    // })

    // VJUI.addButton('SHOW 2', -150, -100, () => {
    //   sceneMessageBus.emit('playshow', { show: 2 })
    // })

    // VJUI.addButton('FREE MODE', -130, -130, () => {
    //   sceneMessageBus.emit('playshow', { show: 'free' })
    // })

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.PRIMARY,
      false,
      (e) => {
        if (VJUI) {
          if (!VJUI.background.visible) {
            VJUI.show()
          } else {
            VJUI.hide()
          }
        }
      }
    )
  }

  sceneMessageBus.on('announcement', (e) => {
    ui.displayAnnouncement(e.text)
  })

  sceneMessageBus.on('action', (e) => {
    if (e.freeMode) {
      setFreeMode()
    }
    runAction(e.action)
  })

  sceneMessageBus.on('playshow', (e) => {
    if (e.show == 'default') {
      checkTime()
    } else if (e.show == 'free') {
      setFreeMode()
    } else if (e.show == 2) {
      StartShow(2, Date.now())
    } else if (e.show == 'server') {
      checkEventServer()
    }
  })
}
