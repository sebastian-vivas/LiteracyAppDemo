const heart = document.getElementsByClassName("fas fa-heart");
const trash = document.getElementsByClassName("fa-trash");
const resetName = document.getElementsByClassName("resetName");
const deleteAccount = document.getElementsByClassName("deleteAccount");

Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const heart = this.parentNode.parentNode.childNodes[5].innerText
        fetch('messages', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'heart': heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        fetch('messages', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(deleteAccount).forEach(function(element) {
      element.addEventListener('click', function(){
        const email = document.getElementById('delete').innerText.value
        fetch('/deleteAccount', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'email': email
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

Array.from(resetName).forEach(function(element) {
      element.addEventListener('click', function(){
        const displayName = this.parentNode.childNodes[3].innerText
        fetch('/resetName', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'displayName': displayName
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});

function switchTab(evt, tab) {
  let i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tabLinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  document.getElementById(tab).style.display = "block";
  evt.currentTarget.className += " active";
}
