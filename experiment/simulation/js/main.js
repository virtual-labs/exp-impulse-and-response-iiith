function openPart(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

var k;
var p;
var sigChoice;
var scaleChoice;
var delayChoice;
var boxChoice;
var yValues;
var inValues;

// ------------------------------------------ LTI Impulse Response ----------------------------------------------------------

function impStp(){
    var sel = document.getElementById("imp-names").value;
    sel = parseFloat(sel);
    var sel1 = document.getElementById("sig-names").value;
    sel1 = parseFloat(sel1);

    var sigValues = [];
    if(sel1==1)
    {
        for (var i=0; i<=40; i++)
        {
            if(i==20)
            {
                sigValues.push(1);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }
    else
    {
        for (var i=0; i<=40; i++)
        {
            if(i>=20)
            {
                sigValues.push(1);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }
    
    if(sel==1)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        for (var i=0; i<=40; i++)
        {
            yValues.push(sigValues[i]*10);
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        for (var i=0; i<=40; i++)
        {
            if(i<10)
            {
                yValues.push(0);
            }
            else
            {
                yValues.push(sigValues[i-10]);
            }
        }
    }
    else if(sel==3)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]-sigValues[i-1]);
        }
    }
    else if(sel==4)
    {
        var xValues = makeArr(-20,20,41);
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]+yValues[i-1]);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        mode: 'markers'
    };
      
    var data = [trace1];

    var config = {responsive: true}

    if(sel1==1)
    {
        var layout = {
            title: 'Impulse Response',
            showlegend: false,
            xaxis: {
                title: 'Time [n]'
            },
            yaxis: {
                title: 'Amplitude (A)'
            }
        };
    }
    else
    {
        var layout = {
            title: 'Step Response',
            showlegend: false,
            xaxis: {
                title: 'Time [n]'
            },
            yaxis: {
                title: 'Amplitude (A)'
            }
        };
    }
      
    Plotly.newPlot('figure1', data, layout, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure1', update);
}

// ------------------------------------------ LTI System Functions ----------------------------------------------------------

function syst(){
    var sel = document.getElementById("imp-names2").value;
    sel = parseFloat(sel);
    var sel1 = document.getElementById("sig-names2").value;
    sel1 = parseFloat(sel1);
    am = 1;
    freq = 0.3;
    var sigValues = [];
    var sigValues1 = [];
    var yValues = [];

    if(sel==1)
    {
        var xValues = makeArr(-20,20,41);
        var xValues1 = makeArr(-10,30,41);
        for (var i=0; i<=40; i++)
        {
            sigValues.push(am*Math.sin(freq*xValues[i]));
            sigValues1.push(am*Math.sin(freq*xValues1[i]));
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-20,20,41);
        var xValues1 = makeArr(-10,30,41);
        for (var i=0; i<=40; i++)
        {
            sigValues.push(am*Math.cos(freq*xValues[i]));
            sigValues1.push(am*Math.cos(freq*xValues1[i]));
        }
    }
    else if(sel==3)
    {
        var xValues = makeArr(-20,20,41);
        var xValues1 = makeArr(-10,30,41);
        for (var i=0; i<=40; i++)
        {
            if(xValues[i]<0)
            {
                sigValues.push(0);
            }
            else
            {
                sigValues.push(am*xValues[i]);
            }
            if(xValues1[i]<0)
            {
                sigValues1.push(0);
            }
            else
            {
                sigValues1.push(am*xValues1[i]);
            }
        }
    }
    else if(sel==4)
    {
        var xValues = makeArr(-20,20,41);
        var xValues1 = makeArr(-10,30,41);
        for (var i=0; i<=40; i++)
        {
            if(i<13)
            {
                sigValues.push(0);
            }
            else if(i<26)
            {
                sigValues.push(am);
            }
            else
            {
                sigValues.push(0);
            }
            if(i<23)
            {
                sigValues1.push(0);
            }
            else if(i<36)
            {
                sigValues1.push(am);
            }
            else
            {
                sigValues1.push(0);
            }
        }
    }
    else
    {
        var xValues = makeArr(-20,20,41);
        var xValues1 = makeArr(-10,30,41);
        freq = 2;
        for (var i=0; i<=40; i++)
        {
            if(i<parseFloat(20/freq))
            {
                sigValues.push(am);
            }
            else if(i<parseFloat(40/freq))
            {
                sigValues.push(-am);
            }
            else
            {
                sigValues.push(0);
            }
            if(i<parseFloat(30/freq))
            {
                sigValues1.push(am);
            }
            else if(i<parseFloat(50/freq))
            {
                sigValues1.push(-am);
            }
            else
            {
                sigValues1.push(0);
            }
        }
    }
    
    if(sel1==1)
    {
        var yValues = [];
        for (var i=0; i<=40; i++)
        {
            yValues.push(sigValues[i]*10);
        }
    }
    else if(sel1==2)
    {
        var yValues = [];
        for (var i=0; i<=40; i++)
        {
            yValues.push(sigValues1[i]);
        }
    }
    else if(sel1==3)
    {
        var yValues = [];
        for (var i=0; i<=40; i++)
        {
            yValues.push(sigValues[i]-sigValues[i-1]);
        }
    }
    else
    {
        var yValues = [];
        yValues.push(sigValues[0]);
        for (var i=1; i<=40; i++)
        {
            yValues.push(sigValues[i]+yValues[i-1]);
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'output',
        mode: 'line'
    };

    var trace2 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'original',
        mode: 'line'
    };
      
    var data = [trace1,trace2];

    var config = {responsive: true}

    var layout = {
        title: 'LTI System Output',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure3', data, layout, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure3', update);
}

