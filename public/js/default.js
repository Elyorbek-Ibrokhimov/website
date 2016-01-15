
function historyToggle () {
  $(document).ready(function () {
    $('#filters').toggleClass('hidden');
    $('#history-table').slideToggle()
    $('#data-table').slideToggle() 
  })
}

function filterByName (name) {
  var allCells = document.getElementsByClassName('cell');
  _.each(allCells, function (eachCell) {
    if (name === 'hideAll') {
      console.log(name);
    }
    else if (eachCell.getAttribute('data-filter') === name) {
      eachCell.classList.toggle('hidden');
    }    
  })  
}
