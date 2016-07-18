function renderChart(divid,width,height,chartdata) {
    this.chartdata = chartdata;
    this.yaxisticks = 6;
    this.xaxisticks = 5;
    this.width = width;
    this.height = height;
    console.log(chartdata);
    this.createLimit();
        
    };
    
this.calculateMaxMin =function(obj){
        
        var noOfGraphs = (obj.chart.yaxisname).length,
        noOfIteration=((obj.data).length),j;
        var maxminobj={};
        
        var max,min;
        for(var i=0;i<noOfGraphs;i++){
            min = obj.data[0].value[i];max=min;
            j= 1;
             while(j<noOfIteration){
                 if((obj.data[j].value[i])>max){ max =obj.data[j].value[i]}
                 if((obj.data[j].value[i])<min){ min =obj.data[j].value[i]}
                 j++;
             }
             maxminobj[i] = {"max": max,"min": min}; 
             
        }
         return maxminobj;  
};

this.createLimit=function(){
    var limits;
    for(var i=0;i<noOfGraphs;i++){
       var max=maxmin[i].max;
       var min=maxmin[i].min;  
       var maxVal=max.toString();
       var minVal=min.toString();
    limits=getlimits(maxVal,minVal);
     maxVal=limits[0],minval=limits[1];
     xaxisticks=(chartdata.data.label).length;
     scaling(5,5,maxVal,minVal,i);
      }
  };

   
  
this.getlimits= function(ulimit,llimit){
                  var ullength=ulimit.length;
                  var lllength=llimit.length;
                  if((ulimit%1)==0){
                  ulimit=ulimit.substr(0,1);
                  ulimit=(parseInt(ulimit)+1).toString();
                  ulimit=this.placeZero(ulimit,ullength,1);
                  }
                  else
                  {   
                      var cntZero=0;
                      var str=ulimit.split(".")[1];
                      var str1=str[0];
                      var str2=str[1];
                      for(var i=0;i<str[2].length;i++){
                         if(str[i]=='0')
                         cntZero++;
                      }
                       cntZero++;
                       ulimit = str[2].replace(/^0+/, '');
                       ulimit = ulimit.substr(0,1);
                       ulimit = (parseInt(ulimit)+1).toString();
                       ulimit=placeZero(ulimit,cntZero,1);
                       ulimit=str[0].concat(ulimit);
                      }
                   if((llimit%1)==0){
                   llimit=llimit.substr(0,1);
                   llimit=placeZero(llimit,lllength,1);
                   }
                   else{
                   cntZero=0;       
                   var str=llimit.split(".")[1];
                   var str1=str[0];
                   var str2=str[1];
                   for(var k=0;k<llength;k++){
                       if(str[k]=='0')
                       cntZero++;
                   }
                   cntZero++;
                   llimit=str[2].replace(/^0+/,'');
                   llimit=llimit.substr(0,1);
                   llimit=placeZero(llimit,cntZero,0);
                   llimit=str[0].concat(llimit);
                   }
                    
             return [ulimit,llimit];
};


this.placezeros= function(data,count,flag){
        if(flag==0){
            while (data.length < count) {
             data = '0'+data;
            }
            return "0."+data;
        }else{
            while (data.length < count) {
             data =  data+'0';
            }
            return data;
        }
};

};
this.scaling= function(xaxisticks,yaxisticks,newmax,newmin,index){
        var svgHeight = (this.height);
        var svgWidth = (this.width);
        var chartHeight=svgHeight-100;
        var chartWidth=svgWidth-100;
        var divisionX = (chartWidth) / xaxisticks;
        var divisiony = (chartHeight) / yaxisticks;
        var ratio = chartHeight/(newmax-newmin); 
        var coordString="",ycord,xcord,marginxy = 50;
        var tickX,tickY,textColor="#000",fontSize=17;
        var i = 1;
        for(var k in this.chartdata.data){
                xcord= (divisionX*(parseInt(k)+1))+marginxy;
                ycord = (chartHeight - ((this.chartdata.dataset[k].data[el]-newmin)*ratio))+marginxy;
                coordString += xcord+","+ycord+" ";i++;
        }
         var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute('width', svgWidth);
                svg.setAttribute('height', svgHeight);
                svg.setAttribute("style"," margin:20px;");
                var url = "http://www.w3.org/2000/svg";
         //Drawing Axes  
        this.createLine(url,svg,marginxy,chartHeight+marginxy,chartWidth+marginxy,chartHeight+marginxy);
        this.createLine(url,svg,marginxy,marginxy,marginxy,chartHeight+marginxy);
        this.createPoly(url,svg,dataset);
         var coordinates = coordString.split(" "),xy;
                for(i = 0;i<(coordinates.length-1);i++){               
                    xy = coordinates[i].split(","); 
                    this.createCirles(url,svg,xy[0],xy[1],4);
        }
        //xaxisticks
        for(var i=0;i<xaxisticks;i++){
                    tickX = parseInt(divisionX)*(i+1)+marginxy;
                    this.createLines(url,svg,tickX,(chartHeight+marginxy+25),tickX,(chartHeight+marginxy+15),"stroke:#000000");
                    var text =this.chartdata.data[i].label;
                    this.createText(url,svg,(tickX),(chartHeight+marginxy+45),text);
        }
        //yaxisticks
        for(var i=0;i<yaxisticks;i++){
                    tickY =chartHeight-((parseInt(divisiony)*i)+newmin))+marginxy;
                    this.createLines(url,svg,tickY,(chartHeight+marginxy),tickY,(chartHeight+marginxy-15));
                    var text=this.chartdata.data[i].value[i];
                    this.createText(url,svg,(tickY),(chartHeight+marginxy+20),text);                    
         }
                
        };
         

    this.createLines = function(url,svg,x1,y1,x2,y2,styleStr){
        var lineXY = document.createElementNS(url, "line");
            lineXY.setAttributeNS(null, "x1",x1);
            lineXY.setAttributeNS(null, "y1",y1);
            lineXY.setAttributeNS(null, "x2",x2);
            lineXY.setAttributeNS(null, "y2",y2);
            lineXY.setAttribute('style', styleStr);
            svg.appendChild(lineXY);
    };
    this.createCirles = function(url,svg,x,y,r,i){
            var shape = document.createElementNS(url, "circle");
            shape.setAttributeNS(null, "cx", x);
            shape.setAttributeNS(null, "cy", y);
            shape.setAttributeNS(null, "r",  r);
            shape.setAttributeNS(null, "id",  'circle'+i);
            shape.setAttributeNS(null, "fill", "rgba(50,140,90,0.5)");
            svg.appendChild(shape);
    };
    this.createPoly = function(url,svg,dataset){
        var shape = document.createElementNS(url, "polyline");
        shape.setAttributeNS(null, "points", dataset);
        shape.setAttribute('style', "stroke:#5BDE6C; fill:none;");
        svg.appendChild(shape); 
    };
    this.createText = function(url,svg,x,y,textVal,textColor,fontSize){
        var newText = document.createElementNS(url,"text");
            newText.setAttributeNS(null,"x",x);     
            newText.setAttributeNS(null,"y",y); 
            newText.setAttributeNS(null,"font-size",fontSize);
            newText.setAttributeNS(null,"text-anchor","middle");
            newText.setAttributeNS(null, "fill", textColor);
        var textNode = document.createTextNode(textVal);
            newText.appendChild(textNode);
            svg.appendChild(newText);
    };
};

