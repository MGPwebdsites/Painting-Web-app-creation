
$(function() {
var $canvas = $("canvas");
var canvas = document.getElementById('myCanvas');
var colorTile = $('#penTile').css("background-color");
var context = $canvas[0].getContext("2d");
var lastEventTest;
var mouseDown;
var pointY;
var pointX;
var dataImage;
var getFirstImage;
/***************************************************************************************************
***************************************Tile animation and organization*****************************
*****************************************************************************************************/

function tileToggle (tile , tileRange, tileForm) {
    $(tile).click(function () {
    $(tile).siblings().removeClass("clicked");//selected icon is the only one with the clicked class

/*****************************************************************************************************
*********selected icon has the clicked class and is not inside the workplace first time***********
******************************************************************************************************/
          if  ($(this).hasClass("clicked")&&
              !$("#workPlace").children().is(this)&&
               $("#workPlace").children().is(".listedIcons")) {
/******************************************************************************/

                    $("#workPlace").children().appendTo("#div-tiles");
                    $(this).appendTo("#workPlace")
                    $(tileRange).insertAfter(this)

                    if($("#workPlace").children().is(this)){
                                    $(tileRange).animate({ width: [ "toggle", "swing" ]} ,500, "linear", function() {
                                    $(tileForm).show(300);
                    })
                    $(this).removeClass("clicked");
                    }}
/*****************************************************************************************************
***************selected icon has the clicked class and is not inside the workplace***************
/****************************************************************************************************/
        else if ($(this).hasClass("clicked")&&
                   !$("#workPlace").children().is(this)) {
/****************************************************************************************************/

                    $("#workPlace").children().click();
                    $(this).appendTo("#workPlace")
                    $(tileRange).insertAfter(this)

                    if($("#workPlace").children().is(this)){
                                    $(tileRange).animate({ width: [ "toggle", "swing" ]} ,500, "linear", function() {
                                    $(tileForm).show(300);
                    })
                    $(this).removeClass("clicked");
                    }}
 /*****************************************************************************************************
 *********selected icon doesn't have the clicked class and is not inside the workplace***********
 *****************************************************************************************************/
        else if (!$(this).hasClass("clicked")&&
                    !$("#workPlace").children().is(this)) {
 /****************************************************************************************************/

                    $("#workPlace").children().click();
                    $(this).appendTo("#workPlace")
                    $(tileRange).insertAfter(this)

                    if($("#workPlace").children().is(this)){
                                    $(tileRange).animate({ width: [ "toggle", "swing" ]} ,500, "linear", function() {
                                    $(tileForm).show(300);
                    })
                    $(this).removeClass("clicked");
                    }}
/*****************************************************************************************************
**********************Second click on the element (closess the value selector)*******************
 *****************************************************************************************************/
            else {
  /****************************************************************************************************/
                    $(this).hide();
                    if($("#workPlace").children().is(this)){
                                    $(tileRange).animate({ width: [ "toggle", "swing" ]} ,500, "linear", function() {
                                    $(tileForm).hide(300);
                                    $(tile).appendTo('#div-tiles');
                                    $(tile).show(500);
                                    $(tileRange).insertAfter(tile)
                                    $(tile).addClass("clicked");
                                    $("#div-tiles").children().addClass("clicked");
                                    })
                    }

             }
        })
    }

/***************************************************************************************************
***********************************END Tile animation and organization****************************
*****************************************************************************************************/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/***************************************************************************************************
******************************************DRAW RECTANGLE*************************************
*****************************************************************************************************/


function drawRect () {
/*****************************************************************************************************
**********Storing begining values before the rect is drawn to be use during the function*********
*****************************************************************************************************/
$canvas.mousedown( function(e){

            lastEventTest = e;
            mouseDown  = true;
            pointX = e.offsetX;
            pointY = e.offsetY;
            getFirstImage = context.getImageData(0,0,canvas.width,canvas.height);

/*****************************************************************************************************
**********Storing values durin the time the rect is being drawn to be use during the function******
*****************************************************************************************************/
}).mousemove( function(e){//chain function for mousemove

            pointAftX = e.offsetX;
            pointAftY = e.offsetY;
/**********************************Draw Rect Lines***************************************************/
            if(mouseDown && $("#workPlace").children().is("#drawRect") ) {
                        context.beginPath();
                        context.moveTo(pointX, pointY);
                        context.lineTo(pointX, e.offsetY);
                        context.lineTo(e.offsetX, pointAftY);
                        context.lineTo(e.offsetX, pointY);
                        context.closePath();

                        context.putImageData(getFirstImage, 0, 0);  //get the first snapshot from canvas
                        context.stroke();                                             //begin stroke after snapshot to avoid deletion of previous pixels for
                                                                                               //dragin animation
                        context.lineCap="round";
                        context.lineWidth = $('#pen-weigth').val();
                        context.fillStyle = $('.rect').css("background-color");
                        context.strokeStyle=$('#penTile').css("background-color");
                        lastEventTest = e;
            }
}).mouseup(function(){ //ending chain function for mouseup
            if($("#workPlace").children().is("#drawRect")){
                        dataImage = getFirstImage; //getting the value from prec variable into this function
                        context.putImageData(dataImage, 0, 0); //add first snapshot from canvas
                        context.fill();                                              // fill Rect with color values from ranges
                        if($('#pen-weigth').val() >0){                     // allow no line width if width is = to 0
                        context.stroke();                                       // create rectangle
                        }
            }
            mouseDown = false;

});
};

/***************************************************************************************************
****************************************END DRAW RECTANGLE********************************
*****************************************************************************************************/


/***************************************************************************************************
*******************************************DRAW WITH PEN**************************************
*****************************************************************************************************/
function selectPen () {

$canvas.mousedown( function(e){
    lastEventTest = e;
    mouseDown  = true;
}).mousemove( function(e){


      var radius = $('#pen-weigth').val();
/*****************************************************************************************************/
    if    ( mouseDown &&
            $("#workPlace").children().is("#penTile") ||
            mouseDown &&
            $("#workPlace").children().is("#penWeigth") ) {
 /*********************************allow pen to write if weigth is less than 1******************************/
                        if($('#pen-weigth').val() === "0") {
                            context.lineWidth = "1";
                        } else {
                            context.lineWidth = radius;
                        }
  /*****************************************************************************************************/
                context.beginPath();
                context.moveTo(lastEventTest.offsetX, lastEventTest.offsetY);
                context.lineTo(e.offsetX, e.offsetY);
                context.strokeStyle = $('#penTile').css("background-color");
                context.lineCap="round";
                context.stroke();
                lastEventTest = e;
            }
    }).mouseup(function(){
    mouseDown = false;
    });
};
/***************************************************************************************************
******************************************END DRAW WITH PEN***********************************
*****************************************************************************************************/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************************
*********************************************Color Selectors functions*******************************
*****************************************************************************************************/
function changeColor () {
    var rC = $('#color-red').val();
    var gC = $('#color-green').val();
    var bC = $('#color-blue').val();
    $('#penTile').css("background-color", "rgb(" + rC + ", " + gC + ", " + bC + ")");
};

function changeSqColor () {
    var rS = $('#colorSq-red').val();
    var gS = $('#colorSq-green').val();
    var bS = $('#colorSq-blue').val();
    $('.rect').css("background-color", "rgb(" + rS + ", " + gS + ", " + bS + ")");
};


/***************************************************************************************************
********************************************END Color Selectors**********************************
*****************************************************************************************************/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/***************************************************************************************************
************************************************Pen Weigth**********************************
*****************************************************************************************************/


function changeWeigth () {

    var heigthW  = $('#pen-weigth').val();
    var widthW    = $('#pen-weigth').val();
    var marginW = 50-$('#pen-weigth').val();
    if($("#workPlace").children().is("#penTile") || $("#workPlace").children().is("#penWeigth")){

                        var penSize = $('.dotWeigth').css({
                                                 "height": "" + heigthW +"px",
                                                 "width": "" +widthW+ "px",
                                                 "margin": "" +marginW+ "%"
                        });
    }
};
/***************************************************************************************************
*********************************************END Pen Weigth**********************************
*****************************************************************************************************/

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //when attribute inside the range colors class changes it will trigger the respective function

tileToggle("#penTile", ".pen-tile-colors", ".pen-tile-colors form");//draw with pen

$(".range-colors").change( function () {
    if($("#workPlace").children().is("#penTile")=== true) {
    selectPen();
    changeColor();
    }else{}});



tileToggle("#penWeigth", ".pen-tile-weigth", ".pen-tile-weigth form");//pen weigth

$(".range-size").change( function () {
if($("#workPlace").children().is("#penWeigth")=== true) {
changeWeigth ()
} else{}});



tileToggle("#drawRect", ".rect-tile-color", ".rect-tile-color form");//Rectangle Draw

$(".rect-colors").change( function () {
if($("#workPlace").children().is("#drawRect")=== true) {
drawRect ()
changeSqColor ()
}else{}});





});


