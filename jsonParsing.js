<!DOCTYPE html>
<html lang="en">
<head>
  <title>JavaScript Get Json</title>
</head>
<body>
  <script type="text/javascript">
  var xmlhttp= new XMLHttpRequest(),json;
  xmlhttp.onreadystatechange = function(){
  	if ( xmlhttp.readyState === 4 && xmlhttp.status === 200 ) {
  		
  		json = JSON.parse(xmlhttp.responseText);
  		console.log(json); 
  	}
  };
  xmlhttp.open('GET','https://github.com/waytogithub/project1/blob/json-structure/project1.html',true);
  xmlhttp.send();
  </script>
</body>
</html>

