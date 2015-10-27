(function(){
var app = angular.module('app', ['firebase']);

var tempQuestionList = [];
var tempID = "";
var tempIDList = [];
index = 0;    
var lclStorageID = "";

    app.controller('FirebaseController', function($scope){
        //FirebaseController responsible for sending data to Firebase

        $scope.submitData = function(courseID, question){
            lclStorageID = courseID;
            $('.body-view-question li').remove();
            $('.body-view-question span').remove();
            $('.body-view-question hr').remove();
            var ref = new Firebase("https://instantify.firebaseio.com");
            var active_question = ref.child(courseID);
            ref.once("value", function(snapshot) {
                var isChild = snapshot.hasChild(courseID);
                var pushRef = ref.child(courseID).child('question_queue');
                var pushpushRef = pushRef.push();
                if(isChild){
                    active_question.update({"active_question" : question});
                    pushpushRef.set(question);
                }
                else{
                    var postID = pushpushRef.key();
                    var dataTable = ref.child(courseID);
                    var tempQuery = {};
                    tempQuery[postID] = question;
                    
                    dataTable.set({
                        active_question: question,
                        answers: {'testkey' : 'XX'},
                        history: {'testkey' : 'XX'},
                        question_queue: tempQuery
                    });
                }
            });
        }
    });   

    app.controller("LocalStorageController", function($scope){
        $scope.setID = function(courseID){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("id", courseID);
                console.log(localStorage.id);
            }
            else{ 
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web"
            }
        };        
    });

    app.controller('MessageController', function($scope){
        this.msgID='ID';
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
            //var pushRef = ref.child('question_queue');

            ref.once("value", function(snapshot) {
            var isChild = snapshot.hasChild(courseID);
            var pushRef = ref.child(courseID).child('question_queue');
            var pushpushRef = pushRef.push();
                if(isChild){
                    pushpushRef.set(question);
                }
                else{
                    var postID = pushpushRef.key();
                    var dataTable = ref.child(courseID);
                    var tempQuery = {};
                    tempQuery[postID] = question;
                    
                    dataTable.set({
                        active_question: question,
                        answers: {'testkey' : 'XX'},
                        history: {'testkey' : 'XX'},
                        question_queue: tempQuery
                    });
                }
            $('#verification').text('Frågan "' + question + '" has been added to ' + courseID).css({'color':'rgba(127,19,27,1)', 'position':'relative', 'top':'10px'});

           })
            
        }

        $scope.getListData = function(courseID){
            tempID = courseID;
            $('.body-view-question li').remove();
            $('.body-view-question span').remove();
            $('.body-view-question hr').remove();
            var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_question');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/question_queue");
            ref.off('child_added'); 
            active.off('value')
            ref.on('child_added', function(snapshot) {
                active.on("value", function(data) {
                active_question = data.val();
                if(snapshot.val() == active_question){
                    $('.questions').append('<li class="added" id="active">' +  active_question + '</li><span class="icons"><i class="fa fa-trash-o"></i><i class="fa fa-check-square-o"></i></span><hr>');
                }
                else{
                    $('.questions').append('<li class="question added" id="delete" data-value="' + snapshot.key() + '">' +  snapshot.val() + '</li><span class="icons"><i class="fa fa-trash-o"></i><i class="fa fa-square-o"></i></span><hr>');
                }
            });
        });
    };

        
        

    }) 
})();