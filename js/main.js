
//var windowsize =  $(window).width();

function navIconActivate(){ 
  $('.main-nav').toggleClass('active')
  $('.top').toggleClass('activeT')
  $('.bottom').toggleClass('activeB')
  $('.middle').toggleClass('activeM')
  console.log("click")
}

function removeClickFunction(){
$('.main-nav a').off()
//console.log('functionremoved') 
if ($('.main-nav').hasClass('active')){
$('.main-nav').toggleClass('active');
$('.top').toggleClass('activeT')
$('.bottom').toggleClass('activeB')
$('.middle').toggleClass('activeM')

console.log('classremoved')
}
}

var mqList = window.matchMedia( "(min-width: 770px)" );  
mqList.addListener(mediaChange);

function mediaChange(mqList){
  console.log("matches")
if (mqList.matches) {
 removeClickFunction();
 
 } else {
 console.log("small window");
 $( '#navIcon').off().click(navIconActivate)
 $( ".main-nav a" ).off().click(navIconActivate) 

 }
 smoothScroll() 
 
}

function smoothScroll(){
$(".scroll").on('click', function(event) {
 event.preventDefault();
 var hash = this.hash;     
 $('html, body').animate({
   scrollTop: $(hash).offset().top -50}, 500)        
});
}
/*
(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);

$(window).scroll(function(event) {
  
  $(".container").children().not(".stay").each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass("come-in"); 
    } 
  });
  
});
*/


  
 mediaChange(mqList);  
 


