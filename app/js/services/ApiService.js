(function(){

    var ApiService = function(){
        // Declaration
        var apiUrl = "http://backend.ttkmmatches/";

        // Instantiate the service to an empty object
        var api = {};

        // Define the endpoints
        api.ENDPOINTS = {
            login: "signin"
        };

        /**
         * @function getEndpoint
         * @description Gets the full url of an api endpoint
         * @param {String} endpoint - The name of an endpoint
         * @returns {String} The full url of the endpoint
         */
        api.getEndpoint = function(endpoint){
            return [apiUrl, api.ENDPOINTS[endpoint]].join("");
        };

        // Return the service functionality
        return api;
    };

    angular.module("matches").factory("ApiService", [ApiService]);
})();