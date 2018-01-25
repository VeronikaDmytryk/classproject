var app = angular.module("myOrganizer");


// Angular is MVC (model, view, controller) framework.
// View in Angular is HTML file (index.html), what user will see (UI)
// Controller is code, sends data (model) to view and changes  data, handles all request from user
// Model is our columns and tasks in our case
// Satatic and Dynamics programming languages. Static (Java, C#) - possible to change value, but not type, Dynamics (JS) - it's possible to change value and type
// Refactoring - change code without changes in UI and functionality
// $scope - container for our data (model)
// ng-model - double binding (if changed in html it will be changed in js)
// Services - shared code withing many components

app.controller("tasksDashboard", function ($scope, tasksService) {

    $scope.loaded = false;

    tasksService.getColumns().then(function(response){
        $scope.loaded = true;
        $scope.columns = response;
    });


    $scope.deleteClick = function (columnId, taskId) {
        var column = tasksService.getColumn(columnId);
        // finding task index by ID and set EditMode to true
        for (let j = 0; j < column.tasks.length; j++) {
            if (column.tasks[j].id == taskId) {
                column.tasks.splice(j, 1);
            }
        }
    }

    $scope.editClick = function (columnId, taskId) {
        var task = tasksService.getTask(columnId, taskId);
        task.originalTitle = task.title;
        task.originalDescription = task.description;
        task.editMode = true;
    }

    $scope.saveClick = function (columnId, taskId) {
        var task = tasksService.getTask(columnId, taskId);
        if(task.title && task.description){
            task.editMode = false;
        }
    }

    $scope.cancelClick = function (columnId, taskId) {
        var task = tasksService.getTask(columnId, taskId);
        if (task.originalTitle && task.originalDescription) {
            task.title = task.originalTitle;
            task.description = task.originalDescription;
            task.editMode = false;
        } else {
            $scope.deleteClick(columnId, taskId);
        }
    }

    $scope.addClick = function (columnId) {
        var column = tasksService.getColumn(columnId);
        if (column.id == columnId) {
            id = tasksService.getMaxTaskId(columnId) + 1;
            column.tasks.unshift({ id: id, title: "", description: "", editMode: true });
        }
    }


});