function Canvas(url){
    this.url=url;
    }
Canvas.prototype.createSvg=function(svgWidth,svgHeight,circleXCoord,ind){
    var margin=70,
    index=ind;
    
    chartHeight=svgHeight-100;
    chartWidth=svgHeight-100;
    var svg = document.createElementNS(this.url, "svg");
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
    var vertLine= document.createElementNS("http://www.w3.org/2000/svg", "line");
    svg.appendChild(vertLine);

    vertLine.setAttributeNS(null, "y1", margin);
    vertLine.setAttributeNS(null, "y2", chartHeight+margin);
    vertLine.setAttributeNS(null, "class", "vertical");
    
    vertLine.setAttributeNS(null, "x1", -1);
    vertLine.setAttributeNS(null, "x2", -1);
    
    svg.addEventListener('mousemove',function createVertLine(e){
    if((e.clientX - svg.getBoundingClientRect().left)>=margin && (e.clientX - svg.getBoundingClientRect().left)<chartWidth+margin ){
        vertLine.setAttributeNS(null, "x1", e.clientX - svg.getBoundingClientRect().left);
        vertLine.setAttributeNS(null, "x2", e.clientX - svg.getBoundingClientRect().left);
        x=e.clientX - svg.getBoundingClientRect().left;
        for(var i=0;i<circleXCoord.length ;i++){    
            if( index==circleXCoord[i].index &&  x==circleXCoord[i].x ){
               var newText = document.createElementNS("http://www.w3.org/2000/svg","text");
               newText.setAttributeNS(null,"x",circleXCoord[i].x+4);     
               newText.setAttributeNS(null,"y",circleXCoord[i].y); 
               newText.setAttributeNS(null,"font-size",11);
               
               newText.setAttribute("fill", "blue");
               var textNode = document.createTextNode(circleXCoord[i].yValue);
               newText.appendChild(textNode);
               svg.appendChild(newText);
               break;
            }
                
        }
        
     }       
        
    });
    svg.addEventListener('mouseout',function createVertLine(e){
        vertLine.setAttributeNS(null, "x1", -1);
        vertLine.setAttributeNS(null, "x2", -1);
    });
    return svg;
   
}
Canvas.prototype.createRectangle=function(svg,height,width,x,y,col){
    var rect = document.createElementNS(this.url, "rect");
    rect.setAttributeNS(null, "x",x);
    rect.setAttributeNS(null, "y",y);
    rect.setAttributeNS(null, "height",height);
    rect.setAttributeNS(null, "width",width);
    rect.setAttributeNS(null,"fill",col);
    rect.setAttributeNS(null,'opacity',"0.2");
    svg.appendChild(rect);
    }

Canvas.prototype.createPolyLine = function(svg,coordString){
    var poly = document.createElementNS(this.url, "polyline");
    poly.setAttribute("points", coordString);
    poly.setAttribute('style', "stroke:#004080; fill:none;stroke-width:3");
    svg.appendChild(poly); 
    }

Canvas.prototype.createLines=function(svg,x1,y1,x2,y2,style){
	var lineXY = document.createElementNS(this.url, "line");
    lineXY.setAttribute("x1",x1);
    lineXY.setAttribute("y1",y1);
    lineXY.setAttribute("x2",x2);
    lineXY.setAttribute("y2",y2);
    lineXY.setAttribute("class","hLine");
    //lineXY.setAttribute('style', style);
    svg.appendChild(lineXY);
    }

Canvas.prototype.createText = function(svg,x,y,textVal,textColor,fontSize){
    var newText = document.createElementNS(this.url,"text");
    newText.setAttributeNS(null,"x",x);     
    newText.setAttributeNS(null,"y",y); 
    newText.setAttributeNS(null,"font-size",fontSize);
    newText.setAttributeNS(null,"text-anchor","middle");
    newText.setAttribute("fill", textColor);
    var textNode = document.createTextNode(textVal);
    newText.appendChild(textNode);
    svg.appendChild(newText);
    }

Canvas.prototype.createRotateText = function(svg,x,y,textVal,textColor,fontSize,transform){
    var newText = document.createElementNS(this.url,"text");
    newText.setAttributeNS(null,"x",x);     
    newText.setAttributeNS(null,"y",y); 
    newText.setAttributeNS(null,"font-size",fontSize);
    newText.setAttributeNS(null,"text-anchor","middle");
    newText.setAttributeNS(null,"transform",transform);
    newText.setAttribute("fill", textColor);
    var textNode = document.createTextNode(textVal);
    newText.appendChild(textNode);
    svg.appendChild(newText);
    }

Canvas.prototype.createCircle = function(svg,x,y,r){
    var circle = document.createElementNS(this.url, "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r",  r);
    circle.setAttribute("fill", "rgb(255,255,255)");
    circle.setAttribute('style',"stroke:#000000");
    svg.appendChild(circle);
    return circle;
    }
