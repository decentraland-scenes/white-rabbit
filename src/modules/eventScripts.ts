import * as utils from '@dcl/ecs-scene-utils'
import {
  checkTime,
  showPlaying,
  showPlayingFalse,
  showPlayingTrue,
} from './showPlaying'

import {
  dotLightsControl,
  laserControl,
  spiralControl,
  windowControl,
  smokeControl,
} from './effectDashboard'
import { PredefinedEmote, triggerEmote } from '@decentraland/RestrictedActions'

export enum Action {
  STOPALL = 'stopall',
  INTRO = 'intro',
  SEMIHARD = 'semihard',
  HARD = 'hard',
  NORMAL = 'normal',
  NORMAL2 = 'normal2',
  CHILL = 'chill',

  PREEPIC = 'preepic',
  PREEPIC2 = 'preepic2',
  PREEPIC3 = 'preepic3',
  PREEPIC4 = 'preepic4',
  EPIC1 = 'epic1',
  EPIC2 = 'epic2',

  PUNCHI = 'punchi',
  PUNCHI_02 = 'punchi_02',

  // singles ///////////////

  //smoke
  SMOKE = 'smoke',
  SMOKESTOP = 'smokestop',

  // glass
  GLASSBREAK = 'glassbreak',
  GLASSBREAKRANDOM = 'glassbreakrandom',

  // dots
  DOTSSHOW = 'dotsshow',
  DOTSHIDE = 'dotshide',
  DOTSPULSE = 'dotspulse',
  DOTSSTOPPULSE = 'dotsstoppulse',

  // laser
  LASERSHOW = 'lasershow',
  LASERHIDE = 'laserhide',
  LASERROT = 'laserrotate',
  LASERROTOFF = 'laserrotoff',
  LASERROTFAST = 'laserrotfast',
  LASERROTSLOW = 'laserrotslow',
  LASERPULSE = 'laserpulse',
  LASERPULSEOFF = 'laserpulseoff',

  // spiral
  SPIRALSHOW = 'spiralshow',
  SPIRALHIDE = 'spiralhide',
  SPIRAL1SHOW = 'spiral1show',
  SPIRAL1HIDE = 'spiral1hide',
  SPIRAL2SHOW = 'spiral2show',
  SPIRAL2HIDE = 'spiral2hide',

  // video
  VIDEOPLAY = 'videoplay',
  VIDEOSTOP = 'videostop',

  // player emotes
  PLAYERWAVE = 'playerwave',
  PLAYERJUMP = 'playerjump',
  PLAYERDANCE = 'playerdance',
  PLAYERHAND = 'playerhand',
  PLAYERCLAP = 'playerclap',
  PLAYERMONEY = 'playermoney',
  PLAYERKISS = 'playerkiss',

  //   BUBLES = 'bubles',
  //   VIDEOBUBLES = 'videobubles',
  //   FEWVIDOEBUBBLES = 'fewvideobubbles',
  //   BUBLESOFF = 'bublesoff',
  //   VIDEOBUBLESOFF = 'videobublesoff',

  //   RACAPPEAR = 'racappear',
  //   RACGO = 'racgo',
  //   RACBOUNCE = 'racbounce',
  //   RACCHILL = 'racchill',
  //   RACCLAP = 'racclap',
  //   RACEPIC = 'racepic',
  //   RACHORNS = 'rachorns',
  //   RACMIXING = 'racmixing',
  //   RACPLAY = 'racplay',
  //   RACDECONSTRUCTED = 'racdeconstructed',
  //   RACDECONSTRUCT = 'racdeconstruct',
  //   RACRECONSTRUCT = 'racreconstruct',
  //   RACBURST = 'racburst',
  //   RACGRAVITY = 'racgrav',
  //   RACGTEASER = 'racrgteaser',

  //   ALLFIREWORKS = 'allfireworks',
  //   RANDOMFIREWORK = 'randomfirework',
  //   CENTERFIREWORKS = 'centerfireworks',
  //   SIDEFIREWORKS = 'sidefireworks',

  //   TELEPORTS = 'teleports',
  //   NYBANNER = 'nybanner',
}

