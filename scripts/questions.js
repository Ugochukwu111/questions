
import { questionBank1, questionBank2 , questionBank3 , questionBank3B ,questionBank3C, questionBank3D, questionBank3E, questionBank3F} from './questionBank.js';
import { getNotificationBox, getRandomMessage , hideSpinner} from "./reuseablefunc.js";
import { retryMessages, EncouragementMessages , SuccessMessages , ImprovementMessages }  from "./compliments.js";


 document.addEventListener('DOMContentLoaded', () => {
  hideSpinner();
});


const selected = localStorage.getItem('selectedCourse');

const questionBankMap = {
  questionBank1,
  questionBank2,
  questionBank3,
  questionBank3B,
  questionBank3C,
  questionBank3D,
  questionBank3E,
  questionBank3F
};
 
const questionBank = questionBankMap[selected];
//in  the array of objects above for every question their is an answer count indicates 
// whether the user gets the answer or not


const quizState = {
  timer: 30,  // Countdown in seconds
  score: 0, 
  currentQuestion: 0, 
  totalQuestions: 5,
  stopIntervalTime: 0,
  noRightAnswers: 0,
  noWrongAnswers: 0,
  reviewMode : false,
};

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
  // setTimeout(nextQuestion, 1000)//after user selects an answer waits 1 secs and move to the next question
 
}
//this function displays my questions an options
function showQuestion(){
  document.querySelector('.question')
  .innerHTML = `<h3>${questionBank[quizState.currentQuestion].question}</h3>`;
//loops through the options and dispays it
//check checkAnswer(${index}) gets the index of the individual options
//...it allow me know which option was clicked !!!
  let optionHtml = questionBank[quizState.currentQuestion].options.map((option, index)=>{
   return `<p tabindex = "0" data-user-choice = '${option.userSeletedOPtion}' id="${option.id}" class = "single-option">
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
  });

  restoreSelectedOption()
}

showQuestion()// immiedately show question once page loads



function nextQuestion(){
  quizState.currentQuestion++ //adds 1 to quizState.currentQuestion
  //this makes sure the addition of 1 to quizState.currentQuestion does not exceed the questions length
    if (quizState.currentQuestion === questionBank.length) {
     quizState.currentQuestion = questionBank.length - 1;
     addsCorrectAnswers()
     getCorrectWrongAnswer()
     document.querySelector('.result-container').style.display = 'grid';
    //  document.querySelector('.score-el').textContent = `${quizState.score} / ${questionBank.length}`
      showResult()

}
//now quizState.currentQuestion is 1 which will show the next question
    showQuestion() //displays curent question
}
document.querySelector('.next-question-btn').addEventListener('click', nextQuestion);

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
              <button class = "review-btn" >Review</button>
              <button class = "retry-btn" >Retry</button>
              <a class = "question-result-home-btn" href="index.html">Home</a>  
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


