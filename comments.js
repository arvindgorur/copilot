// Create web server
var http = require('http');
var url = require('url');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var qs = require('querystring');
var path = require('path');

// Create server
http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;
	console.log("Request for " + pathname + " received.");
	
	// If the request is a POST request
	if (req.method.toLowerCase() == 'post') {
		// If the request is for the comments page
		if (pathname == "/comments") {
			// Parse the form data
			var form = new formidable.IncomingForm();
			form.parse(req, function(err, fields, files) {
				// Write the form data to a file
				var data = qs.stringify(fields);
				fs.writeFile("comments.txt", data, function(err) {
					if(err) {
						return console.log(err);
					}
					console.log("The file was saved!");
				}); 
				
				// Redirect to the comments page
				res.writeHead(302, {
					'Location': 'comments.html'
				});
				res.end();
			});
		}
	}
	// If the request is a GET request
	else {
		// If the request is for the comments page
		if (pathname == "/comments") {
			// Read the comments file
			fs.readFile('comments.txt', function (err, data) {
				if (err) {
					return console.error(err);
				}
				// Send the comments to the client
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data.toString());
				res.end();
			});
		}
		// If the request is for the comments page
		else if (pathname == "/comments.html") {
			// Read the comments file
			fs.readFile('comments.txt', function (err, data) {
				if (err) {
					return console.error(err);
				}
				// Send the comments to the client
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(data.toString());
				res.end();
			});
		}
		// If the request is for the comments page
		else if (pathname == "/comments.txt") {
			// Read the comments