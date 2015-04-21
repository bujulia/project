/*
	Atlas Project in Multimedia Cartography
	Institute of Cartography and Geoinformation
	ETH Zurich
	Author: H. R. Baer, hbaer@ethz.ch
	Versions:
	2015-3-2: Created
*/
//////connection to php file
function doSomething() {
    $.get("php/query_ht3.php");
    return false;
}

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
	maxBounds: bounds
	})
    .setView([25,115], 4);
	
	
	
	

/* var map = L.map('map', {
    center: [25, 115],
    zoom: 4,
	maxZoom: 16,
	minZoom: 3,
	scrollWheelZoom: true, // we can also zoom with mousewheel
	keyboard: true, // we can also navigate with keyboard
	keyboardPanOffset: 280, // Amount of pixels to pan when pressing an arrow key.
	keyboardZoomOffset: 1, //Number of zoom levels to change when pressing + or - key.
}); 

// add an OpenStreetMap tile layer
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); */

/*
var circle = L.circle([51.508, -0.11], 500, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);	
*/



// popups as layers (when you need something more than attaching a popup to an object)
var popup = L.popup()
    .setLatLng([39.916667, 116.383333])
    .setContent("Beijing")
    .openOn(map);

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

// add a marker in the given location, attach some popup content to it and open the popup
//from London: var culture = L.marker([51.5, -0.09])

////////////////////////////////////////////////////////////////////////////////////GEOJSON WINTERSPORTS////////////////////////////////////////////////////////////////////
/////////The aim is that the geojson is in a database and will appear in our atlas after a request, not in the js file!	  
var ski = {
"type": "FeatureCollection",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
                                                                                
"features": [
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Mt. Naeba", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.princehotels.com\/en\/ski\/mtnaeba\/index.html", "Lifts": "16", "Height_up": "1789", "Height_dow": "900", "Height_dif": "889", "Slope_Leng": "100" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 138.78, 36.79 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Shigakogen Mountain Resort", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.princehotels.com\/en\/ski\/shigakogen\/trails.html", "Lifts": "58", "Height_up": "2307", "Height_dow": "1335", "Height_dif": "972", "Slope_Leng": "83" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 138.5, 36.7 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Niseko", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.grand-hirafu.jp\/winter\/en\/index.html", "Lifts": "29", "Height_up": "1200", "Height_dow": "300", "Height_dif": "300", "Slope_Leng": "55" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 140.69, 42.86 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Nozawa Onsen", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.nozawaski.com\/", "Lifts": "24", "Height_up": "1650", "Height_dow": "565", "Height_dif": "1085", "Slope_Leng": "54" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 138.45, 36.92 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Happo One", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.happo-one.jp\/english\/", "Lifts": "23", "Height_up": "1831", "Height_dow": "760", "Height_dif": "1071", "Slope_Leng": "52" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 137.83, 36.7 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Hakuba Iwatake", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.hakuba.jp\/iwatake\/en\/", "Lifts": "16", "Height_up": "1289", "Height_dow": "750", "Height_dif": "539", "Slope_Leng": "50" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 137.85, 36.71 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Zao Onsen", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.zao-spa.or.jp\/english\/index.html", "Lifts": "42", "Height_up": "1661", "Height_dow": "780", "Height_dif": "881", "Slope_Leng": "50" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 140.39, 38.16 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Rusutsu", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/en.rusutsu.co.jp\/", "Lifts": "18", "Height_up": "994", "Height_dow": "400", "Height_dif": "594", "Slope_Leng": "42" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 140.9, 42.74 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Centleisure Maiko", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.maiko-resort.com\/winter\/index.php", "Lifts": "11", "Height_up": "920", "Height_dow": "260", "Height_dif": "660", "Slope_Leng": "30" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 138.82, 36.98 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Japan", "Name": "Takasu", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.takasu.gr.jp\/", "Lifts": "5", "Height_up": "1550", "Height_dow": "950", "Height_dif": "600", "Slope_Leng": "24" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 136.87, 35.99 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Yabuli", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.yabuliski.cn\/", "Lifts": "6", "Height_up": "997", "Height_dow": "457", "Height_dif": "540", "Slope_Leng": "18" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.45, 44.78 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Beidhau", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.4panda.com\/special\/ski\/baidahu.htm", "Lifts": "6", "Height_up": "1359", "Height_dow": "537", "Height_dif": "822", "Slope_Leng": "7" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 126.61, 43.41 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Mongolia", "Name": "Sky Resort", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.skyresort.mn", "Lifts": "4", "Height_up": "1570", "Height_dow": "1379", "Height_dif": "191", "Slope_Leng": "6" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 106.97, 47.9 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "YongPyong", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.yongpyong.co.kr\/eng\/", "Lifts": "15", "Height_up": "1438", "Height_dow": "700", "Height_dif": "738", "Slope_Leng": "29" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.68, 37.64 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Muju Deogyusan", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.mdysresort.com\/index.asp", "Lifts": "13", "Height_up": "1614", "Height_dow": "800", "Height_dif": "814", "Slope_Leng": "24" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 127.74, 35.86 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Kangwon", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.high1.com", "Lifts": "11", "Height_up": "1267", "Height_dow": "690", "Height_dif": "677", "Slope_Leng": "21" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.61, 37.47 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "North Korea", "Name": "Masik Pass", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0, "Links": "http:\/\/koryogroup.com\/blog\/?p=2565", "Lifts": "3", "Height_up": "1360", "Height_dow": "768", "Height_dif": "592", "Slope_Leng": null }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 127.25, 39.06 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Bears Town", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.bearstown.com\/main\/main.asp", "Lifts": "9", "Height_up": "630", "Height_dow": "300", "Height_dif": "330", "Slope_Leng": "16.7" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 127.24, 37.79 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Phoenix Park", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.phoenixpark.co.kr\/", "Lifts": "10", "Height_up": "1080", "Height_dow": "680", "Height_dif": "400", "Slope_Leng": "14" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.32, 37.58 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Welli Hilli Park", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.wellihillipark.com", "Lifts": "9", "Height_up": "896", "Height_dow": "573", "Height_dif": "323", "Slope_Leng": "12.3" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.25, 37.48 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Taebaek\/O2", "January": 1, "February": 1, "March": 1, "April": 1, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.o2resort.com\/english", "Lifts": "6", "Height_up": "1420", "Height_dow": "845", "Height_dif": "575", "Slope_Leng": "11" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.94, 37.17 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "South Korea", "Name": "Alpensia", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.alpensiaresort.co.kr\/index.gdc", "Lifts": "3", "Height_up": "970", "Height_dow": "775", "Height_dif": "195", "Slope_Leng": "4.2" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 128.68, 37.66 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Changbaishan International Ski Center", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": null, "Lifts": "9", "Height_up": "1210", "Height_dow": "867", "Height_dif": "343", "Slope_Leng": "40" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 127.72, 42.05 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Wanlong", "January": 1, "February": 1, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.wlski.com", "Lifts": "5", "Height_up": "2110", "Height_dow": "1600", "Height_dif": "510", "Slope_Leng": "22" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 115.39, 40.96 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Xiling", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.xiling.cn\/syssource\/mainpage\/Enweb\/main.html", "Lifts": null, "Height_up": null, "Height_dow": null, "Height_dif": null, "Slope_Leng": "10" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 103.23, 30.7 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Duolemeidi", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/www.chinaskitours.com\/duolemeidi.html", "Lifts": "3", "Height_up": "2174", "Height_dow": "1500", "Height_dif": "674", "Slope_Leng": "9" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 115.38, 40.84 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "China", "Name": "Jundushan", "January": 1, "February": 1, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.bjski.com.cn\/", "Lifts": "7", "Height_up": "325", "Height_dow": "105", "Height_dif": "220", "Slope_Leng": "6" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 116.32, 40.23 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "India", "Name": "Kongdoori-Aferwat", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.gulmarggondola.com\/", "Lifts": "2", "Height_up": "3980", "Height_dow": "2650", "Height_dif": "1330", "Slope_Leng": "30" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 74.38, 34.04 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "India", "Name": "Auli", "January": 1, "February": 1, "March": 1, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 1, "Links": "http:\/\/gmvnl.com\/newgmvn\/", "Lifts": "3", "Height_up": "3049", "Height_dow": "2520", "Height_dif": "529", "Slope_Leng": "3" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 79.56, 30.53 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Malaysia", "Name": "Maegamall Penang", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 1, "July": 1, "August": 1, "September": 1, "October": 1, "November": 1, "December": 1, "Links": "http:\/\/web.singnet.com.sg\/~agogo\/", "Lifts": "1", "Height_up": "46", "Height_dow": "21", "Height_dif": "25", "Slope_Leng": "0.1" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 100.39, 5.37 ] ] } },
{ "type": "Feature", "properties": { "id": 0, "Category": "Ski", "Country": "Russia", "Name": "Gorny Vozdukh", "January": 1, "February": 1, "March": 1, "April": 1, "May": 1, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 1, "December": 1, "Links": "http:\/\/www.ski-gv.ru", "Lifts": "4", "Height_up": "590", "Height_dow": "100", "Height_dif": "490", "Slope_Leng": "20" }, "geometry": { "type": "MultiPoint", "coordinates": [ [ 142.78, 46.95 ] ] } }
]
}
	 
	 
var crski = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

