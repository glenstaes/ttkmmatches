describe("LoginController", function () {
    var LoginController, UserService, ErrorService, $mdToast, $q, $controller, $rootScope;

    var deferred;

    beforeEach(function () {
        module("matches");

        inject(function (_UserService_, _ErrorService_, _$mdToast_, _$injector_, _$controller_, _$q_, _$rootScope_) {
            UserService = _UserService_;
            ErrorService = _ErrorService_;
            $mdToast = _$mdToast_;
            $q = _$q_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            deferred = $q.defer();
        });
    });

    it("should do the necessary stuff upon initialization", function () {
        // Spy the user service
        spyOn(UserService, "redirectIfLoggedIn");

        // Instantiate the controller
        LoginController = $controller("LoginController", { $scope: $rootScope.$new() });

        expect(UserService.redirectIfLoggedIn).toHaveBeenCalled();
        expect(LoginController.querying).toBeFalsy();
    });

    describe("ctrl.login", function () {
        beforeEach(function () {
            spyOn($mdToast, "simple").and.callThrough();
            spyOn($mdToast, "show");

            // Mock the user service
            UserService = {
                isLoggedIn: function () { return true; },
                redirectIfLoggedIn: function () { },
                login: function (loginName, password) {
                    deferred = $q.defer();
                    loginName === "right" ? deferred.resolve() : deferred.reject();
                    return deferred.promise;
                }
            }

            // Use the mocked UserService object
            LoginController = $controller("LoginController", { $scope: $rootScope.$new(), UserService: UserService });

            // Spy the user service
            spyOn(UserService, "redirectIfLoggedIn");
            spyOn(UserService, "login").and.returnValue(deferred.promise)
            spyOn(UserService, "isLoggedIn").and.callThrough();
        });

        it("should show an error toast when user is undefined", function () {
            LoginController.login();
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
        });

        it("should login the user if the credentials are correct", function () {
            // Set the user
            LoginController.user = {
                loginName: "right",
                password: "mypassword"
            };

            // Call the function
            var promise = LoginController.login();

            // Synchronous expects
            expect(LoginController.querying).toBeTruthy();

            // Resolve the promise
            deferred.resolve({ user: { firstName: "John", lastName: "Doe" } });

            // Apply because .then wouldn't be triggered otherwise
            $rootScope.$apply();

            // Asynchronous expects
            expect(UserService.isLoggedIn).toHaveBeenCalled();
            expect(UserService.redirectIfLoggedIn).toHaveBeenCalled();
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
            expect(LoginController.querying).toBeFalsy();
        });

        it("should not login the user if the credentials are wrong", function () {
            // Set the user
            LoginController.user = {
                loginName: "right",
                password: "mypassword"
            };

            // Call the function
            var promise = LoginController.login();

            // Synchronous expects
            expect(LoginController.querying).toBeTruthy();

            // Resolve the promise
            deferred.reject({ data: { error: "JUNO-AUTH-00001" } });

            // Apply because .then wouldn't be triggered otherwise
            $rootScope.$apply();

            // Asynchronous expects
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
            expect(LoginController.querying).toBeFalsy();
        });

        it("shouldn't do anything if no user is provided", function(){
            // Call the function
            var promise = LoginController.login();

            // Synchronous expects
            expect(LoginController.querying).toBeFalsy();
            expect(UserService.isLoggedIn).not.toHaveBeenCalled();
            expect(UserService.redirectIfLoggedIn).not.toHaveBeenCalled();
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
        });
    });

    describe("ctrl.onInputKeyUp", function(){
        var event;

        beforeEach(function(){
            event = {
                bubbles: true,
                cancelable: true,
                shiftKey: false
            };

            spyOn(LoginController, "login");
        });

        it("should submit the form if the enter key is pressed", function(){
            event.which = 13;
            
            LoginController.onInputKeypress(event);
            expect(LoginController.login).toHaveBeenCalled();
        });

        it("shouldn't do anything if any other key is pressed", function(){
            event.which = 14;
            LoginController.onInputKeypress(event);
            expect(LoginController.login).not.toHaveBeenCalled();
        });
    });
});