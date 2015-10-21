(function(){
var app = angular.module('app', ['firebase', 'labelController']);

var tempQuestionList = [];
    
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
            $scope.tempID = courseID;
            tempQuestionList.push(question);
        };


 
        $(function(){
            $('.hide-element').on("click", function(){
                console.log(courseID, question);

                //Måste remova redan appendade childs innan childs appendas eftersom det blir dubbelt upp

                $('.body-view-question p').remove();


                $('.body-view-question').append('<p class="added">Questions to add to course with id: ' + $scope.tempID + '</p>');
                for (var i = 0; i < tempQuestionList.length; i++) {
                    $('.body-view-question').append('<p class="added">' + tempQuestionList[i] + '</p>');
                };

                $('#courseID').val('');
                $('#question').val('');
                
            });

            $('.header-question').on("click", function(){
                $('.body-question').toggle();
                
                    //$('.body-question').css({'height':'200px'})
        
                
            });
        });
    }) 
})();