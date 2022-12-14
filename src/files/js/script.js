$(document).ready(function(){
  /*
  let burger = $(".navbar-toggler");
  burger.on("click", ()=>{
    $('body').toggleClass('no-scroll');
    $('.btn-pricelist').toggleClass('show');
  })
  */
  let header = $("#header")
  let headerH = header.innerHeight();
  const $body = $("body");

 /*  Smooth scroll to sections  =============================================*/

  $("[data-scroll]").on("click", function(event){
    event.preventDefault();
    let scrollEl = $(this).data("scroll");
    let scrollElPos = $(scrollEl).offset().top;

    $("html, body").animate({
        scrollTop: scrollElPos
    }, 500)
  })



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




   /*  Modal  =============================================*/

   $("[data-modal]").on("click", function(event){
    event.preventDefault();

    let modal = $(this).data('modal');

    $(modal).addClass("show");
    $('body').addClass('no-scroll');

    setTimeout(()=>{
        $(modal).find('.modal_content').css({
            transform: 'translateY(0)',
            opacity: '1'
        });
    })
  })

  function modalClose(){
      $(".modal").each(function(){
          $(this).find(".modal_content").css({
              transform: 'translateY(-100px)',
              opacity:'0'
          });
          setTimeout(()=>{
              $(this).removeClass("show");
          }, 200)
      })
      $('body').removeClass('no-scroll');
  }

  $("[data-close]").on("click", function(){

    modalClose();

  })

  /* 
  $(".modal").on("click", function(){

      modalClose();

  })
  */

  /*
  $(".modal__content").on("click", (event)=>{
      event.stopPropagation();
  })
*/



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