(function(){
var app = angular.module('app', ['firebase']);
    
    app.controller('MessageController', function($scope){
        $scope.msgCreate='Create question';
        $scope.btnSave='Save';
        $scope.msgInput='Type question here';
    });
    
    app.controller('FirebaseController', ['$scope', function($scope){
        
        $scope.submitData = function(){

            var ref = new Firebase("https://instantify.firebaseio.com");
            
            var testTable = ref.child("UserDefinedID");
            
            testTable.set({
            active_questions: "What is your favorite animal?",
            answers: "giraffe",
            history : {session:""},
            question_queue : "3"
            });
            
            console.log(testTable);    
        }
    }]);    
})();