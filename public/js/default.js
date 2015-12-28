function switchPages(event) {
  var navigationBar = document.getElementById('navigation');
  var pages = document.getElementsByClassName('page');
  for (var i=0; i<pages.length; i++) {
    if (event.target.getAttribute('data-page') === pages[i].getAttribute('data-page')) {
      pages[i].classList.add('show');
      pages[i].classList.remove('hidden');
    } else {
      pages[i].classList.remove('show');
      pages[i].classList.add('hidden');
    }
  }
}

document.getElementById('navigation').addEventListener('click', switchPages)