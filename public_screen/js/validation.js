(function(){
var validator = angular.module('validator', []);

	validator.controller('validationController', '$scope', function($scope){

		$scope.isValid = function(){

			if($scope.courseID == ""|| $scope.question == ""){
				alert("false 1");
				return false;
			}
		}
	})

})();	