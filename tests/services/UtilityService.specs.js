describe("UtilityService", function () {
    var UtilityService;
    var $mdToast;

    beforeEach(module("matches"));

    beforeEach(inject(function (_$injector_) {
        UtilityService = _$injector_.get("UtilityService");
        $mdToast = _$injector_.get("$mdToast");

        spyOn($mdToast, "simple").and.callThrough();
        spyOn($mdToast, "show");
    }));

    describe(".showErrorToast", function () {
        it("should show the error message", function(){
            UtilityService.showErrorToast("Error");
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
        });
    });

    describe(".showSuccessToast", function(){
        it("should show the success message", function(){
            UtilityService.showErrorToast("Success");
            expect($mdToast.simple).toHaveBeenCalled();
            expect($mdToast.show).toHaveBeenCalled();
        });
    });
});