// ------------------------------------------ Moving Average ----------------------------------------------------------

function mavg(){
    var sel = document.getElementById("imp-names3").value;
    sel = parseFloat(sel);
    var sel1 = document.getElementById("sig-names6").value;
    sel1 = parseFloat(sel1);
    var std = document.getElementById("noise").value;
    std = parseFloat(std);
    var wind = document.getElementById("filter").value;
    wind = parseFloat(wind);
    if(wind>80)
    {
        wind = 80;
    }
    if(wind<2)
    {
        wind = 2;
    }
    am = 1;
    freq = 0.5;
    var sigValues = [];
    var yValues = [];

    if(sel==1)
    {
        var xValues = makeArr(-40,40,81);
        for (var i=0; i<=80; i++)
        {
            sigValues.push(am*Math.sin(freq*xValues[i]));
        }
    }
    else if(sel==2)
    {
        var xValues = makeArr(-40,40,81);
        for (var i=0; i<=80; i++)
        {
            sigValues.push(am*Math.cos(freq*xValues[i]));
        }
    }
    else if(sel==3)
    {
        var xValues = makeArr(-40,40,81);
        for (var i=0; i<=80; i++)
        {
            if(xValues[i]<0)
            {
                sigValues.push(0);
            }
            else
            {
                sigValues.push(am*xValues[i]);
            }
        }
    }
    else if(sel==4)
    {
        var xValues = makeArr(-40,40,81);
        for (var i=0; i<=80; i++)
        {
            if(i<27)
            {
                sigValues.push(0);
            }
            else if(i<54)
            {
                sigValues.push(am);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }
    else
    {
        var xValues = makeArr(-40,40,81);
        for (var i=0; i<=80; i++)
        {
            if(i<parseFloat(40/freq))
            {
                sigValues.push(am);
            }
            else if(i<parseFloat(80/freq))
            {
                sigValues.push(-am);
            }
            else
            {
                sigValues.push(0);
            }
        }
    }

    for (var i=0; i<=80; i++)
    {
        sigValues[i] = sigValues[i]+std*Math.random();
        yValues.push(sigValues[i]);
    }

    if(wind%2)
    {
        var start = (wind-1)/2;
        var last = 81-((wind-1)/2);
        for(var i=start; i<last; i++)
        {
            var sum = 0;
            for(var j=i-(wind-1)/2; j<i+(wind-1)/2; j++)
            {
                sum = sum+sigValues[j];
            }
            yValues[i] = sum/wind;
        }
    }
    else
    {
        var start = (wind)/2;
        var last = 81-((wind)/2);
        for(var i=start; i<last; i++)
        {
            var sum = 0;
            for(var j=i-(wind)/2; j<i+(wind)/2; j++)
            {
                sum = sum+sigValues[j];
            }
            yValues[i] = sum/wind;
        }
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'filtered',
        mode: 'line'
    };

    var trace2 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'original',
        mode: 'line'
    };
      
    var data = [trace1,trace2];

    var config = {responsive: true}

    var layout = {
        title: 'Moving Average Filter',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure11', data, layout, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure11', update);
}

// ------------------------------------------ Black Box1 ----------------------------------------------------------

function black(){
    var sigValues = [];
    var sigValues1 = [];
    var sigValues2 = [];
    var yValues = [];

    var sigValues = [];
    var yValues = [];

    k = Math.floor(Math.random() * 41)-20;
    p = Math.floor(Math.random() * 41)-20;

    var xValues = makeArr(-20,20,41);
    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==p)
        {
            yValues.push(k);
        }
        else
        {
            yValues.push(0);
        }
        if(xValues[i]==0)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }

    for (var i=0; i<=40; i++)
    {
        sigValues1.push(Math.sin(0.5*(xValues[i])));
        sigValues2.push(0);
    }

    var trace1 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };

    var trace2 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'original',
        mode: 'markers'
    };

    var trace3 = {
        x: xValues,
        y: sigValues1,
        type: 'scatter',
        name: 'output',
        mode: 'line'
    };

    var trace4 = {
        x: xValues,
        y: sigValues2,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };
      
    var data1 = [trace1];
    var data2 = [trace2];
    var data3 = [trace3];
    var data4 = [trace4];

    var config = {responsive: true}

    var layout1 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    var layout2 = {
        title: 'Output Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure4', data1, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure4', update);
    Plotly.newPlot('figure6', data2, layout2, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure6', update);
    
    Plotly.newPlot('figure5', data3, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure5', update);
    Plotly.newPlot('figure7', data4, layout2, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure7', update);
}

// ------------------------------------------ Black Box Checking ----------------------------------------------------------

function blackCheck(){
    var yValues = [];
    var yValues1 = [];

    var freq = document.getElementById("fre1").value;
    freq = parseFloat(freq);
    var am = document.getElementById("amp1").value;
    am = parseFloat(am);
    var sh = document.getElementById("shift1").value;
    sh = parseFloat(sh);

    if(freq!=0.5 || am!=k || sh!=p)
    {
        var element = document.getElementById("result1")
        element.style.color = "#FF0000";
        element.style.fontWeight = "bold";
        element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
    }
    else
    {
        var element = document.getElementById("result1")
        element.style.color = "#006400";
        element.style.fontWeight = "bold";
        element.innerHTML = 'Right Answer!';
    }

    var xValues = makeArr(-20,20,41);

    for (var i=0; i<=40; i++)
    {
        yValues.push(am*Math.sin(freq*(xValues[i])-sh));
        yValues1.push(k*Math.sin(0.5*(xValues[i])-p));
    }

    var trace1 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'Your-Output',
        mode: 'line',
        marker: {
            color: 'rgb(255, 0, 0)',
            size: 8
        }
    };

    var trace2 = {
        x: xValues,
        y: yValues1,
        type: 'scatter',
        name: 'Ideal-Output',
        mode: 'line',
        marker: {
            color: 'rgb(0, 255, 0)',
            size: 8
        }
    };
      
    var data1 = [trace1,trace2];

    var config = {responsive: true}

    var layout2 = {
        title: 'Simulated',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    Plotly.newPlot('figure7', data1, layout2, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure7', update);
}

// ------------------------------------------ Black Box 2 ----------------------------------------------------------

function black1(){
    var sigValues = [];
    var sigValues1 = [];
    var sigValues2 = [];
    var yValues = [];

    k1 = 5;
    p1 = -10;
    k2 = 2;
    p2 = 10;

    var xValues = makeArr(-20,20,41);
    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==p1)
        {
            yValues.push(k1);
        }
        else if(xValues[i]==p2)
        {
            yValues.push(k2);
        }
        else
        {
            yValues.push(0);
        }
        // for delta
        if(xValues[i]==0)
        {
            sigValues.push(1);
        }
        else
        {
            sigValues.push(0);
        }
    }

    for (var i=0; i<=40; i++)
    {
        if(xValues[i]==2)
        {
            sigValues1.push(1);
        }
        else
        {
            sigValues1.push(0);
        }
        if(xValues[i]==-2)
        {
            sigValues2.push(1);
        }
        else
        {
            sigValues2.push(0);
        }
    }

    var trace1 = {
        x: xValues,
        y: sigValues,
        type: 'scatter',
        name: 'output',
        mode: 'markers'
    };

    var trace2 = {
        x: xValues,
        y: yValues,
        type: 'scatter',
        name: 'original',
        mode: 'markers'
    };

    var trace3 = {
        x: xValues,
        y: sigValues1,
        name: 'impulse 1',
        type: 'scatter',
        mode: 'markers'
    };

    var trace4 = {
        x: xValues,
        y: sigValues2,
        name: 'impulse 2',
        type: 'scatter',
        mode: 'markers'
    };
      
    var data1 = [trace1];
    var data2 = [trace2];
    var data3 = [trace3, trace4];

    var config = {responsive: true}

    var layout1 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    var layout2 = {
        title: 'Output Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };
      
    Plotly.newPlot('figure8', data1, layout1, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure8', update);
    Plotly.newPlot('figure9', data2, layout2, config);
      var update = {
        width: 400,
        height: 300
    };
    Plotly.relayout('figure9', update);
    Plotly.newPlot('figure10', data3, layout1, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure10', update);
}

// ------------------------------------------ Black Box 1 Checking ----------------------------------------------------------

function blackCheck1(){
    var yValues = [];
    var yValues1 = [];

    var am1 = document.getElementById("amp2").value;
    am1 = parseFloat(am1);
    var sh1 = document.getElementById("shift2").value;
    sh1 = parseFloat(sh1);
    var am2 = document.getElementById("amp3").value;
    am2 = parseFloat(am2);
    var sh2 = document.getElementById("shift3").value;
    sh2 = parseFloat(sh2);
    var am3 = document.getElementById("amp4").value;
    am3 = parseFloat(am3);
    var sh3 = document.getElementById("shift4").value;
    sh3 = parseFloat(sh3);
    var am4 = document.getElementById("amp5").value;
    am4 = parseFloat(am4);
    var sh4 = document.getElementById("shift5").value;
    sh4 = parseFloat(sh4);

    if(am4>5 || am4<2 || am3>5 || am3<2 || am2>5 || am2<2 || am1>5 || am1<2 || sh4>12 || sh4<-12 || sh3>12 || sh3<-12 || sh2>12 || sh2<-12 || sh1>12 || sh1<-12)
    {
        var element = document.getElementById("result2")
        element.style.color = "#FF0000";
        element.style.fontWeight = "bold";
        element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
    }
    else
    {
        var xValues = makeArr(-20,20,41);
        console.log(sh1,sh2,sh3,sh4,am1,am2,am3,am4);
        for (var i=0; i<=40; i++)
        {
            if(xValues[i]==sh4)
            {
                yValues.push(am4);
            }
            else if(xValues[i]==sh3)
            {
                yValues.push(am3);
            }
            else if(xValues[i]==sh2)
            {
                yValues.push(am2);
            }
            else if(xValues[i]==sh1)
            {
                yValues.push(am1);
            }
            else
            {
                yValues.push(0);
            }
            // Actual
            if(xValues[i]==12 || xValues[i]==8)
            {
                yValues1.push(2);
            }
            else if(xValues[i]==-12 || xValues[i]==-8)
            {
                yValues1.push(5);
            }
            else
            {
                yValues1.push(0);
            }
        }
        var flag = 0;
        for (var i=0; i<=40; i++)
        {
            if(yValues[i]!=yValues1[i])
            {
                flag = 1;
                break;
            }
        }
        if(flag)
        {
            var element = document.getElementById("result2")
            element.style.color = "#FF0000";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
        }
        else
        {
            var element = document.getElementById("result2")
            element.style.color = "#006400";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Right Answer!';
        }
    }
}

// ------------------------------------------ Blocks init ----------------------------------------------------------

function defFunction(choice, signal){

    var out = [];
    if(choice==0)
    {
        // difference
        out.push(signal[i]);
        for (var i=1; i<=80; i++)
        {
            out.push(signal[i]-signal[i-1]);
        }
    }
    else if(choice==1)
    {
        out.push(signal[0]);
        for (var i=1; i<=80; i++)
        {
            out.push(signal[i]+out[i-1]);
        }
    }
    else if(choice==2)
    {
        var wind = 5;
        var start = (wind-1)/2;
        var last = 81-((wind-1)/2);
        for(var i=0; i<81; i++)
        {
            out.push(signal[i]);
        }
        for(var i=start; i<last; i++)
        {
            var sum = 0;
            for(var j=i-(wind-1)/2; j<i+(wind-1)/2; j++)
            {
                sum = sum+signal[j];
            }
            out[i] = sum/wind;
        }
    }
    else
    {
        out = signal;
    }

    return out;
}

function blocks(){
    yValues = [];
    inValues = [];

    sigChoice = Math.floor(Math.random()*2);
    scaleChoice = Math.floor(Math.random()*41)-20;
    delayChoice = Math.floor(Math.random()*41)-20;
    boxChoice = Math.floor(Math.random()*3);

    console.log(scaleChoice,delayChoice,boxChoice);

    var xValues = makeArr(-40,40,81);
    var xBig = makeArr(-60,60,121);
    var xValues1 = makeArr(-40+delayChoice,40+delayChoice,81);

    if(sigChoice==0)
    {
        for(var i=0; i<=80; i++)
        {
            if(i<27)
            {
                inValues.push(0);
            }
            else if(i<54)
            {
                inValues.push(1);
            }
            else
            {
                inValues.push(0);
            }
        }
            for(var i=0; i<=80; i++)
            {
                if(i<27+delayChoice)
                {
                    yValues.push(0);
                }
                else if(i<54+delayChoice)
                {
                    yValues.push(scaleChoice);
                }
                else
                {
                    yValues.push(0);
                }
            }
    }
    else
    {
        for(var i=0; i<=80; i++)
        {
            inValues.push(Math.sin(0.5*Math.PI*xValues[i]));
        }
        if(delayChoice<0)
        {
            for(var i=-delayChoice; i<=80; i++)
            {
                yValues.push(inValues[i]*scaleChoice);
            }
            var index1 = 0;
            var index2 = 0;
            for(var i=0; i<121; i++)
            {
                if(xBig[i]==40)
                {
                    index1 = i;
                }
                if(xBig[i]==40-delayChoice)
                {
                    index2 = i;
                }
            }
            for(var i=index1+1; i<=index2; i++)
            {
                yValues.push(scaleChoice*Math.sin(0.5*Math.PI*xBig[i]));
            }
        }
        else
        {
            var index1 = 0;
            var index2 = 0;
            for(var i=0; i<121; i++)
            {
                if(xBig[i]==-40)
                {
                    index1 = i;
                }
                if(xBig[i]==-40-delayChoice)
                {
                    index2 = i;
                }
            }
            for(var i=index2; i<index1; i++)
            {
                yValues.push(scaleChoice*Math.sin(0.5*Math.PI*xBig[i]));
            }
            for(var i=0; i<80-delayChoice; i++)
            {
                yValues.push(inValues[i]*scaleChoice);
            }
        }
    }

    yFinal = defFunction(boxChoice,yValues);

    var trace1 = {
        x: xValues,
        y: inValues,
        type: 'scatter',
        name: 'original',
        mode: 'lines'
    };
    var data1 = [trace1];

    var config = {responsive: true}

    var layout1 = {
        title: 'Input Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    var trace2 = {
        x: xValues1,
        y: yFinal,
        type: 'scatter',
        name: 'original',
        mode: 'lines'
    };
    var data2 = [trace2];

    var layout2 = {
        title: 'Output Signal',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    Plotly.newPlot('figure12', data1, layout1, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure12', update);
    Plotly.newPlot('figure13', data2, layout2, config);
      var update = {
        width: 450,
        height: 350
    };
    Plotly.relayout('figure13', update);
    Plotly.newPlot('figure14', data1, layout2, config);
    var update = {
      width: 450,
      height: 350
  };
  Plotly.relayout('figure14', update);
}

/* ---------------------------------- Blocks Checking ----------------------------------- */

function blockCheck(){
    var yValues = [];
    var inValues = [];

    var b1 = document.getElementById("sig-namesBLK1").value;
    b1 = parseInt(b1);
    var b2 = document.getElementById("sig-namesBLK2").value;
    b2 = parseInt(b2);
    var b3 = document.getElementById("sig-namesBLK3").value;
    b3 = parseInt(b3);
    var v1 = document.getElementById("block1").value;
    v1 = parseInt(v1);
    var v2 = document.getElementById("block2").value;
    v2 = parseInt(v2);
    var v3 = document.getElementById("block3").value;
    v3 = parseInt(v3);

    var spl = [];
    if(b1>2 && b1!=6)
    {
        spl.push(1);
    }
    else
    {
        spl.push(0);
    }
    if(b2>2 && b2!=6)
    {
        spl.push(1);
    }
    else
    {
        spl.push(0);
    }
    if(b3>2 && b3!=6)
    {
        spl.push(1);
    }
    else
    {
        spl.push(0);
    }

    var count = 0;
    for(var i=0; i<3; i++)
    {
        if(spl[i])
        {
            count++;
        }
    }

    var scaleHere = 1;
    var delayHere = 0;

    if(b1==1)
    {
        scaleHere = scaleHere*v1;
    }
    else if(b1==2)
    {
        delayHere = delayHere+v1;
    }
    if(b2==1)
    {
        scaleHere = scaleHere*v2;
    }
    else if(b2==2)
    {
        delayHere = delayHere+v2;
    }
    if(b3==1)
    {
        scaleHere = scaleHere*v3;
    }
    else if(b3==2)
    {
        delayHere = delayHere+v3;
    }

    if(delayHere>20 || delayHere<-20)
    {
        var element = document.getElementById("resultBLK")
        element.style.color = "#FF0000";
        element.style.fontWeight = "bold";
        element.innerHTML = 'Too much delay given! Retry!';
        return;
    }

    var xValues = makeArr(-40,40,81);
    var xBig = makeArr(-60,60,121);
    var xValues1 = makeArr(-40+delayHere,40+delayHere,81);
    var inValuesHere = [];
    var yValuesHere = [];

    if(sigChoice==0)
    {
        for(var i=0; i<=80; i++)
        {
            if(i<27)
            {
                inValuesHere.push(0);
            }
            else if(i<54)
            {
                inValuesHere.push(1);
            }
            else
            {
                inValuesHere.push(0);
            }
        }
            for(var i=0; i<=80; i++)
            {
                if(i<27+delayHere)
                {
                    yValuesHere.push(0);
                }
                else if(i<54+delayHere)
                {
                    yValuesHere.push(scaleHere);
                }
                else
                {
                    yValuesHere.push(0);
                }
            }
    }
    else
    {
        for(var i=0; i<=80; i++)
        {
            inValuesHere.push(Math.sin(0.5*Math.PI*xValues[i]));
        }
        if(delayHere<0)
        {
            for(var i=-delayHere; i<=80; i++)
            {
                yValuesHere.push(inValuesHere[i]*scaleHere);
            }
            var index1 = 0;
            var index2 = 0;
            for(var i=0; i<121; i++)
            {
                if(xBig[i]==40)
                {
                    index1 = i;
                }
                if(xBig[i]==40-delayHere)
                {
                    index2 = i;
                }
            }
            for(var i=index1+1; i<=index2; i++)
            {
                yValuesHere.push(scaleHere*Math.sin(0.5*Math.PI*xBig[i]));
            }
        }
        else
        {
            var index1 = 0;
            var index2 = 0;
            for(var i=0; i<121; i++)
            {
                if(xBig[i]==-40)
                {
                    index1 = i;
                }
                if(xBig[i]==-40-delayHere)
                {
                    index2 = i;
                }
            }
            for(var i=index2; i<index1; i++)
            {
                yValuesHere.push(scaleHere*Math.sin(0.5*Math.PI*xBig[i]));
            }
            for(var i=0; i<80-delayHere; i++)
            {
                yValuesHere.push(inValues[i]*scaleHere);
            }
        }
    }

    if(count!=1)
    {
        var element = document.getElementById("resultBLK")
        element.style.color = "#FF0000";
        element.style.fontWeight = "bold";
        element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
        yFinalHere = yValuesHere;
        if(spl[0])
        {
            yFinalHere = defFunction(b1-3,yFinalHere);
        }
        if(spl[1])
        {
            yFinalHere = defFunction(b2-3,yFinalHere);
        }
        if(spl[2])
        {
            yFinalHere = defFunction(b3-3,yFinalHere);
        }

        var trace1 = {
            x: xBig,
            y: yFinal,
            type: 'scatter',
            name: 'original',
            mode: 'lines'
        };
        var trace2 = {
            x: xBig,
            y: yFinalHere,
            type: 'scatter',
            name: 'Your Output',
            mode: 'lines'
        };
        var data1 = [trace1,trace2];
    
        var config = {responsive: true}
    
        var layout1 = {
            title: 'Check It',
            xaxis: {
                title: 'Time [n]'
            },
            yaxis: {
                title: 'Amplitude (A)'
            }
        };
        Plotly.newPlot('figure14', data1, layout1, config);
    var update = {
      width: 450,
      height: 350
  };
  Plotly.relayout('figure14', update);
        return;
    }
    else
    {
        var index = 0;
        for(var i=0; i<=2; i++)
        {
            if(spl[i])
            {
                index = i;
                break;
            }
        }
        if(i==0)
            yFinalHere = defFunction(b1-3,yValuesHere);
        else if(i==1)
            yFinalHere = defFunction(b2-3,yValuesHere);
        else
            yFinalHere = defFunction(b3-3,yValuesHere);

        if(yFinalHere.length!=yFinal.length)
        {
            var element = document.getElementById("resultBLK")
            element.style.color = "#FF0000";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
            var trace1 = {
                x: xBig,
                y: yFinal,
                type: 'scatter',
                name: 'original',
                mode: 'lines'
            };
            var trace2 = {
                x: xBig,
                y: yFinalHere,
                type: 'scatter',
                name: 'Your Output',
                mode: 'lines'
            };
            var data1 = [trace1,trace2];
        
            var config = {responsive: true}
        
            var layout1 = {
                title: 'Check It',
                xaxis: {
                    title: 'Time [n]'
                },
                yaxis: {
                    title: 'Amplitude (A)'
                }
            };
            Plotly.newPlot('figure14', data1, layout1, config);
    var update = {
      width: 450,
      height: 350
  };
  Plotly.relayout('figure14', update);
            return;
        }
    }
    var flag1 = 0;
    for(var i=0; i<yFinal.length; i++)
    {
        if(yFinal[i]!=yFinalHere[i] && i>0 && i!=delayHere)
        {
            flag1 = 1;
            break;
        }
    }

    if(flag1)
    {
        var element = document.getElementById("resultBLK")
            element.style.color = "#FF0000";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
    }
    else
    {
        if(delayHere!=delayChoice)
        {
            var element = document.getElementById("resultBLK")
            element.style.color = "#FF0000";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Wrong Answer! Check Plot for your signal!';
        }
        else
        {
            var element = document.getElementById("resultBLK")
            element.style.color = "#006400";
            element.style.fontWeight = "bold";
            element.innerHTML = 'Right Answer! Upto computational precision';
        }
    }

    var trace1 = {
        x: xValues1,
        y: yFinal,
        type: 'scatter',
        name: 'original',
        mode: 'lines',
    };
    var trace2 = {
        x: xValues1,
        y: yFinalHere,
        type: 'scatter',
        name: 'Your Output',
        mode: 'lines',
        line: {
            color: 'rgb(0, 128, 0)',
        }
    };
    var data1 = [trace1, trace2];

    var config = {responsive: true}

    var layout1 = {
        title: 'Check It',
        xaxis: {
            title: 'Time [n]'
        },
        yaxis: {
            title: 'Amplitude (A)'
        }
    };

    Plotly.newPlot('figure14', data1, layout1, config);
    var update = {
      width: 450,
      height: 350
    };
    Plotly.relayout('figure14', update);
}

/* ---------------------------- LinSpace -------------------------------------- */

function makeArr(startValue, stopValue, cardinality) {
    var arr = [];
    var step = (stopValue - startValue) / (cardinality - 1);
    for (var i = 0; i < cardinality; i++) {
      arr.push(startValue + (step * i));
    }
    return arr;
}

// ------------------------------------------ On startup ----------------------------------------------------------

function startup()
{
    impStp();
    syst();
    mavg();
    black();
    black1();
    blocks();
    document.getElementById("default").click();
}

window.onload = startup;