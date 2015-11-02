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
            alert("submitData");
            lclStorageID = courseID;
            /*$('.body-view-question li').remove();
            $('.body-view-question span').remove();
            $('.body-view-question hr').remove();*/
            var ref = new Firebase("https://instantify.firebaseio.com");
            var active_question = ref.child(courseID);
            ref.once("value", function(snapshot) {
                var isChild = snapshot.hasChild(courseID);
                var q_Queue = ref.child(courseID).child('question_queue');
                var new_Question = q_Queue.push();
                var answers= ref.child(courseID).child('answers');
                if(isChild){
                    alert("Set Active");
                    active_question.update({"active_question" : question});
                    new_Question.set(question);
//THIS IS WHERE I TRY TO RESET ANSWERS
                    answers.set({'XX':'xx'});
                }
                else{
                    alert("new question");
                    var postID = new_Question.key();
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
        $scope.setID = function(courseID, question){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("id", courseID);
                localStorage.setItem("question", question);
            }
            else{ 
                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web"
            }
        };        


        //Had problems setting a new controller in the html so just put this method here - sorry 'bout it!'
        $scope.isValid = function(courseID, question){

            if(courseID == undefined || question == undefined){
                console.log(courseID, question);
                console.log("false");
                return true;
            }
            
            else{
                console.log(courseID, question);
                console.log("true");
                // $(".button").attr("ng-show", "isValid()");   
                return false;
            } 
        }
    });

    app.controller('MessageController', function($scope){
        this.msgID='ID';
        this.msgCreate='Create question';
        this.btnSubmit='Start';
        this.btnSave='Save';
        this.msgInput='Type question here';
    })

    app.controller('SaveController', function($scope, $firebaseArray){  

        $scope.saveData = function(courseID, question, setActive){

            alert("saveData");
            tempID = courseID;
            //tempQuestionList.push(question);
            var ref = new Firebase("https://instantify.firebaseio.com/");
            //var pushRef = ref.child('question_queue');
            ref.once("value", function(snapshot) {
            var isChild = snapshot.hasChild(courseID);
//I CHANGED PUSHREF TO Q_QUEUE AS I THINK THIS IS WHAT THAT WAS SUPPOSED TO REPRESENT
            var q_Queue = ref.child(courseID).child('question_queue');
//I CHANGED 'PUSHPUSHREF' TO NEW_QUESTION AS I THINK THIS IS WHAT THAT WAS SUPPOSED TO REPRESENT
            var new_Question = q_Queue.push(); 
            var answers= ref.child(courseID).child('answers');

                if(isChild){
//I THINK THIS MEANS IS SETACTIVE EXISTS?
                    if (setActive){
                        $("i[class*='fa-play-circle']").remove();
                        $(".questions i[class*='fa-check-square-o']").addClass('fa-square-o').removeClass('fa-check-square-o');
                        ref.child(courseID).update({'active_question' : question});
                        new_Question.set(question);

//THIS IS WHERE I THINK I SHOULD SET ANSWERS TO NULL
                        answers.set({'XX':'xx'}); //reset Answers

                    }
                    else{
                        alert("Set New Question");
                        new_Question.set(question);
                    }
                }
                else{
                    alert("Else");
                    var postID = new_Question.key();
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
            $('input[type=text]').val('');
            $('input[type=checkbox]').attr('checked',false);

           })
        }

        $scope.getListData = function(courseID){
            tempID = courseID;
            var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_question');
            var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/question_queue");
            var answers= ref.child(courseID).child('answers');

            ref.on('child_added', function(snapshot) {
                active.once("value", function(data) {
                    active_question = data.val(); 
//THIS IS WHERE I THINK I SHOULD SET ANSWERS TO NULL
                    answers.set({'answers':'xx'}); //Reset Answers
                    if(snapshot.val() == active_question){
                        $('.questions').prepend('<li id="active" data-value="' + snapshot.key() + '">' +  active_question + '</li></i><span class="icons"><a href="wordcloud.html" target="_blank"><i class="fa fa-play-circle fa-2x"></i></a><i class="fa fa-trash-o"></i><i class="fa fa-check-square-o"></i></span><hr>');
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
        $('#ID').css({'display':'inline-block'});
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
            $('.questions a').remove();
            $("i[class*='fa-play-circle']").remove();
            $("i[class*='fa-check-square-o']").addClass('fa-square-o').removeClass('fa-check-square-o');
            //$('.questions').find('<i class="fa fa-check-square-o">').remove();
            $(this).parent().append('<a href="wordcloud.html" target="_blank"><i class="fa fa-play-circle fa-2x"></i></a>');
            $(this).parent().append('<i class="fa fa-check-square-o"></i>');
            $(this).remove();
            var ref = new Firebase("https://instantify.firebaseio.com/" + tempID);
            ref.update({'active_question' : question});
        }
    })

    $('.questions').on('click', '.fa-trash-o', function(event){
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

        $('.body-view-question').on('click', '.fa-play-circle', function(event){
        alert('clicked');
        var question = $(this).parent().parent().prev().text();
        var id = $('#current-courseID').text();
    
        localStorage.setItem('question', question);
        localStorage.setItem('id', id);
        //event.stopPropagation();
        
    })

    $('.question-list').on('click', function(){
        localStorage.clear();
        $('#verification').empty();
        $('.header-question h2').text('View saved questions for an ID');
        $('nav div').removeClass('active');
        $(this).addClass('active');
        $('.box-view').css({'display':'block'})

        $('.box-add').css({'display':'none'})
        $('.box-new').css({'display':'none'})

        $('input[type=text]').val('');
        //$('#get-btn').css({'display':'block'})
    })

    $('.add-to-cloud').on('click', function(){
        localStorage.clear();
        $('#verification').empty();
        $('.header-question h2').text('Start a WordCloud instantly - just add a question');
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
        $('#verification').empty();
        $('.header-question h2').text('Save questions to ID');
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