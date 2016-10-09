describe("SiteController", function () {
    var SiteController, UserService, $mdMedia, $mdSidenav, $location;
    var $injector, $controller, $rootScope;
    var mdSidenavMock;

    beforeEach(function () {
        module("matches");

        inject(function (_$injector_, _$controller_, _$rootScope_) {
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            // Mock mdMedia
            $mdMedia = jasmine.createSpy();

            // Mock the side nav
            mdSidenavMock = {
                toggle: jasmine.createSpy().and.callFake(function () { return true; })
            };
            $mdSidenav = jasmine.createSpy().and.callFake(function () {
                return mdSidenavMock;
            });

            $location = $injector.get("$location");
            UserService = $injector.get("UserService");

            SiteController = $controller("SiteController", {
                $scope: $rootScope.$new(),
                $mdMedia: $mdMedia,
                $mdSidenav: $mdSidenav,
                $location: $location,
                UserService: UserService
            });
        });
    });

    it("should do stuff upon initialization", function () {
        expect(SiteController.UserService).toBe(UserService);
    });

    describe("ctrl.isGtMd", function () {
        it("should check whether the width of the window is larger than a medium device", function () {
            SiteController.isGtMd();

            expect($mdMedia).toHaveBeenCalledWith("gt-md");
        });
    });

    describe("ctrl.toggleMenu", function () {
        it("should call the toggle method of material design", function () {
            SiteController.toggleMenu();

            expect($mdSidenav).toHaveBeenCalledWith("left");
            expect(mdSidenavMock.toggle).toHaveBeenCalled();
        });
    });

    describe("ctrl.isSideNavAllowed", function(){
        it("should check whether the user is logged in", function(){
            spyOn(UserService, "isLoggedIn");

            SiteController.isSideNavAllowed();

            expect(UserService.isLoggedIn).toHaveBeenCalled();
        });
    });

    describe("ctrl.navigateTo", function(){
        beforeEach(function(){
            spyOn($location, "path");
        });

        it("should do nothing if no menuItem object is passed", function(){
            SiteController.navigateTo();

            expect($location.path).not.toHaveBeenCalled();

            SiteController.navigateTo(null);

            expect($location.path).not.toHaveBeenCalled();
        });

        it("should navigate to the provided link", function(){
            SiteController.navigateTo({
                link: "/mypath"
            });

            expect($location.path).toHaveBeenCalledWith("/mypath");
        });
    });

    describe("ctrl.logout", function(){
        it("should call the logout and redirect method of the UserService", function(){
            spyOn(UserService, "logout");
            spyOn(UserService, "redirectIfNotLoggedIn");

            SiteController.logout();

            expect(UserService.logout).toHaveBeenCalled();
            expect(UserService.redirectIfNotLoggedIn).toHaveBeenCalled();
        });
    });

});