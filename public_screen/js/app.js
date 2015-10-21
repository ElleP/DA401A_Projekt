(function(){
var app = angular.module('app', ['firebase']);

var tempQuestionList = [];
var tempID = "";
index = 0;    
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
            
        }

    });   

    app.controller('MessageController', function($scope){
        this.msgID='Course ID';
        this.msgCreate='Create question';
        this.btnSubmit='Start';
        this.btnSave='Save';
        this.msgInput='Type question here';
    })


    app.controller('SaveController', function($scope){        
        $scope.saveData = function(courseID, question){
            tempID = courseID;
            tempQuestionList.push(question);

            var ref = new Firebase("https://instantify.firebaseio.com/");

            ref.once("value", function(snapshot) {
            var isChild = snapshot.hasChild(courseID);
            var index = snapshot.child(courseID).child("question_queue").numChildren();
                if(isChild){
                    var question_list = ref.child(courseID).child("question_queue");
                    index++;
                    var tempString = 'question_id_' + index.toString();
                    var testQuery = {};
                    testQuery[tempString] = question;
                    question_list.update(testQuery);
                }
                else{
                    var dataTable = ref.child(courseID);
                    dataTable.set({
                        active_questions: question,
                        answers: {'testkey' : 'XX'},
                        history: {'testkey' : 'XX'},
                        question_queue: {'question_id_1' : question}
                    });

                }
                
            })
        }   

        $scope.getListData = function(courseID){
            alert('körs');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID);

              // download the data into a local object
            //var questions = ref.child(courseID).child("question_queue");
            //var activeQuestion = ref.child(courseID).child("active_question");

            ref.once("value", function(snapshot) {
              var nameSnapshot = snapshot.child("question_queue");
              var name = nameSnapshot.val();
          });
              // name === { first: "Fred", last: "Flintstone"}
              //var firstNameSnapshot = snapshot.child("name/first");
              //var firstName = firstNameSnapshot.val();
              // firstName === "Fred"
        };
        


 
        $(function(){
            $('.hide-element').on("click", function(){

                //Måste remova redan appendade childs innan childs appendas eftersom det blir dubbelt upp

                $('.body-view-question p').remove();


                $('.body-view-question').append('<p class="added">Questions to add to course with id: ' + tempID + '</p>');
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

            $('h.hide-element').off('click');
        });

    }) 
})();