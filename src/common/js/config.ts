const playMode: playmode = {
  sequence: 0,
  loop: 1,
  random: 2
}
interface playmode {
  loop: number
  sequence: number
  random: number
}
const PlayModeNameMap = {
  0: '列表播放',
  1: '单曲循环',
  2: '随机播放'
}

export { playMode, PlayModeNameMap }
