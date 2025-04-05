//array that holds all my questions
const questionBank = [
 {
  question : 'What is the capital of France ?', 
  answeredCount: 0,
  options: [
    { label: "A", text: "Rome", isCorrect: false },
    { label: "B", text: "Paris", isCorrect: true },
    { label: "C", text: "Berlin", isCorrect: false },
    { label: "D", text: "Madrid", isCorrect: false },]
  },
 {
  question : 'Which planet is known as the Red Planet ?',
  answeredCount: 0,
  options:  [
    { label: "A", text: "Earth", isCorrect: true },
    { label: "B", text: "Venus", isCorrect: false },
    { label: "C", text: "Mars", isCorrect: false },
    { label: "D", text: "Jupiter", isCorrect: false }
  ]
 },
 {
  question : 'Who wrote the play Romeo and Juliet ?',
  answeredCount: 0,
  options: [
    { label: "A", text: "William Shakespeare", isCorrect: true },
    { label: "B", text: "Charles Dickens", isCorrect: false },
    { label: "C", text: "Mark Twain", isCorrect: false },
    { label: "D", text: "Jane Austen", isCorrect: false }]
 },
 {
  question: 'How many continents are there on Earth?',
  answeredCount: 0,
  options: [
    { label: "A", text: "5", isCorrect: false },
    { label: "B", text: "6", isCorrect: false },
    { label: "C", text: "7", isCorrect: true },
    { label: "D", text: "8", isCorrect: false }
  ]
},
{
  question: 'What is the largest mammal in the world?',
  answeredCount: 0,
  options: [
    { label: "A", text: "Elephant", isCorrect: false },
    { label: "B", text: "Blue Whale", isCorrect: true },
    { label: "C", text: "Giraffe", isCorrect: false },
    { label: "D", text: "Hippopotamus", isCorrect: false }
  ]
},
]


const quizState = {
  timer: 30,  // Countdown in seconds
  score: 0, 
  currentQuestion: 0, 
  totalQuestions: 5,
};

function nextQuestion(){
  quizState.currentQuestion++
    if (quizState.currentQuestion === questionBank.length){
     quizState.currentQuestion = questionBank.length - 1;
     console.log(quizState)  
}
    showQuestion()
}
function previuosQuestion(){
  quizState.currentQuestion--
    if (quizState.currentQuestion === questionBank.length){
     quizState.currentQuestion = questionBank.length - 1;
     console.log(quizState)   
}else if(quizState.currentQuestion < 1){
  quizState.currentQuestion = 0;
}
showQuestion()
}

function showQuestion(){
  document.querySelector('.question')
  .innerHTML = `<h3>${questionBank[quizState.currentQuestion].question}</h3>`;
  let optionHtml = questionBank[quizState.currentQuestion].options.map((option, index)=>{
   return `<p class = "single-option" onclick = "checkAnswer(${index})">
             <span>
             ${option.label}.
             </span> &nbsp; ${option.text}
             </p>`
  }).join('')

  document.querySelector('.js-options-container')
  .innerHTML = optionHtml;
}

// function displayquestion(){

// }
showQuestion()
nextQuestion()
previuosQuestion()



function checkAnswer(selectedIndex){
  //seleted option
  // this gets the object of the currentquestion = questionBank[quizState.currentQuestion]
  // this gets the seletented option of the current question = questionBank[quizState.currentQuestion].options[selectedIndex]
   let selectedOption = questionBank[quizState.currentQuestion].options[selectedIndex];
   if(selectedOption.isCorrect && questionBank[quizState.currentQuestion].answeredCount === 0){
    questionBank[quizState.currentQuestion].answeredCount = 1;
      console.log(questionBank[quizState.currentQuestion].answeredCount)
   }else if (!selectedOption.isCorrect && questionBank[quizState.currentQuestion].answeredCount === 1){
    questionBank[quizState.currentQuestion].answeredCount = 0;
    console.log(questionBank[quizState.currentQuestion].answeredCount)
   }
}





