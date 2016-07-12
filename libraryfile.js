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