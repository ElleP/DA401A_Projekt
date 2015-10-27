$(document).ready(function(){
	$('#save-element').on("click", function(){
		cID = $('#courseID').val();
		localStorage.setItem('test', cID);
		alert('cid: ' + cID + 'localStorage: ' + localStorage.test);
	});

    $('#get-btn').on("click", function(event){
    	tempID = $('#ID').val();
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

    $('.question-list').on('click', questionListClick)

    $('.add-to-cloud').on('click', addToCloudClick)
        

    $('.add-question').on('click', addQuestionClick)

    $('#save-element').on('click', function(event){

    });

    $('#get-btn, .a-btn').click(function(){
    	$('input[type=text]').val('');
    })

    $('#question-list').click(function(){
    	id = localStorage.id;
    	$('.header-view-question').addClass('ng-click="getListData(' + id + ')')
    })
              
})

function questionListClick(){
	$('nav div').removeClass('active');
    $(this).addClass('active');
    $('.box-view').css({'display':'block'})

    $('.box-add').css({'display':'none'})
    $('.box-new').css({'display':'none'})

    $('input[type=text]').val('');
    //$('#get-btn').css({'display':'block'})

}

function addQuestionClick(){
    $('nav div').removeClass('active');
    $(this).addClass('active');
    $('.box-view').css({'display':'none'})
    //$('.a-btn').css({'display':'none'})
    $('.box-add').css({'display':'none'})
    $('.box-new').css({'display':'block'})
    //$('#save-element').css({'display':'block'})

    $('input[type=text]').val('');

}

function addToCloudClick(){
	$('nav div').removeClass('active');
    $(this).addClass('active');
    $('.box-view').css({'display':'none'})
    //$('#save-element').css({'display':'none'})
    $('.box-new').css({'display':'none'})
    $('.box-add').css({'display':'block'})
    //$('.a-btn').css({'display':'block'})

    $('input[type=text]').val('');
}



