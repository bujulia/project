<?
$month=$_GET["month"]; //month parameter

//echo "<pre>Simple check to see if connection works :-)</pre>\n"; flush();
error_reporting(E_ALL); ini_set('display_errors', true);    
extension_loaded('pgsql') || die('pgsql module unavailable');

// If you will send SQL queries as parameters please read beforehand http://en.wikipedia.org/wiki/SQL_injection !!!!!!
  $link = pg_Connect("host=db.qgiscloud.com port=5432 dbname=vhtxpp_cjncae user=vhtxpp_cjncae password=741dcb02");
 /* if(!$link){
	//echo  "Couldn't make a connection! ". pg_last_error();
	exit;
	}
  else {
	//echo 'connected to server';
	}*/

  $result = pg_query($link, 'select "Name", "Country", "Slope_Leng", st_asgeojson(wkb_geometry) as geojson from crski where ' . $month . '=1'); //wkb_geometry
  $numrows = pg_numrows($result);

  // Output Array as GeoJson
  //$resultArray = pg_fetch_all($result);
  //echo json_encode($resultArray);
  
  $geojson = array(
      'type'      => 'FeatureCollection',
      'features'  => array()
   );

   // Add edges to GeoJSON array
   while($edge=pg_fetch_assoc($result)) {

$feature = array(
         'type' => 'Feature',
         'geometry' => json_decode($edge['geojson'], true),
         'crs' => array(
            'type' => 'EPSG',
            'properties' => array('code' => '4326' )),
	'properties' => array(
	'name' => $edge['Name'],					//name
	'country' => $edge['Country'],					//country
	'slope_length' => $edge['Slope_Leng'])				//Slope Length
      );


      // Add feature array to feature collection array
      array_push($geojson['features'], $feature);
   };

//close database connectin
pg_close($link);

// Return routing result
header('Content-type: application/json',true);
echo json_encode($geojson);

?>
