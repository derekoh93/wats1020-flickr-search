// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.
    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`
        //

        //

        //  
    // Function to get response from Flickr in terms of user searches.
    var searchImages = function(tags){
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
      var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
      $.getJSON(flickerAPI, {
        tags: tags,
        tagmode: "any",
        format: "json"
      })
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.
      .done(function (data) {
        $('#images').empty();
        $('h1.search-title').first()[0].innerHTML = "Search for: " + tags;
        $.each( data.items, function(i, item){
          //gives information for each photo that is displayed
          var newItem = $("<li>");
          var newTitle = $('<p class="image-title">').html (item.title).appendTo(newItem);
          var newDate = $('<p class="image-date">').text(item.date_taken).appendTo(newItem);
          var newDescription = $('<p class="image-description">').html(item.description).appendTo(newItem);
          var newAuthor = $('<p class="image-author">').html(item.author).appendTo(newItem);
          var newLink = $("<a>").attr("href", item.link).text("View on Flickr.").appendTo(newItem);
          
          newItem.appendTo( "#images" );
          //limits # of photos
          if (i === 15) {
            return false;
          }
        })
      })
    }



    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.
    $('button.search').on('click', function(event) {
      event.preventDefault();
      //deletes past pictures when a new search is performed
      var searchTextInput = $(".navbar-form").find('input[name="searchText"]')[0];
      searchImages(searchTextInput.value);
    })
        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



});
