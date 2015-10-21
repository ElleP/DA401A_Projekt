<!--HTMLfile for Instantify questions screen-->
<!DOCTYPE html>
<html ng-app="app">

<!--Include of header-file-->
<?php include('header.php');?>
		<div ng-controller="FirebaseController" class="container-fluid">
			<div id="row">
				<div class="col-md-12">
					<div ng-controller="MessageController as Ctrl" class="row">
						<div class="col-md-5 box-add">
							<div class="header-question">
								<h2>{{Ctrl.msgCreate}}</h2>
							</div>
							<div class="body-question">
								<form>
									<input ng-model="courseID" id="courseID" type="text" placeholder={{Ctrl.msgID}}></input>
									<input ng-model="question" id="question" type="text" placeholder={{Ctrl.msgInput}}></input>
									<input type="button" ng-click="submitData(courseID, question)" value={{Ctrl.btnSubmit}}></input>
									<input ng-controller="SaveController" type="button" class="hide-element" ng-click="saveData(courseID, question);getListData(courseID)" value={{Ctrl.btnSave}}></input>
								</form>
							</div><!--End of .body-queestion-->
						</div><!--End of .box-add-->
						<div class="col-md-6 col-md-offset-2 box-view">
							<div class="view-question">
								<div class="header-view-question">
									<h2>View saved questions</h2>
								</div>
								<div class="body-view-question">
									<!--<h3>Please enter courseID to get saved questions</h3>
									<input type="button" value="Send to Firebase" ng-click="sendAll()"></input>-->
								</div>

							</div>
						</div> <!--end of .box-view-->
					</div><!--End of .row-->
				</div><!--End of .col-->
			</div><!--End of .row-->
		</div><!--End of wrapper-->
	</body>
</html>