(function(){
var cloudMgr = angular.module('cloudMgr', []);

var courseID = localStorage.id;

	cloudMgr.controller('CloudController', function(){

	    var active = new Firebase("https://instantify.firebaseio.com/" + courseID).child('active_question');
	    var ref = new Firebase("https://instantify.firebaseio.com/" + courseID + "/answers");

		this.identifier = courseID;

		this.getData = function(){

			var myList = new Array();

			ref.once("value", function(snapshot) {
			  			
				snapshot.forEach(function(childSnapshot) {

				    myList.push(childSnapshot.val());
				});

				var formattedList = [];
				formattedList = formatList(myList);
				var canvas = document.getElementById('myCanvas');
				obj = {
					list:formattedList, 
					gridSize: 16,
  					weightFactor: 35,
					/*
					gridSize: Math.round(16 * canvas.width / 1024),
  					weightFactor: function (size) {
    				return Math.pow(size, 2.8) * canvas.width / 1024;
  					},*/
  					fontFamily: 'Muli, sans-serif',
  					wordColor: function (word, weight) {
    				return (weight === 12) ? '#000000' : '#5D0007' ;
  					},
  					rotateRatio: 1,
  					wait:Math.floor(Math.random() * 1000)
  					//shape: 'star'
  					//backgroundColor: '#ffe0e0'
  				}

				WordCloud(document.getElementById('myCanvas'), obj);
			});
		};

		var formatList = function(data){
			var temp = data.indexOf("xx");
			data.pop(temp);

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