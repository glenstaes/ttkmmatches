describe("SeasonsController", function () {
    var SeasonsController, SeasonsService, UtilityService;
    var $injector, $controller, $rootScope, $mdDialog, $q;

    var deferred;

    beforeEach(function () {
        module("matches");

        inject(function (_$injector_, _$controller_, _$rootScope_) {
            $injector = _$injector_;
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $mdDialog = $injector.get("$mdDialog");
            $q = $injector.get("$q");

            UtilityService = $injector.get("UtilityService");
            SeasonsService = $injector.get("SeasonsService");

            SeasonsController = $controller("SeasonsController", {
                $scope: $rootScope.$new(),
                _seasons: seasonsList,
                SeasonsService: SeasonsService,
                UtilityService: UtilityService
            });

            deferred = $q.defer();
        });
    });

    it("should do stuff upon initialization", function () {
        expect(SeasonsController.seasons).toBe(seasonsList);
        expect(SeasonsController.tabTSeasons).toBeUndefined();
    });

    describe("prepareForNewSeason", function () {
        beforeEach(function () {
            spyOn(SeasonsService, "getTabTSeasons").and.returnValue(deferred.promise);
            spyOn(SeasonsController, "showNewSeasonScreen");
            spyOn(UtilityService, "showErrorToast");
        });

        it("should retrieve the TabT seasons", function () {
            SeasonsController.prepareForNewSeason();

            expect(SeasonsService.getTabTSeasons).toHaveBeenCalled();
            expect(SeasonsController.tabTSeasons).toBeUndefined();

            deferred.resolve(tabtSeasonsList);
            $rootScope.$apply();

            expect(SeasonsController.tabTSeasons).toBe(tabtSeasonsList.SeasonEntries);
            expect(SeasonsController.showNewSeasonScreen).toHaveBeenCalled();
            expect(UtilityService.showErrorToast).not.toHaveBeenCalled();
        });

        it("should show an error if the seasons could not be retrieved", function () {
            SeasonsController.prepareForNewSeason();

            expect(SeasonsService.getTabTSeasons).toHaveBeenCalled();
            expect(SeasonsController.tabTSeasons).toBeUndefined();

            deferred.reject();
            $rootScope.$apply();

            expect(SeasonsController.tabTSeasons).toBeUndefined();
            expect(SeasonsController.showNewSeasonScreen).not.toHaveBeenCalled();
            expect(UtilityService.showErrorToast).toHaveBeenCalled();
        });
    });

    describe("refreshSeasons", function(){
        beforeEach(function(){
            spyOn(SeasonsService, "getSeasons").and.returnValue(deferred.promise);
            spyOn(SeasonsController, "setSeasons");
        })

        it("should refresh the seasons in the controller", function(){
            SeasonsController.refreshSeasons();

            expect(SeasonsService.getSeasons).toHaveBeenCalled();
            expect(SeasonsController.loading).toBeTruthy();

            deferred.resolve({ name: "2015-2016", customName: "2016", isCurrent: false });

            $rootScope.$apply();
            
            expect(SeasonsController.setSeasons).toHaveBeenCalled();
            expect(SeasonsController.loading).toBeFalsy();
        });
    });

    describe("setAsCurrent", function(){
        beforeEach(function(){
            spyOn(SeasonsService, "setAsCurrent").and.returnValue(deferred.promise);
            spyOn(SeasonsController, "refreshSeasons");
        })

        it("should set the provided season as the current", function(){
            SeasonsController.setAsCurrent(seasonsList[0]);
            expect(SeasonsController.loading).toBeTruthy();

            deferred.resolve({ name: "2015-2016", customName: "2016", isCurrent: true });

            $rootScope.$apply();
            
            expect(SeasonsController.refreshSeasons).toHaveBeenCalled();
        });
    });

    describe("showNewSeasonScreen", function () {
        beforeEach(function () {
            spyOn($mdDialog, "show");
            spyOn(SeasonsController, "prepareForNewSeason");
        });

        it("should show the new season screen if tabt seasons is initialized", function () {
            SeasonsController.tabTSeasons = tabtSeasonsList.SeasonEntries;

            SeasonsController.showNewSeasonScreen();

            expect($mdDialog.show).toHaveBeenCalled();
            expect(SeasonsController.prepareForNewSeason).not.toHaveBeenCalled();
        });

        it("should fetch the TabT seasons if they haven't been initialized yet", function () {
            SeasonsController.showNewSeasonScreen();

            expect($mdDialog.show).not.toHaveBeenCalled();
            expect(SeasonsController.prepareForNewSeason).toHaveBeenCalled();
        });
    });

    describe("setSeasons", function(){
        it("should do nothing if no valid parameter is passed", function(){
            spyOn(angular, "forEach");

            SeasonsController.setSeasons();
            expect(angular.forEach).not.toHaveBeenCalled();

            SeasonsController.setSeasons(null);
            expect(angular.forEach).not.toHaveBeenCalled();

            SeasonsController.setSeasons("blablabla");
            expect(angular.forEach).not.toHaveBeenCalled();

            SeasonsController.setSeasons([{ name: "2016-2017", customName: "2017"}]);
            expect(angular.forEach).toHaveBeenCalled();
        });
    });
});