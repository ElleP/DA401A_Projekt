(function(){
var app = angular.module('app', ['firebase']);
var tempQuestionList = [];
    
    app.controller('MessageController', function($scope){
        //MessageController responsible for labels and stuff on webpage
        $scope.msgID='Course ID';
        $scope.msgCreate='Create question';
        $scope.btnSubmit='Start';
        $scope.btnSave='Save';
        $scope.msgInput='Type question here';
    });
    
    app.controller('FirebaseController', function($scope){
        //FirebaseController responsible for sending data to Firebase
        $scope.submitData = function(courseID, question){

            var ref = new Firebase("https://instantify.firebaseio.com");
            
            var dataTable = ref.child(courseID);
            
            dataTable.set({
            active_questions: question,
            answers: {'testkey' : 'testvalue'},
            history: {'testkey' : 'testvalue'},
            question_queue: {"testkey" : question}
            });
            
            console.log(question, courseID);    
        }
    });   

    app.controller('SaveController', function($scope){

        /*alert($('#courseID').val());
        alert($('#question').val());
        if ( $('#courseID').val() != ""){
            tempQuestionList.push($('#courseID').val());
        }
        tempQuestionList.push($('#question').val());*/

        $scope.saveData = function(courseID, question){
            tempID = courseID
            tempQuestionList.push(question);
        };
 
        $(function(){
            $('.hide-element').on("click",function(){
                $('#courseID').css({
                    'display':'none'
                });

                $('.body-question').css({
                    'display':'none'
                });

                $('.view-question').append('<h2 class="header-question">View questions</h2>');
                $('.box').append('<div class="body-question"></div>');

                $('.body-question').append('<p>' + tempID + '</p>');
                for (var i = 0; i < tempQuestionList.length; i++) {
                    $('.body-question').append('<p>' + tempQuestionList[i] + '</p>');
                };
                
            

                console.log('hej');


            });
        });


    }) 
})();