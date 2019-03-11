

function assignStyle() {  
  let pickedColour = pickColour()
  assignColour(pickedColour, class1, class2, class3,class4,class5);
  rotateDiv(class1,  class2, class3, class4, class5);
  //rotateDiv2(class1)
}

///pick random colour on hsl wheel  
const pickColour = function(){  
  const c = {
    h : Math.floor(Math.random() * 280),
    s : 70,
    l : 30,
    a : 1
  }
    return c;
  }
  

// assign variables
let class1 = document.getElementsByClassName("one")
let class2 = document.getElementsByClassName("two")
let class3 = document.getElementsByClassName("three")
let class4 = document.getElementsByClassName("four")
let class5 = document.getElementsByClassName("five")
let class6 = document.getElementsByClassName("activeB")

console.log(class1)
//assign shades of colour to arbitrary elements selected by class
const assignColour = function(c, _class1, _class2, _class3, _class4, _class5){
   let colour1 = "hsl(" + c.h + "," + c.s + "%," + c.l + "%," + c.a + ")"
  //$("#quote").css("background-color", colour1);
  let colour2 = "hsl(" + parseInt(c.h+30) + "," + c.s + "%," + c.l + "%," + c.a + ")"
 // $("#buttons").css("background-color", colour2);
  let colour3 = "hsl(" + parseInt(c.h+40) + "," + c.s + "%," + c.l + "%," + c.a + ")"

  let colour4 = "hsl(" + parseInt(c.h+60) + "," + c.s + "%," + c.l + "%," + c.a + ")"
 // $("#buttons").css("background-color", colour2);
  let colour5 = "hsl(" + parseInt(c.h+80) + "," + c.s + "%," + c.l + "%," + c.a + ")"
  $(_class1).css("background-color", colour1);
  $(_class2).css("background-color", colour2);
  $(_class3).css("background-color", colour3);
  $(_class4).css("background-color", colour4);
  $(_class5).css("background-color", colour5);  

  console.log(_class1)
}

//from mozdev documentation
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const rotateDiv = function(_class1,_class2,_class3,_class4,_class5){
  let degrees1 = Math.random() * 360
  let displacementX1 = getRandomArbitrary(0,20)
  let displacementY1 = getRandomArbitrary(30,100)

  let degrees2 = Math.random() * 360
  let displacementX2 = getRandomArbitrary(0,20)
  let displacementY2 = getRandomArbitrary(30,100)

  let degrees3 = Math.random() * 360
  let displacementX3 = getRandomArbitrary(0,20)
  let displacementY3 = getRandomArbitrary(30,100)

  let degrees4 = Math.random() * 360
  let displacementX4 = getRandomArbitrary(0,20)
  let displacementY4 = getRandomArbitrary(30,100)

  let degrees5 = Math.random() * 360
  let displacementX5 = getRandomArbitrary(0,20)
  let displacementY5 = getRandomArbitrary(30,100)

  $(_class1).css({"transform": 'rotateZ(' + degrees1 + 'deg)' } );
  $(_class1).css({"transform": 'translateX(' + displacementX1 + ')' } );
  $(_class1).css({"height":  displacementY1 + 'px' } );

  $(_class1).css({"margin": + displacementX1  } );
  $(_class1).css({"width": + displacementY1  } );


  $(_class2).css({"transform": 'rotateZ(' + degrees2 + 'deg)' } );
  $(_class2).css({"transform": 'translateY(' + displacementX2 + ')' } );
  //$(_class2).css({"transform": 'translateY(' + displacementY2 + ')' } );

  $(_class2).css({"margin": + displacementY2  } );

  $(_class3).css({"transform": 'rotateZ(' + degrees3 + 'deg)' } );
  $(_class3).css({"transform": 'translateX(' + displacementX3 + ')' } );
  //$(_class3).css({"transform": 'translateY(' + displacementY3 + ')' } );

  $(_class3).css({"margin": + displacementY3  } );

  $(_class4).css({"transform": 'rotateZ(' + degrees4 + 'deg)' } );
  $(_class4).css({"transform": 'translateX(' + displacementX4 + ')' } );
  //$(_class4).css({"transform": 'translateY(' + displacementY4 + ')' } );

  $(_class4).css({"margin": + displacementY4  } );

  $(_class5).css({"transform": 'rotateZ(' + degrees5 + 'deg)' } );
  $(_class5).css({"transform": 'translateX(' + displacementX5 + ')' } );
  //$(_class5).css({"transform": 'translateY(' + displacementY5 + ')' } );

  $(_class5).css({"margin": + displacementY5  } );


}

const rotateDiv2 = function(_class1){
  let degrees1 = Math.random() * 360

_class1[0].setAttribute("transform", "rotateZ:" + degrees1 +"deg;");

}




/*
const toggleAnimation{
      $('#quote').css("animation-play-state", "#000000");

}*/




// Add event listener to table
var el = document.getElementById("test");
el.addEventListener("click", assignStyle, false);


//assigning displacement on x and y