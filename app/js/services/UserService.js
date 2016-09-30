(function () {

    var UserService = function ($http, $location, $q, Api) {
        // Declaration
        var userToken = "";         // Local copy of the user token
        var user = {};              // Local copy of the user

        // Instantiate the service as an empty object
        var us = {};

        /**
         * @function isLoggedIn
         * @description Checks whether the user is logged in. If the service doesn't know about a user token
         * it assumes that the user is logged in.
         */
        us.isLoggedIn = function () {
            return userToken !== null && userToken !== "";
        };

        /**
         * @function redirectIfNotLoggedIn
         * @description Redirects the user to the login page if he is not logged in.
         */
        us.redirectIfNotLoggedIn = function () {
            if (!us.isLoggedIn())
                $location.path("/login");
        };

        /**
         * @function login
         * @description Makes a call to the api and tries to log in the user if he isn't already.
         * @param {String} email - The emailadress of the user.
         * @param {String} password - The password of the user.
         * @returns {Promise} A promise that is rejected when an error occurred.
         */
        us.login = function (email, password) {
            var deferred = $q.defer();

            $http.post(Api.getEndpoint("login"), JSON.stringify({ email: email, password: password }))
                .then(function (response) {
                    if (angular.isDefined(response.data.token)) {
                        // Success response
                        userToken = response.data.token;
                    }
                    deferred.resolve(response.data);
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        // Return the service functionality
        return us;
    };

    angular.module("matches").factory("UserService", ["$http", "$location", "$q", "ApiService", UserService]);
})();