(function () {

    var UserService = function ($http, $location, $q, $window, Api) {
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
            if(userToken !== null && userToken !== "")
                return true;
            
            // Check the session storage for a token
            if($window.sessionStorage.getItem("matches_token")){
                userToken = $window.sessionStorage.getItem("matches_token");
            }

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
         * @function redirectIfLoggedIn
         * @description Redirects the user to the dashboard if he is logged in.
         */
        us.redirectIfLoggedIn = function(){
            if(us.isLoggedIn())
                $location.path("/dashboard");
        }

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
                    if (angular.isDefined(response.data.token) && response.data.user.confirmed) {
                        // Success response
                        userToken = response.data.token;
                        $window.sessionStorage.setItem("matches_token", userToken);
                        deferred.resolve(response.data);
                    } else {
                        if (angular.isDefined(response.data.user))
                            response.data.error = { code: "user-not-confirmed" };
                        deferred.reject(response.data);
                    }
                })
                .catch(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        };

        /**
         * @function logout
         * @description Logs out the user. It is sufficient to only remove the local copies of the session.
         */
        us.logout = function(){
            userToken = "";
            user = {};
            $window.sessionStorage.removeItem("matches_token");
        }

        // Return the service functionality
        return us;
    };

    angular.module("matches").factory("UserService", ["$http", "$location", "$q", "$window", "ApiService", UserService]);
})();