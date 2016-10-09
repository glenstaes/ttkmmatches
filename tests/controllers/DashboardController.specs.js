describe("DashboardController", function(){
    var DashboardController, UserService;

    beforeEach(function(){
        module("matches");

        inject(function(_UserService_, _$injector_, _$controller_){
            UserService = _UserService_;

            // Spy the user service
            spyOn(UserService, "redirectIfNotLoggedIn");

            // Instantiate the controller
            DashboardController = _$controller_("DashboardController", {$scope: {} });
        });
    });

    it("should call the redirectIfNotLoggedIn function of the UserService", function(){
        expect(UserService.redirectIfNotLoggedIn).toHaveBeenCalled();
    });
});