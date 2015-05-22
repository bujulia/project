/*
	Atlas Project in Multimedia Cartography
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: H. R. Baer, hbaer@ethz.ch
	Versions:
	2015-3-2: Created
*/

function runPrefixMethod(obj, method) {
  ['', 'webkit', 'moz', 'o', 'ms'].some(function(pf) {
    var m = pf + method.charAt(0)[pf.length ? 'toUpperCase' : 'toLowerCase']() + method.slice(1);
    if (obj[m]) {
      obj[m]();
      return true;
    }
  });
};

// Initialise width and height of window

var windowWidth = $(window).width() / 2;
var windowHeight = $(window).height() / 2;

// Imprint button

$('#imprint').button().click(function(event) {
  $('#dialog1' ).dialog({ title: 'Imprint' });
  $('#dialogframe1').prop({ height: windowHeight, width: windowWidth });
  $('#dialogframe1').prop('src', 'Descriptions/Imprint.html');
  event.preventDefault();
});

// Map Description button

$('#description').button().click(function(event) {
  $('#dialog' ).dialog({ title: 'Map Description' });
  $('#dialogframe').prop({ height: windowHeight, width: windowWidth });
  $('#dialogframe').prop('src', 'Descriptions/Description.html');
  event.preventDefault();
});

// Fullscreen button

$('#fullscreen').button().click(function(event) {
  var element = document.querySelector('body');
  runPrefixMethod(element, 'requestFullScreen');
});

//Print button

$( '#printbutton' ).button({
  icons: { primary: "ui-icon-print" }
});

// Getter

var icons = $( '#printbutton' ).button( "option", "icons" );
 
// Setter

$( '#printbutton' ).button( "option", "icons", { primary: "ui-icon-print" } );
$('#printbutton').button().click(function printIT() {
    window.print();
});
$('#createpdf').button().click(function printIT() {
    window.pdf();
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

// Flight  button

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