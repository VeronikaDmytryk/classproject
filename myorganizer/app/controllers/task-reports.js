var app = angular.module("myOrganizer");
app.controller("tasksReports", function ($scope, tasksService) {
    tasksService.getColumns().then(function(response){
        console.log(response);
        $scope.myDataSource = {
            chart: {
                caption: "Task Report",
                subCaption: "Counts",
                numberPrefix: "",
                theme: "ocean"
            },
            data:[{
                label: "To Do",
                value: response[0].tasks.length
            },
            {
                label: "In Progress",
                value: response[1].tasks.length
            },
            {
                label: "Done",
                value: response[2].tasks.length
            }]
        };
    });

});
