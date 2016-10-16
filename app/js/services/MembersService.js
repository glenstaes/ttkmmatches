(function () {

    var MembersService = function (Api, UserService, $http, $q) {
        // Instantiate the service to an empty object
        var m = {};

        /**
         * @function getMembers
         * @description Gets the members of the club (VTTL and Sporta)
         * @returns {Promise} A promise that will be resolved with the members data or rejected with an error
         */
        m.getMembers = function () {
            var deferred = $q.defer();

            $http.post(Api.getEndpoint("tabtmembers"), undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            }).then(function (response) {
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

        return m;
    };

    angular.module("matches").factory("MembersService", ["ApiService", "UserService", "$http", "$q", MembersService]);
})();