export function runAction(action: Action) {
  switch (action) {
    case Action.STOPALL:
      //   Pyrotechnics.hide()
      //   lights_center_stage.hide()
      //   lights_side_stage.hide()
      //   flame.hide()
      //   runAction(Action.SPEAKERSOFF)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLESOFF)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWEROFF)
      //   stopLiftBubbles(bubbleLiftSystem)
      //   FireConcertStage.hide()
      //   bubbleScreenController.stopRandomBubbles()
      //   bubbleScreenController.stopSpeakerBubbles()
      //   deck1.hide()
      //   deck2.hide()

      break

    case Action.INTRO:
      //   runAction(Action.CENTERLIGHTS1)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.FLAMES3)
      break

    case Action.SEMIHARD:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS1)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRIC1)
      //   runAction(Action.TRIANGLES3)
      //   runAction(Action.FLARES2)
      //   runAction(Action.FLOWEROFF)

      break

    case Action.HARD:
      //   runAction(Action.CENTERLIGHTS2)
      //   runAction(Action.SIDELIGHTS3)
      //   runAction(Action.SPEAKERS2)
      //   runAction(Action.FLAMES1)
      //   runAction(Action.ELECTRIC2)
      //   runAction(Action.TRIANGLES3)
      //   runAction(Action.FLARES2)
      //   runAction(Action.FLOWEROFF)

      break

    case Action.NORMAL:
      //   runAction(Action.CENTERLIGHTS1)
      //   runAction(Action.SIDELIGHTS1)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES2)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWER1)

      break

    case Action.NORMAL2:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERS1)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES2)
      //   runAction(Action.FLARESOFF)
      //   runAction(Action.FLOWER1)

      break

    case Action.CHILL:
      //   runAction(Action.CENTERLIGHTS3)
      //   runAction(Action.SIDELIGHTS2)
      //   runAction(Action.SPEAKERSOFF)
      //   runAction(Action.ELECTRICOFF)
      //   runAction(Action.TRIANGLES1)
      //   runAction(Action.FLARES1)
      //   runAction(Action.FLOWER1)
      break

    /// SINGLE ACTIONS

    case Action.SMOKE:
      smokeControl.startSmoke()
      break
    case Action.SMOKESTOP:
      smokeControl.stopSmoke()
      break
    // glass
    case Action.GLASSBREAK:
      windowControl.shatterGlasses()
      break
    case Action.GLASSBREAKRANDOM:
      let window = Math.floor(Math.random() * 12)
      windowControl.shatterGlass(window)
      break
    // dots
    case Action.DOTSSHOW:
      dotLightsControl.show()
      break
    case Action.DOTSHIDE:
      dotLightsControl.hide()
      break
    case Action.DOTSPULSE:
      dotLightsControl.show()
      dotLightsControl.activatePulse()
      break
    case Action.DOTSSTOPPULSE:
      dotLightsControl.show()
      dotLightsControl.deactivatePulse()
      break
    // laser
    case Action.LASERSHOW:
      laserControl.show()
      break
    case Action.LASERHIDE:
      laserControl.hide()
      break
    case Action.LASERROT:
      laserControl.show()
      laserControl.rotate(true)

      break
    case Action.LASERROTOFF:
      laserControl.show()
      laserControl.rotate(false)

      break
    case Action.LASERROTFAST:
      laserControl.show()
      laserControl.changeRotationSpeedBy(10)
      break
    case Action.LASERROTSLOW:
      laserControl.show()
      laserControl.changeRotationSpeedBy(-10)
      break
    case Action.LASERPULSE:
      laserControl.show()
      laserControl.activateFanPulse(true)
      break
    case Action.LASERPULSEOFF:
      laserControl.show()
      laserControl.activateFanPulse(false)
      break
    // spiral
    case Action.SPIRALSHOW:
      spiralControl.showAll()
      break
    case Action.SPIRALHIDE:
      spiralControl.hideAll()
      break
    case Action.SPIRAL1SHOW:
      spiralControl.showFirst()
      spiralControl.hideSecond()
      break
    case Action.SPIRAL1HIDE:
      spiralControl.hideFirst()
      break
    case Action.SPIRAL2SHOW:
      spiralControl.showSecond()
      spiralControl.hideFirst()
      break
    case Action.SPIRAL2HIDE:
      spiralControl.hideSecond()
      break

    // player emotes
    case Action.PLAYERWAVE:
      triggerEmote({ predefined: PredefinedEmote.WAVE })
      break
    case Action.PLAYERJUMP:
      triggerEmote({ predefined: PredefinedEmote.FIST_PUMP })
      break
    case Action.PLAYERDANCE:
      triggerEmote({ predefined: PredefinedEmote.ROBOT })
      break
    case Action.PLAYERHAND:
      triggerEmote({ predefined: PredefinedEmote.RAISE_HAND })
      break
    case Action.PLAYERCLAP:
      triggerEmote({ predefined: PredefinedEmote.CLAP })
      break
    case Action.PLAYERMONEY:
      triggerEmote({ predefined: PredefinedEmote.MONEY })
      break
    case Action.PLAYERKISS:
      triggerEmote({ predefined: PredefinedEmote.KISS })
      break

    //vide
    case Action.VIDEOPLAY:
      break

    case Action.VIDEOSTOP:
      break

    // case Action.SPEAKERS1:
    //   speakers.appear()
    //   speakers.playAnimation('Speaker_01')
    //   break
    // case Action.SPEAKERS1:
    //   speakers.appear()
    //   speakers.playAnimation('Speaker_02')
    //   break
    // case Action.SPEAKERSOFF:
    //   speakers.hide()
    //   break

    // case Action.RACBOUNCE:
    //   dj.playAnimation('bounce', true, 2.37)
    //   dj2.playAnimation('bounce', true, 2.37)
    //   break
    // case Action.RACCHILL:
    //   dj.playAnimation('chill', true, 6.7)
    //   dj2.playAnimation('chill', true, 6.7)
    //   break
    // case Action.RACCLAP:
    //   dj.playAnimation('clap', true, 2.87)
    //   dj2.playAnimation('clap', true, 2.87)
    //   break
    // case Action.RACEPIC:
    //   dj.playAnimation('epic', true, 5.03)
    //   dj2.playAnimation('epic', true, 5.03)
    //   break
    // case Action.RACHORNS:
    //   dj.playAnimation('horns', true, 4)
    //   dj2.playAnimation('horns', true, 4)
    //   break
    // case Action.RACMIXING:
    //   dj.playAnimation('mixing', true, 8.7)
    //   dj2.playAnimation('mixing', true, 8.7)
    //   break
    // case Action.RACPLAY:
    //   dj.playAnimation('play', true, 1.03)
    //   dj2.playAnimation('play', true, 1.03)
    //   break

    // case Action.RACDECONSTRUCT:
    //   dj.playAnimation('deconstruct', true, 1.13)
    //   dj2.playAnimation('deconstruct', true, 1.13)
    //   dj.setNewIdleAnim('burst')
    //   dj2.setNewIdleAnim('burst')
    //   break
    // case Action.RACRECONSTRUCT:
    //   dj.playAnimation('reconstruct', true, 1)
    //   dj2.playAnimation('reconstruct', true, 1)
    //   dj.setNewIdleAnim('idle')
    //   dj2.setNewIdleAnim('idle')
    //   deck1.appear()
    //   deck2.appear()
    //   break
    // case Action.RACBURST:
    //   dj.playAnimation('burst', true, 1)
    //   dj2.playAnimation('burst', true, 1)
    //   break
    // case Action.RACGRAVITY:
    //   dj.playAnimation('gravity', true, 2)
    //   dj2.playAnimation('gravity', true, 2)
    //   break
    // case Action.RACGTEASER:
    //   dj.playAnimation('gravity_teaser', true, 1)
    //   dj2.playAnimation('gravity_teaser', true, 1)
    //   break

    // case Action.RACDECONSTRUCTED:
    //   dj.appear()
    //   dj2.appear()
    //   dj.playAnimation('burst')
    //   dj2.playAnimation('burst')
    //   dj.setNewIdleAnim('burst')
    //   dj2.setNewIdleAnim('burst')
    //   break

    // case Action.RACAPPEAR:
    //   dj.appear()
    //   dj2.appear()
    //   dj.setNewIdleAnim('idle')
    //   dj2.setNewIdleAnim('idle')
    //   deck1.appear()
    //   deck2.appear()
    //   break
    // case Action.RACGO:
    //   dj.hide()
    //   dj2.hide()
    //   break

    // case Action.BUBLES:
    //   startLiftBubbles(bubbleLiftSystem)
    //   break
    // case Action.BUBLESOFF:
    //   stopLiftBubbles(bubbleLiftSystem)
    //   break
    // case Action.VIDEOBUBLES:
    //   bubbleScreenController.startRandomBubbles()
    //   bubbleScreenController.startSpeakerBubbles()

    //   break
    // case Action.VIDEOBUBLESOFF:
    //   bubbleScreenController.stopRandomBubbles()
    //   bubbleScreenController.stopSpeakerBubbles()
    //   break

    // case Action.ALLFIREWORKS:
    //   firework1.appear()
    //   firework2.appear()
    //   firework3.appear()
    //   firework4.appear()
    //   firework5.appear()
    //   firework6.appear()

    //   firework1.playAnimation('Play', true, 4.63)
    //   firework2.playAnimation('Play', true, 4.63)
    //   firework3.playAnimation('Play', true, 4.63)
    //   firework4.playAnimation('Play', true, 4.63)
    //   firework5.playAnimation('Play', true, 4.63)
    //   firework6.playAnimation('Play', true, 4.63)

    //   break

    // case Action.RANDOMFIREWORK:
    //   let i = Math.floor(Math.random() * 6)

    //   switch (i) {
    //     case 0:
    //       firework1.appear()

    //       firework1.playAnimation('Play', true, 4.63)
    //       break
    //     case 1:
    //       firework2.appear()
    //       firework2.playAnimation('Play', true, 4.63)
    //       break
    //     case 2:
    //       firework3.appear()
    //       firework3.playAnimation('Play', true, 4.63)
    //       break
    //     case 3:
    //       firework4.appear()
    //       firework4.playAnimation('Play', true, 4.63)
    //       break
    //     case 4:
    //       firework5.appear()
    //       firework5.playAnimation('Play', true, 4.63)
    //       break
    //     case 5:
    //       firework6.appear()
    //       firework6.playAnimation('Play', true, 4.63)
    //       break
    //   }
    //   break

    // case Action.CENTERFIREWORKS:
    //   firework1.appear()
    //   firework1.playAnimation('Play', true, 4.63)
    //   firework4.appear()
    //   firework4.playAnimation('Play', true, 4.63)
    //   break

    // case Action.SIDEFIREWORKS:
    //   firework2.appear()
    //   firework2.playAnimation('Play', true, 4.63)
    //   firework3.appear()
    //   firework3.playAnimation('Play', true, 4.63)
    //   firework5.appear()
    //   firework5.playAnimation('Play', true, 4.63)
    //   firework6.appear()
    //   firework6.playAnimation('Play', true, 4.63)
    //   break

    // case Action.TELEPORTS:
    //   telport1.show()
    //   telport2.show()
    //   break
    // case Action.NYBANNER:
    //   //
    //   break
  }
}

