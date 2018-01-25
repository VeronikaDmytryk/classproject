let fs = require('fs');
let url = 'data/tasks.json';


module.exports = {
    getTaskGroups: function (callback) {
        fs.readFile(url, function (error, content) {
            if (error)
                throw error;
            let tasks = JSON.parse(content);
            callback(tasks);
        })
    },

    saveTasksGroups: function (groups, callback) {
        fs.writeFile(url, function (error) {
            if (error)
                throw error;
            callback();
        })
    },

    getTaskGroupsByUsername: function (username, callback) {
        getTaskGroups(callback);
    }
}