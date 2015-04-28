/*
	Atlas Project in Multimedia Cartography
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: H. R. Baer, hbaer@ethz.ch
	Versions:
	2015-3-2: Created
*/
//////connection to php file


L.mapbox.accessToken = 'pk.eyJ1IjoiYnVqdWxpYSIsImEiOiJpNnpsb0dFIn0.j2t-srvzbqOy3xq9QZDGIA'; //access token so that the map can be taken from mapbox online

var southWest = L.latLng(-180,-90),
	northEast = L.latLng(180,90),
	bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map', 'bujulia.basemap', {
	maxZoom: 7,
	minZoom: 2,
	scrollWheelZoom: true, // we can also zoom with mousewheel
	keyboard: true, // we can also navigate with keyboard
	keyboardPanOffset: 280, // Amount of pixels to pan when pressing an arrow key.
	keyboardZoomOffset: 1, //Number of zoom levels to change when pressing + or - key.
	// maxBounds: bounds,
	zoomControl: false
	})
    .setView([25,115], 4);
new L.Control.Zoom({position: 'topright'}).addTo(map);
	

//popup show the coordinates of the clicked point
var popup2 = L.popup();
function onMapClick(e) {
    popup2
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}
map.on('click', onMapClick);

var countryStyle = {
    "fillOpacity": 0, 
    "weight": 0.1,
    "opacity": 0.65,
	"color": '#a5a5a5'
};

//event listener for layer mouseover event
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 4,
        fillOpacity: 0,
        dashArray: '',
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
	info.update(layer.feature.properties); //Update Info about Country
}

var geojson;
//define what happens on mouseout
function resetHighlight(e) {
    geojson.resetStyle(e.target);
	info.update(); //Update Info about Country
}
//define a click listener that zooms to the country
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
	duration: 0.3;
}


function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

//add map
geojson = L.geoJson(countries, { //var countries comes from external js-file 
    style: countryStyle,
    onEachFeature: onEachFeature
}).addTo(map);


//****************************** PHP Layers *********************************
var ecoStyle = {"color": "#ffffff"}

var month = '"January"';


var tiger = new L.geoJson.ajax("php/requesttiger.php?month="+month, {"color": "#ffffff"});
var giantpanda = new L.geoJson.ajax("php/requestgiantpanda.php?month="+month);
var orangutan = new L.geoJson.ajax("php/requestorangutan.php?month="+month);
var asiaticelephant = new L.geoJson.ajax("php/requestasiaticelephant.php?month="+month);
var redpanda = new L.geoJson.ajax("php/requestredpanda.php?month="+month);
var komododragon = new L.geoJson.ajax("php/requestkomododragon.php?month="+month);

var nature = new L.geoJson.ajax("php/requestnature.php?month="+month);
var crski = new L.geoJson.ajax("php/requestcrski.php?month="+month);
var icefishing = new L.geoJson.ajax("php/requesticefishing.php?month="+month);
var golf = new L.geoJson.ajax("php/requestgolf.php?month="+month);
var surf = new L.geoJson.ajax("php/requestsurf.php?month="+month);
var ski = new L.geoJson.ajax("php/requestski.php?month="+month);
var festivals = new L.geoJson.ajax("php/requestfestivals.php?month="+month);


//***************************************	  
// Checkbox
$(document).ready(function(){
	$('input[value="tiger"]').click(function(){
      	     if($(this).prop("checked") == true){
                tiger.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(tiger);}});
	$('input[value="giantpanda"]').click(function(){
      	     if($(this).prop("checked") == true){
                giantpanda.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(giantpanda);}});
	$('input[value="orangutan"]').click(function(){
      	     if($(this).prop("checked") == true){
                orangutan.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(orangutan);}});
	$('input[value="asiaticelephant"]').click(function(){
      	     if($(this).prop("checked") == true){
                asiaticelephant.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(asiaticelephant);}});
	$('input[value="redpanda"]').click(function(){
      	     if($(this).prop("checked") == true){
                redpanda.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(redpanda);}});
	$('input[value="komododragon"]').click(function(){
      	     if($(this).prop("checked") == true){
                komododragon.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(komododragon);}});				


	$('input[value="nature"]').click(function(){
             if($(this).prop("checked") == true){
                nature.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(nature);}});


	$('input[value="ski"]').click(function(){
             if($(this).prop("checked") == true){
                ski.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(ski);}});
	$('input[value="crski"]').click(function(){
             if($(this).prop("checked") == true){
                crski.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(crski);}});
	$('input[value="icefishing"]').click(function(){
             if($(this).prop("checked") == true){
                icefishing.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(icefishing);}});

	$('input[value="golf"]').click(function(){
             if($(this).prop("checked") == true){
                golf.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(golf);}});
	$('input[value="surf"]').click(function(){
      	     if($(this).prop("checked") == true){
                surf.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(surf);}});

	$('input[value="festivals"]').click(function(){
      	     if($(this).prop("checked") == true){
                festivals.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(festivals);}});
});



// control that shows country info on hover
var info = L.control({position: 'bottomleft'});
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};
// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Country Information</h4>' +  (props ?
        '<b>' + props.name + '</b><br />Continent: ' + props.continent + ''
        : 'Hover over a country!');
};
info.addTo(map);


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


$('#imprint').button().click(function(event) {
  $('#dialog' ).dialog({ title: 'Imprint' });
  $('#dialogframe').prop('src', 'Descriptions/Imprint.html');
  event.preventDefault();
});

$('#description').button().click(function() {
  var url = $('#mapframe').prop('src').replace(/Maps\//, 'Descriptions/').replace(/\..*$/, '.html');
  $('#dialog').dialog({ title: 'Map Description' });
  $('#dialogframe').prop('src', url);
  event.preventDefault();
});

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
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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


var cities = new L.LayerGroup();
	    L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.').addTo(cities),
		L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.').addTo(cities),
		L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.').addTo(cities),
		L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.').addTo(cities);
var overlays = {
    "Cities": cities
};
L.control.layers(overlays).addTo(map);






















