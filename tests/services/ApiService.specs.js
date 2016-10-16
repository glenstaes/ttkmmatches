describe("ApiService", function(){
    var ApiService;
    var apiUrl = "http://backend.ttkmmatches/";

    beforeEach(module("matches"));

    beforeEach(inject(function(_ApiService_){
        ApiService = _ApiService_;
    }));

    it("should have endpoints defined", function(){
        expect(ApiService.ENDPOINTS).toBeDefined();
        expect(Object.keys(ApiService.ENDPOINTS).length).toEqual(4);
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
});