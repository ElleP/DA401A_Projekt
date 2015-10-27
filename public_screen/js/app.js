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
            $('#verification').text('"' + question + '" has been added to ' + courseID).css({'color':'rgba(127,19,27,1)', 'position':'relative', 'top':'10px'});

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

        
                $(function(){
            $('#get-btn').on("click", function(event){
                $('#ID').val('');

                //Byter ut input fält till paragraf med kursID
                $('#ID').css({'display':'none'});
                $('#current-courseID').css({
                    'display':'block'
                    }).text(tempID);
                $('#change-courseID').css({'display':'block'});
                $('#get-btn').css({'display':'none'});
                event.stopPropagation();
            });

            $('#change-courseID').on('click', function(){
                $('.body-view-question li').remove();
                $('.body-view-question span').remove();
                $('.body-view-question hr').remove();
                tempIDList = [];
            })

            $('#change-courseID').on('click', function(){
                $('#ID').css({'display':'block', 'margin-left':'6%'});
                $('#current-courseID').css({
                    'display':'none'
                }).text(tempID);
                $('#change-courseID').css({'display':'none'});
                $('#get-btn').css({'display':'block'});
                $('#ID').val('');
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

            $('.question-list').on('click', function(event){
                $('nav div').removeClass('active');
                $(this).addClass('active');
                $('.box-view').css({'display':'block'})

                $('.box-add').css({'display':'none'})
                $('.box-new').css({'display':'none'})
                //$('#get-btn').css({'display':'block'})


            });

            $('.add-to-cloud').on('click', function(event){
                $('nav div').removeClass('active');
                $(this).addClass('active');
                $('.box-view').css({'display':'none'})
                //$('#save-element').css({'display':'none'})
                $('.box-new').css({'display':'none'})
                $('.box-add').css({'display':'block'})
                //$('.a-btn').css({'display':'block'})

            });

             $('.add-question').on('click', function(event){
                $('nav div').removeClass('active');
                $(this).addClass('active');
                $('.box-view').css({'display':'none'})
                //$('.a-btn').css({'display':'none'})
                $('.box-add').css({'display':'none'})
                $('.box-new').css({'display':'block'})
                //$('#save-element').css({'display':'block'})

            });

             $('#save-element').on('click', function(event){

             });
                      
        });

    }) 
})();