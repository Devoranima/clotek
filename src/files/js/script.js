$(document).ready(function(){
  /*
  let burger = $(".navbar-toggler");
  burger.on("click", ()=>{
    $('body').toggleClass('no-scroll');
    $('.btn-pricelist').toggleClass('show');
  })
  */

 const $body = $("body");

 //No-scroll on burger menu
  $(".navbar-toggler").on("click", ()=>{
    $body.toggleClass("no-scroll");
  }
  )


  const swiper = new Swiper (".swiper", {}); 

  const sliderIntro_text = new Swiper (".swiper--intro_text", {
    loop: true,
    autoplay:{
      delay: 2000
    },
    navigator:false
  });

  const sliderIntro_image = new Swiper (".swiper--intro_images", {
    loop: true
  });

  sliderIntro_text.on('slideChange', ()=>{sliderIntro_image.slideNext()});



  //Slider reviews
  $('.slider-reviews').slick({
    navigation: false,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 1000,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    responsive:[
      {
        breakpoint: 1000,
        settings:{
          slidesToShow:3,
          infinite: true
        }
      }
    ]
  })


})