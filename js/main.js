//scroll function using jquery
$(document).ready(function() {

  var scrollLink = $('.scroll');
  
  // Smooth scrolling
  scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({        
      scrollTop: $(this.hash).offset().top - 50
    }, 1500 );
  });
  
  // Active link switching
  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();      
    scrollLink.each(function() {           
      var sectionOffset = $(this.hash).offset().top ;        
      if ( sectionOffset <= scrollbarLocation ) {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      }      
    })      
  })

  //animations functions

 var mainNav = document.getElementById('js-menu');
 var navBarToggle = document.getElementById('js-navbar-toggle');
  

  $( "#js-navbar-toggle" ).click(function() {
    //mainNav.classList.toggle('active');
    $('#js-menu').toggleClass('active') ///solutio to refine, as in anytime you resize window the navbar is toggled, 
    //you want it to be collapsed instead
  });

  $( ".main-nav a" ).click(function() {
    //mainNav.classList.toggle('active');
    $('#js-menu').toggleClass('active') ///CHANGE TO TOGGLE HEIGHT

  });
 

  
  //add forced active off

      
  
  
  

  
  



})





  


  