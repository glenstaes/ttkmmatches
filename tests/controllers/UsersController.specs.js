describe("UsersController", function(){
    var UsersController, UtilityService, UserService, $mdDialog;
    var $injector, $controller, $rootScope;

    beforeEach(function(){
        module("matches");

        inject(function(_$injector_, _$controller_, _$rootScope_){
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            UserService = $injector.get("UserService");
            UtilityService = $injector.get("UtilityService");
            $mdDialog = $injector.get("$mdDialog");

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

    describe("openNewAccountDialog", function(){

        beforeEach(function(){
            spyOn($mdDialog, "show");
        });

        it("should open the dialog for a new user", function(){
            UsersController.openNewAccountDialog();

            expect($mdDialog.show).toHaveBeenCalled();
        });

    });
});