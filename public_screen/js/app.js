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
            /*$('.body-view-question li').remove();
            $('.body-view-question span').remove();
            $('.body-view-question hr').remove();*/
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
            //$('#verification').prepend('<i class="fa fa-check"></i>');
           })
            
        }

        $scope.getListData = function(courseID){
            tempID = courseID;
            var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_question');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/question_queue");

            ref.on('child_added', function(snapshot) {
                active.once("value", function(data) {
                    active_question = data.val();
                    if(snapshot.val() == active_question){
                        $('.questions').prepend('<li id="active" data-value="' + snapshot.key() + '">' +  active_question + '</li><span class="icons"><i class="fa fa-trash-o"></i><i class="fa fa-check-square-o"></i></span><hr>');
                    }
                    else{
                        $('.questions').prepend('<li class="question" id="delete" data-value="' + snapshot.key() + '">' +  snapshot.val() + '</li><span class="icons"><i class="fa fa-trash-o"></i><i class="fa fa-square-o"></i></span><hr>');
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
            });


    $('#change-courseID').on('click', function(){
        $('.body-view-question li').remove();
        $('.body-view-question span').remove();
        $('.body-view-question hr').remove();


        $('#ID').css({'display':'block'});
        $('#current-courseID').css({
            'display':'none'
        })
        $('#change-courseID').css({'display':'none'});
        $('#get-btn').css({'display':'block'});
        $('#ID').css({'display':'block'});
        $('#ID').val('');
        $('.body-view-question p').css({'display':'none'})
        $('.body-view-question button').css({'display':'none'})
    })

    

    $('.body-view-question').on('click', '.fa-square-o', function(event){
        question = $(this).parent().prev().text();
        if ($(this).parent().prev().hasClass('question')){
            $('.body-view-question li').addClass('question');
            $('.body-view-question li').removeAttr('id');
            $(this).parent().prev().removeClass('question').attr('id','active');
            $("i[class*='fa-check-square-o']").addClass('fa-square-o').removeClass('fa-check-square-o');
            //$('.questions').find('<i class="fa fa-check-square-o">').remove();
            $(this).parent().append('<i class="fa fa-check-square-o"></i>');
            $(this).remove();
            var ref = new Firebase("https://instantify.firebaseio.com/" + tempID);
            ref.update({'active_question' : question});
        }
    })

    $('.body-view-question').on('click', '.fa-trash-o', function(event){
        var data_value = $(this).parent().prev().data('value');
        if ($(this).parent().prev().attr('id') == 'active'){
            alert("Can't delete active question");
        }
        else{
            var deleteRef = new Firebase("https://instantify.firebaseio.com/" + tempID + "/question_queue/" + data_value);
            deleteRef.remove();

            $(this).parent().next().remove();
            $(this).parent().prev().remove();
            $(this).parent().remove();
            $(this).prev().remove();
        }
        
    })

    $('.question-list').on('click', function(){

        $('nav div').removeClass('active');
        $(this).addClass('active');
        $('.box-view').css({'display':'block'})

        $('.box-add').css({'display':'none'})
        $('.box-new').css({'display':'none'})

        $('input[type=text]').val('');
        //$('#get-btn').css({'display':'block'})
    })

    $('.add-to-cloud').on('click', function(){
        //$('.questions').remove();
        //$('.body-view-question').append('<div class="questions"></div>')
        $('nav div').removeClass('active');
        $(this).addClass('active');
        $('.box-view').css({'display':'none'})
        //$('#save-element').css({'display':'none'})
        $('.box-new').css({'display':'none'})
        $('.box-add').css({'display':'block'})
        //$('.a-btn').css({'display':'block'})

        $('input[type=text]').val('');
    })
        

    $('.add-question').on('click', function(){
        //$('.questions').remove();
        //$('.body-view-question').append('<div class="questions"></div>')
        $('nav div').removeClass('active');
        $(this).addClass('active');
        $('.box-view').css({'display':'none'})
        //$('.a-btn').css({'display':'none'})
        $('.box-add').css({'display':'none'})
        $('.box-new').css({'display':'block'})
        //$('#save-element').css({'display':'block'})

        $('input[type=text]').val('');
    })

    $('#get-btn, .a-btn').click(function(){
        $('input[type=text]').val('');
    })

       })
        

    }) 
})();