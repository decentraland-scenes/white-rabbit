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
import { movePlayerTo } from '@decentraland/RestrictedActions'

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

let bouncerUI: ui.FillInPrompt

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
    VJUI.background.positionX = 380

    VJUI.background.height = 650

    VJUI.addText('VJTron 2000', 0, 320, Color4.Gray(), 25)

    VJUI.addText('Make Announcement', -80, 280)

    let submittedText: string = ''
    let textBox = VJUI.addTextBox(-50, 220, 'Announcement', (e: string) => {
      submittedText = e
    })
    VJUI.addButton('Send MSG', -100, 160, () => {
      sceneMessageBus.emit('announcement', { text: submittedText })
    })

    // switches
    VJUI.addSwitch(
      'SMOKE',
      -190,
      100,
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
      },
      ui.SwitchStyles.SQUAREGREEN
    )

    let dots = VJUI.addSwitch(
      'DOTS',
      -190,
      65,
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
      },
      ui.SwitchStyles.SQUAREGREEN
    )

    VJUI.addSwitch(
      'PULSE',
      -30,
      65,
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
      30,
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
      },
      ui.SwitchStyles.SQUAREGREEN
    )

    VJUI.addSwitch(
      'ROT',
      -30,
      30,
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
      60,
      30,
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

    let fastL = VJUI.addButton('Faster', -190, -15, () => {
      sceneMessageBus.emit('action', {
        action: Action.LASERROTFAST,
        freeMode: freeMode,
      })
      laser.check()
    })
    fastL.image.width = 75
    fastL.image.height = 40
    fastL.label.fontSize = 12

    let slowL = VJUI.addButton('Slower', -60, -15, () => {
      sceneMessageBus.emit('action', {
        action: Action.LASERROTSLOW,
        freeMode: freeMode,
      })
      laser.check()
    })

    slowL.image.width = 75
    slowL.image.height = 40
    slowL.label.fontSize = 12

    let spiral = VJUI.addSwitch(
      'SPIRAL',
      -190,
      -70,
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
      },
      ui.SwitchStyles.SQUAREGREEN
    )

    let s1 = VJUI.addSwitch(
      '1',
      -40,
      -70,
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
      50,
      -70,
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
      'Jump',
      -140,
      -150,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERJUMP,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    VJUI.addButton(
      'Money',
      0,
      -150,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERMONEY,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
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

    VJUI.addButton(
      'Dance',
      -140,
      -200,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERDANCE,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    VJUI.addButton(
      'Wave',
      0,
      -200,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERWAVE,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    VJUI.addButton(
      'Hand',
      140,
      -200,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.PLAYERHAND,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
    )

    // laser fast / slow

    // player actions

    VJUI.addSwitch(
      'FREE MODE',
      -190,
      -300,
      () => {
        sceneMessageBus.emit('playshow', { show: 'free' })
      },
      () => {
        sceneMessageBus.emit('playshow', { show: 'default' })
      },
      ui.SwitchStyles.SQUARERED,
      true
    )

    VJUI.addButton(
      'Break Glass',
      100,
      -250,
      () => {
        sceneMessageBus.emit('action', {
          action: Action.GLASSBREAK,
          freeMode: freeMode,
        })
      },
      ui.ButtonStyles.RED
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

    bouncerUI = new ui.FillInPrompt(
      'Digital Bouncer',
      (e: string) => {
        sceneMessageBus.emit('kick', {
          player: e,
        })
      },
      'Kick',
      'player name',
      true
    )
    bouncerUI.hide()

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

    Input.instance.subscribe(
      'BUTTON_DOWN',
      ActionButton.SECONDARY,
      false,
      (e) => {
        if (bouncerUI) {
          if (!bouncerUI.background.visible) {
            bouncerUI.show()
          } else {
            bouncerUI.hide()
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

sceneMessageBus.on('kick', async (e) => {
  if (!userData) {
    await setUserData()
  }

  if (e.player == userData.displayName) {
    movePlayerTo({ x: 60, y: 5, z: 32 })
  }
})
