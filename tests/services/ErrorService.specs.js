describe("ErrorService", function(){
    var ErrorService;

    beforeEach(module("matches"));

    beforeEach(inject(function(_ErrorService_){
        ErrorService = _ErrorService_;
    }));

    describe(".getLocalErrorMessage", function(){
        it("should return the default message if the code is not defined", function(){
            expect(ErrorService.getLocalErrorMessage(undefined, "message")).toEqual("message");
        });

        it("should return the message for the corresponding code", function(){
            expect(ErrorService.getLocalErrorMessage("JUNO-AUTH-00001")).toEqual("Geen emailadres opgegeven.");
        });

        it("should return the default message for codes that could not be found", function(){
            expect(ErrorService.getLocalErrorMessage("JUNO", "message")).toEqual("message");
        });

        it("should return the code if the code could not be found and no default message was specified", function(){
            expect(ErrorService.getLocalErrorMessage("JUNO")).toEqual("JUNO");
        });
    });
})