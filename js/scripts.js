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
	$('#box3').attr('name', movieIndex);

	$('#box2').hide();
	$('#box3').show();

	var printTimes = "";
	movie.times.forEach(function(time) {
		printTimes += '<div class="form-check"><input class="form-check-input" name="showtime" type="radio" value="' + time + '"><label class="form-check-label" for="q1-1">' + 
		  time + ':00</label> </div>';
	});

	$('.movie-name').html(movie.name);
	$('.movie-time').html(printTimes);
	$('.movie-img').attr("src", movie.img);
	$('.movie-brief').html(movie.brief);
}

function MovieTicket(name, time, age, type) {
	this.normalPrice = 10;
	this.name = name;
	this.time = time;
	this.age = age;
	this.type = type;
}

MovieTicket.prototype.update = function(name, time, age, type) {
	this.name = name;
	this.time = time;
	this.age = age;
	this.type = type;
};

MovieTicket.prototype.getPrice = function() {
	var discount = 0
	//eval for age
	if (this.age === 12) {
		discount += 5;
	} else if (this.age === 64) {
		discount += 1;
	}
	//eval for matinee dicount
	if (this.time <= 4) {
		discount += 2;
	}
	//eval for classic discount
	if (this.type === "classic") {
		discount +=3;
	}
	return this.normalPrice - discount;
};

function makeTicket() {
	var timeSelection = $("input[name='showtime']:checked").val();
	var boxNameValue = $('#box3').attr('name');
	var ageDiscount = $('#age option:selected').val();
	ticket.update(movies[boxNameValue].name, parseInt(timeSelection), parseInt(ageDiscount), movies[boxNameValue].type);

	var ticketPrice = ticket.getPrice();
	$("#box4output").text('Current ticket price: $' + ticketPrice + '.00');
	$('#box3').hide();
	$('#box4').show();
}

//Start ticket object
var ticket = new MovieTicket();

// initial click function to choose new or classic movie list
$(document).ready(function() {
	$('#findBtn').click(function(){
		makeTicket();
		console.log(ticket);
	});

	$('#classic').click(function() {
		printMovieList('classic');
		attachListener();
		$('#box2').show();
		$('#box3').hide();
		$('#box4').hide();
	});
	$('#newrelease').click(function() {
		printMovieList('newrelease');
		attachListener();
		$('#box2').show();
		$('#box3').hide();
		$('#box4').hide();
	});
});
