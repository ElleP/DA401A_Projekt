<!--HTMLfile for Instantify questions screen-->
<!DOCTYPE html>
<html ng-app="app">

<!--Include of header-file-->
<?php include('header.php');?>
		<div ng-controller="FirebaseController" class="container-fluid">
			<div id="row">
				<div class="col-md-6 col-md-offset-3">
					<div ng-controller="MessageController" class="box">
						<div class="header-question">
							<h2>{{msgCreate}}</h2>
						</div>
						<div class="body-question">
							<form>
								<input ng-model="courseID" id="courseID" type="text" placeholder={{msgID}}></input>
								<input ng-model="question" id="question" type="text" placeholder={{msgInput}}></input>

								<input type="button" ng-click="submitData(courseID, question)" value={{btnSubmit}}></input>
								<input ng-controller="SaveController" type="button" class="hide-element" ng-click="saveData(courseID, question)" value={{btnSave}}></input>
							</form>
						</div>
						<div class="view-question">



						</div>
					</div><!--End of .box-->
				</div><!--End of .col-->
			</div><!--End of .row-->
		</div><!--End of wrapper-->
	</body>
</html>