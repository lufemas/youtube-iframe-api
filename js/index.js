'use strict'
 const tag = document.createElement('script');

 tag.src = "https://www.youtube.com/iframe_api";
 const firstScriptTag = document.getElementsByTagName('script')[0];
 firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


 let player;
 function onYouTubeIframeAPIReady() {
  loadPlayer('mgfrrquZPEE')
 }

 function stopVideo() {
   player.stopVideo();
 }

 function loadPlayer(videoID){
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
 }


 document.getElementById('load-video-btn').addEventListener('click', (e)=>{
  player.loadVideoById(document.getElementById('video-id').value, 5, "large")
   console.log('load video')

   document.getElementById('list-grid').innerHTML = ''
   document.getElementById('list-grid').classList.remove('card')

 })

 document.getElementById('load-playlist-btn').addEventListener('click', (e)=>{
 player.loadPlaylist(
  {list:document.getElementById('playlist-id').value,
    listType:'playslist'}) 
   console.log('load playlist')

   document.getElementById('list-grid').innerHTML = ''
   document.getElementById('list-grid').classList.remove('card')

  })

 function onPlayerStateChange(){
  document.getElementById('video-title').textContent = player.getVideoData().title
  console.log(player)

  const playList = player.getPlaylist()
  if(playList){
    document.getElementById('list-grid').classList.add('card')
    playList.forEach((videoID, ind) =>{
      
      const videoItem = document.createElement('li')
      videoItem.textContent = (ind + 1)
      videoItem.className = 'jr button m-05 text-center'
      videoItem.addEventListener('click', (e)=>{
        player.loadVideoById(videoID, 5, "large")
      
       })

      document.getElementById('list-grid').appendChild(videoItem)
    })
  }

 }