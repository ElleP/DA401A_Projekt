(function(){
var app = angular.module('app', ['firebase']);

var tempQuestionList = [];
var tempID = "";
index = 0;    
    app.controller('FirebaseController', function($scope){
        //FirebaseController responsible for sending data to Firebase

        $scope.submitData = function(courseID, question){

            var ref = new Firebase("https://instantify.firebaseio.com");
            ref.once("value", function(snapshot) {
                var isChild = snapshot.hasChild(courseID);
                var index = snapshot.child(courseID).child("question_queue").numChildren();

                if (isChild){
                    var active_question = ref.child(courseID);
                    var question_queue_item = ref.child(courseID).child("question_queue");
                    index++;
                    var tempString = 'question_id_' + index.toString();
                    var tempQuery = {};
                    tempQuery[tempString] = question;
                    question_queue_item.update(tempQuery);
                    active_question.update({"active_questions" : question});
                    
                }
                else{
                var dataTable = ref.child(courseID);
                
                dataTable.set({
                    active_questions: question,
                    answers: {'testkey' : 'testvalue'},
                    history: {'testkey' : 'testvalue'},
                    question_queue: {"question_id_1" : question}
                    });
                }
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
            //tempQuestionList.push(question);

            var ref = new Firebase("https://instantify.firebaseio.com/");

            ref.once("value", function(snapshot) {
            var isChild = snapshot.hasChild(courseID);
            var index = snapshot.child(courseID).child("question_queue").numChildren();
                if(isChild){
                    var question_list = ref.child(courseID).child("question_queue");
                    index++;
                    var tempString = 'question_id_' + index.toString();
                    var tempQuery = {};
                    tempQuery[tempString] = question;
                    question_list.update(tempQuery);
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
            $('.body-view-question p').remove();
            alert('körs');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID);

              // download the data into a local object
            //var questions = ref.child(courseID).child("question_queue");
            //var activeQuestion = ref.child(courseID).child("active_question");

            ref.orderByKey().once("value", function(snapshot) {
              var qSnapshot = snapshot.child("question_queue");
              qSnapshot.forEach(function(data) {
                $('.body-view-question').append('<p class="added">' +  data.val() + '</p>');
                });
              
          });
              // name === { first: "Fred", last: "Flintstone"}
              //var firstNameSnapshot = snapshot.child("name/first");
              //var firstName = firstNameSnapshot.val();
              // firstName === "Fred"
        };
        


 
        $(function(){
            $('.save-element').on("click", function(){

                //Måste remova redan appendade childs innan childs appendas eftersom det blir dubbelt upp

                /*$('.body-view-question p').remove();*/


                /*$('.body-view-question').append('<p class="added">Questions to add to course with id: ' + tempID + '</p>');
                for (var i = 0; i < tempQuestionList.length; i++) {
                    $('.body-view-question').append('<p class="added">' + tempQuestionList[i] + '</p>');
                };*/

                $('#courseID').val('');
                $('#question').val('');


                //Byter ut input fält till paragraf med kursID
                $('#courseID').css({'display':'none'});
                $('#current-courseID').css({
                    'display':'block'
                }).text('CourseID: ' + tempID);
                $('#change-courseID').css({'display':'block'});
                
            });

            $('#change-courseID').on('click', function(){
                $('#courseID').css({'display':'block', 'margin-left':'6%'});
                $('#current-courseID').css({
                    'display':'none'
                }).text('CourseID: ' + tempID);
                $('#change-courseID').css({'display':'none'});
            })

            //Hides the body to view question when clicked
            $('.header-view-question').on("click", function(){
                $('.body-view-question').toggle();
                
            });

            $('.hide-element').off('click');
        });

    }) 
})();