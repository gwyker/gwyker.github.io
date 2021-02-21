function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

function changeSize(evt, size) {
    var styles = `
        .merch-grid-item {
    `
    // Change the size of each cell
    document.getElementsByTagName('body')[0].className = size
    // Change color of tab
    document.getElementsByClassName('taboptions')
    // Get all elements with class="taboptions" and remove the class "active"
    taboptions = document.getElementsByClassName("taboptions");
    for (i = 0; i < taboptions.length; i++) {
      taboptions[i].className = taboptions[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(size).style.display = "block";
    evt.currentTarget.className += " active";
//    document.getElementsByClassName('merch-grid-item').style.width = '400px'
//    items = document.getElementsByClassName('merch-grid-item')
//    for (var i=0, len=items.length|0; i<len; i=i+1|0) {
//        items[i].style.width = width
//    }
//    imgs = document.getElementsByTagName('img')
//    for (var i=0, len=imgs.length|0; i<len; i=i+1|0) {
//        imgs[i].style.width = width
}