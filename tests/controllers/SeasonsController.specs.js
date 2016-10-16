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
});