<!DOCTYPE html>
<html lang="en">
<head>
  <title>JavaScript Get Json</title>
</head>
<body>
  <div id="chart-container"> render here</div> 
  <script type="text/javascript">
  var xmlhttp= new XMLHttpRequest(),json;
  xmlhttp.onreadystatechange = function(){
  	if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
  		
  	 renderChart("chart-container,'|',"500","500",JSON.parse(xmlhttp.responseText)); 
  	}
  };
  xmlhttp.open('GET','url',true);
  xmlhttp.send();
  </script>
</body>
</html>

