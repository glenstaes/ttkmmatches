describe("RelationTypesService", function () {
    var RelationTypesService, ApiService, UserService, $httpBackend, $q;
    var allRelationTypes = [{ id: 1, name: "speler"}]

    beforeEach(module("matches"));

    beforeEach(inject(function (_$injector_) {
        RelationTypesService = _$injector_.get("RelationTypesService");
        ApiService = _$injector_.get("ApiService");
        UserService = _$injector_.get("UserService");
        $httpBackend = _$injector_.get("$httpBackend");
        $q = _$injector_.get("$q");

        $httpBackend.when("POST", ApiService.getEndpoint("relationtypes-all")).respond(allRelationTypes);
    }));

    describe(".getAll", function () {
        it("should retrieve the relation types from the api", function (done) {
            $httpBackend.expectPOST(ApiService.getEndpoint("relationtypes-all"));

            RelationTypesService.getAll().then(function (response) {
                expect(response.length).toBe(1);
                
                // Values should be cached
                expect(RelationTypesService.relationTypes).toEqual(response);
            }).finally(function () {
                done();

                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });
});