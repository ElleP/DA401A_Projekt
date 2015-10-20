(function(){

//This module updates labels in the html doc 
var app = angular.module('labelController', []);

    app.directive('uiLabels', function(){
    	return {
    		restrict:'E',
    		templateUrl: 'question-input.html',
    		controller:function(){
		        this.msgID='Course ID';
		        this.msgCreate='Create question';
		        this.btnSubmit='Start';
		        this.btnSave='Save';
		        this.msgInput='Type question here';
	    	},
	    	controllerAs: 'Ctrl'
	    };
	});

})();
    