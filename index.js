index = {

  bindEvents: function () {
    $('.search-query').keyup(function(event) {
      if(event.target.value) {
        $('.search-submit').attr('disabled', false)
        return
      }

      $('.search-submit').attr('disabled', true)
    })

    
  }
}
