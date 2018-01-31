
export const loginState = (state: any) => state.userLoginState
export const viewport = (state: any) => state.viewport

export const playing = (state: any) => state.playData.playing
export const fullScreen = (state: any) => state.playData.fullScreen
export const playlist = (state: any) => state.playData.playlist
export const sequenceList = (state: any) => state.playData.sequenceList
export const playMode = (state: any) => state.playData.mode
export const currentIndex = (state: any) => state.playData.currentIndex
export const currentSong = (state: any) => state.playData.playlist[state.playData.currentIndex]
export const isRadio = (state: any) => state.playData.isRadio
