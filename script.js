

// Add random flag to page

let countryList = ["afghanistan", "albania","algeria","andorra","angola","anguilla","antigua and barbuda","argentina","armenia","aruba","australia","austria","azerbaijan","the bahamas","bahrain","bangladesh","barbados","belarus","belgium","belize","benin","bermuda","bhutan","bolivia","bosnia and herzegovina","botswana","brazil","british virgin islands","brunei","bulgaria","burkina faso","burundi","cambodia","cameroon","cabo verde","the cayman islands","chad","chile","china","colombia","democratic republic of congo","the cook islands","costa rica","côte d'ivoire","croatia","cuba","cyprus","czechia","denmark","djibouti","dominica","dominican republic","ecuador","egypt","el salvador","equatorial guinea","estonia","ethiopia","the falkland islands","the faroe islands","fiji","finland","france","french polynesia","the french southern territories","gabon","gambia","georgia","germany","ghana","gibraltar","greece","greenland","grenada","guam","guatemala","guernsey","guinea","guinea-bissau","guyana","haiti","honduras","hong kong","hungary","iceland","india","indonesia","iran","iraq","ireland","isle of man","israel","italy","jamaica","japan","jersey","jordan","kazakhstan","kenya","kuwait","kyrgyzstan","laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macau","republic of north macedonia","madagascar","malawi","malaysia","maldives","mali","malta","mauritania","mauritius","mexico","moldova","monaco","mongolia","montenegro","montserrat","morocco","mozambique","namibia","nepal","netherlands","new caledonia","new zealand","nicaragua","niger","nigeria","norway","oman","pakistan","palestine","panama","papua new guinea","paraguay","peru","philippines","poland","portugal","puerto rico","qatar","réunion","romania","russian federation","rwanda","saint pierre and miquelon","samoa","san marino","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore","slovakia","slovenia","south africa","south korea","spain","sri lanka","saint kitts and nevis","saint lucia","saint vincent and the grenadines","saint lucia","sudan","suriname","swaziland","sweden","switzerland","syria","taiwan","tajikistan","tanzania","thailand","Timor-leste","togo","tonga","trinidad and tobago","tunisia","turkey","turkmenistan","the turks and caicos islands","uganda","ukraine","united arab emirates","the united kingdom of great britain and northern ireland","uruguay","uzbekistan","venezuela","vietnam","virgin islands (us)","yemen","zambia","zimbabwe"];
let selectedCountry;
const flag = document.querySelector(".flag");
let usedCountries = [];

const getRandomFlag = () => {
    selectedCountry = countryList[Math.floor(Math.random()*countryList.length)];
    flag.src = `https://countryflagsapi.com/png/${selectedCountry}`;
    usedCountries.unshift(selectedCountry);
    getPossibleAnswers();

    console.log(selectedCountry);
};

const checkAnswer = (answer) => {
    // const choice = document.getElementsByClassName('choice').disabled = true;
    answer == usedCountries[0] // right answer always pushed to usedCountries
    ? displayOutcome('correct')
    : displayOutcome('wrong');
    console.log(usedCountries)
};



// Add possible answers to page

const userInput = document.querySelector('.user-input');

const getPossibleAnswers = () => {
    let counter = 1;
    let possibleAnswerArray = [];
    possibleAnswerArray.push(selectedCountry);

    while(possibleAnswerArray.length < 3) {
        possibleAnswerArray.push( 
            countryList[Math.floor(Math.random()*countryList.length)]
        );
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

let displayOutcome = (result) => {
    outcome.innerHTML = usedCountries[0];
    outcome.style.display = 'block';
    if (result === 'correct') {
        outcome.style.background = 'var(--green)';
    } else if (result === 'wrong') {
        outcome.style.background = 'var(--red)';
    }
    updateScore(result);
}



// Update the score

    let correctScore = 0;
    let wrongScore = 0;
    let correct = document.querySelector('.correct');
    let wrong = document.querySelector('.wrong');

    correct.innerHTML =  `${correctScore} right`;
    wrong.innerHTML = `${wrongScore} wrong`;

const updateScore = (result) => {
    if (result === 'correct') {
        correctScore++;
        correct.innerHTML = `${correctScore} right`;
    } else if (result === 'wrong') {
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