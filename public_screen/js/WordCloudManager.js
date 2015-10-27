(function(){
var cloudMgr = angular.module('cloudMgr', []);

var courseID = "M_001";

	cloudMgr.controller('CloudController', function(){

	    var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_question');
	    var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/answers");

		this.getData = function(){

		console.log("Function call: getData");
			
		var myList = new Array();

		ref.once("value", function(snapshot) {
		  			
			snapshot.forEach(function(childSnapshot) {

			    myList.push(childSnapshot.val());

			});

			console.log("generating cloud... ");

			//generateCloud(myList);

			console.log("cloud data: " + myList.length);

			var formattedList = [];
			formattedList = formatList(myList);

			console.log(formattedList.length);

			//WordCloud(document.getElementById('myCanvas'), { list: formattedList } );
			});
		};

		var formatList = function(data){

			console.log(data);

			var wordList = [];
			var tempList = [];
			var count = 0;
			var word = "";

			//iterate through data 
			for (var i = 0; i < data.length; i++) { 

				for (var j = 0; j < data.length; j++) {

					if(data[i] == data[j]){
						count++;
						word = data[j];
					}
				};

				tempList.push(word);
				tempList.push(count);
				
				if(wordList.length >0){
				for (var z = 0; z < wordList.length; z++) {
					var isMatch = false;

					if(tempList[0] == wordList[z][0]){
						alert(wordList[z][0]);
						 isMatch = true;
					}
					else{
						isMatch = false;
					}
				};

				if(isMatch == false){

					wordList.push(tempList);
				//}
				tempList = [];
				word = "";
				count = 0;

			}
			};
		}
			console.log("WordList Count: " + wordList.length);
			console.log(wordList);

			return wordList;
		};
	})
})();