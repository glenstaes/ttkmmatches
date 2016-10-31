describe("SeasonsService", function () {
    var SeasonsService, ApiService, UserService, $httpBackend, $q;

    beforeEach(module("matches"));

    beforeEach(inject(function (_$injector_) {
        SeasonsService = _$injector_.get("SeasonsService");
        ApiService = _$injector_.get("ApiService");
        UserService = _$injector_.get("UserService");
        $httpBackend = _$injector_.get("$httpBackend");
        $q = _$injector_.get("$q");

        $httpBackend.when("POST", ApiService.getEndpoint("tabtseasons")).respond(tabtSeasonsList);
        $httpBackend.when("POST", ApiService.getEndpoint("seasons")).respond(seasonsList);
        $httpBackend.when("POST", ApiService.getEndpoint("seasons-single")).respond(seasonsList[0]);
        $httpBackend.when("POST", ApiService.getEndpoint("seasons-current")).respond(seasonsList);
        $httpBackend.when("POST", ApiService.getEndpoint("seasons-update")).respond(seasonsList);
        $httpBackend.when("POST", ApiService.getEndpoint("seasons-sync")).respond(seasonsList[0]);
    }));

    describe(".getTabTSeasons", function () {
        it("should retrieve the TabT seasons from the API", function (done) {
            $httpBackend.expectPOST(ApiService.getEndpoint("tabtseasons"));

            SeasonsService.getTabTSeasons().then(function (response) {
                expect(response.SeasonEntries.length).toBe(17);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".getSeasons", function () {
        it("should retrieve the seasons from the API", function (done) {
            $httpBackend.expectPOST(ApiService.getEndpoint("seasons"));

            SeasonsService.getSeasons().then(function (response) {
                expect(response.length).toBe(1);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".getSeason", function(){
        it("should retrieve a season from the API", function(done){
            $httpBackend.expectPOST(ApiService.getEndpoint("seasons-single"));

            SeasonsService.getSeason().then(function (response) {
                expect(response.id).toBe(1);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".setAsCurrent", function(){
        it("should set the provided season as the current", function(){
            $httpBackend.expectPOST(ApiService.getEndpoint("seasons-current"));

            SeasonsService.setAsCurrent(1).then(function (response) {
                expect(response.length).toBe(1);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".syncWithTabT", function(){
        it("should sync with the TabT api", function(){
            $httpBackend.expectPOST(ApiService.getEndpoint("seasons-sync"));

            SeasonsService.syncWithTabT(1).then(function (response) {
                expect(response.id).toBe(1);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

    describe(".updateSeason", function(){
        it("should update the season", function(){
            $httpBackend.expectPOST(ApiService.getEndpoint("seasons-update"));

            SeasonsService.updateSeason(seasonsList[0]).then(function (response) {
                expect(response.length).toBe(1);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });
});