<div class="container" data-ng-if="user.role.class === 'Player' || user.role.class === 'Coach'">

	<form ng-submit="postReq(player, staff, issue)">
		<div data-ng-if="user.role.class === 'Coach'">
			<h3><small>Select Your Player:</small></h3>
			<select ng-model="player">
				<option ng-repeat="player in players" value="{{player.email}}">{{player.lname}}, {{player.fname}}: {{player.role.position}} ({{player.email}})</option>
			</select>
		</div>

		<h3><small>Select Your Medical Staff:</small></h3>
		<select ng-model="staff">
			<option ng-repeat="staff in med_staff" value="{{staff.email}}">{{staff.lname}}, {{staff.fname}}: {{staff.role.position}} ({{staff.email}})</option>
		</select>
		<h3><small>Whats wrong?</small></h3><input type="text" ng-model="issue" size"150">
	  	<br><br>

	  	<input type="submit">
	</form>
</div>
