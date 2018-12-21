import Player from '@vimeo/player';
import { BODY } from 'constants';


export default function() {
  const tag = document.createElement('script');
  tag.src = "//www.youtube.com/iframe_api";
  $('body').append(tag);

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
  };

  const cards = $('.js-cards-bg');
  cards.each((i,el) => {
    const that = $(el);
    const video = $('video', that)[0];
    
    if (video) {
      // canplaythrough
      $(video).on('canplay', ()=>{
        that.hover(function(){
          that.addClass('is-active');
          video.play();
        }, function(){
          video.pause();
        });
      });
    };

    const vimeo = $('.js-card-bg-vimeo', that)[0];
    if (vimeo) {
      const id = $(vimeo).data('video-id');
      var options = {
        id: id,
        width: 640,
        loop: true,
        title: false,
        background: true,
        byline: false,
        speed: false,
        portrait: false,
        fun: false,
        muted: true,
      };
      const player = new Player(vimeo, options);
      player.setVolume(0);
      that.hover(function(){
        player.play();
      }, function(){
        player.pause();
      });
    }
  });
};