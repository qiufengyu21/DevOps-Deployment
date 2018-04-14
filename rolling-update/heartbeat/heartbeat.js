var http = require('http');
var request = require('request');

var io = require('socket.io')(3000);

/// CHILDREN nodes
var nodeServers = 
[
	{url:"http://localhost:9000", latency: 0},
	{url:"http://localhost:9001", latency: 0},
	{url:"http://localhost:9002", latency: 0}
];

function measureLatenancy(server)
{
	var options = 
	{
		url: server.url
	};
	console.log("request to url");
	var startTime = Date.now();
	request(options, function (error, res, body) 
	{
		console.log( error || res.statusCode, server.url);
		server.latency = Date.now() - startTime;
		console.log('Latency: ' + server.latency);
	});
	return server.latency;
}

function calculateColor()
{
	// latency scores of all nodes, mapped to colors.
	var nodes = nodeServers.map( measureLatenancy ).map( function(latency) 
	{
		var color = "#cccccc";
		if( !latency )
			return {color: color};
		if( latency > 1000 )
		{
			color = "#ff0000";
		}
		else if( latency > 100 )
		{
			color = "#cc0000";
		}
		else if( latency > 75 )
		{
			color = "#ffff00";
		}
		else if( latency > 50 )
		{
			color = "#cccc00";
		}
		else if( latency > 25 )
		{
			color = "#00cc00";
		}
		else
		{
			color = "#00ff00";
		}
		console.log( latency );
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
			name: "Your Computer", cpu: cpuAverage(), memoryLoad: memoryLoad()
			,nodes: calculateColor()
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