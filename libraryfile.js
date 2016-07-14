this.calculateMaxMin =function(obj){
        //will return a array of max min values or obj
        var noOfGraphs = (obj.chart.yaxisname).length,
        noOfIteration=((obj.data).length),j;
        var maxminobj={};
        //console.log(noofiteration);
        var max,min;
        for(var i=0;i<noOfGraphs;i++){
            min = obj.data[0].value[i];max=min;
            j= 1;
             while(j<noOfIteration){
                 if((obj.data[j].value[i])>max){ max =obj.data[j].value[i]}
                 if((obj.data[j].value[i])<min){ min =obj.data[j].value[i]}
                 j++;
             }
             maxminobj[i] = {"max": max,"min": min}; //storing max and min value in this object
             //console.log(max+" "+min);
        }
         return maxminobj;  //returning max and min stored in this object
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
                    if(ul[0]==9){
                        ul=1;
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
