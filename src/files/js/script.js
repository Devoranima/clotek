$(document).ready(function(){
  /*
  let burger = $(".navbar-toggler");
  burger.on("click", ()=>{
    $('body').toggleClass('no-scroll');
    $('.btn-pricelist').toggleClass('show');
  })
  */
  const $body = $("body");

  //side button opacity
  
  $(window).on("scroll", function(){
    sideButton();
  })

  function sideButton(){
    let scrollTop = $(this).scrollTop();
    let element = $("#contacts");
    let pos = element.offset().top;
    let windowH = $(window).height();
    if(scrollTop + windowH*2 / 3 >= pos){
      $(".contact_button").css({
        opacity: '0'
      });
    }
    else{
      $(".contact_button").css({
        opacity: '1'
      });
    }
  }



  //disable current page link 

  $(".nav-item a").each(
    function(index)
        {
          if(window.location.href==this.href)
            {
                $(this).addClass("disabled");
            }
        }
  );
  

 /*  Smooth scroll to sections  =============================================*/

  $("[data-scroll]").on("click", function(event){
    event.preventDefault();
    let scrollEl = $(this).data("scroll");
    let scrollElPos = $(scrollEl).offset().top;

    $("html, body").animate({
        scrollTop: scrollElPos
    }, 400)
  })



 //No-scroll on burger menu
  $(".navbar-toggler").on("click", ()=>{
    $body.toggleClass("no-scroll");
  }
  )


//Intro slider

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

    $ (modal).addClass("show");
    $('body').addClass('no-scroll');

    setTimeout(()=>{
        $(modal).find('.modal_content').css({
            transform: 'translateY(0)',
            opacity: '1'
        });
    }, 150);
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

  $("[data-close]").on("click", function(event){
    event.preventDefault();
    modalClose();

  })

  /*
  $(".modal__content").on("click", (event)=>{
      event.stopPropagation();
  })
*/


//Galleries

  lightGallery(document.getElementById('product_photos'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  });

  lightGallery(document.getElementById('under_wing__slider'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  });

  lightGallery(document.getElementById('mat_slider'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  })

  lightGallery(document.getElementById('sled_slider'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  })

  lightGallery(document.getElementById('lake_slider'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  })

  lightGallery(document.getElementById('wing_slider'), {
    animateThumb: false,  
    zoomFromOrigin: false,
    allowMediaOverlap: true,
    toggleThumb: true,
    subHtmlSelectorRelative: true,
  })

  //Product slider

  $('.product__slider').slick({
    infinite:true,
    arrows: false,
    autoplay:true,
    dots:true,
    autoplaySpeed: 2000
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


  //Mask for phone number

  $('#phone').mask('+7(000)000-00-00');
  
  $('textarea').on('input', function () {
    this.style.height = 'auto';
      
    this.style.height = (this.scrollHeight) + 'px';
  });


})