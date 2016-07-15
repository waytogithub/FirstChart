function renderChart(renderdivId,separator,width,height,chartdata) {
    this.chartdata = chartdata;
    this.renderdivId = "mydiv";
    this.separator = "|";
    this.width = "300";
    this.height = "400";
    this.yaxisticks = 6;
    this.xaxisticks = 5;
 
    this.render = function () {
        this.chartdata = chartdata;
        this.renderdivId = renderdivId;
        this.separator = separator;
        this.width = width;
        this.height = height;
        this.plotdata();
        
    };
    
}


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

   
  
this.createlimits= function(ul,ll){
                  var ullength = ul.length;
                  var lllength = ll.length;
                  var cnt; 
                  
                  
                  if(ul[0]==0){
                    cnt=0;
                    for(var i=0;i<ullength;i++){
                        if(ul[i]==0){
                            cnt++;
                        }
                        else{
                            break;
                        }
                    }
                    cnt++;
                    
                    }
                    else{
                        ul = ul.replace(/^0+/, '');
                        ul = ul.substr(0,1);
                        ul = (parseInt(ul)+1).toString();
                        ul = this.placezeros(ul,cnt,0);
                    }
                  }
                  else{
                    ul = ul.substr(0,1);
                    ul = (parseInt(ul)+1).toString();
                    ul = this.placezeros(ul,ullength,1);
                  }
                  if(ll[0]==0){
                    cnt=0;
                    for(var i=0;i<lllength;i++){
                        if(ll[i]==0){
                            cnt++;
                        }
                        else{
                            break;
                        }
                    }
                    cnt++;
                    ll = ll.replace(/^0+/, '');
                    ll = ll.substr(0,1);
                    ll = (parseInt(ll)+1).toString();
                    ll = this.placezeros(ll,cnt,0);
                  }else{
                    ll = ll.substr(0,1);
                    ll = this.placezeros(ll,lllength,1);
                  }
                   return [ul,ll]; 
};

this.placezeros= function(data,range,method){
        if(method==0){
            while (data.length < range) {
             data = '0'+data;
            }
            return "0."+data;
        }else{
            while (data.length < range) {
             data =  data+'0';
            }
            return data;
        }
};
this.plotdata = function(){
                var maxmin = calculateMaxMin(this.chartdata);
                var max,min,newmax,newmin,limits,divisiony,divisionX,plotRatio;
                for(var k in maxmin){
                    max = maxmin[k].max;
                    min = maxmin[k].min;
                    if(max%1!=0){//decimal
                        
                        if(max<1){
                            newmax = max.toString().split(".")[1];
                        }else{
                            newmax = max.toString().split(".")[0];
                        }           
                    }else{
                        newmax = max.toString();
                    }
                    if(min%1!=0){
                        if(min<1){
                            newmin = min.toString().split(".")[1];
                        }else{
                            newmin = min.toString().split(".")[0];
                        }
                    }else{
                        newmin = min.toString();
                    }           
                limits = this.createlimits(newmax,newmin);
                newmax = limits[0]; newmin = limits[1];
                yaxisticks= this.(parseInt(limits[0]),parseInt(limits[1]));
                xaxisticks= this.chartdata.dataset.length; 
                this.scaling(xaxisticks,yaxisticks,newmax,newmin,yaxisticks,xaxisticks,k);                
            }
};
this.scaling= function(xaxisticks,yaxisticks,newmax,newmin,yaxisticks,xaxisticks,item){
        var svgHeight = (this.height);
        var svgWidth = (this.width);
        var chartHeight=svgHeight-140;
        var chartWidth=svgWidth-100;
        var divisionX = (chartWidth) / xaxisticks;
        var divisiony = (chartHeight) / yaxisticks;
        var ratio = chartHeight/(newmax-newmin); //(chartHeight) / newmax;
        var dataset="",ycord,xcord,marginxy = 50;
        var calculationX,calculationY,textColor="#000",fontSize=17;
        var i = 1;
        for(var k in this.chartdata.data){
                xcord= (divisionX*(parseInt(k)+1))+marginxy;
                ycord = (chartHeight - ((this.chartdata.dataset[k].data[item]-newmin)*ratio))+marginxy;
                dataset += xcord+","+ycord+" ";i++;
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
         var coordinates = dataset.split(" "),xy;
                for(i = 0;i<(coordinates.length-1);i++){               
                    xy = coordinates[i].split(","); 
                    this.createCirles(url,svg,xy[0],xy[1],4);
        }
        for(var i=0;i<xaxisticks;i++){
                    calculationX = parseInt(divisionX)*(i+1)+marginxy;
                    this.createLines(url,svg,calculationX,(chartHeight+marginxy+25),calculationX,(chartHeight+marginxy+15),"stroke:#000000; fill:none;");
                    var textVal =this.chartdata.dataset[i].time;
                    this.createText(url,svg,(calculationX),(chartHeight+marginxy+45),textVal);
        }
        var title = this.chartdata.chart.caption+" - "+this.chartdata.chartinfo.yaxisnames[item];
                    this.createText(url,svg,'50%',(25),title);
        for(var i=0;i<yaxisticks;i++){
                    calculationY =parseInt(divisiony)*(i)+marginxy;
                    this.createLines(url,svg,calculationY,(i)

         }
                
        };
         }

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
            shape.setAttributeNS(null, "onmouseover",  'showdata('+x+','+y+');');
            shape.setAttributeNS(null, "onmouseout",  'hidedata();');
            shape.setAttributeNS(null, "id",  'circle'+i);
            shape.setAttributeNS(null, "fill", "rgba(46,139,87,0.6)");
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
