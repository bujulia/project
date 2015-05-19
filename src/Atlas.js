/*
	Atlas Project in Multimedia Cartography
	Institute of Cartography and Geoinformation
	ETH Zurich
	Authors: Martin Baumann, Julia Burgermeister, Ariadni Gaki, Matteo Lehmann, Raphael Vomsattel
	Versions:
	2015-3-2: Created
*/

//var coord = JSON.parse(decodeURIComponent(document.URL.replace(/.*?\?/, '')));

L.mapbox.accessToken = 'pk.eyJ1IjoiYnVqdWxpYSIsImEiOiJpNnpsb0dFIn0.j2t-srvzbqOy3xq9QZDGIA'; //access token so that the map can be taken from mapbox online

var southWest = L.latLng(-90, -180),
    northEast = L.latLng(90, 180),
    bounds = L.latLngBounds(southWest, northEast);

var map = L.mapbox.map('map', 'bujulia.basemap', {
	maxZoom: 7,
	minZoom: 2,
	scrollWheelZoom: true, // we can also zoom with mousewheel
	keyboard: true, // we can also navigate with keyboard
	keyboardPanOffset: 280, // Amount of pixels to pan when pressing an arrow key.
	keyboardZoomOffset: 1, //Number of zoom levels to change when pressing + or - key.
	zoomControl: false,
    maxBounds: bounds,
	})
    map.setView([25,125], 4);
  //window.addEventListener('message', function(event) {
    //console.log(event.data);
    //map.setView([25,125], 4);
  //}, false);

new L.Control.Zoom({position: 'topright'}).addTo(map);

/***********************Countries GeoJSON *********************/
var geojson;

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

var countryStyle = {
    "fillOpacity": 0, 
    "weight": 0.1,
    "opacity": 0.65,
	"color": '#a5a5a5'
};
var cendroidStyle = {
    "fillOpacity": 0, 
    "weight": 0.1,
    "opacity": 0.1,
	"color": '#a5a5a5'
};


//add map
geojson = L.geoJson(countries, { //var countries comes from external js-file 
    style: countryStyle,
    onEachFeature: onEachFeature
}).addTo(map);


//****************************** PHP Layers *********************************
//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\DEFINE THE ICONS/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
//Style for polygons:
var ecoStyle = {"fillColor": "#7ae969", "fillOpacity": "0.2", "color": "#1dd300", "opacity": "0.8", "weight": "0"};

var natureIcon = L.icon({
    iconUrl: 'images/nature.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],  
});
var skiIcon = L.icon({
    iconUrl: 'images/ski.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],
});
var crskiIcon =L.icon({
    iconUrl: 'images/CRski.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],
});
var icefishingIcon = L.icon({
    iconUrl: 'images/icefish.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],
});
var golfIcon = L.icon({
    iconUrl: 'images/golf.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],
});
var surfIcon = L.icon({
    iconUrl: 'images/surf.svg',
    iconSize:     [38,95], 
    iconAnchor:   [18,67],
});
var festivalsIcon = L.icon({
    iconUrl: 'images/music.svg',
    iconSize:     [38,95], // size of the icon
    iconAnchor:   [18,67], // anchor of the icon, found by trial an error
});

var natureCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var skiCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var crskiCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var icefishingCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var golfCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var surfCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var festivalsCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});

var allCluster = new L.MarkerClusterGroup({
    showCoverageOnHover: false,
    disableClusteringAtZoom:7,
    maxClusterRadius: 80});


/*************** GLOBAL VAR for the layers with months ******************/
var ski;
var crski;
var icefishing;
var golf;
var surf;
var festivals;

// set up an array to hold the months for the slider
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// lets be fancy for the demo and select the current month.
var activeMonth = new Date().getMonth();

