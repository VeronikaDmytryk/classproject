var app = angular.module("myOrganizer");

app.service("tasksService", function ($http, $timeout) {

    this.columns = [];

    this.getColumns = function(){
        let promise = $http.get("data/tasks.json").then(function(response){

            this.columns = response.data;

            return $timeout(function(){
                return response.data;
            }, 500);
            
        }, function(error){
            alert("error");
        });
        return promise;
    } 


    this.getColumn = function(columnId) {
        for (let i = 0; i < this.columns.length; i++) {
            let column = this.columns[i];
            console.log(column);
            if (column[id] == columnId) {
                return column;
            }
        }
    }
    
    this.getTask = function(columnId, taskId) {
        var column = this.getColumn(columnId);
        for (let j = 0; j < column.tasks.length; j++) {
            var task = column.tasks[j];
            if (task.id == taskId) {
                return task;
            }
        }
    }

    this.getMaxTaskId = function(columnId){
        let column = this.getColumn(columnId);
        let max = column.tasks[0].id;
        for (let i = 1; i < column.tasks.length; i++){
            let task = column.tasks[i];
            if (task.id > max){
                max = task.id;
            }
        }
        return max;
    }

});