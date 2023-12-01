let resultsContainer = document.getElementsByClassName("container")[0]
const regex=/^\s*$/;

const validateInput = (el) => {
    if(regex.test(el.value)){
        resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
    }else{
        // default search
        // console.log(el.value); // to see what happen in console
        // generateResults(el.value, el) //that send new request for each new character
    
        //Debounce
        updateDebounce(el.value, el);
    }
}

const generateResults = (searchValue, inputField) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
    .then(response => response.json())
    .then(data => {
        let results = data.query.search
        let numberOfResults = data.query.search.length
        resultsContainer.innerHTML = ""
        for(let i=0; i<numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
        }
        if(inputField.value === ""){
            resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
        }
    })
}
const Debounce=function(cb,delay=1000){
    let timeout;
    return(searchValue, inputField)=>{
        clearTimeout(timeout);
        timeout=setTimeout(()=>{
            cb(searchValue,inputField);
        },delay)
    }
}
const updateDebounce=Debounce(generateResults);