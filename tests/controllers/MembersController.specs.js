describe("MembersController", function () {
    var MembersController;
    var $injector, $controller, $rootScope;

    beforeEach(function () {
        module("matches");

        inject(function (_$injector_, _$controller_, _$rootScope_) {
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;

            MembersController = $controller("MembersController", {
                $scope: $rootScope.$new(),
                _federation: "VTTL",
                _members: tabtMembersList
            });
        });
    });

    it("should do stuff upon initialization", function () {
        expect(MembersController.members).toBe(tabtMembersList);
        expect(MembersController.federation).toEqual("VTTL");
    });
});