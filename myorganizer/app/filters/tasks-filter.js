var app = angular.module("myOrganizer");

app.filter("tasksFilter", function () {
    //search for a keyword in tasks
    return function (tasks, keyword) {
        if (!keyword) {
            return tasks;
        }
        var result = [];
        for (var i = 0; i < tasks.length; i++) {
            let task = tasks[i];
            if (task.title.indexOf(keyword) != -1 || task.description.indexOf(keyword) != -1) {
                result.push(task);
            }
        }
        return result;
    }
});