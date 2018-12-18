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
            onPlayerReady(i,el);
          },
          'onStateChange': function(obj){
            if (obj.data === 1 && !$(el).hasClass('is-active')) {
              $(el).addClass('is-active');
              playersArray[i].pauseVideo();
            }
          }
        }
      });
      playersArray.push(player);
    });
  }
  const onPlayerReady = (i,el)=> {
    playersArray[i].mute();
    playersArray[i].playVideo();
    playersArray[i].hideVideoInfo();

    const parent = $(el).parents('.js-cards-bg');
    parent.hover(function(){
      parent.addClass('is-active');
      playersArray[i].playVideo();
    }, function(){
      playersArray[i].pauseVideo();
    });
  }
};