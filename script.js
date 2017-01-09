window.onload = function(){

  function categories () {
    // Get selected categories nad return them in array
    return Array.from(document.getElementsByClassName("category"))
                .filter(e => e.checked === true)
                .map(e => e.id);//Object.keys(fortunes);
  }

  //let loaded = new Object(fortunes);
  let selectedCategories = categories();

  function getFortune() {
    // Get random fortune from selected categories
    if (selectedCategories.length === 0)
      return "You must choose at least one category!!!";
    let randCategory = selectedCategories[Math.floor(selectedCategories.length * Math.random())];
    let randIndex = Math.floor(fortunes[randCategory].length * Math.random());
    return randCategory + '\n' + fortunes[randCategory][randIndex];
  }

  function showFortune () {
    // Show fortune from one of selected categories. All categories are selected on page load
    let quote = document.getElementById('quote');
    quote.innerHTML = getFortune();
    // Following code is for testing purposes
    let fset = categories();
    console.log(fset);
    console.log(Object.keys(fortunes));
  }

  // Show fortune on page load
  showFortune();

  // Event listeners
  document.getElementById("next-fortune").addEventListener("click", showFortune);
  document.getElementById("categories").addEventListener("click", () => selectedCategories = categories());
}
