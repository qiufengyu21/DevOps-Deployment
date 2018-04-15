
var http = require('http');
var request = require('request');

// websocket server that website connects to.
var io = require('socket.io')(3000);

/// CHILDREN nodes
var nodeServers = 
[
	{url:"http://206.189.90.54:8080/iTrust2", latency: 0},
	{url:"http://206.189.90.59:8080/iTrust2", latency: 0},
];

function measureLatenancy(server)
{
	var options = 
	{
		url: server.url
	};
	request(options, function (error, res, body) 
	{
		error ? server.alive = false : server.alive = true;
		console.log('Alive? ' + server.alive);
	});
	return server.alive;
}

function calculateColor()
{
	// latency scores of all nodes, mapped to colors.
	var nodes = nodeServers.map( measureLatenancy ).map( function(alive) 
	{
		var color = "#ff0000";
		if( !alive )
		{
			return {color: color};
		}
		else
		{
			color = "#008000";
		}
		console.log( color );
		return {color: color};
	});
	//console.log( nodes );
	return nodes;
}


io.on('connection', function (socket) {
	console.log("Received connection");

	///////////////
	//// Broadcast heartbeat over websockets
	//////////////
	var heartbeatTimer = setInterval( function () 
	{
		var data = { 
			name: "iTrust Nodes",
			nodes: calculateColor()
		};
		console.log("interval", data)
		//io.sockets.emit('heartbeat', data );
		socket.emit("heartbeat", data);
	}, 2000);

	socket.on('disconnect', function () {
		console.log("closing connection")
    	clearInterval(heartbeatTimer);
  	});
});