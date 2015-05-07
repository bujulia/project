/*
	Atlas Project in Multimedia Cartography
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: H. R. Baer, hbaer@ethz.ch
	Versions:
	2015-3-2: Created
*/
//////connection to php file




//****************************** PHP Layers *********************************
//what i implemented: js(php-part), css (bottom), php(alles), html()



//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\DEFINE THE ICONS/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\




/*
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\LOAD THE LAYERS/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///////////// 1. Polygons ///////////////
// function for the popup window Tiger
function popUpTiger(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};

// function for the popup window Giant Panda
function popUpGiantPanda(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};
// function for the popup window Orangutan
function popUpOrangutan(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};
// function for the popup window Asiatic Elephant
function popUpAsiaticElephant(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};
// function for the popup window Red Panda
function popUpRedPanda(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};

// function for the popup window Komododragon
function popUpKomodoDragon(feature,layer){
    layer.bindPopup('<b>' + feature.properties.ECO_NAME + '</b></br><small>('+ feature.properties.AREA +')</small>');
    layer.on('mouseover', function(e){
        this.openPopup();
    });
};
*/

///////////// 2. Points ///////////////
// function for the popup window Nature-Wonders


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function runPrefixMethod(obj, method) {
  ['', 'webkit', 'moz', 'o', 'ms'].some(function(pf) {
    var m = pf + method.charAt(0)[pf.length ? 'toUpperCase' : 'toLowerCase']() + method.slice(1);
    if (obj[m]) {
      obj[m]();
      return true;
    }
  });
};

var windowWidth = $(window).width();
var windowHeight = $(window).height() / 2;

$('#imprint').button().click(function(event) {
  $('#dialog' ).dialog({ title: 'Imprint' });
  $('#dialogframe').prop({ height: windowHeight, width: windowWidth });
  $('#dialogframe').prop('src', 'Descriptions/Imprint.html');

  event.preventDefault();
});

$('#description').button().click(function(event) {
  $('#dialog' ).dialog({ title: 'Map Description' });
  $('#dialogframe').prop({ height: windowHeight, width: windowWidth });
  $('#dialogframe').prop('src', 'Descriptions/Description.html');
  event.preventDefault();
});

//$('#description').button().click(function() {
//  var url = $('#mapframe').prop('src').replace(/Maps\//, 'Descriptions/').replace(/\..*$/, '.html');
//  $('#dialog').dialog({ title: 'Map Description' });
//  $('#dialogframe').prop('src', url);
//  event.preventDefault();
//});

$('#fullscreen').button().click(function(event) {
  var element = document.querySelector('body');
  runPrefixMethod(element, 'requestFullScreen');
});
/*Print the Window*/
$('#printbutton').button().click(function printIT() {
    window.print();
});
$('#createpdf').button().click(function printIT() {
    window.pdf();
});


$('#tabs').tabs();

$('#accordion').accordion().click(function(event) {
  switch (event.target.id) {
  case 'overview':
  case 'innovative':
  case 'future':
    $('#dialog').dialog({ title: 'Not Yet' });
    $('#dialogframe').prop('src', 'Descriptions/NotYet.html');
    break;
  }
});


$('#autocomplete').autocomplete({
  source: ['Innovative Map', 'Future Map']
});

$('#menu-1,#menu-2,#menu-3').menu();

// set up an array to hold the months
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// lets be fancy for the demo and select the current month.
var activeMonth = new Date().getMonth();

$(".slider")
                    
    // activate the slider with options
    .slider({ 
        min: 0, 
        max: months.length-1, 
        value: activeMonth 
    })
                    
    // add pips with the labels set to "months"
    .slider("pips", {
        rest: "label",
        labels: months
    })
                    
    // and whenever the slider changes, lets echo out the month
    .on("slidechange", function(e,ui) {
        $("#labels-months-output").text( "You selected " + months[ui.value] + " (" + ui.value + ")");
    });



 $(function() {
var availableTags = [
"Australia",
"Bangladesh",
"Laos",
"China",
"Japan",
"North-Korea",
"South-Korea",
"Vietnam",
"Thailand",
"Singapore",
"Indonesia",
"Papa-New-guinea",
"New Zealand"
];
$( "#tags" ).autocomplete({
source: availableTags
});
});

//menu
$('#autocomplete').autocomplete({
  source: ['Innovative Map', 'Future Map']
});

$('#menu-1,#menu-2,#menu-3').menu();

//search button
$(function() {
    var availableTags = [
      
    ];
    $( "#search" ).autocomplete({
      source: availableTags
    });
  });

$(function() {
    $( "#menu" ).menu();
  });



//drop down menu with share buttons
$(function() {
  
// Dropdown toggle
$('.dropdown-toggle').button().click(function(){
  $(this).next('.dropdown').toggle();
});

$(document).click(function(e) {
  var target = e.target;
  if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
    $('.dropdown').hide();
  }
});

});
/*alert window
$( "#slider-range-max" ).mouseover(function() {
alert( "Choose your month" );
});
*/


/*Slider-range
 $(function() {
 $("#slider-range").slider({
        range: true,
        min: 1,
        max: 12,
        values: [1, 12],
        step:1
slide: function( event, ui ) {
$( "#amount-range" ).val( ui.value );
}
});
$( "#amount-range" ).val( $( "#slider-range" ).slider( "value" ) );
});*/


$('#infobutton').button().click(function(event) {
  $('#dialog-message' ).dialog({ title: 'Information', 
  
  position:  { my: 'top', at: 'top+60',  of: $('#infobutton') }
  
  });
 
});


$('#flightbutton').button().click(function() {
  $('.widget').toggle(function(e) {
        if ($(this).is(":visible")) {
            $('.widget').show();
            
        }
        else {
            $('.widget').hide(); 
            
        };
    });
});


$('#sliderbtn').button().click(function() {
  $('.slider').show();
 
  
})





















