(function(){
    
    var LoginController = function(UserService){
        var ctrl = this;
        ctrl.UserService = UserService;
        // TODO: Redirect to the home page if the user is logged in already

        // Mockout the user
        ctrl.user = {
            loginName: "staeseke@gmail.com",
            password: "test"
        }
        
        /**
         * @function login 
         * @description Tries to login the user with the UserService.
         */
        ctrl.login = function(){
            UserService.login(ctrl.user.loginName, ctrl.user.password).then(function(response){
                console.log(response);
            }).catch(function(error){
                console.log(response);
            });
        }
    };
    
    angular.module("matches").controller("LoginController", ["UserService", LoginController]);
})();