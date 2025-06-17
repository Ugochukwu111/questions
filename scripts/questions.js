
import { questionBank1, questionBank2 ,questionBank2B,questionBank2C, questionBank3 , questionBank3B ,questionBank3C, questionBank3D, questionBank3E, questionBank3F } from './questionBank.js';
import { getNotificationBox, getRandomMessage , hideSpinner} from "./reuseablefunc.js";
import { retryMessages, EncouragementMessages , SuccessMessages , ImprovementMessages }  from "./compliments.js";


 document.addEventListener('DOMContentLoaded', () => {
  hideSpinner();
});


const selected = localStorage.getItem('selectedCourse');

const questionBankMap = {
  questionBank1,
  questionBank2,
  questionBank2B,
  questionBank2C,
  questionBank3,
  questionBank3B,
  questionBank3C,
  questionBank3D,
  questionBank3E,
  questionBank3F
};
 
const questionBank = questionBankMap[selected];



const quizState = {
  timer: 30,  // Countdown in seconds
  score: 0, 
  currentQuestion: 0, 
  totalQuestions: 5,
  autoAdvance: false,
  noRightAnswers: 0,
  noWrongAnswers: 0,
  reviewMode : false,
  submitted: false,
  ativeMode: false,
};

function autoAdvance(callback, delay = 1500){
  let timer;
  
  function timeDelay(){
    clearTimeout(timer)
    timer = setTimeout(callback, delay);
  }

  return timeDelay
}

 const advance = autoAdvance(nextQuestion, 200); // 1000 milliseconds = 1 second


let checkAnswer = function (selectedIndex, optionId){
  if (quizState.reviewMode) return;
  //seleted option
  // this gets the object of the currentquestion = questionBank[quizState.currentQuestion]
  // this gets the seletented option of the current question = questionBank[quizState.currentQuestion].options[selectedIndex]
  let selectedOption = questionBank[quizState.currentQuestion].options[selectedIndex];


  questionBank[quizState.currentQuestion].options.forEach((option)=>{
  option.userSeletedOPtion = false;
  })


  
   highlightSelectedOption(optionId);

  questionBank[quizState.currentQuestion].options[selectedIndex].userSeletedOPtion = true;
   if(selectedOption.isCorrect && questionBank[quizState.currentQuestion].answeredCount === 0){
    questionBank[quizState.currentQuestion].answeredCount = 1;
   }else if (!selectedOption.isCorrect && questionBank[quizState.currentQuestion].answeredCount === 1){
    questionBank[quizState.currentQuestion].answeredCount = 0;
   }
   
if (quizState.autoAdvance){
 advance();
}

}


document.querySelector('.js-auto-advance').addEventListener('click', ()=>{
  if(!quizState.autoAdvance){
    quizState.autoAdvance = true;
    colorBolt();
  }else{
      quizState.autoAdvance = false;
      colorBolt();
  }
});



//this function displays my questions and options
function showQuestion(){
  document.querySelector('.question')
  .innerHTML = `<h3>${questionBank[quizState.currentQuestion].question}</h3>`;
//loops through the options and dispays it
//check checkAnswer(${index}) gets the index of the individual options
//...it allow me know which option was clicked !!!
  let optionHtml = questionBank[quizState.currentQuestion].options.map((option, index)=>{
   return `<p role="button" tabindex = "0" data-user-choice = '${option.userSeletedOPtion}' id="${option.id}" class = "single-option">
             <span>
             ${option.label}.
             </span> &nbsp; ${option.text}
             </p>`
  }).join('')//removes the , in the array and displays it

  document.querySelector('.js-number-of-questions-container')
  .innerHTML = `<h4>${quizState.currentQuestion + 1}/${questionBank.length}</h4>`

  document.querySelector('.js-options-container')
  .innerHTML = optionHtml;

    // ✅ Attach event listeners properly
  document.querySelectorAll('.single-option').forEach((option, index) => {
    option.addEventListener('click', () => {
      checkAnswer(index, option.id);
    });
      option.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();  // Prevent page scroll when space is pressed
      checkAnswer(index, option.id);
    }
  });
  });

  restoreSelectedOption()
}
showQuestion()// immiedately show question once page loads


