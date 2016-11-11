describe("ApiService", function(){
    var ApiService;
    var apiUrl = "http://backend.ttkmmatches/";
    var $httpBackend;

    beforeEach(module("matches"));

    beforeEach(inject(function(_ApiService_, _$httpBackend_){
        ApiService = _ApiService_;
        $httpBackend = _$httpBackend_;
    }));

    it("should have endpoints defined", function(){
        expect(ApiService.ENDPOINTS).toBeDefined();
        expect(Object.keys(ApiService.ENDPOINTS).length).toEqual(13);
    });

    describe(".getEndpoint", function(){
        it("should return the base api url if the endpoint was not found", function(){
            expect(ApiService.getEndpoint()).toEqual(apiUrl);
            expect(ApiService.getEndpoint("")).toEqual(apiUrl);
            expect(ApiService.getEndpoint("myendpoint")).toEqual(apiUrl);
        });

        it("should return the endpoint url", function(){
            expect(ApiService.getEndpoint("login")).toEqual(apiUrl + "signin");
        });
    });

    describe(".quickCall", function(){
        it("should resolve with the provided data", function(done){
            $httpBackend.when("POST", ApiService.getEndpoint("tabtmembers")).respond(tabtMembersList);
            $httpBackend.expectPOST(ApiService.getEndpoint("tabtmembers"));

            var resolved = false;

            ApiService.quickCall("tabtmembers").then(function(response){
                expect(response).toEqual(tabtMembersList);
                resolved = true;
            }).finally(function(){
                expect(resolved).toBeTruthy();
                done();

                // Final checks
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });

        it("should reject if an error occurs", function(){
            $httpBackend.when("POST", ApiService.getEndpoint("tabtmembers")).respond(500, "");
            $httpBackend.expectPOST(ApiService.getEndpoint("tabtmembers"));

            var resolved = false;

            ApiService.quickCall("tabtmembers").then(function(response){
                resolved = true;
            }).finally(function(){
                expect(resolved).toBeFalsy();
                done();

                // Final checks
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            $httpBackend.flush();
        });
    });
});