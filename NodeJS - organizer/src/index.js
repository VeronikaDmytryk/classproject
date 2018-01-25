let http = require('http');
//let tasksModule = require('./task-module');
let tasksModule = require('./tasks-module-file');
let url = require('url');

function handleGet(request, response) {
    let path = url.parse(request.url).pathname;

    if (request.url === "/tasks") {
        let user = url.parse(request.url, true).query.user;
        let groups = [];
        let callback = function (groups) {
            let body = JSON.stringify(groups);
            response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" });
            response.write(body);
            response.end();
        }
        if (user) {
            groups = tasksModule.getTaskGroupsByUsername(user, callback);
        } else {
            tasksModule.getTaskGroups(callback);
        }
    } else {
        response.statusCode = 404;
        response.write("Not found");
        response.end();
    }
}

function handlePost(request, response) {
    let path = url.parse(request.url).pathname;
    if (request.url === "/tasks") {
        let body = "";
        request.on("data", function (chunk) {
            body += chunk;
        }).on("end", function () {
            let groups = JSON.parse(body);
            tasksModule.saveTasksGroups(groups, function () {
                response.writeHead(200, { 'Content-Type': 'application/json', "Access-Control-Allow-Origin":"*"});
                response.end();
            });
        });
    } else {
        response.statusCode = 404;
        response.write("Not found");
        response.end();
    }
}


let server = http.createServer(function (request, response) {
    switch (request.method) {
        case "GET":
            handleGet(request, response);
            break;
        case "POST":
            console.log("post");
            handlePost(request, response);
            break;
        default:
            console.log("default");
            response.statusCode = 403;
            response.write("Not implemented");
            break;
    }

});

server.listen(process.env.PORT || 8080);

server.on("listening", function () {
    console.log("Server started...");
});

