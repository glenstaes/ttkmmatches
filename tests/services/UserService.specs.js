describe("UserService", function () {
    var UserService, $http, $location, $q, $window, $httpBackend, $rootScope, ApiService;

    beforeEach(module("matches"));

    beforeEach(inject(function (_$injector_) {
        UserService = _$injector_.get("UserService");
        $http = _$injector_.get("$http");
        $location = _$injector_.get("$location");
        $q = _$injector_.get("$q");
        $window = _$injector_.get("$window");
        $httpBackend = _$injector_.get("$httpBackend");
        $rootScope = _$injector_.get("$rootScope");
        ApiService = _$injector_.get("ApiService");

        $window.sessionStorage.removeItem("matches_token");
    }));

    describe(".setUserToken", function () {
        it("should set the user token in the session storage", function () {
            // Spy the getItem function of the session storage
            spyOn($window.sessionStorage, "setItem").and.callThrough();

            UserService.setUserToken("abcde");

            expect($window.sessionStorage.setItem).toHaveBeenCalled();
        });
    });

    describe(".isLoggedIn", function () {
        it("should return true if the usertoken is already set in the service", function () {
            UserService.setUserToken("abcde");

            // Spy the getItem function of the session storage
            spyOn($window.sessionStorage, "getItem").and.callThrough();

            // expect
            expect(UserService.isLoggedIn()).toBeTruthy();
            expect($window.sessionStorage.getItem).not.toHaveBeenCalled();
        });

        it("should return true if the usertoken is set in the session storage", function () {
            // Set the session storage value
            $window.sessionStorage.setItem("matches_token", "abcde");

            // Spy the getItem function of the session storage
            spyOn($window.sessionStorage, "getItem").and.callThrough();

            // expect
            expect(UserService.isLoggedIn()).toBeTruthy();
            expect($window.sessionStorage.getItem).toHaveBeenCalledWith("matches_token");
        });

        it("should return false if the usertoken is not found", function () {
            expect(UserService.isLoggedIn()).toBeFalsy();
        });
    });

    describe(".redirectIfNotLoggedIn", function () {
        beforeEach(function () {
            spyOn($location, "path");
        });

        it("should redirect the user if he is not logged in", function () {
            expect(UserService.isLoggedIn()).toBeFalsy();
            UserService.redirectIfNotLoggedIn();
            expect($location.path).toHaveBeenCalledWith("/login");
        });

        it("should not redirect the user if he is logged in", function () {
            UserService.setUserToken("abcde");
            expect(UserService.isLoggedIn()).toBeTruthy();
            UserService.redirectIfNotLoggedIn();
            expect($location.path).not.toHaveBeenCalled();
        });
    });

    describe(".login", function () {
        it("should set the user token if it is successfull and the user is confirmed", function (done) {
            // Mock the backend call
            $httpBackend.when("POST", ApiService.getEndpoint("login")).respond({
                token: "abcde",
                user: { confirmed: true }
            });
            $httpBackend.expectPOST(ApiService.getEndpoint("login"));

            // Spy
            spyOn(UserService, "setUserToken");

            // Check if it was resolved
            var resolved = false;

            // Call the method
            UserService.login("JohnDoe", "mypassword").then(function () {
                // Set the resolved flag
                resolved = true;
            }).finally(function () {
                expect(UserService.setUserToken).toHaveBeenCalledWith("abcde");
                expect(resolved).toBeTruthy();
                done();

                // Final checks
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });

        it("should reject if the login was not successfull or the user is not confirmed", function () {
            // Mock the backend call
            $httpBackend.when("POST", ApiService.getEndpoint("login")).respond({
                token: "abcde",
                user: { confirmed: false }
            });
            $httpBackend.expectPOST(ApiService.getEndpoint("login"));

            // Spy
            spyOn(UserService, "setUserToken");

            // Check if it was resolved
            var resolved = false;

            // Call the method
            UserService.login("JohnDoe", "mypassword").then(function () {
                resolved = true;
            }).finally(function () {
                expect(UserService.setUserToken).not.toHaveBeenCalled();
                expect(resolved).toBeFalsy();
                done();

                // Final checks
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".logout", function () {
        it("should logout the user", function () {
            // First make sure that the user is logged in
            UserService.setUserToken("abcde");
            expect(UserService.isLoggedIn()).toBeTruthy();

            // Spy
            spyOn(UserService, "setUserToken").and.callThrough();
            spyOn($window.sessionStorage, "removeItem").and.callThrough();

            // Logout
            UserService.logout();

            // Check if the user is logged out
            expect(UserService.setUserToken).toHaveBeenCalledWith("");
            expect($window.sessionStorage.removeItem).toHaveBeenCalledWith("matches_token");
            expect(UserService.isLoggedIn()).toBeFalsy();
        });
    });
});