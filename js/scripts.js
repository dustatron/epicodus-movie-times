function printMovieList(option) {
	var movieOptions = [];

	movies.forEach(function(movie, index) {
		if (movie.type === option) {
			movieOptions.push("<li id='" + index + "'>" + "<img src='" + movie.img + "'>" + movie.name + ' </li>');
		}
	});
	$('#box2--movie-list').html(movieOptions.join(''));
}

function attachListener() {
	$("ol").on("click", "li", function() {
		showMovieDetails(this.id);
	});
}

function showMovieDetails(movieIndex) {
	var movie = movies[movieIndex];
	$('.movie-name').html(movie.name);
	$('.movie-time').html(movie.time);
	// $('.movie-img').html(movie.img);
	$('.movie-brief').html(movie.brief);

}

// initial click function to choose new or classic movie list
$(document).ready(function() {
	$('#classic').click(function() {
		printMovieList('classic');
		attachListener();
	});
	$('#newrelease').click(function() {
		printMovieList('newrelease');
		attachListener();
	});
});