export let ShowScripts: any = {
  DEFAULT: [
    { time: 0, event: Action.SMOKESTOP },
    { time: 5, event: Action.DOTSSHOW },
    { time: 10, event: Action.SMOKE },
    { time: 20, event: Action.SMOKESTOP },
    { time: 20, event: Action.LASERSHOW },
    { time: 20, event: Action.GLASSBREAK },
    { time: 30, event: Action.LASERROT },
    { time: 30, event: Action.SPIRALSHOW },
    { time: 50, event: Action.SMOKE },
    { time: 30, event: Action.LASERPULSE },
    { time: 60, event: Action.SMOKE },
  ],
  RAC: [],
  TEST: [
    { time: 0, event: Action.SMOKESTOP },
    { time: 5, event: Action.DOTSSHOW },
    { time: 10, event: Action.SMOKE },
    { time: 20, event: Action.SMOKESTOP },
    { time: 20, event: Action.LASERSHOW },
    { time: 20, event: Action.GLASSBREAK },
    { time: 30, event: Action.LASERROT },
    { time: 30, event: Action.SPIRALSHOW },
    { time: 50, event: Action.SMOKE },
    { time: 30, event: Action.LASERPULSE },
    { time: 60, event: Action.SMOKE },
  ],
}

type scheduledEvent = {
  event: Action
  time: number
}

