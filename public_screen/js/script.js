$(document).ready(function(){

	$('#wordcloud h1').text(localStorage.id);
	$('#wordcloud h2').text(localStorage.question);

	$('#genCloud').on('click', function(){
		$('#wordcloud h1, wordcloud h2').fadeTo( "slow", 0 );

	})





/** 
 * The event handler for the link's onclick event. We give THIS as a
 * parameter (=the link element), ID of the canvas and a filename.
*/
	$('#genCloud').on('click', function() {
	  setTimeout(downloadCanvas,5000);

	});
              
});


function downloadCanvas() {
	filename = localStorage.id + '.png';
    link = document.getElementById('save-canvas');

    link.href = document.getElementById('myCanvas').toDataURL();
    link.download = filename;
    $('#save-canvas').css({'display':'block'});
}







