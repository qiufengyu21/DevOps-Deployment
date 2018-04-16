var request = require('request');

// websocket server that website connects to.
var io = require('socket.io')(3000);

/// CHILDREN nodes
var nodeServers = [];

function setNodeServers() {
	if (nodeServers.length == 0) {
		var lineReader = require('readline').createInterface({
			input: require('fs').createReadStream('../inventory-update')
		});

		lineReader.on('line', function (line) {
			if (!line.includes("droplets_iTrust")) {
				console.log('IP read from file:', line);
				var server = { url: "http://" + line + ":8080/iTrust2", alive: false };
				nodeServers.push(server);
			}
		});
		console.log(nodeServers);
	}
}

function checkResponse(server) {
	var options =
		{
			url: server.url
		};
	request(options, function (error, res, body) {
		error ? server.alive = false : server.alive = true;
		//console.log('Alive? ' + server.alive);
	});
	return server.alive;
}

function calculateColor() {
	// latency scores of all nodes, mapped to colors.
	var nodes = nodeServers.map(checkResponse).map(function (alive) {
		var color = "#ff0000";
		if (alive) {
			color = "#008000";
		}
		return { color: color };
	});
	//console.log( nodes );
	return nodes;
}


io.on('connection', function (socket) {
	console.log("Received connection");
	setNodeServers();
	///////////////
	//// Broadcast heartbeat over websockets
	//////////////
	var heartbeatTimer = setInterval(function () {
		var data = {
			name: "iTrust Nodes",
			nodes: calculateColor()
		};
		//console.log("interval", data)
		//io.sockets.emit('heartbeat', data );
		socket.emit("heartbeat", data);
	}, 2000);

	socket.on('disconnect', function () {
		console.log("closing connection")
		clearInterval(heartbeatTimer);
	});
});