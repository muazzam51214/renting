var btn = $('#button');

$(window).scroll(function () {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});
btn.on('click', function (e) {
  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0
  }, '300');
});


$(window).on('load', function () {
  // Preloader
  $('.loader').fadeOut();
  $('.loader-mask').delay(350).fadeOut('slow');
});

// 
$(document).ready(function () {
  var owl = $('.banner-con .owl-carousel');
  owl.owlCarousel({
    margin: 70,
    nav: false,
    loop: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4500,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 1
      },
      992: {
        items: 1
      },
      1200: {
        items: 1
      },
      1440: {
        items: 1
      }
    }
  })
})

// 
$(document).ready(function () {
  var owl = $('.top-destinations-con .top-destination-con1 .owl-carousel');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4500,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1440: {
        items: 3
      }
    }
  })
})
// 
$(document).ready(function () {
  var owl = $('.travel-tour-con .owl-carousel');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4500,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1440: {
        items: 3
      }
    }
  })
})
// 
$(document).ready(function () {
  var owl = $('.review-testimonial-con .owl-carousel');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4500,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1440: {
        items: 3
      }
    }
  })
})

$(document).ready(function () {
  var owl = $('.top-destinations-con .destination-con2 .owl-carousel');
  owl.owlCarousel({
    margin: 30,
    nav: true,
    loop: true,
    dots: false,
    autoplay: false,
    autoplayTimeout: 4500,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 3
      },
      1200: {
        items: 3
      },
      1440: {
        items: 3
      }
    }
  })
})
// wow js
new WOW().init();

// 
function dynamicDropDown(listIndex) {

  document.getElementById("infants").length = 0;
  document.getElementById("children").length = 0;

  for (let i = 0; i < Number(listIndex) + 1; i++) {
    document.getElementById("infants").options[i] = new Option(i.toString(), i);
  }

  for (let i = 0; i < 9 - Number(listIndex) + 1; i++) {
    document.getElementById("children").options[i] = new Option(i.toString(), i);
  }
}

// Get the button
var backButton = document.getElementById("back-to-top-btn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backButton.style.display = "block";
  } else {
    backButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
backButton.addEventListener("click", function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});