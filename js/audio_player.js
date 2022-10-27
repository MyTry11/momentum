const audio = new Audio();
let playNum = 0;

function playAudio() {
  audio.src = playList[playNum].src;
  if(!isPlay) {
    audio.play();
    isPlay = true;
    playBtn.classList.add('pause')
    playBtn.classList.remove('play')
  } else if(isPlay) {
    audio.pause()
    isPlay = false;
    playBtn.classList.add('play')
    playBtn.classList.remove('pause')
  }
}
const playListContainer = document.querySelector('.play-list')