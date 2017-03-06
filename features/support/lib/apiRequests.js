'use strict';
var Client = require('node-rest-client').Client;

var apiRequests = function() {
    var client = new Client();

    this.getMethod = function(endPoint_URL, resource, requestParam, callback) {

        endPoint_URL = endPoint_URL + resource;
        var args = {
            path: requestParam,
            //Header information
            headers: {
                "Content-Type": "application/json"
            },
        };
        setTimeout(function() {
            client.get(endPoint_URL, args, function(responseBody, responseHeaders) {
                callback(responseBody, responseHeaders);
            });
        }, 2000);
    };

    this.deleteMethod = function(endPoint_URL, resource, requestParam, callback) {

        //Concat EndPoint_URL and resource
        endPoint_URL = endPoint_URL + resource;
        var args = {
            path: requestParam,

            //Header information
            headers: {
                "Content-Type": "application/json"
            },
        };

        client.delete(endPoint_URL, args, function(responseBody, responseHeaders) {
            return callback(responseBody, responseHeaders);
        });
    };

     this.postMethod = function(endPoint_URL, resources, requestBody, callback) {
         endPoint_URL = endPoint_URL + resources;
         var args = {
             data: requestBody,
             headers: { "Content-Type": "application/json" }
         };

         client.post(endPoint_URL, args, function (data, response) {
             callback(data, response);
         });
     };

    this.putMethod = function(endPoint_URL, resource, APIParameters, callback) {

        //Concat EndPoint_URL and resource
        endPoint_URL = endPoint_URL + resource;
        var args = {
            data: APIParameters.requestBody,
            path: APIParameters.requestParam,
            //Header information
            headers: {
                "Content-Type": "application/json"
            },

            // request and response additional configuration
            requestConfig: {
                timeout: 100000, //request timeout in milliseconds
                noDelay: true, //Enable/disable the Nagle algorithm
                keepAlive: true, //Enable/disable keep-alive functionalityidle socket.
                keepAliveDelay: 100000 //and optionally set the initial delay before the first keepalive probe is sent
            },
            responseConfig: {
                timeout: 100000 //response timeout
            }

        };

        var req = client.put(endPoint_URL, args, function(responseBody, responseHeaders) {
            return callback(responseBody, responseHeaders);

        });

        req.on('requestTimeout', function(req) {
            console.log('request has expired' + req);
        });

        req.on('responseTimeout', function(res) {
            console.log('response has expired' + res);

        });
        //it's usefull to handle request errors to avoid, for example, socket hang up errors on request timeouts
        req.on('error', function(err) {
            console.log('request error', err);
        });
    };
};
module.exports = apiRequests;