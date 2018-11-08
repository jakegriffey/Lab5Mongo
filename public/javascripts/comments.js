$(document).ready(function() {
    $("#postComment").click(function() {
        var name = $("#name").val();
        var comment = $("#comment").val();

        if (name.length > 0 && comment.length > 0) {
            var myobj = { Name: name, Comment: comment };
            var jobj = JSON.stringify(myobj);
            $("#json").text(jobj);

            var url = "comment";
            $.ajax({
                url: url,
                type: "POST",
                data: jobj,
                contentType: "application/json; charset=utf-8",
                success: function(data, textStatus) {
                    $("#done").html(textStatus);
                    $("#name").val("");
                    $("#comment").val("");
                }
            });
        }
    });

    $("#getComments").click(function() {
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul class = \"list-unstyled\" >";
            for (var comment in data) {
                var com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        });
    });

    $("#getUserComments").click(function() {
        var username = $("#username").val();
        if (username.length > 0) {
            var url = "userComment?q=" + username;
            $.getJSON(url, function(data) {
                console.log(data);
                $("#username").val("");
                var everything = "<ul class = \"list-unstyled\" >";
                for (var index in data) {
                    var com = data[index];
                    everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
                }
                everything += "</ul>";
                $("#userComments").html(everything);
            });
        }
        
        event.preventDefault();
    });

    $("#deleteComments").click(function() {
        var url = "deleteComments";
        $.ajax({
            url: url,
            type: "DELETE",
            success: function(data, textStatus) {
                console.log("Delted all comments");
                $("#userComments").html("");
                $("#comments").html("");
                $("#json").text("");
                $("#done").html("");
            }
        });
    });
});
