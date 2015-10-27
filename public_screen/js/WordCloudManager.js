(function(){
var cloudMgr = angular.module('cloudMgr', []);

var courseID = localStorage.id;

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

			console.log("cloud data: " + myList.length);

			var formattedList = [];
			formattedList = formatList(myList);

			WordCloud(document.getElementById('myCanvas'), { list: formattedList } );
			});
		};

		var formatList = function(data){


			var temp = data.indexOf("xx");
			data.pop(temp);

			console.log(data);

			var a = [], b = [], prev;
    
   			 data.sort();

			   for ( var i = 0; i < data.length; i++ ) {
			        if ( data[i] !== prev ) {
			            a.push(data[i]);
			            b.push(1);
			        } else {
			            b[b.length-1]++;
			        }
			        prev = data[i];
			    }
			    
			    var result = [];
			    for( var k = 0; k < a.length; k++) {
			    	result.push([a[k], b[k]]);
			    }
			    return result;
			}
	})
})();