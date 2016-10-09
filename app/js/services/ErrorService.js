(function () {

    var ErrorService = function () {
        // Instantiate the service as an empty object
        var es = {};

        // The local error messages
        var ERRORMESSAGES = {
            "JUNO-AUTH-00001": "Geen emailadres opgegeven.",
            "JUNO-AUTH-00002": "Geen wachtwoord opgegeven.",
            "JUNO-AUTH-00003": "Geen voornaam opgegeven.",
            "JUNO-AUTH-00004": "Geen familienaam opgegeven.",
            "JUNO-AUTH-00005": "Er bestaat al een gebruiker met dit emailadres.",
            "JUNO-AUTH-00006": "Deze gebruiker bestaat al.",
            "JUNO-AUTH-00101": "Ongeldige logingegevens.",
            "user-not-confirmed": "Deze gebruiker is nog niet bevestigd."
        }

        /**
         * @function getLocalErrorMessage
         * @description Gets the local error message string for an error code returned from the server.
         * @param {String} code - The error code returned by the server.
         * @param {String} [defaultMessage] - The message to return if no local string is specified.
         * @returns {String} The local message. If not found the default message, otherwise the error code.
         */
        es.getLocalErrorMessage = function (code, defaultMessage) {
            if (angular.isUndefined(code))
                return defaultMessage;

            return (ERRORMESSAGES[code] || defaultMessage) || code;
        };

        // Return the service functionality
        return es;
    };

    angular.module("matches").factory("ErrorService", [ErrorService]);
})();