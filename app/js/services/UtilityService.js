(function () {

    var UtilityService = function ($mdToast) {

        // Instantiate the service as an empty object
        var u = {};

        /**
         * @function showErrorToast
         * @description Displays a message using the material design toast with a red background.
         * @param {string} message - The message to show in the toast.
         * @returns {object} The toast object.
         */
        u.showErrorToast = function (message) {
            var toast = $mdToast.simple().content(message).theme("error-toast").position("top right");

            // Show the toast
            $mdToast.show(toast);

            return toast;
        };

        /**
         * @function showSuccessToast
         * @description Displays a message using the material design toast with a green background.
         * @param {string} message - The message to show in the toast.
         * @returns {object} The toast object.
         */
        u.showSuccessToast = function (message) {
            var toast = $mdToast.simple().content(message).theme("success-toast").position("top right");

            // Show the toast
            $mdToast.show(toast);

            return toast;
        };

        return u;
    }

    angular.module("matches").factory("UtilityService", ["$mdToast", UtilityService]);

})();