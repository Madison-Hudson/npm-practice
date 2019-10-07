var books = [{
  title: 'Harry Potter',
  author: 'J.K. Rowling',
  imageURL: 'https://books.google.com/books/content?id=WV8pZj_oNBwC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  isbn: '9781921479311',
  pageCount: 268
}];

var renderBooks = function () {
  $('.books').empty();

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);

  for (var i = 0; i < books.length; i++) {
    $('.books').append(template({
      title: books[i].title,
      author: books[i].author,
      pageCount: books[i].pageCount,
      isbn: books[i].isbn,
      imageURL: books[i].imageURL
    }))
  }
}

var addBooks = function (data) {
  books = [];

  for (var i = 0; i < data.items.length; i++) {
    var bookData = data.items[i];

    var book = {
      title: bookData.volumeInfo.title || null,
      author: bookData.volumeInfo.authors ? bookData.volumeInfo.authors[0] : null,
      imageURL: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : null,
      pageCount: bookData.volumeInfo.pageCount || null,
      isbn: bookData.volumeInfo.industryIdentifiers ?
        bookData.volumeInfo.industryIdentifiers[0].identifier : null
    };

    books.push(book);
  }

  renderBooks();
};

var fetch = function (query) {

  $('#loader').css("display", "block")
  var searchURL = "https://www.googleapis.com/books/v1/volumes?q=" + query

  $.ajax({
    method: "GET",
    url: searchURL,
    dataType: "json",
    success: function (data) {
      addBooks(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }
  });
  $('#loader').css("display", "none")
};

$('.search').on('click', function () {
  var search = $('#search-query').val();

  fetch(search);
});


renderBooks();