var month = '"'+months[activeMonth]+'"';
//console.log(month); // console log for help          
       
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
    month = '"'+months[ui.value]+'"';
            // Remove old layer and reload with new data
            skiCluster.removeLayer(ski);
            ski.clearLayers(); 
            ski = new L.geoJson.ajax("php/requestski.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:skiIcon})},onEachFeature:popUpSki});
            crskiCluster.removeLayer(crski);
            crski.clearLayers(); // remove layer from canvas
            crski = new L.geoJson.ajax("php/requestcrski.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:crskiIcon})},onEachFeature:popUpCRSki});
            icefishingCluster.removeLayer(icefishing);
            icefishing.clearLayers(); // remove layer from canvas
            icefishing = new L.geoJson.ajax("php/requesticefishing.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:icefishingIcon})},onEachFeature:popUpIceFishing});
            golfCluster.removeLayer(golf);
            golf.clearLayers(); // remove layer from canvas
            golf = new L.geoJson.ajax("php/requestgolf.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:golfIcon})},onEachFeature:popUpGolf});
            surfCluster.removeLayer(surf);
            surf.clearLayers(); // remove layer from canvas
            surf = new L.geoJson.ajax("php/requestsurf.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:surfIcon})},onEachFeature:popUpSurf});
            festivalsCluster.removeLayer(festivals);
            festivals.clearLayers();    // remove layer from canvas
            festivals = new L.geoJson.ajax("php/requestfestivals.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:festivalsIcon})},onEachFeature:popUpFestivals});
            
            ski .on('data:loaded', function(){
                skiCluster.addLayer(ski);
            }
            );

            crski .on('data:loaded', function(){
                crskiCluster.addLayer(crski);
            }
            );

            icefishing .on('data:loaded', function(){
                icefishingCluster.addLayer(icefishing);
            }
            );

            golf .on('data:loaded', function(){
                golfCluster.addLayer(golf);
            }
            );

            surf .on('data:loaded', function(){
                surfCluster.addLayer(surf);
            }
            );

            festivals .on('data:loaded', function(){
                festivalsCluster.addLayer(festivals);
            }
            );


            // You need to add the new layers to the map
                if($('input[value=ski]').prop("checked")){
                    skiCluster.addTo(map)
                    }
                if($('input[value=crski]').prop("checked")){
                    crskiCluster.addTo(map)
                    }
                if($('input[value=icefishing]').prop("checked")){
                    icefishingCluster.addTo(map)
                    }
                if($('input[value=surf]').prop("checked")){
                    surfCluster.addTo(map)
                    }
                if($('input[value=golf]').prop("checked")){
                    golfCluster.addTo(map)
                    }
                if($('input[value=festivals]').prop("checked")){
                    festivalsCluster.addTo(map)
                    }
    });


//\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\LOAD THE LAYERS/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
///////////// Popups for Points ///////////////
// function for the popup window Nature-Wonders
function popUpNature(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country + ')</br> Type: '
	+ feature.properties.description +'</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup();
    });
}; 
// function for the popup window Ski
function popUpSki(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +') </br> Number of lifts: '
	+ feature.properties.lifts + '</br>Height difference: '
	+ feature.properties.height_dif + '</br>Slope Length: '
	+ feature.properties.slope_leng + '</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup();
    });
};
// function for the popup window CRSki
function popUpCRSki(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +')</br>Slope length: '
	+ feature.properties.slope_length + '</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup();
    });
};
// function for the popup window IceFishing
function popUpIceFishing(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +')</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup();
    });
};
// function for the popup window Golf
function popUpGolf(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +') </br> Number of holes: '
	+ feature.properties.holes + '</br>Length of course / Par: '
	+ feature.properties.length + ' [m] / ' + feature.properties.par + '</br>Terrain: '
	+ feature.properties.terrain + '</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup(	);
    });
};
// function for the popup window Surf
function popUpSurf(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +') </br> Type: '
	+ feature.properties.typ + '</br> Difficulty: '
	+ feature.properties.experience + '</small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
	this.openPopup();         
    });
};
// function for the popup window Festivals
function popUpFestivals(feature,layer){
    layer.bindPopup('<b>' + feature.properties.name + '</b></br><small>('+ feature.properties.country +') </br> Number of bands: '
	+ feature.properties.bands + '</br>Estimated attendance: '
	+ feature.properties.attendance + ' visitors</br>' + feature.properties.musictype + '</br> <a href ='+ feature.properties.youtube+'> Link to Video </a> </small>',{offset: new L.Point(0,-33)});
    layer.on('click', function(e){
        this.openPopup();
    });
};

/////////////Polygons///////////////
var tiger = new L.geoJson.ajax("php/requesttiger.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Tiger");}});
var giantpanda = new L.geoJson.ajax("php/requestgiantpanda.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Giant Panda");}});
var orangutan = new L.geoJson.ajax("php/requestorangutan.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Orangutan");}});
var asiaticelephant = new L.geoJson.ajax("php/requestasiaticelephant.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Asiatic Elephant");}});
var redpanda = new L.geoJson.ajax("php/requestredpanda.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Red Panda");}});
var komododragon = new L.geoJson.ajax("php/requestkomododragon.php?", {style:ecoStyle, onEachFeature: function (feature,layer){layer.bindPopup("Komodo Dragon");}});

