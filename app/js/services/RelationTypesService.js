(function() {

    var RelationTypesService = function(Api, UserService, $q) {
        // Instantiate the service as an empty object
        var rt = {};

        // Declaration
        rt.relationTypes;

        /**
         * @function getAll
         * @description Gets all the relation types from the api
         * @return {Promise} A promise that is resolved with the relation types.
         */
        rt.getAll = function() {
            var promise = Api.quickCall("relationtypes-all", undefined, {
                headers: {
                    "Authorization": "Bearer " + UserService.getUserToken()
                }
            });

            promise.then(function(result) {
                rt.relationTypes = result;
            });

            return promise;
        }

        /**
         * @function getAllCached
         * @description Gets the cached relation types or calls the api for the relation types.
         * @return {Promise} A promise that is resolved with the relation types.
         */
        rt.getAllCached = function() {
            var deferred = $q.defer();

            if (angular.isDefined(rt.relationTypes)) {
                deferred.resolve(rt.relationTypes);
                return deferred.promise;
            } else {
                return rt.getAll();
            }
        }

        return rt;
    };

    angular.module("matches").factory("RelationTypesService", ["ApiService", "UserService", "$q", RelationTypesService])
})();