function nextQuestion(){
  quizState.currentQuestion++ //adds 1 to quizState.currentQuestion

    if (quizState.currentQuestion === questionBank.length) {
     quizState.currentQuestion = questionBank.length - 1;  //this makes sure the addition of 1 to quizState.currentQuestion does not exceed the questions length,

}
//now quizState.currentQuestion is 1 which will show the next question
    showQuestion() //displays curent question
}
document.querySelector('.next-question-btn').addEventListener('click', nextQuestion);


document.querySelector('.submit-btn-pop').addEventListener('click',()=>{
 if (quizState.reviewMode === false){
     let confirmationCard =  `
    <div class = "confirmation-card">
     <p class = "text-center">Are you sure you want to submit ?</p>
     
    <div class = "button-group">
      <button class = "submit-btn text-white bg-teal-green">yes</button>
      <button class = "cancel-submit-btn text-white bg-crimson-red">cancel</button>
    </div>
    </div>
    `;
    
    document.querySelector('.result-container').style.display = 'grid';
   document.querySelector('.result-container').innerHTML = confirmationCard; 

    document.querySelector('.cancel-submit-btn').addEventListener('click',  ()=>{
   document.querySelector('.result-container').style.display = 'none';
 })

  document.querySelector('.submit-btn').addEventListener('click', ()=>{
      document.querySelector('.submit-btn-pop').innerHTML = 'view result';
  submit();
 })
   
   
 }else if (quizState.reviewMode === true){
    submit();
 }

})

  
 


function submit(){
  if (quizState.submitted === true){
     document.querySelector('.result-container').style.display = 'grid';
    showResult()
  }else{
    addsCorrectAnswers()
     getCorrectWrongAnswer()
          document.querySelector('.result-container').style.display = 'grid';
      showResult()
      quizState.submitted = true;
  }
  
}



//same principle as nextquestion function but reverse
function previuosQuestion(){
  quizState.currentQuestion--
    if (quizState.currentQuestion === questionBank.length){
     quizState.currentQuestion = questionBank.length - 1;
     console.log(quizState)   
}else if(quizState.currentQuestion < 1){
  quizState.currentQuestion = 0;
}
showQuestion()// displays current question
}
document.querySelector('.previous-question-btn').addEventListener('click', previuosQuestion);







//funciton that loops and add the correct answers
 function addsCorrectAnswers(){
  if (quizState.reviewMode) return;
  questionBank.forEach((question)=>{
      quizState.score += question.answeredCount;
  })
  return quizState.score
 }


 function showResult(){
    let resultHtml = ` 
      <!-- result card -->
        <div class="result-card">

            <h2>Quiz Results</h2>
            <h3 class="score">${quizState.score}/${questionBank.length}</h3>


            <div class=" FWB">
              <div class = "stats">
                <p>Correct: <span class ="text-emerald-green">${quizState.noRightAnswers}</span></p>
                <p>Wrong: <span class = "text-tomato-red">${quizState.noWrongAnswers}</span></p>
              </div>
              <p class ="d-block">${givePerformanceFeedback()}</p>
            </div>

            <div class="button-group ">
              <button class = "review-btn bg-emerald-green text-white text-icon-container" >
              Review
              <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="black"><path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z"/></svg>
              </button>

              <button class = "retry-btn bg-teal-green text-white text-icon-container" >
              Retry
              <svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M444-144q-107-14-179.5-94.5T192-430q0-61 23-113.5t63-91.5l51 51q-30 29-47.5 69T264-430q0 81 51.5 140T444-217v73Zm72 0v-73q77-13 128.5-72.5T696-430q0-90-63-153t-153-63h-7l46 46-51 50-132-132 132-132 51 51-45 45h6q120 0 204 84t84 204q0 111-72.5 192T516-144Z"/></svg>
              </button>
              <a class = "question-result-home-btn " href="index.html">Home</a>  
            </div>
          </div>
      `
    document.querySelector('.result-container').innerHTML = resultHtml;

    document.querySelector('.review-btn').addEventListener('click', review);
    document.querySelector('.retry-btn').addEventListener('click', retry);
    
 }

