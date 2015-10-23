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

        

    app.controller("SampleCtrl", function($scope, $firebaseArray) {
        var id = "M_001";
        var ref = new Firebase("https://instantify.firebaseio.com/" + id +"/question_queue");
        $scope.messages = $firebaseArray(ref); 

    });

    app.controller('MessageController', function($scope){
        this.msgID='Course ID';
        this.msgCreate='Create question';
        this.btnSubmit='Start';
        this.btnSave='Save';
        this.msgInput='Type question here';
    })


    app.controller('SaveController', function($scope, $firebaseArray){        
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
            $('.body-view-question li').remove();
            var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_questions');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/question_queue");
            ref.off('child_added'); 
            ref.on('child_added', function(snapshot) {
                active.on("value", function(data) {
                active_question = data.val();
                if(snapshot.val() == active_question){
                    $('.active-question').append('<li class="added">' +  active_question + '<i class="fa fa-trash-o"></i><i class="fa fa-check-square-o"></i><hr></li>');
                }
                else{
                    $('.questions').append('<li class="added">' +  snapshot.val() + '<i class="fa fa-trash-o"></i><i class="fa fa-square-o"></i><hr></li>');
                }
                });
            });
        };

        
        $(function(){
            $('.save-element').on("click", function(){

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
                $('.body-view-question p').remove();
                $('.body-view-question button').remove();
            })

            //Hides the body to view question when clicked
            $('.header-view-question').on("click", function(){
                $('.body-view-question').toggle();
                
            });

            $('.hide-element').off('click');
        });

    }) 
})();