var icefishing = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

var golf = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

var surf = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

var music = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

var wonders = {
"type": "FeatureCollection",                                                                             
"features": [
]
};

	 
	 var golficon = L.icon({
    iconUrl: 'golf.png',
    //iconRetinaUrl: 'golf.png',
    iconSize: [128, 128],
    //iconAnchor: [22, 94],
    //popupAnchor: [-3, -76],
    //shadowUrl: 'golf.png',
    //shadowRetinaUrl: 'golf.png',
    //shadowSize: [68, 95],
    //shadowAnchor: [22, 94]
});
	
$(document).ready(function(){
        $('input[type="checkbox"]').click(function(){
            if($(this).prop("checked") == true){
                L.geoJson(ski).addTo(map);
				//L.marker([ski], {icon: WintersportIcon}).addTo(map);
            }
            else if($(this).prop("checked") == false){
				L.geoJson(ski).removeFrom(map);
				//L.marker([ski], {icon: WintersportIcon}).removeFrom(map);
			}
        });
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

/*Slider-month*/
	 $(function() {
$( "#slider-month" ).slider({
range: "max",
min: 1,
max: 12,
value: 1,
slide: function( event, ui ) {
$( "#amount" ).val( ui.value );
}
});

$( "#amount" ).val( $( "#slider-month" ).slider( "value" ) );
enableZoom: true;

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






