//  this function gets the number of the correct answer
//  and the number of the wrong answer
function getCorrectWrongAnswer(){
   if (quizState.reviewMode) return;// dont calculate correct answers again when app is in review

  questionBank.forEach((question)=>{
       quizState.noRightAnswers += question.answeredCount;
       // total number of questions - noRightAnswers = noWrongAnswer
  })

// after the loop runs summing all the right answers it subtracts from the total question bank and gives
// the number of wrong answers
       quizState.noWrongAnswers = questionBank.length - quizState.noRightAnswers; //gets wrong answers

         
}

// this function basically reset the quiz
// in js term it resets the quiz state object and render showQuestion()
function retry() {
  // Reset quiz state
  quizState.timer = 30;
  quizState.score = 0;
  quizState.currentQuestion = 0;
  quizState.noRightAnswers = 0;
  quizState.noWrongAnswers = 0;
  quizState.reviewMode = false;
  quizState.submitted = false;

  // Reset question bank data
  questionBank.forEach(question => {
    question.answeredCount = 0;
    question.options.forEach(option => {
      option.userSeletedOPtion = false;
    });
  });

  // Hide the result section
  document.querySelector('.result-container').style.display = 'none';

  getNotificationBox(getRandomMessage(retryMessages));

  document.querySelector('.submit-btn-pop').innerHTML = 'Submit';

  // Show the first question again
  showQuestion();
}

function review(){
  quizState.reviewMode = true;
  quizState.currentQuestion = 0;
  document.querySelector('.result-container').style.display = 'none';
  showQuestion()
}

// Function to handle the styling of the selected option
function highlightSelectedOption(optionId) {

    // First, deselect all options
  document.querySelectorAll('.single-option').forEach(option => {
    option.classList.remove('selected');
  });


  // Get the corresponding <p> element using the id
  const selectedPElement = document.getElementById(optionId);

  // Add the 'selected' class to the <p> element
  selectedPElement.classList.add('selected');
}

function restoreSelectedOption() {

   if (quizState.reviewMode){
      displayRightWrongOption()
   };

  document.querySelectorAll('.single-option').forEach(option => {
    const isSelected = option.getAttribute('data-user-choice') === 'true';

    if (isSelected) {
      option.classList.add('selected'); // or style it however you want
    } else {
      option.classList.remove('selected');
    }
  });
}

function displayRightWrongOption() {
   // Get the currently displayed question object from the questionBank array
  const currentQuestion = questionBank[quizState.currentQuestion];

    // Loop through each option in the current question
  currentQuestion.options.forEach(option => {
    const optionElement = document.getElementById(option.id);

    if (optionElement) {
      if (option.isCorrect) {
        optionElement.classList.add('correct');
      }

      if (option.userSeletedOPtion && !option.isCorrect) {
        optionElement.classList.add('wrong');
      }
    }
  });
}

// the function for giving performance feedback based on the number of correct answers
function givePerformanceFeedback(){
  let message = "";
if (quizState.noRightAnswers <= questionBank.length / 2){
   message = getRandomMessage(ImprovementMessages);
}else if(  quizState.noRightAnswers >= questionBank.length / 2 &&
  quizState.noRightAnswers <= questionBank.length / 1.5){
    message = getRandomMessage(EncouragementMessages);
  }else if (quizState.noRightAnswers > questionBank.length / 1.5 &&
  quizState.noRightAnswers <= questionBank.length / 1.2){
     message = getRandomMessage(SuccessMessages);
  }else{
   message = getRandomMessage(SuccessMessages);
  }
return message;
}

// quis active state js
const quizActiveBtn = document.querySelector('.quiz-active-btn');
const quizActiveOptionsCtn = document.querySelector('.dropdown-menu-quiz-active-mode');

let timer;

quizActiveBtn.addEventListener('click', () => {
  const isExpanded = quizActiveBtn.getAttribute('aria-expanded') === 'true';

  // Toggle dropdown
  quizActiveOptionsCtn.classList.toggle('dropdown-visible');
  quizActiveBtn.setAttribute('aria-expanded', String(!isExpanded));

  // Handle dropdown close timer
  timerToCloseDropdown();
});

