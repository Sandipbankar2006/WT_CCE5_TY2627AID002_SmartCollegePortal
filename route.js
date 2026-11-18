

function router() {
  var page = location.hash.replace("#/", "");
  if (page === "") {
    page = "home";
  }

  if (page === "home") {
    showHome();
  } else if (page === "departments") {
    showDepartments();
  } else if (page === "courses") {
    showCourses();
  } else if (page === "faculty") {
    showFaculty();
  } else if (page === "notices") {
    showNotices();
  } else if (page === "enquiry") {
    showEnquiry();
  } else {
    content.innerHTML = '<section class="view"><h1>404 - Page not found</h1>' +
                        '<a class="btn primary" href="#/home">Go to Home</a></section>';
  }

  highlightMenu(page);
  window.scrollTo(0, 0);
  document.getElementById("mainNav").classList.remove("open");
}

function highlightMenu(page) {
  var links = document.querySelectorAll(".main-nav a");
  for (var i = 0; i < links.length; i++) {
    if (links[i].getAttribute("data-route") === page) {
      links[i].classList.add("active");
    } else {
      links[i].classList.remove("active");
    }
  }
}
