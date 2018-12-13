export default function() {
  const tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  const firstScriptTag = $('script:last-child')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  let players = $('.js-cards-bg-video');
  let playersArray = [];
  window.onYouTubeIframeAPIReady = ()=> {
    players.each((i,el)=>{
      let player = new YT.Player(el, {
        events: {
            'onReady': function(){
              onPlayerReady(i,el)
            }
        }
      });
      console.log(player);
      playersArray.push(player);
    });
  }
  const onPlayerReady = (i,el)=> {
    playersArray[i].mute();
    playersArray[i].hideVideoInfo()

    const parent = $(el).parents('.js-cards-bg');
    parent.hover(function(){
      playersArray[i].playVideo();
    }, function(){
      playersArray[i].pauseVideo();
    })
  }
};