/////////////Points///////////////
var nature = new L.geoJson.ajax("php/requestnature.php?",{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:natureIcon})},onEachFeature:popUpNature});
ski = new L.geoJson.ajax("php/requestski.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:skiIcon})},onEachFeature:popUpSki});
crski = new L.geoJson.ajax("php/requestcrski.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:CRskiIcon})},onEachFeature:popUpCRSki});
icefishing = new L.geoJson.ajax("php/requesticefishing.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:icefishingIcon})},onEachFeature:popUpIceFishing});
golf = new L.geoJson.ajax("php/requestgolf.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:golfIcon})},onEachFeature:popUpGolf});
surf = new L.geoJson.ajax("php/requestsurf.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:surfIcon})},onEachFeature:popUpSurf});
festivals = new L.geoJson.ajax("php/requestfestivals.php?month="+month,{pointToLayer: function(feature,latlng){return L.marker(latlng,{icon:festivalsIcon})},onEachFeature:popUpFestivals});

///////////////CLusters///////////////
nature .on('data:loaded', function(){
    natureCluster.addLayer(nature);
}
);

ski .on('data:loaded', function(){
    skiCluster.addLayer(ski);
}
);

crski .on('data:loaded', function(){
    crskiCluster.addLayer(crski);
}
);

icefishing .on('data:loaded', function(){
    icefishingCluster.addLayer(icefishing);
}
);

golf .on('data:loaded', function(){
    golfCluster.addLayer(golf);
}
);

surf .on('data:loaded', function(){
    surfCluster.addLayer(surf);
}
);

festivals .on('data:loaded', function(){
    festivalsCluster.addLayer(festivals);
}
);
	 
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
                natureCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(natureCluster);}});


	$('input[value="ski"]').click(function(){
             if($(this).prop("checked") == true){
                skiCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(skiCluster);}});
	
    $('input[value="crski"]').click(function(){
             if($(this).prop("checked") == true){
                crskiCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(crskiCluster);}});
	
    $('input[value="icefishing"]').click(function(){
             if($(this).prop("checked") == true){
                icefishingCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(icefishingCluster);}});

	$('input[value="golf"]').click(function(){
             if($(this).prop("checked") == true){
                golfCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(golfCluster);}});
	
    $('input[value="surf"]').click(function(){
      	     if($(this).prop("checked") == true){
                surfCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(surfCluster);}});

	$('input[value="festivals"]').click(function(){
      	     if($(this).prop("checked") == true){
                festivalsCluster.addTo(map);}
	else if ($(this).prop("checked") == false){
		map.removeLayer(festivalsCluster);}});
});



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


$('#fullscreen').button().click(function(event) {
  var element = document.querySelector('body');
  runPrefixMethod(element, 'requestFullScreen');
});
/*Print the Window*/
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



$( '#infobutton' ).button({
  icons: { primary: "ui-icon-info" }
});

// Getter
var icons = $( '#infobutton' ).button( "option", "icons" );
 
// Setter
$( '#infobutton' ).button( "option", "icons", { primary: "ui-icon-info" } );


$('#infobutton').button().click(function(event) {
  $('#dialog-message' ).dialog({ title: 'Information', 
  position:  { my: 'right top', at: 'top+60',  of: $('#infobutton') }
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
  $('.slider').toggle("drop", { direction: "down" }, 100);
})


	$('.sliderbutton').click(function(){
		var $this = $(this);
		$this.toggleClass('sliderbutton');
		if($this.hasClass('sliderbutton')){
			$this.text('Select your favorite month!');			
		} else {
			$this.text('Hide');
		}
	});

$(function() {
	$( "#nature" ).accordion({collapsible:true,  heightStyle: 'content'});
    $( "#culture" ).accordion({collapsible:true,  heightStyle: 'content'});
    $( "#activities" ).accordion({collapsible:true,  heightStyle: 'content'});
    $( "#submenu3" ).accordion({collapsible:true, active: false, heightStyle: 'content'});
     
   
  });


$("#animals").click(function(){
		$("#animals1").slideToggle();
		$("#animals2").slideToggle();
		$("#animals3").slideToggle();
		$("#animals4").slideToggle();
		$("#animals5").slideToggle();
		$("#animals6").slideToggle();
		
	});


$("#wonders").click(function(){
		$("#wonders1").slideToggle();
		
		
	});


$("#winter").click(function(){
		$("#ski").slideToggle();
		$("#cross").slideToggle();
		$("#ice").slideToggle();
		
		
	});


$("#summer").click(function(){
		$("#golf").slideToggle();
		$("#surf").slideToggle();
		
		
	});



/***********************Points GeoJSON *********************/
//add map
var cendroidLayer = L.geoJson(cendroids, {
    pointToLayer: function(feature, latlng) {
        return new L.circleMarker(latlng, {
            opacity: 0,
            fillOpacity: 0
        })
    }
}).addTo(map);

var searchControl = new L.Control.Search({layer: cendroidLayer, propertyName: "name", circleLocation:true, position:"topright"});

map.addControl( searchControl );


