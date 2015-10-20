(function(){
var app = angular.module('app', ['firebase']);

    //Represents a list of lectures or sessions
	var sessions = [
       {
            sessionID: 'ZPQ4',
            questionObj: {
            id: 1,
            question: 'what was difficult about today?',
            answers: ['one', 'two', 'one', 'three', 'seven', 'one', 'five', 'two', 'five', 'four']
            }   
	   },
        {
            sessionID: 'AGL7',
            questionObj: {
            id: 1,
            question: 'what is your favorite colour?',
            answers: ['blue', 'red', 'green', 'red', 'yellow', 'orange', 'red', 'green', 'yellow', 'purple']
            }   
        }
    ];
    
    app.controller("SampleCtrl", function($scope, $firebaseObject) {
        var ref = new Firebase("https://instantify.firebaseio.com");
        // download the data into a local object
        $scope.data = $firebaseObject(ref);
        
        // create a synchronized array
        $scope.messages = $firebaseArray(ref);
        // add new items to the array
        // the message is automatically added to our Firebase database!
        $scope.addMessage = function() {
            $scope.messages.$add({
            text: $scope.newMessageText
            });
        };
    });
    
    app.controller('MessageController', function($scope){
        $scope.msgID='Course ID';
        $scope.msgCreate='Create question';
        $scope.btnSave='Save';
        $scope.msgInput='Type question here';
    });
                                      
    
    app.controller('FirebaseController', ['$scope', function($scope){
        
        //$scope.question = "why this print?";
        //$scope.data = []
        
        $scope.submitData = function(courseID, question){
            console.log("Kurs: " + courseID + "question: " + question);    
        }
    }]);
    
})();