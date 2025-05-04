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
