function addReview(){
    document.getElementById('submitButton').addEventListener('click', function() {
        document.getElementById('rev').innerHTML = document.getElementById('reviewBox').value.trim()
      })

      console.log("test");
}