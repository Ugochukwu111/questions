import { courses } from "./courses.js";
import { getNotificationBox, generatesRandomNumber } from "./reuseablefunc.js";
import { homePageGreetings }  from "./compliments.js";



 document.addEventListener('DOMContentLoaded', () => {
  getNotificationBox(generatesRandomNumber(homePageGreetings));
});




// display courses on the main page (from my courses.js file module)
const courseContainer = document.querySelector(".question-card-container");


function displayCourses() {
  let courseHTML = '';
  courses.forEach(course => {
    courseHTML += `
     <div class="question-card">
                <div class="card-header">
                  <h2>${course.code}</h2>
                  <p class="topic"><strong>Title</strong>: ${course.name}</p>
                  <p class="">Difficulty:<span class="difficulty">&nbsp; Easy</span></p>
                </div>
                
                <ul class="details">
                  <li><strong>Questions</strong> 10</li>
                  <li><strong>Time:</strong> ${course.time}</li>
                  <li><strong>Type:</strong> ${course.type}</li>
                </ul>

                
                  <button class="start-btn">Start Quiz</button>
                
              </div>
    `;
  });
  courseContainer.innerHTML = courseHTML;
}

displayCourses()
