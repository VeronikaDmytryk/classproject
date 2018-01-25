'use strict'; // prohibit arguments[] instead of passing arguments in function, or using global variables, prohibit delete;

var app = angular.module("myOrganizer", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "templates/tasks-dashboard.html"
    })
    .when("/dashboard", {
        templateUrl: "templates/task-dashboard.html"
    })
    .when("/reports", {
        templateUrl: "templates/reports.html"
    })
});