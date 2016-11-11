describe("UsersController", function(){
    var UsersController, UtilityService, UserService;
    var $injector, $controller, $rootScope;

    beforeEach(function(){
        module("matches");

        inject(function(_$injector_, _$controller_, _$rootScope_){
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            UserService = $injector.get("UserService");
            UtilityService = $injector.get("UtilityService");

            spyOn(UserService, "getWithoutAccount").and.callThrough();

            UsersController = $controller("UsersController", {
                UtilityService: UtilityService,
                UserService: UserService
            });
        });
    });

    it("should do stuff upon initilization", function(){
        expect(UsersController.playersWithoutAccount).toEqual([]);

        expect(UserService.getWithoutAccount).toHaveBeenCalled();
    });
});