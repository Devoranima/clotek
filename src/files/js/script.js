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


  //Product slider


  $('.product__slider').slick({
    infinite:true,
    arrows: false,
    autoplay:true,
    dots:true,
    autoplaySpeed: 3000
  })


  //Slider reviews
  $('.slider-reviews').slick({
    navigation: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    slidesToShow: 3,
    dots:true,
    responsive:[
      {
        breakpoint: 755,
        settings:{
          slidesToShow:2
        }
      },
      {
        breakpoint: 576,
        settings:{
          slidesToShow: 1
        }
      }
    ]
  })


})