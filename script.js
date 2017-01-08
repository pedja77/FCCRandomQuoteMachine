window.onload = function(){

  function getFortune() {
    let randCategory = Object.keys(fortunes)[Math.floor(Object.keys(fortunes).length * Math.random())];
    let randIndex = Math.floor(fortunes[randCategory].length * Math.random());
    return fortunes[randCategory][randIndex];
  }
  let quote = document.getElementById('quote');
  quote.innerHTML = getFortune();
  //document.write(randFortune);
}
