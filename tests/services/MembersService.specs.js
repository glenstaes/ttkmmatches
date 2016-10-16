describe("MembersService", function () {
    var MembersService, UserService, $http, $location, $q, $window, $httpBackend, $rootScope, ApiService;

    beforeEach(module("matches"));

    beforeEach(inject(function (_$injector_) {
        MembersService = _$injector_.get("MembersService");
        UserService = _$injector_.get("UserService");
        ApiService = _$injector_.get("ApiService");

        $http = _$injector_.get("$http");
        $q = _$injector_.get("$q");
        $httpBackend = _$injector_.get("$httpBackend");
    }));

    describe(".getMembers", function () {
        it("should retrieve the TabT members from the API", function (done) {
            // Mock the backend call
            $httpBackend.when("POST", ApiService.getEndpoint("members")).respond(tabtMembersList);
            $httpBackend.expectPOST(ApiService.getEndpoint("members"));

            // Check if it was resolved
            var resolved = false;

            // Call the method
            MembersService.getMembers().then(function (response) {
                // Set the resolved flag
                expect(response.VTTL.MemberCount).toEqual(14);
                expect(response.Sporta.MemberCount).toEqual(14);
                resolved = true;
            }).finally(function () {
                expect(resolved).toBeTruthy();
                done();

                // Final checks
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });

});