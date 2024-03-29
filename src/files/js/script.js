$(document).ready(function(){
  /*
  let burger = $(".navbar-toggler");
  burger.on("click", ()=>{
    $('body').toggleClass('no-scroll');
    $('.btn-pricelist').toggleClass('show');
  })
  */
  const $body = $("body");

  document.getElementById("year").innerHTML = new Date().getFullYear();

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

  sliderIntro_image.controller.control = sliderIntro_text;
  sliderIntro_text.controller.control = sliderIntro_image;
  //sliderIntro_text.on('slideChange', ()=>{sliderIntro_image.slideNext()});



   /*  Modal  =============================================*/

  $('[data-modal ="#becomeClientModal"]').on("click", function(event){
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

  $(".modal_inner").on("click", function(event){
    event.preventDefault();
    modalClose();
  })

  $(".modal_content").on("click", (event)=>{
      event.stopPropagation();
  })



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


  //Mask for phone number and textarea

  $('.input-tel').each(function(){
    $(this).mask('+7(000)000-00-00');
  });
  
  $('textarea').on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  });


  //Jumper

  $('.form-header').hover(()=>{
    if($(window).scrollTop() == 0){
      $('.about_form').css({
        marginTop: '-60px'
      })
    }
  }, ()=>{
    $('.about_form').css({
      marginTop: '-20px'
    })
  })

  $('.form-header').on('click', ()=>{
    if($(window).scrollTop() == 0){
      let scrollElPos = $('#aboutUs').offset().top - 70;
  
      $("html, body").animate({
          scrollTop: scrollElPos
      }, 400)
    }
  })

  //Highlight

  $(".product_photo_item").click(function () {
    var src = $(this).attr("href");
    $("#main_product_image").attr("src", src);
  });


  //Form

  var canSubmit = false;

  $(".input-tel").on('input', function(){
    $(this).addClass("highlighted_input")
    canSubmit = false;
    $(".captcha").removeClass("show");
    if ($(this).val().length == 16 || $(this).val().length == 0){
      $(this).removeClass("highlighted_input")
      canSubmit = true;
      $(".wrongNumber").removeClass("show");
      if ($(this).val().length == 16) $(".captcha").addClass("show");
    }
  })

  $(".form").on("submit", function (e){
    if (canSubmit === false) {
      $(".wrongNumber").addClass("show");
      e.preventDefault();
      return;
    }
    $(".wrongNumber").removeClass("show");
    send(e);
    e.preventDefault();
  })

  function send(event){
    console.log("Sending email...");
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var req = new XMLHttpRequest();
    req.open('POST', './php/send.php', true);
    req.onload = function (){
      if (req.status >= 200 && req.status <=400){
        json = JSON.parse(this.response);

        if (json.result === "success"){
          showThanks();
        }
        else{
          alert("Sending error, try again");
        }
      }
      else{alert("Server error: " + req.status);}
    }
    req.onerror = function () {alert("Email sending error");};
    req.send(new FormData(event.target));
  }

  function showThanks(){
    $(".input").each(function(){
      $(this).val('');
    })
    let modal = $('[data-modal ="#thanksModal"]').data('modal');
    $(modal).addClass("show");
    $('body').addClass('no-scroll');

    setTimeout(()=>{
      $(modal).find('.modal_content').css({
          transform: 'translateY(0)',
          opacity: '1'
      });
    }, 150);
  }

  AOS.init({
    once: true
  });

})