function timerToCloseDropdown() {
  // Always clear previous timer
  clearTimeout(timer);

  if (quizActiveBtn.getAttribute('aria-expanded') === 'true') {
    timer = setTimeout(() => {
      quizActiveOptionsCtn.classList.remove('dropdown-visible');
      quizActiveBtn.setAttribute('aria-expanded', 'false');
    }, 10000);
  }
}



// js code for timer
let setquizTimerBtn = document.querySelector('.set-quiz-timer-btn');
let timerCtnHtml = document.querySelector('.timer-container');

setquizTimerBtn.addEventListener('click', () => {
  let backgroundContainer = document.querySelector('.result-container');
  backgroundContainer.style.display = 'grid';
  backgroundContainer.innerHTML = `
    <div class = "result-card d-flex flex-column">
      <div class="timer-close-btn-container d-flex">
      <button class="close-set-time-btn">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
      </div>

      
      <h3>Set Quiz Timer</h3>
      <small class = "FWB js-time-value-error">*Timer value in minutes</small>
      <input type="number" min="5" max="60" step="5" id="quiz-timer-input" placeholder="5" />
      <button class="set-timer-confirm-btn">Set Timer</button>
    </div>
  `;
  let timeValueErrorEl = document.querySelector('.js-time-value-error');

  // event lister to close set up question timer
  document.querySelector('.close-set-time-btn').addEventListener('click', ()=>{
    backgroundContainer.style.display = 'none';
  })

  const confirmSetTimeBtn = document.querySelector('.set-timer-confirm-btn');
  let quizintervaltime;
  let  timeValueNumber;

  confirmSetTimeBtn.addEventListener('click', ()=>{

    if (quizState.reviewMode){
      timeValueErrorEl.textContent = 'Quiz in review mode cannot set timer';
      return;
    };

    let timeValue = document.querySelector('#quiz-timer-input').value;


     if(timeValue < 5 || timeValue > 60){
       timeValueErrorEl.textContent = 'Time must be greater than 5 and lesser than 60';
       timeValueErrorEl.classList.add('text-crimson-red');
       
     }else{

      quizState.ativeMode = true;
       colorBolt()

       timeValueErrorEl.textContent = 'Timer value in minutes';
       timeValueErrorEl.classList.remove('text-crimson-red');
       timeValueNumber = Number(timeValue);

       const UserSelectedTimeLimit = Math.floor(timeValueNumber / 3);
       console.log(UserSelectedTimeLimit);

       clearInterval(quizintervaltime);
       backgroundContainer.style.display = 'none';
       
        timerCtnHtml.innerHTML = `<span
        class ="time-number">${timeValueNumber}</span>`;
        timerCtnHtml.classList.add('show-timer-container');

      quizintervaltime = setInterval(()=>{
        timerCtnHtml.innerHTML = `<span
        class ="time-number">${timeValueNumber}</span>`;
        // timerCtnHtml.classList.add('show-timer-container');
        timeValueNumber = timeValueNumber - 1;
        
// if(timeValueNumber === -1) i used this condition here so the number zero will display before the timer disappears
//hint: i used -1 because when i added submit() function the conter stoped at 1; using -1 made it stop at 0
        if(timeValueNumber === -1){
              document.querySelector('.time-number').classList.add('time-is-running-out');// change color of time to red
              timerCtnHtml.classList.remove('show-timer-container');   
              clearInterval(quizintervaltime);
              quizState.ativeMode = false;
              colorBolt()
              submit();
     } else if(timeValueNumber <=  UserSelectedTimeLimit){
       document.querySelector('.time-number').classList.add('time-is-running-out');
     }
    }, 60000);
      
     }
  })
})

// this functions fills the bolt icon to green anytime   quizState.ativeMode = true or quizState.autoAdvance;
function colorBolt(){
  const boltIconHtml = document.querySelector('.bolt-icon');
  if(quizState.ativeMode || quizState.autoAdvance){
    boltIconHtml.style.fill = 'green';
  }else{
     boltIconHtml.style.fill = 'gold';
  }
}


