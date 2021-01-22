import * as ui from '../../node_modules/@dcl/ui-utils/index'
import { getUserData, UserData } from '@decentraland/Identity'
import { Action, runAction } from './eventScripts'
import { isPreviewMode } from '@decentraland/EnvironmentAPI'
import { shatterGlasses } from './animatedThings'

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
      -120,
      -80,
      () => {
        sceneMessageBus.emit('action', { action: Action.GLASSBREAK })
      },
      ui.ButtonStyles.RED
    )

    let smokeOf = VJUI.addCheckbox('Smoke Off', 30, -80, () => {
      sceneMessageBus.emit('action', { action: Action.SMOKESTOP })
      smokeMid.check()
      smokeFull.check()
    })

    let smokeMid = VJUI.addCheckbox('Smoke Mid', 30, -110, () => {
      sceneMessageBus.emit('action', { action: Action.SMOKEONLYBOTTOM })
      smokeOf.check()
      smokeFull.check()
    })

    let smokeFull = VJUI.addCheckbox('Smoke FUll', 30, -140, () => {
      sceneMessageBus.emit('action', { action: Action.SMOKE })
      smokeMid.uncheck()
      smokeOf.uncheck()
    })

    // VJUI.hide()

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
    runAction(e.action)
  })
}

const input = Input.instance
input.subscribe('BUTTON_DOWN', ActionButton.PRIMARY, true, (e) => {
  //uiInstruction.visible = false
  shatterGlasses()
})
