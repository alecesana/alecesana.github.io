
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


  
 mediaChange(mqList);  
 


