//Captains Log: Lines 52-67 I commented out some possible ways I was trying to get user input to display 
//a new button but got stuck along the way. I was unable to do the bonus. I would like to learn how to 
//get the user input to appear as a new button. 


$(document).ready(function () {
    var topics = ["coffee", "dogs", "cats", "nerds", "simpsons", "family guy", "chuck norris", "batman", "pokemon", "dbz"]

    var API_KEY = "LZIwckN56pSuLgxseZy0SZbHTjDPEfzg";
    var requestUrl = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&rating&limit=10&q=";

    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-info");
        button.text(topics[i]);
        //create one event handler for all buttons: BONUS!
        button.on("click", function () {
            $("#gifs").empty();
            $.ajax({
                method: "GET",
                url: requestUrl + $(this).text()
            }).then(function (response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    var img = createImage(response, i);



                    //BONUS: Try to make an event handlerfor all img's
                    //FIX: Images should start still    
                    img.on("click", function () {
                        var state = $(this).attr("data-state");//creating variable state and asigning it the value of data-state which is animated
                        console.log(state); // should output animated as a value
                        //if the data-state is animate
                        if (state === "animated") {
                            //change data-state to still
                            $(this).attr("data-state", "still");
                            //change src to still version
                            $(this).attr("src", $(this).attr("data-still"));

                        } else {

                            //else change state to animated
                            $(this).attr("data-state", "animated");
                            //change src to still version
                            $(this).attr("src", $(this).attr("data-animated"));
                        }
                    });


                    $("#gifs").append(img);
                }
            });
            //Get user input to create new Gif button
            // $(function () {
            //     var newForm = $("#search-form");
            //     var userInput = $("#user-input");

            //     newForm.on("click", function (event)) {
            //         var userText = userInput.val();
            //         userText.addClass("btn btn-info");
            //         userInput.val('');
            //     };
            // }  
            //or maybe this will add userinput into a new button
            // $("#submit").on("click", function (event) {
            //     event.preventDefault();

            // })

        });
        $("#buttons").append(button);

    }

    function createImage(response, i) {
        var img = $("<img>");
        // set the src of the element
        img.attr("src", response.data[i].images.downsized_still.url);
        img.attr("data-animated", response.data[i].images.downsized.url);
        img.attr("data-still", response.data[i].images.downsized_still.url);
        img.attr("data-state", "animated");

        var gifCard = $("<div class='gif-card'>");
        var rating = $("<p>");

        gifCard.append(img);
        rating.append("Rating: " + response.data[i].rating);
        console.log(response.data[i].rating);
        gifCard.append(rating);

        return gifCard;
    };
});
