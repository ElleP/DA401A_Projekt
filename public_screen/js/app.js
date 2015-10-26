(function(){
var app = angular.module('app', ['firebase']);

var tempQuestionList = [];
var tempID = "";
var tempIDList = [];
index = 0;    

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
            var ref = new Firebase("https://instantify.firebaseio.com/");

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

           })
            
        }

        $scope.getListData = function(courseID){
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
                $('.body-view-question li').remove();
                $('.body-view-question span').remove();
                $('.body-view-question hr').remove();
                tempIDList = [];
            })

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

            $('.body-view-question').on('click', '.fa-square-o', function(event){
                event.stopImmediatePropagation();
                

                question = $(this).parent().prev().text();
                if ($(this).parent().prev().hasClass('question')){
                    $('.body-view-question li').remove();
                    $('.body-view-question span').remove();
                    $('.body-view-question hr').remove();
                    var ref = new Firebase("https://instantify.firebaseio.com/" + tempID);
                    ref.update({'active_question' : question});
                    
                }
            })

            $('.body-view-question').on('click', '.fa-trash-o', function(event){
                var data_value = $(this).parent().prev().data('value');
                if ($(this).parent().prev().attr('id') == 'active'){
                    alert("Can't delete active question");
                    //$(this).children('i').attr('.fa-trash-o').off('click');
                    //$(this).children('i').attr('.fa-trash-o').css({'color':'green'})
                }else{
                    var deleteRef = new Firebase("https://instantify.firebaseio.com/" + tempID + "/question_queue/" + data_value);
                    deleteRef.remove();

                    $(this).parent().next().remove();
                    $(this).parent().prev().remove();
                    $(this).parent().remove();
                    $(this).prev().remove();
                }
                
            })
            
        });

    }) 
})();