(function () {

    var ApiService = function ($q, $http) {
        // Declaration
        var apiUrl = "http://backend.ttkmmatches/";

        // Instantiate the service to an empty object
        var api = {};

        // Define the endpoints
        api.ENDPOINTS = {
            "accounts-all": "users/all",
            "login": "signin",
            "relationtypes-all": "relationtypes/all",
            "seasons": "seasons",
            "seasons-new": "seasons/new",
            "seasons-single": "seasons/get",
            "seasons-current": "seasons/setcurrent",
            "seasons-update": "seasons/update",
            "seasons-sync": "seasons/sync",
            "seasons-delete": "seasons/delete",
            "tabtmembers": "tabt/members",
            "tabtseasons": "tabt/seasons",
            "users-newaccount": "users/newaccount",
            "users-withaccount": "users/withaccount",
            "users-withoutaccount": "users/withoutaccount"
        };

        /**
         * @function getEndpoint
         * @description Gets the full url of an api endpoint
         * @param {String} endpoint - The name of an endpoint
         * @returns {String} The full url of the endpoint
         */
        api.getEndpoint = function (endpoint) {
            return [apiUrl, api.ENDPOINTS[endpoint] || ""].join("");
        };

        /**
         * @function quickCall
         * @description Calls the given api endpoint without doing fuzzy stuff with the response or error.
         * @param {String} endpoint - The name of an endpoint
         * @param {Object} [data] - The data to send
         * @returns {Promise} A primise that is rejected when an error occurred or resolved with the response data
         */
        api.quickCall = function (endpoint, data, options) {
            var deferred = $q.defer();

            $http.post(api.getEndpoint(endpoint), data, options).then(function (response) {
                if (angular.isObject(response)) {
                    deferred.resolve(response.data);
                } else {
                    deferred.reject(response);
                }
            }).catch(function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };

        // Return the service functionality
        return api;
    };

    angular.module("matches").factory("ApiService", ["$q", "$http", ApiService]);
})();