var app = angular.module("myOrganizer");

app.directive("header", function () {
    function getCurrentDate() {
        let date = new Date();
        return date.toLocaleString();
    }
    return {
        restrict: "A", //"A" - <div header> </div> - as an attribute, "E" as an element - <header>, "AE" - and as element and attribute
        templateUrl: "templates/header.html",
        controller: function ($scope, $interval, $rootScope) {
            $rootScope.searchKeyword = "";
            $scope.currentDate = getCurrentDate();
            $interval(function () {
                $scope.currentDate = getCurrentDate();
            }, 1000);
        }
    }
});