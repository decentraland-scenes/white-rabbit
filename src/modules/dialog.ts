import { Dialog } from '../../node_modules/@dcl/npc-utils/index'
import { elf1 } from '../game'

export let elf1Intro: Dialog[] = [
  {
    text: `Hey there little buddy!`,
    triggeredByNext: () => {
      elf1.playAnimation(`Talk`, true, 4)
    },
  },
  {
    text: `Feels weird to be so tiny, doesn't it? Quite a different perspective.`,
    triggeredByNext: () => {
      elf1.playAnimation(`Talk`, true, 4)
    },
  },

  {
    text: `Oh sorry, I almost step on you... you don't want to have your bones crushed by a giant like me.`,
    triggeredByNext: () => {
      elf1.playAnimation(`Talk`, true, 4)
    },
    isEndOfDialog: true,
  },
]
