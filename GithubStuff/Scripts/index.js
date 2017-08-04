$(function () {
    var data;
    var starsAsc = false;
    var watchAsc = false;
    $("#search").on('click', function () {
        var parameters = { username: $("#username").val() };
        $.get("/home/getuser", parameters, function (user) {
            $.get("/home/getrepos", parameters, function (repos) {
                data = { User: user, Repos: repos };
                fillResults(data);
            });
        }); 
    });

    function fillResults(results) {
        var { Name, Location, Followers } = results.User;
        $("#userInfo").text(`${Name} ${Location} ${Followers}`);

        $("table tr:gt(0)").remove();
        results.Repos.forEach(function (repo) {
            $("table").append($("<tr><td>" + repo.Name + "</td><td>" + repo.Description + "</td><td>" + repo.Stars + "</td><td>" + repo.Watchers + "</td></tr>"));
        });
    }

    $("#sortStars").on('click', function () {
        if (!data) {
            return;
        }

        data.Repos.sort(function (a, b) {
            return starsAsc ? a.Stars - b.Stars : b.Stars - a.Stars;
        });
        starsAsc = !starsAsc;
        fillResults(data);
    });

    $("#sortWatchers").on('click', function () {
        if (!data) {
            return;
        }

        data.Repos.sort(function (a, b) {
            return watchAsc ? a.Watchers - b.Watchers : b.Watchers - a.Watchers;
        });
        watchAsc = !watchAsc;
        fillResults(data);
    });

    $("#username").on('keyup', function(e) {
        if (e.keyCode === 13) {
            $("#search").click();
        }
    });

});