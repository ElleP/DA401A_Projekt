<!--HTMLfile for Instantify questions screen-->
<!DOCTYPE html>
<html ng-app="app">

<!--Include of header-file-->
<?php include('header.php');?>
		<div ng-controller="FirebaseController" class="container-fluid">
			<div id="row">
				<div class="col-md-6 col-md-offset-3">
					<div ng-controller="MessageController" class="box">
						<h2>{{msgCreate}}</h2>
						<form>
							<input ng-model="courseID" type="text" placeholder={{msgID}}></input>
							<input ng-model="question" type="text" placeholder={{msgInput}}></input>
							<input type="button" ng-click="submitData(question)" value={{btnSave}}></input>
						</form>
					</div><!--End of .box-->
				</div><!--End of .col-->
			</div><!--End of .row-->
		</div><!--End of wrapper-->
	</body>
</html>