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
});