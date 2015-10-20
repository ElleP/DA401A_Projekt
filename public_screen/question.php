<!--HTMLfile for Instantify questions screen-->

<!DOCTYPE html>
<html ng-app="app">

<!--Include of header-file-->
<?php include('header.php');?>

		<div class="container-fluid">
			<div id="row">
				<div class="col-md-6 col-md-offset-3">
					<div class="box" ng-controller="MessageController">
						<h2>{{msgCreate}}</h2>
						<form method="" action="">
                             <!--End of .boxtype="text" name="question_input" id="question_input" placeholder="Type question here"-->
							<input>{{msgInput}}</input>
							<button>{{btnSave}}</button>
						</form>
					</div><!--End of .box-->
				</div><!--End of .col-->
			</div><!--End of .row-->
		</div><!--End of wrapper-->
	</body>
</html>