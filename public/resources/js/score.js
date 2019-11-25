

var button = document.querySelectorAll('.score');
var midterm = document.querySelectorAll('.midterm');
var finalterm = document.querySelectorAll('.finalterm');
var project = document.querySelectorAll('.project');
var attendence = document.querySelectorAll('.attendence');
var sum = document.querySelectorAll('.sum');

var canvas_total = document.getElementById("total");
var canvas_midterm = document.getElementById("midterm");
var canvas_finalterm = document.getElementById("finalterm");
var canvas_project = document.getElementById("project");
var canvas_attendence = document.getElementById("attendence");

var my_midterm = document.querySelectorAll('.my_midterm');
var my_finalterm = document.querySelectorAll('.my_finalterm');
var my_project = document.querySelectorAll('.my_project');
var my_attendence = document.querySelectorAll('.my_attendence');
var my_sum = document.querySelectorAll('.my_sum');

var score_array = new Array(10);
for(let i=0; i<score_array.length;i++){
    score_array[i] = 0;
    
}
for(let i=0 ;i<sum.length;i++){
    var temp = sum[i].innerText;
    var value = (temp - (temp%10))/10;
    score_array[value]++;
}

button[0].addEventListener('click', function(){
    for(let i=0;i<chart.data.datasets[1].data.length;i++){
        chart.data.datasets[1].data[i]=0;
    }
    var midterm_array = [0,0,0,0,0,0];
    for(let i=0;i<midterm.length;i++){
        var value = midterm[i].innerText;
        value = value/5;
        midterm_array[parseInt(value)]++;
        if(value == 6){
            midterm_array[5]++;
        }
    }
    var myscore = my_midterm[0].innerText;
    var index = myscore/5;
    index = parseInt(index);
    if(index == 6){
        index=5;
    }
    console.log(index);
    chart.data.labels = ["0~5", "5~10", "10~15", "15~20","20~25","25~30"];
    chart.data.datasets[0].data = midterm_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[0].data[index]=0;
    chart.data.datasets[1].data[index]=temp;
    chart.data.datasets[0].label = 'midterm score';
    
    chart.update();
})

button[1].addEventListener('click', function(){
    
    
    for(let i=0;i<chart.data.datasets[1].data.length;i++){
        chart.data.datasets[1].data[i]=0;
    }
    var final_array = [0,0,0,0,0,0];
    for(let i=0;i<finalterm.length;i++){
        var value = finalterm[i].innerText;
        value = value/5;
        final_array[parseInt(value)]++;
        if(value == 6){
            final_array[5]++;
        }
    }
    var myscore = my_finalterm[0].innerText;
    var index = myscore/5;
    index = parseInt(index);
    if(index == 6){
        index=5;
    }

    chart.data.labels = ["0~5", "5~10", "10~15", "15~20","20~25","25~30"];
    chart.data.datasets[0].data = final_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[0].data[index]=0;
    chart.data.datasets[1].data[index]=temp;
    chart.data.datasets[0].label = 'finalterm score';
    chart.update();
})

button[2].addEventListener('click', function(){
    

    for(let i=0;i<chart.data.datasets[1].data.length;i++){
        chart.data.datasets[1].data[i]=0;
    }

    var project_array = [0,0,0,0,0,0];
    for(let i=0;i<project.length;i++){
        var value = project[i].innerText;
        value = value/5;
        project_array[parseInt(value)]++;
        if(value == 6){
            project_array[5]++;
        }
    }
    var myscore = my_project[0].innerText;
    var index = myscore/5;
    index = parseInt(index);
    if(index == 6){
        index=5;
    }
    
    chart.data.labels = ["0~5", "5~10", "10~15", "15~20","20~25","25~30"];
    chart.data.datasets[0].data = project_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[0].data[index]=0;
    chart.data.datasets[1].data[index]=temp;
    chart.data.datasets[0].label = 'project score';
    chart.update();
})

button[3].addEventListener('click', function(){
    
    
    for(let i=0;i<chart.data.datasets[1].data.length;i++){
        chart.data.datasets[1].data[i]=0;
    }
    var attendence_array = [0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0;i<attendence.length;i++){
        var value = attendence[i].innerText;
        value = value;
        attendence_array[parseInt(value)]++;
    }
    var myscore = my_attendence[0].innerText;
    var index = myscore;
    index = parseInt(index);

    chart.data.labels = ["0", "1", "2", "3","4","5","6","7","8","9","10"];
    chart.data.datasets[0].data = attendence_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[0].data[index]=0;
    chart.data.datasets[1].data[index]=temp;
    chart.data.datasets[0].label = 'attendence score';
    chart.update();
})

button[4].addEventListener('click', function(){
    

    for(let i=0;i<chart.data.datasets[1].data.length;i++){
        chart.data.datasets[1].data[i]=0;
    }
    var total_array = [0,0,0,0,0,0,0,0,0,0];
    for(let i=0 ;i<sum.length;i++){
        var temp = sum[i].innerText;
        var value = (temp - (temp%10))/10;
        total_array[value]++;
    }
    var myscore = my_sum[0].innerText;
    var index = (myscore-(myscore%10))/10;
    index = parseInt(index);

    chart.data.labels = ["0~10", "10~20", "20~30", "30~40", "40~50","50~60","60~70","70~80","80~90","90~100"];
    chart.data.datasets[0].data = total_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[0].data[index]=0;
    chart.data.datasets[1].data[index]=temp;
    chart.data.datasets[0].label = 'total score';
    chart.update();
})

var ctx = document.getElementById('total').getContext('2d');

// draw chart
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',
    axisY:{
        interval:1
    },

    // The data for our dataset
    data: {
        labels: ["0~10", "10~20", "20~30", "30~40", "40~50","50~60","60~70","70~80","80~90","90~100"],
        
        datasets: [{
            label: 'Total score',
            backgroundColor: ['rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)','rgba(54,162,235,0.2)'],
            borderColor: ['rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,1)','rgba(54,162,235,0.2)','rgba(54,162,235,1)'],
            data:score_array,
            
        },{
            label: 'my score',
            backgroundColor: 'rgba(0,255,0,0.2)',
            data:[0,0,0,0,0,0,0,0,0,0,0]
        }]
    },
    // Configuration options go here
    options: {
        animation: {
            animateScale: true
        },
        scales: {
            xAxes: [{
                stacked:true,
                scaleLabel: {
                    display:false,
                    labelString: 'score'
                },
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                stacked :true,
                scaleLabel: {
                    display:false,
                    labelString: 'count'
                },
                ticks: {
                    stepSize: 1,
                    fixedStepSize: 1,
                    beginAtZero:true
                }
            }]
        }
    }
});

var myscore = my_sum[0].innerText;
var index = (myscore-(myscore%10))/10;
var temp = chart.data.datasets[0].data[index];
chart.data.datasets[0].data[index]=0;
chart.data.datasets[1].data[index]=temp;
chart.data.datasets[1].backgroundColor[index] = "rgba(0,255,0,0.2)";
chart.update();