type show = scheduledEvent[]

export class RunEvents {
  static _instance: RunEvents | null = null
  currentTime: number
  eventScript: show
  active: boolean
  update(dt: number) {
    if (!this.active) return
    this.currentTime += dt

    if (this.currentTime >= this.eventScript[0].time) {
      runAction(this.eventScript[0].event)
      this.eventScript.shift()
      //log('coming parts ', this.eventScript)

      if (this.eventScript.length == 0) {
        log('Show over!')
        this.active = false

        if (showPlaying == 1) {
          checkTime()
        } else {
          runAction(Action.STOPALL)
          showPlayingFalse()
        }
        //engine.removeSystem(this)
      }
    }
  }
  constructor(script: show, startTime?: number) {
    RunEvents._instance = this
    this.eventScript = script
    this.currentTime = startTime ? startTime : 0
  }

  static createAndAddToEngine(script: show, startTime?: number): RunEvents {
    if (this._instance == null) {
      this._instance = new RunEvents(script, startTime)
      engine.addSystem(this._instance)
    } else {
      this._instance.eventScript = script
      this._instance.currentTime = startTime ? startTime : 0
    }
    this._instance.active = true

    log('starting show ', script)
    return this._instance
  }

  stopShow() {
    this.eventScript = []
    this.active = false
    this.currentTime = 0
    runAction(Action.STOPALL)
    log('STOPPING SHOW!')
  }
}
