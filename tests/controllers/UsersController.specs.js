describe("UsersController", function(){
    var UsersController, UtilityService, UserService, $mdDialog;
    var $injector, $controller, $rootScope;
    var playersWithoutAccount = [{ id: 1 }];
    var playersWithAccount = [{ id: 2, federationId: 1 }];

    beforeEach(function(){
        module("matches");

        inject(function(_$injector_, _$controller_, _$rootScope_){
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            UserService = $injector.get("UserService");
            UtilityService = $injector.get("UtilityService");
            $mdDialog = $injector.get("$mdDialog");

            UsersController = $controller("UsersController", {
                UtilityService: UtilityService,
                UserService: UserService,
                _withoutAccount: playersWithoutAccount,
                _withAccount: playersWithAccount
            });
        });
    });

    it("should do stuff upon initilization", function(){
        expect(UsersController.playersWithoutAccount).toEqual(playersWithoutAccount);
        expect(UsersController.playersWithAccount).toEqual({ VTTL: [{ id: 2, federationId: 1 }], Sporta: [] });
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

    describe("refreshLists", function(){
        beforeEach(function(){
            spyOn(UserService, "getWithoutAccount").and.callThrough();
            spyOn(UserService, "getWithAccount").and.callThrough();
        });

        it("should refresh all the lists", function(){
            UsersController.refreshLists();

            expect(UserService.getWithoutAccount).toHaveBeenCalled();
            expect(UserService.getWithAccount).toHaveBeenCalled();
        });
    })
});