    
$("#scrape").on("click", function() {
    $.ajax({
      method: "GET",
      url: "/scrape"
    })
  });
  
  $(".note").on("click", function(){
      $.ajax({
          method: "GET",
          url: "/note"
      })
  })