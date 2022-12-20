

// Add random flag to page

let countryList = ["Afghanistan", "Albania","Algeria","Andorra","Angola","Anguilla","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan",
                    "The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi",
                    "Cambodia","Cameroon","Cabo Verde","The Cayman Islands","Chad","Chile","China","Colombia","Democratic Republic of Congo","The Cook Islands","Costa Rica","Côte D'Ivoire","Croatia","Cuba","Cyprus","Czechia",
                    "Denmark","Djibouti","Dominica","Dominican Republic",
                    "Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia",
                    "The Falkland Islands","The Faroe Islands","Fiji","Finland","France","French Polynesia","The French Southern Territories",
                    "Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana",
                    "Haiti","Honduras","Hong Kong","Hungary",
                    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy",
                    "Jamaica","Japan","Jersey","Jordan",
                    "Kazakhstan","Kenya","Kuwait","Kyrgyzstan",
                    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
                    "Macau","Republic of North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique",
                    "Namibia","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway",
                    "Oman",
                    "Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico",
                    "Qatar",
                    "Réunion","Romania","Russian Federation","Rwanda",
                    "Saint Pierre and Miquelon","Samoa","San Marino","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Saint Lucia","Sudan","Suriname","Eswatini","Sweden","Switzerland","Syrian Arab Republic",
                    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","The Turks and Caicos Islands",
                    "Uganda","Ukraine","United Arab Emirates","The United Kingdom of Great Britain and Northern Ireland","Uruguay","Uzbekistan",
                    "Venezuela","Vietnam","US Virgin Islands",
                    "Yemen",
                    "Zambia","Zimbabwe"];
let selectedCountry;
const flag = document.querySelector(".flag");

const getRandomFlag = () => {
    selectedCountry = countryList[Math.floor(Math.random()*countryList.length)];
    flag.src = `https://countryflagsapi.com/png/${selectedCountry}`;
    getPossibleAnswers();

    console.log(selectedCountry);
};

// Add possible answers to page

const userInput = document.querySelector('.user-input');

const getPossibleAnswers = () => {
    let counter = 1;
    let possibleAnswerArray = [];
    possibleAnswerArray.push(selectedCountry);

    while(possibleAnswerArray.length < 3) {
        let possibleAnswer = countryList[Math.floor(Math.random()*countryList.length)]
        
        // only add possible answer if it isn't already used this round
        !possibleAnswerArray.includes(possibleAnswer) &&
            possibleAnswerArray.push(possibleAnswer);
    }

    possibleAnswerArray.sort();

    userInput.innerHTML = possibleAnswerArray.map((option) => { 
        return `<li>
                    <button class="choice" value="${option}"onClick="checkAnswer(value)">
                        <span class="option">${counter++}</span>${option}
                    </button>
                </li>`
    }).join('');
};


// Display the result

const outcome = document.querySelector('.outcome');

const checkAnswer = (answer) => {    
    outcome.innerHTML = selectedCountry
    outcome.style.display = 'block';
    
    if (answer == selectedCountry) {
        outcome.style.background = 'var(--green)';
    } else if (answer !== selectedCountry) {
        outcome.style.background = 'var(--red)';
    }
    updateScore(answer);
};


// Update the score

    let correctScore = 0;
    let wrongScore = 0;
    let correct = document.querySelector('.correct');
    let wrong = document.querySelector('.wrong');

    correct.innerHTML =  `${correctScore} right`;
    wrong.innerHTML = `${wrongScore} wrong`;

const updateScore = (answer) => {
    if (answer == selectedCountry) {
        correctScore++;
        correct.innerHTML = `${correctScore} right`;
    } else if (answer !== selectedCountry) {
        wrongScore++
        wrong.innerHTML = `${wrongScore} wrong`;
    }
    setTimeout(() => {newRound()}, 2500);
};

const newRound = () => {
    outcome.style.display = 'none';
    getRandomFlag();
}

const reset = () => {
    window.location.reload
}

getRandomFlag();