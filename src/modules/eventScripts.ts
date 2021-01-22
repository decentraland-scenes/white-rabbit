import utils from '../../node_modules/decentraland-ecs-utils/index'
import { showPlayingFalse, showPlayingTrue } from './showPlaying'
//import { bubbleScreenController, myVideoTexture } from './modules/video'
import {
  bottomSwirl2Shape,
  bottomSwirlShape,
  shatterGlasses,
  topSwirlShape,
} from '../modules/animatedThings'

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

  // singles
  SMOKE = 'smoke',
  SMOKEONLYBOTTOM = 'smokeonlybottom',
  SMOKESTOP = 'smokestop',
  GLASSBREAK = 'glassbreak',

  VIDEOPLAY = 'videoplay',
  VIDEOSTOP = 'videostop',
  //   SIDELIGHTS3 = 'sidelights3',
  //   SIDELIGHTSOFF = 'sidelightsoff',

  //   CENTERLIGHTS1 = 'centerlights1',
  //   CENTERLIGHTS2 = 'centerlights2',
  //   CENTERLIGHTS3 = 'centerlights3',
  //   CENTERLIGHTSOFF = 'centerlightsoff',

  //   FLAMES1 = 'flames1',
  //   FLAMES2 = 'flames2',
  //   FLAMES3 = 'flames3',

  //   SPEAKERS1 = 'speakers1',
  //   SPEAKERS2 = 'speakers2',
  //   SPEAKERSOFF = 'speakersoff',

  //   ELECTRIC1 = 'electric1',
  //   ELECTRIC2 = 'electric2',
  //   ELECTRICOFF = 'electricoff',

  //   TRIANGLES1 = 'triangles1',
  //   TRIANGLES2 = 'triangles2',
  //   TRIANGLES3 = 'triangles3',
  //   TRIANGLESOFF = 'trianglesoff',

  //   FLOWER1 = 'flower1',
  //   FLOWER2 = 'flower2',
  //   FLOWER3 = 'flower3',
  //   FLOWEROFF = 'floweroff',

  //   FLARES1 = 'flares1',
  //   FLARES2 = 'flares2',
  //   FLARESOFF = 'flaresoff',

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
      topSwirlShape.visible = true
      bottomSwirlShape.visible = true
      bottomSwirl2Shape.visible = true
      break

    case Action.SMOKESTOP:
      topSwirlShape.visible = false
      bottomSwirlShape.visible = false
      bottomSwirl2Shape.visible = false
      break

    case Action.SMOKEONLYBOTTOM:
      topSwirlShape.visible = false
      bottomSwirlShape.visible = true
      bottomSwirl2Shape.visible = false
      break

    case Action.GLASSBREAK:
      shatterGlasses()
      break

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
  FREE: [],
  RAC: [],
  TEST: [],
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
        runAction(Action.STOPALL)
        showPlayingFalse()
        log('Show over!')
        this.active = false
        //engine.removeSystem(this)
      }
    }
  }
  constructor(script: show, startTime?: number) {
    RunEvents._instance = this
    this.eventScript = script
    this.currentTime = startTime ? startTime : 0
    //myVideoTexture.play()
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
}
