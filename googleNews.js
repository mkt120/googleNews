const URL_NEWS_API = "URLを張り付ける";

// padidng は top right bottom left
const CLASS_NEWS_ITEM_VIEW = "NewsItemView";
const CLASS_NEWS_ICOM_VIEW = "NewsIconView";
const CLASS_NEWS_IMG = "NewsImg";

window.addEventListener('load', function(){
  requestAjax(URL_NEWS_API, function(response){
    
    for (var i in response.articles) {
      var div = createNewsItem(document, response.articles[i]);
      document.body.appendChild(div);
    }
  });
});


function createNewsItem(document,article) {
  var div = document.createElement("div");
  div.setAttribute('class', CLASS_NEWS_ITEM_VIEW);

  var childView = document.createElement("span");
  childView.setAttribute('class', CLASS_NEWS_ICOM_VIEW);
  
  // サムネイル
  var img = document.createElement("img");
  img.setAttribute('class', CLASS_NEWS_IMG);
  img.src = article.urlToImage;
  
  childView.appendChild(img);

  div.appendChild(img);

  var text = document.createElement("span");
  text.innerHTML = article.title;
  console.log(article.title)
  div.appendChild(text);
  return div;
}

var requestAjax = function(endpoint, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (this.readyState==4 && this.status==200) {
            callback(this.response);
        }
    };
    xhr.responseType = 'json';
    xhr.open('GET',endpoint,true);
    xhr.send();
};

