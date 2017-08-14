console.log("js file working");


$("#submit").on("click", function() {
	event.preventDefault();
	console.log("button Working")
	var newProfile = {
		name: $("input[name='name']").val().trim(),
		photoLink: $("input[name='photoLink']").val().trim(),
		scores: [
			$("input[name='q1']:checked").val(),
			$("input[name='q2']:checked").val(),
			$("input[name='q3']:checked").val(),
			$("input[name='q4']:checked").val(),
			$("input[name='q5']:checked").val(),
			$("input[name='q6']:checked").val(),
			$("input[name='q7']:checked").val(),
			$("input[name='q8']:checked").val(),
			$("input[name='q9']:checked").val(),
			$("input[name='q10']:checked").val()
		]
	}
	console.log(newProfile);

	var currentURL = window.location.origin;
	console.log(currentURL)

	 $.post(currentURL + "/api/friends", newProfile,
	    function(data){

	    	var results = data.split(",");
	    	var name = results[0];
	    	var link = results[1];
	    	console.log(results);
	    	$("#bestMatchName").html(name);
	    	$("#bestImage").attr("src", link)

	    	
	   });
	$("#bestMatch").show();
	$("input[name='name']").val("");
	$("input[name='photoLink']").val("");
});

$("#exit").on("click", function() {
	$("#bestMatch").hide();
})