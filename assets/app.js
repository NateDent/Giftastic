$(document).ready(function() {
    var topics = ['aint got time', 'the office', 'steve irwin', 'cars'];
    var stillImgUrl = '';
    var animateImgUrl = '';
    var gifCondition = '';
    var stillUrl = '';
    var animateUrl = '';
    var createBtn = function() {
        //clear btn-section
        $('#btn-section').empty();
        //Create new buttons based on elements in array
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $('<button>');
            newBtn.attr('data-name', topics[i]);
            //Add class to button
            newBtn.attr('class', 'gif');
            newBtn.text(topics[i]);
            $('#btn-section').append(newBtn);
        }
    }

$('#submit-btn').on('click', function(event) {
    submit();
});

//checks for keystroke "enter"
$(".search").keydown(function(event){
    if(event.keyCode == 13){
        console.log("working");
        submit();
        $('.search').val("");
        return false
    }
});

        //Get input text value,push to array, add button
    var submit = function() {
            event.preventDefault();
            var inputVal = $('#userInput').val();
            topics.push(inputVal);
            createBtn();
            console.log(inputVal);
            console.log(topics);
    }
    var displayGif = function() {
        //Gets the value of the button that is clicked
        var btnVal = $(this).data('name');
        //Api URL and key to use 'GET' method
        var apiKey = 'dc6zaTOxFJmzC';
        var apiUrl = 'https://api.giphy.com/v1/gifs/search?q=' + btnVal + '&api_key=' + apiKey;
        $.ajax({
            url: apiUrl,
            method: 'GET'
        }).done(function(response) {
            //removes images when new btn is clicked adds new H1
            $('.gifSection').empty();
            let newH1 = $('<h1>');
                newH1.html(btnVal);
                newH1.attr('class', 'text-center');
            $('.gifSection').append(newH1);

            for (var i = 0; i < 10; i++) {
                //Still & Animated Images
                stillImgUrl = response['data'][i]['images']['fixed_height_still']['url'];
                animateImgUrl = response['data'][i]['images']['fixed_height']['url'];
                //rating
                var rating = response['data'][i]['rating'];
                //Assign image element to newImg vari
                var newDiv = $('<div>'); 
                var newP = $('<p>'); 
                var newImg = $('<img>');
                newImg.attr('data-still', stillImgUrl);
                newImg.attr('data-animate', animateImgUrl);
                newImg.attr('src', stillImgUrl);
                newImg.attr('data-type', 'still');
                newImg.addClass('gifImage');
                //Give p element the rating texts
                newP.html('Giphy Rating: ' + rating);
                $(newP).appendTo(newDiv)
                $(newImg).appendTo(newDiv);
                $('.gifSection').append(newDiv); 
            }
        });
    }
    var gifAnimate = function() {
        //sets gifCondition to either still or animate
        gifCondition = $(this).data('type');
        stillUrl = $(this).data('still');
        animateUrl = $(this).data('animate');
        if (gifCondition === 'still') {
            //Changes the gif to an animated image 
            $(this).attr('src', animateUrl);
            //Switch the data-type to animate
            $(this).data('type', 'animate');
            console.log(gifCondition);
        } else if (gifCondition === 'animate') {
            //Change src 
            $(this).attr('src', stillUrl);
            $(this).data('type', 'still');
            console.log(gifCondition);
        }
    }

    createBtn();
    $(document).on('click', '.gif', displayGif);
    $(document).on('click', '.gifImage', gifAnimate);
});