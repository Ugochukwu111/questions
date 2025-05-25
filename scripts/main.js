import { courses } from "./courses.js";
import { getNotificationBox, getRandomMessage ,  } from "./reuseablefunc.js";
import { homePageGreetings }  from "./compliments.js";



 document.addEventListener('DOMContentLoaded', () => {
  getNotificationBox(getRandomMessage(homePageGreetings));
});


const totalNumberOfCourses = courses.length;
document.querySelector('.number-of-courses').textContent = totalNumberOfCourses;

// display courses on the main page (from my courses.js file module)
const courseContainer = document.querySelector(".question-card-container");


function displayCourses() {
  let courseHTML = '';
  courses.forEach(course => {
    courseHTML += `
     <div class="question-card">
                <div data-id="${course.id}" class="card-header">
                  <h2 class = "course-code">${course.code}</h2>
                  <p class="topic"><strong>Title</strong>: ${course.name}</p>
                  <p class="">Difficulty:<span class="difficulty">&nbsp; Easy</span></p>
                </div>
                
                <ul class="details">
                  <li><strong>paper type:</strong> ${course.part}</li>
                  <li><strong>Type:</strong> ${course.type}</li>
                </ul>

                
                  <button data-code="${course.coursequestion}" class="start-btn">Start Quiz</button>
                
              </div>
    `;
  });
  courseContainer.innerHTML = courseHTML;
}

displayCourses()


function handleStartClick(event) {
  const button = event.currentTarget;
  const courseName = button.getAttribute('data-code');
  console.log("Clicked course:", courseName);

      if (!courseName) {
    alert('No course code found on button.');
    return;
  }
  localStorage.setItem('selectedCourse', courseName);


  window.location.href = 'questions.html'; 
   
}

document.querySelectorAll('.start-btn').forEach(button => {
  button.addEventListener('click', handleStartClick);
});