let mongo = require('mongodb');
let url = 'mongodb://localhost:27017/organizer';


module.exports = {
    getTaskGroups: function (callback) {
        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;
            db.collection("taskGroups").find({}).toArray(function (error, groups) {
                for (let i = 0; i <groups.length; i++){
                    let group = groups[i];
                    group._id = undefined;
                }
                db.close();
                callback(groups);
                console.log("get");
            });
        });
    },

    saveTasksGroups: function (groups, callback) {
        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;

            let groupsUpdated = 0;
            let length = groups.length;

            for (let i = 0; i < groups.length; i++) {
                let group = groups[i];
                db.collection("taskGroups").updateOne({id: group.id}, group, function (error, groups) {
                    groupsUpdated++;
                    if (groupsUpdated === length){
                        db.close();
                        callback();
                        console.log("set");
                    }
                });
            } 
        });
    },

    getTaskGroupsByUsername: function (username, callback) {
        mongo.MongoClient.connect(url, function (error, db) {
            if (error)
                throw error;
            db.collection("taskGroups").find({ user: username }).toArray(function (error, groups) {
                db.close();
                callback(groups);
            });
        });
    }
}