//array that holds all my questions
const questionBank = [
 {
  question : 'What is the capital of France ?', 
  answeredCount: 0,
  options: [
    { id: "q0_1", userSeletedOPtion: false, label: "A", text: "Rome", isCorrect: false },
    { id: "q0_2", userSeletedOPtion: false, label: "B", text: "Paris", isCorrect: true },
    { id: "q0_3", userSeletedOPtion: false, label: "C", text: "Berlin", isCorrect: false },
    { id: "q0_4", userSeletedOPtion: false, label: "D", text: "Madrid", isCorrect: false },]
  },
 {
  question : 'Which planet is known as the Red Planet ?',
  answeredCount: 0,
  options:  [
    { id: "q1_1", userSeletedOPtion: false, label: "A", text: "Earth", isCorrect: false },
    { id: "q1_2", userSeletedOPtion: false, label: "B", text: "Venus", isCorrect: false },
    { id: "q1_3", userSeletedOPtion: false, label: "C", text: "Mars", isCorrect: true },
    { id: "q1_4", userSeletedOPtion: false, label: "D", text: "Jupiter", isCorrect: false }
  ] 
 },
 {
  question : 'Who wrote the play Romeo and Juliet ?',
  answeredCount: 0,
  options: [
    { id: "q2_1", userSeletedOPtion: false, label: "A", text: "William Shakespeare", isCorrect: true },
    { id: "q2_2", userSeletedOPtion: false, label: "B", text: "Charles Dickens", isCorrect: false },
    { id: "q2_3", userSeletedOPtion: false, label: "C", text: "Mark Twain", isCorrect: false },
    { id: "q2_4", userSeletedOPtion: false, label: "D", text: "Jane Austen", isCorrect: false }]
 },
 {
  question: 'How many continents are there on Earth?',
  answeredCount: 0,
  options: [
    { id: "q3_1", userSeletedOPtion: false, label: "A", text: "5", isCorrect: false },
    { id: "q3_2", userSeletedOPtion: false, label: "B", text: "6", isCorrect: false },
    { id: "q3_3", userSeletedOPtion: false, label: "C", text: "7", isCorrect: true },
    { id: "q3_4", userSeletedOPtion: false, label: "D", text: "8", isCorrect: false }
  ]
},
{
  question: 'What is the largest mammal in the world?',
  answeredCount: 0,
  options: [
    { id: "q4_1", userSeletedOPtion: false, label: "A", text: "Elephant", isCorrect: false },
    { id: "q4_2", userSeletedOPtion: false, label: "B", text: "Blue Whale", isCorrect: true },
    { id: "q4_3", userSeletedOPtion: false, label: "C", text: "Giraffe", isCorrect: false },
    { id: "q4_4", userSeletedOPtion: false, label: "D", text: "Hippopotamus", isCorrect: false }
  ]
},
]


 

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

//this function displays my questions an options
function showQuestion(){
  document.querySelector('.question')
//currentquestion property of the obj quiz state allows this function to
// //show same questions and its rellated options  used here allows 
  .innerHTML = `<h2>${questionBank[quizState.currentQuestion].question}</h2>`;
//loops through the options and dispays it
//check checkAnswer(${index}) gets the index of the individual options
//...it allow me know which option was clicked !!!
  let optionHtml = questionBank[quizState.currentQuestion].options.map((option, index)=>{
   return `<p tabindex = "0" data-user-choice = '${option.userSeletedOPtion}' id="${option.id}" class = "single-option" onclick = "checkAnswer(${index}, '${option.id}')">
             <span>
             ${option.label}.
             </span> &nbsp; ${option.text}
             </p>`
  }).join('')//removes the , in the array and displays it

  document.querySelector('.js-options-container')
  .innerHTML = optionHtml;
    //i added 1 in the current question here because quizState.currentQuestion itself starts from 0
  //...and questions usually starts from 1
  document.querySelector('.js-number-of-questions-container')
  .innerHTML = `<h3>${quizState.currentQuestion + 1}/${questionBank.length}</h3>`;
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


function restoreSelectedOption() {
  document.querySelectorAll('.single-option').forEach(option => {
    const isSelected = option.getAttribute('data-user-choice') === 'true';

    if (isSelected) {
      option.classList.add('selected'); // or style it however you want
    } else {
      option.classList.remove('selected');
    }
  });
}

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

 
}

  // document.querySelectorAll('.single-option').forEach(option => {
  //   option.classList.remove('selected');
  //   option.addEventListener('click', function() {
      
  //     option.classList.add('selected');
  //   });
  // });

// let myInterval;
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
            <p class="font-lato">Great job! You're getting better. 🎉</p>

            <div class="stats  FWB">
              <p>Correct: <span class ="text-emerald-green">${quizState.noRightAnswers}</span></p>
              <p>Wrong: <span class = "text-tomato-red">${quizState.noWrongAnswers}</span></p>
            </div>

            <div class="button-group ">
              <button onclick = "review()">Review</button>
              <button onclick = "retry()">Retry</button>
              <button>
              <a href="index.html">Home</a>
              </button>
            </div>

      `
    document.querySelector('.result-container').innerHTML = resultHtml;
 }

//  this function gets the number of the correct answer
//  and the number of the wrong answer
function getCorrectWrongAnswer(){
   if (quizState.reviewMode) return;
  questionBank.forEach((question)=>{
       quizState.noRightAnswers += question.answeredCount;
       // total number of questions - noRightAnswers = noWrongAnswer
     quizState.noWrongAnswers = questionBank.length - quizState.noRightAnswers; //gets wrong answers
  })

         
}

// this function basically reset the quiz
// in js term it resets the quiz state object and render showQuestion()
function retry(){
location.reload();
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

// function displayRightWrongOption(){
//     questionBank.forEach((question)=>{
//      question.options.forEach((option)=>{
//          if (option.userSeletedOPtion === true){
//               document.getElementById(`${option.id}`).forEach((optionElement)=>{
//                 console.log(optionElement)
//               })
//          }else{
//             // console.log('hi')
//          }
//      })
//    })
// }

// displayRightWrongOption()

function displayRightWrongOption() {
  questionBank.forEach((question) => {
    question.options.forEach((option) => {
      if (option.userSeletedOPtion === true) {
        const optionElement = document.getElementById(option.id);
        if (optionElement) {
          // console.log(optionElement);
          // Add custom styles or classes based on correctness
          if (option.isCorrect) {
            optionElement.classList.add('correct');
          } else {
            console.log(optionElement);
            optionElement.classList.add('wrong');
          }
        }
      }
    });
  });
}
