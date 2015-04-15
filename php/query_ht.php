<?
$maxDuration=$_GET["maxDuration"];
$maxHeight=$_GET["maxHeight"];

//echo "<pre>Simple check to see if connection works :-)</pre>\n"; flush();
error_reporting(E_ALL); ini_set('display_errors', true);    
extension_loaded('pgsql') || die('pgsql module unavailable');

// connect to server
  $link = pg_Connect("host=localhost port=5432 dbname=group1_2013 user=group1 password=mmkarto2013");
 
// send query to server --> counts number of elements in the response
  $numberOfTrails = pg_query($link, 'select count(*) from "scot_ht1" where time <= ' . $maxDuration .'and slope <= '. $maxHeight);
  
  if (!$numberOfTrails){
	echo "an error occured.\n";
	exit;
	}
	while($row = pg_fetch_row($numberOfTrails)){
		echo "$row[0]";
	}
?>
