const countryList = ["Afghanistan", "Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan",
                    "The Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Bonaire","Botswana","Brazil","British Virgin Islands","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi",
                    "Cabo Verde","Cambodia","Cameroon","Canada","The Cayman Islands","The Central African Republic","Chad","Chile","China","Christmas Island","The Cocos Islands","Colombia","Congo","Democratic Republic of Congo","The Cook Islands","Costa Rica","Côte D'Ivoire","Croatia","Cuba","Curaçao","Cyprus","Czechia",
                    "Denmark","Djibouti","Dominica","Dominican Republic",
                    "Ecuador","Egypt","El Salvador","England","Eritrea","Equatorial Guinea","Estonia","Ethiopia","European Union",
                    "The Falkland Islands","The Faroe Islands","Fiji","Finland","France","French Guiana","French Polynesia","The French Southern Territories",
                    "Gabon","Gambia","Guadeloupe","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana",
                    "Haiti","Heard Island and McDonald Islands","The Holy See","Honduras","Hong Kong","Hungary",
                    "Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy",
                    "Jamaica","Japan","Jersey","Jordan",
                    "Kazakhstan","Kenya","Kosovo","Kuwait","Kyrgyzstan",
                    "Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg",
                    "Macao","Republic of North Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","The Marshall Islands","martinique","Mauritania","Mauritius","Mexico","The Federated States of Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar",
                    "Namibia","Nepal","Netherlands","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Northern Ireland","Norway",
                    "Oman",
                    "Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico",
                    "Qatar",
                    "Réunion","Romania","Russian Federation","Rwanda",
                    "Saint Barthélemy","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Scotland","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","The Republic Of Korea","North Korea","Spain","Sri Lanka","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Saint Lucia","Sudan","Suriname","Eswatini","Sweden","Switzerland","Syrian Arab Republic",
                    "Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","The Turks and Caicos Islands",
                    "Uganda","Ukraine","United Arab Emirates","The United Kingdom","The United States of America","Uruguay","Uzbekistan",
                    "Venezuela","Vietnam","US Virgin Islands",
                    "Wales","Western Sahara",
                    "Yemen",
                    "Zambia","Zimbabwe"];

// Add random flag to page

let selectedCountry;
const flag = document.querySelector(".flag");

const getRandomFlag = async () => {
    selectedCountry = countryList[Math.floor(Math.random()*countryList.length)];

    await fetch(`https://countryflagsapi.com/png/${selectedCountry}`)
        .then(response => {
            console.log(response)
            flag.src = response.url
        });

        getPossibleAnswers()
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
    document.querySelector('.options-total').innerHTML = `${countryList.length} options`;

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