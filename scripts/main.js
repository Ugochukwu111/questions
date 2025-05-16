import { courses } from "./courses.js";
import { getNotificationBox, generatesRandomNumber } from "./reuseablefunc.js";
import { homePageGreetings }  from "./compliments.js";

// animations for the main page site
document.addEventListener("DOMContentLoaded", function () {
  // Get all the children of the footer
  const footerElements = document.querySelectorAll("footer > *");

  // Create an Intersection Observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a class when the element enters the viewport
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target); // Stop observing once the animation is triggered
      }
    });
  }, {
    threshold: 0.5  // Trigger when 50% of the element is in view
  });

  // Observe each footer child element
  footerElements.forEach(element => {
    observer.observe(element);
  });
});

 document.addEventListener('DOMContentLoaded', () => {
  getNotificationBox(generatesRandomNumber(homePageGreetings));
});

// MOBILE NAVIGATION JS

const SidebarBtn = document.querySelector(".sidebar-btn");
SidebarBtn.addEventListener("click",  ()=>{
  let closeIcon = document.querySelector(".close-icon ");
  let showIcon = document.querySelector(".show-icon ");
  let sidebar = document.querySelector(".sidebar");
  let sidebarLabel = sidebar.getAttribute('aria-label');

  if (sidebarLabel === "sidebar closed") {
    sidebar.setAttribute('aria-label', 'sidebar opened');
    showIcon.classList.add("hide-icon");
    closeIcon.classList.remove("hide-icon");

    sidebar.classList.add("show-sidebar");

    console.log(sidebar.getAttribute('aria-label'));
  }else{
    sidebar.setAttribute('aria-label', 'sidebar closed');
    
    sidebar.classList.remove("show-sidebar");

    closeIcon.classList.add("hide-icon");
    showIcon.classList.remove("hide-icon");
  }

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
