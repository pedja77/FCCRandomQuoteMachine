window.onload = function(){

  let quote = document.getElementById('quote');
  let help = `Type 'help' in terminal for this list of commands.
              fortune  - show the next quote
              category - followed by space separated list of categories
                         you want to see quotes from (ex. category art pets),
                         or 'category all' to switch all categories on\n\n`;
  let prompt = '\nuser@rfg:$ ';

  let selectedCategories = categories();

  function categories () {
    // Get selected categories and return them in array
    return Array.from(document.getElementsByClassName("category"))
                .filter(e => e.checked === true)
                .map(e => e.id);//Object.keys(fortunes);
  }

  function getFortune() {
    // Get random fortune from selected categories
    if (selectedCategories.length === 0)
      return false;
    let randCategory = selectedCategories[Math.floor(selectedCategories.length * Math.random())];
    console.log('randCategory', randCategory);
    let randIndex = Math.floor(fortunes[randCategory].length * Math.random());
    let fortune = 'Category: ' + randCategory + '\n' +
                   fortunes[randCategory][randIndex];
    return fortune;
  }

  function appendFortune(fortune, blank='') {
    quote.value += blank + fortune + prompt;
    quote.scrollTop = quote.scrollHeight;
    //console.log('focus', quote);
    quote.focus();
  }

  function show() {
    // Show fortune from one of selected categories. All categories are selected on page load
    let fortune = getFortune();
    if (fortune)
      appendFortune(fortune, '\n');
    else
      appendFortune(help, '\n');
    }

  function setup() {
    // Setup textarea
    quote.spellcheck = false;
    quote.value = help;
    show();
    //quote.value += prompt;
    quote.focus();
  }

  function selectCheckboxes(comArgs) {
    console.log('comArgs', selectedCategories)
    let categories = Array.from(document.getElementsByClassName('category'))
    if(comArgs.length) {
      selectedCategories = comArgs;
      categories = categories.map(e => { if (comArgs.includes(e.id))
                                           e.checked = true;
                                         else
                                           e.checked = false;
                                        });
                                      }
    else {
        categories = categories.map(e => e.checked = true);
        selectedCategories = Object.keys(fortunes);
    }
  }


  function onKeyUp(e){
    if (e.key === "ArrowUp" || e.key === "Up")
      e.preventDefault();

  }

  function onEnter(e) {
    if (e.key === "Enter") {
      let lines = quote.value.split('\n');
      //console.log(lines);
      if (lines.length) {
        let lastLine = lines[lines.length - 1].replace(prompt.slice(1), '')
                                              .trim()
                                              .toLowerCase();
        console.log(lastLine);
        let commands = lastLine.split(' ');
        console.log(commands[0]);
        switch (commands[0]) {
          case 'fortune': e.preventDefault();
                          show();
                          break;
          case 'category':
                           let comArgs = commands.slice(1);
                           if (arguments.length) {
                             if (comArgs[0] === 'all'){
                               selectCheckboxes([]);
                               //console.log(comArgs);
                             } else {
                               selectCheckboxes(comArgs);
                             }
                             e.preventDefault();
                             quote.value += prompt;
                             quote.scrollTop = quote.scrollHeight;
                             quote.focus();
                             break;
                           }

          default: e.preventDefault();
                   appendFortune(help, '\n');
        }
      }

    }
  }

  setup();

  // Event listeners
  document.getElementById("next-fortune").addEventListener("click", show);
  Array.from(document.getElementsByClassName("category")).forEach(check =>
                      check.addEventListener("click", function(){
                                        selectedCategories = categories();
                                        //console.log(selectedCategories);
                                      }));
  quote.addEventListener("keydown", onKeyUp);
  quote.addEventListener("keypress", onEnter);
}
