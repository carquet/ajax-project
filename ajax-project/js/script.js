
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    
    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    var address = $street + " " + $city;
    $greeting.text('So, you want to live in ' + address + '?');

    var addressUrl = "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=" + address + "";
    $body.append('<img class="bgimg" src="'+ addressUrl + '">');
    
    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + $city + '&sort=newest&api-key=4c810a6f5ef448ebad93168acccac947'

    // performance of getjson: 1.17s
    $.getJSON(nyTimesUrl, function(response) {
            $nytHeaderElem.text('New York Times articles about ' + $city);
            var data = response;
            var articles = data.response.docs
            articles.forEach(function(article){
                console.log()
                var htmlArticles = `<li class="article">`+ 
                                        `<a href="`+ article.web_url +`">` + article.headline.main + `</a>` +
                                        `<p>` + article.snippet + `</p>` +
                                    `</li>`

                $('#nytimes-articles').append(htmlArticles)
            })
    }).error(function(e){
        $nytHeaderElem.text("The information could not be loaded")
    });

 // load wikipedia data
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + $city + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            console.log(response)
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });


    return false;

};

    


$('#form-container').submit(loadData);
