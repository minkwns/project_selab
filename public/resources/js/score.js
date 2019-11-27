var button = document.querySelectorAll('.score');
var midterm = document.querySelectorAll('.midterm');
var finalterm = document.querySelectorAll('.finalterm');
var project = document.querySelectorAll('.project');
var attendance = document.querySelectorAll('.attendance');
var sum = document.querySelectorAll('.sum');

var my_midterm = document.querySelectorAll('.my_midterm');
var my_finalterm = document.querySelectorAll('.my_finalterm');
var my_project = document.querySelectorAll('.my_project');
var my_attendance = document.querySelectorAll('.my_attendance');
var my_sum = document.querySelectorAll('.my_sum');

var score_array = new Array(10);
for (let i = 0; i < score_array.length; i++) {
    score_array[i] = 0;
}

var mean = 0;
for (let i = 0; i < sum.length; i++) {
    var temp = sum[i].innerText;
    mean += parseInt(temp);
    var value = (temp - (temp % 10)) / 10;
    score_array[value]++;
}



button[0].addEventListener('click', function () {
    var mean = 0;
    for (let i = 0; i < chart.data.datasets[1].data.length; i++) {
        chart.data.datasets[1].data[i] = 0;
        chart.data.datasets[2].data[i] = 0;
        chart.data.datasets[2].backgroundColor[i] = 'rgba(0,0,0,0)';
    }
    var midterm_array = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < midterm.length; i++) {
        var value = midterm[i].innerText;
        mean += parseInt(value);
        value = value / 5;
        midterm_array[parseInt(value)]++;
        if (value == 6) {
            midterm_array[5]++;
        }
    }
    mean = parseInt(mean / finalterm.length);

    meanindex = parseInt(mean / 5);
    if (meanindex == 6) {
        meanindex = 5;
    }
    var myscore = parseInt(my_midterm[0].innerText);
    var index = myscore / 5;
    index = parseInt(index);
    if (index == 6) {
        index = 5;
    }
    chart.data.labels = ["0~4", "5~9", "10~14", "15~19", "20~24", "25~30"];
    chart.data.datasets[0].data = midterm_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[1].data[index] = temp;
    chart.data.datasets[0].label = 'midterm score';
    chart.data.datasets[2].label = "mean of midterm score is " + mean;
    chart.options.tooltips.callbacks.label = (tooltips) => {
        if (tooltips.xLabel == chart.data.labels[meanindex]) {
            return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
        }
        else if (tooltips.xLabel == chart.data.labels[index]) {
            return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
        else {
            return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
    }
    chart.data.datasets[0].data[index] = 0;
    chart.data.datasets[1].label = "my score is " + myscore;
    chart.update();
})

button[1].addEventListener('click', function () {
    var mean = 0;
    for (let i = 0; i < chart.data.datasets[1].data.length; i++) {
        chart.data.datasets[1].data[i] = 0;
        chart.data.datasets[2].data[i] = 0;
        chart.data.datasets[2].backgroundColor[i] = 'rgba(0,0,0,0)';
    }
    var final_array = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < finalterm.length; i++) {
        var value = finalterm[i].innerText;
        mean += parseInt(value);
        value = value / 5;
        final_array[parseInt(value)]++;
        if (value == 6) {
            final_array[5]++;
        }
    }
    mean = parseInt(mean / finalterm.length);
    meanindex = parseInt(mean / 5);
    if (meanindex == 6) {
        meanindex = 5;
    }

    var myscore = parseInt(my_finalterm[0].innerText);
    var index = myscore / 5;
    index = parseInt(index);
    if (index == 6) {
        index = 5;
    }

    chart.data.labels = ["0~4", "5~9", "10~14", "15~19", "20~24", "25~30"];
    chart.data.datasets[0].data = final_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[1].data[index] = temp;
    chart.data.datasets[0].label = 'finalterm score';
    chart.data.datasets[2].label = "mean of finalterm score is " + mean;
    chart.options.tooltips.callbacks.label = (tooltips) => {
        if (tooltips.xLabel == chart.data.labels[meanindex]) {
            return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
        }
        else if (tooltips.xLabel == chart.data.labels[index]) {
            return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
        else {
            return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
    }
    chart.data.datasets[0].data[index] = 0;
    chart.data.datasets[1].label = "my score is " + myscore;
    chart.update();
})

button[2].addEventListener('click', function () {

    var mean = 0;
    for (let i = 0; i < chart.data.datasets[1].data.length; i++) {
        chart.data.datasets[1].data[i] = 0;
        chart.data.datasets[2].data[i] = 0;
        chart.data.datasets[2].backgroundColor[i] = 'rgba(0,0,0,0)';
    }

    var project_array = [0, 0, 0, 0, 0, 0];
    for (let i = 0; i < project.length; i++) {
        var value = project[i].innerText;
        mean += parseInt(value);
        value = value / 5;
        project_array[parseInt(value)]++;
        if (value == 6) {
            project_array[5]++;
        }
    }
    mean = parseInt(mean / finalterm.length);
    meanindex = parseInt(mean / 5);
    if (meanindex == 6) {
        meanindex = 5;
    }

    var myscore = parseInt(my_project[0].innerText);
    var index = myscore / 5;
    index = parseInt(index);
    if (index == 6) {
        index = 5;
    }

    chart.data.labels = ["0~4", "5~9", "10~14", "15~19", "20~24", "25~30"];
    chart.data.datasets[0].data = project_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[1].data[index] = temp;
    chart.data.datasets[0].label = 'project score';
    chart.data.datasets[2].label = "mean of project score is " + mean;
    chart.options.tooltips.callbacks.label = (tooltips) => {
        if (tooltips.xLabel == chart.data.labels[meanindex]) {
            return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
        }
        else if (tooltips.xLabel == chart.data.labels[index]) {
            return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
        else {
            return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
    }
    chart.data.datasets[0].data[index] = 0;
    chart.data.datasets[1].label = "my score is " + myscore;
    chart.update();
})

button[3].addEventListener('click', function () {

    var mean = 0;
    for (let i = 0; i < chart.data.datasets[1].data.length; i++) {
        chart.data.datasets[1].data[i] = 0;
        chart.data.datasets[2].data[i] = 0;
        chart.data.datasets[2].backgroundColor[i] = 'rgba(0,0,0,0)';
    }
    var attendance_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < attendance.length; i++) {
        var value = attendance[i].innerText;
        mean += parseInt(value);
        value = value;
        attendance_array[parseInt(value)]++;
    }
    mean = parseInt(mean / finalterm.length);
    meanindex = parseInt(mean);

    var myscore = parseInt(my_attendance[0].innerText);
    var index = myscore;
    index = parseInt(index);

    chart.data.labels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    chart.data.datasets[0].data = attendance_array;
    var temp = chart.data.datasets[0].data[index];

    chart.data.datasets[1].data[index] = temp;
    chart.data.datasets[0].label = 'attendance score';
    chart.data.datasets[2].label = "mean of attendance score is " + mean;
    chart.options.tooltips.callbacks.label = (tooltips) => {
        if (tooltips.xLabel == chart.data.labels[meanindex]) {
            return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
        }
        else if (tooltips.xLabel == chart.data.labels[index]) {
            return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
        else {
            return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
    }
    chart.data.datasets[0].data[index] = 0;
    chart.data.datasets[1].label = "my score is " + myscore;
    chart.update();
})

button[4].addEventListener('click', function () {

    var mean = 0;
    for (let i = 0; i < chart.data.datasets[1].data.length; i++) {
        chart.data.datasets[1].data[i] = 0;
        chart.data.datasets[2].data[i] = 0;
        chart.data.datasets[2].backgroundColor[i] = 'rgba(0,0,0,0)';
    }
    var total_array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < sum.length; i++) {
        var temp = sum[i].innerText;
        mean += parseInt(temp);
        var value = (temp - (temp % 10)) / 10;
        total_array[value]++;
    }
    mean = parseInt(mean / sum.length);
    meanindex = (mean - mean % 10) / 10;
    if (meanindex == 10) {
        meanindex = 9;
    }

    var myscore = parseInt(my_sum[0].innerText);
    var index = (myscore - (myscore % 10)) / 10;
    index = parseInt(index);
    if (index == 10) {
        index = 9;
    }

    chart.data.labels = ["0~9", "10~19", "20~29", "30~39", "40~49", "50~59", "60~69", "70~79", "80~89", "90~100"];
    chart.data.datasets[0].data = total_array;
    var temp = chart.data.datasets[0].data[index];
    chart.data.datasets[1].data[index] = temp;
    chart.data.datasets[0].label = 'total score';
    chart.data.datasets[2].label = "mean of total score is " + mean;
    chart.options.tooltips.callbacks.label = (tooltips) => {
        if (tooltips.xLabel == chart.data.labels[meanindex]) {
            return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
        }
        else if (tooltips.xLabel == chart.data.labels[index]) {
            return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
        else {
            return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
        }
    }
    chart.data.datasets[0].data[index] = 0;
    chart.data.datasets[1].label = "my score is " + myscore;
    chart.update();
})

var ctx = document.getElementById('total').getContext('2d');

// draw chart
var chart = new Chart(ctx, {
    type: 'bar',
    // The type of chart we want to create
    axisY: {
        interval: 1
    },

    // The data for our dataset
    data: {
        labels: ["0~9", "10~19", "20~29", "30~39", "40~49", "50~59", "60~69", "70~79", "80~89", "90~100"],

        datasets: [{
            pointStyle:'rect',
            label: ': Total score  ',
            backgroundColor: ['rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)', 'rgba(54,162,235,0.2)'],
            borderColor:'rgba(54,162,235,0.5)',
            data: score_array,
            fillColor: CanvasGradient,

        }, {
            pointStyle:'rect',

            label: 'my score',
            borderColor:'rgba(0,255,0,0.5',
            backgroundColor: 'rgba(0,255,0,0.2)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            type: 'bubble',
            pointStyle:'circle',
            barThickness: 3,
            barPercentage: 0.3,
            label: "mean of score",
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            radius: 7,
            pointRadius: 7,
            borderCapStyle:'round'
        }]
    },
    // Configuration options go here
    options: {
        
        
        legend: {
            position:'top',
            labels: {
                padding:10,
                usePointStyle:true,
                fontSize:20,
                boxWidth:10,
                generateLabels: function (chart) {
                    labels = Chart.defaults.global.legend.labels.generateLabels(chart);
                    labels[2].fillStyle = 'rgba(255,0,0,0.8)';
                    return labels;
                },
                
            }
        },
        tooltips: {
            callbacks: {
                label: function () {

                }
            }
        },
        animation: {
            animateScale: true
        },
        scales: {
            xAxes: [{
                stacked: true,
                scaleLabel: {
                    display: false,
                    labelString: 'score'
                },
                ticks: {
                    beginAtZero: true
                }
            }],
            yAxes: [{
                stacked: false,
                scaleLabel: {
                    display: false,
                    labelString: 'count'
                },
                ticks: {
                    stepSize: 1,
                    fixedStepSize: 1,
                    beginAtZero: true
                }
            }]
        }
    }
});

var myscore = parseInt(my_sum[0].innerText);

var index = (myscore - (myscore % 10)) / 10;
if (index == 10) {
    index = 9;
}
var temp = chart.data.datasets[0].data[index];
chart.data.datasets[1].data[index] = temp;
chart.data.datasets[1].backgroundColor[index] = "rgba(0,255,0,0.2)";
mean = parseInt(mean / sum.length);
chart.data.datasets[2].label = ": mean of total score is " + mean;
chart.data.datasets[1].label = ": my score is " + myscore+"  ";
meanindex = (mean - mean % 10) / 10;
if (meanindex == 10) {
    meanindex = 9;
}
meanaxisX = chart.data.labels[meanindex];
meanaxisY = score_array[meanindex];
chart.data.datasets[2].data[meanindex] = meanaxisY/2;
chart.options.tooltips.callbacks.label = (tooltips) => {
    if (tooltips.xLabel == chart.data.labels[meanindex]) {
        return "평균 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)" 
    }
    else if (tooltips.xLabel == chart.data.labels[index]) {
        return "내 점수가 포함된 구간입니다. (" + tooltips.yLabel + "명)"
    }
    else {
        return tooltips.xLabel + "점이 포함된 구간입니다. (" + tooltips.yLabel + "명)"
    }
}
chart.data.datasets[0].data[index] = 0;
chart.update();