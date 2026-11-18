
var content = document.getElementById("content");

function showHome() {
  var statsHTML = "";
  for (var i = 0; i < data.college.stats.length; i++) {
    var s = data.college.stats[i];
    statsHTML += '<div class="stat"><strong>' + s.value + '</strong><span>' + s.label + '</span></div>';
  }

  var noticesHTML = "";
  for (var j = 0; j < 3; j++) {
    noticesHTML += noticeHTML(data.notices[j]);
  }

  content.innerHTML =
    '<section class="view">' +
      '<div class="hero">' +
        '<h1>Welcome to ' + data.college.name + '</h1>' +
        '<p>' + data.college.about + '</p>' +
        '<a class="btn" href="#/courses">Explore Courses</a>' +
      '</div>' +
      '<div class="stats">' + statsHTML + '</div>' +
      '<h2 class="section-title">Latest Notices</h2>' + noticesHTML +
    '</section>';
}

function showDepartments() {
  var cards = "";
  for (var i = 0; i < data.departments.length; i++) {
    var d = data.departments[i];
    cards += '<article class="card">' +
               '<div class="icon">' + d.icon + '</div>' +
               '<h3>' + d.name + '</h3>' +
               '<p>' + d.description + '</p>' +
               '<p class="meta"><b>HoD:</b> ' + d.hod + '<br><b>Intake:</b> ' + d.intake + '</p>' +
             '</article>';
  }
  content.innerHTML =
    '<section class="view"><h1>Departments</h1>' +
    '<p class="subtitle">Our academic departments.</p>' +
    '<div class="grid">' + cards + '</div></section>';
}

function showCourses() {
  content.innerHTML =
    '<section class="view"><h1>Courses</h1>' +
    '<p class="subtitle">Programmes offered by the college.</p>' +
    '<div class="toolbar">' +
      '<select id="levelFilter">' +
        '<option value="">All levels</option>' +
        '<option>Undergraduate</option>' +
        '<option>Postgraduate</option>' +
        '<option>Certificate</option>' +
      '</select>' +
    '</div>' +
    '<div class="table-wrap"><table>' +
      '<thead><tr><th>Course</th><th>Department</th><th>Level</th><th>Duration</th><th>Seats</th><th>Fees</th></tr></thead>' +
      '<tbody id="courseRows"></tbody>' +
    '</table></div></section>';

  document.getElementById("levelFilter").addEventListener("change", showCourseRows);
  showCourseRows();
}

function showCourseRows() {
  var level = document.getElementById("levelFilter").value;
  var rows = "";
  for (var i = 0; i < data.courses.length; i++) {
    var c = data.courses[i];
    if (level === "" || c.level === level) {
      rows += '<tr><td>' + c.name + '</td><td>' + getDeptName(c.department) + '</td><td>' + c.level +
              '</td><td>' + c.duration + '</td><td>' + c.seats + '</td><td>' + c.fees + '</td></tr>';
    }
  }
  document.getElementById("courseRows").innerHTML = rows;
}

function showFaculty() {
  var options = '<option value="">All departments</option>';
  for (var i = 0; i < data.departments.length; i++) {
    options += '<option value="' + data.departments[i].id + '">' + data.departments[i].name + '</option>';
  }
  content.innerHTML =
    '<section class="view"><h1>Faculty</h1>' +
    '<p class="subtitle">Our teachers and mentors.</p>' +
    '<div class="toolbar"><select id="deptFilter">' + options + '</select></div>' +
    '<div class="grid" id="facultyGrid"></div></section>';

  document.getElementById("deptFilter").addEventListener("change", showFacultyCards);
  showFacultyCards();
}

function showFacultyCards() {
  var dept = document.getElementById("deptFilter").value;
  var cards = "";
  for (var i = 0; i < data.faculty.length; i++) {
    var f = data.faculty[i];
    if (dept === "" || f.department === dept) {
      cards += '<article class="card">' +
                 '<h3>' + f.name + '</h3>' +
                 '<p>' + f.designation + ' - ' + getDeptName(f.department) + '</p>' +
                 '<p class="meta"><b>Qualification:</b> ' + f.qualification + '<br>' +
                 '<b>Experience:</b> ' + f.experience + ' years<br>' +
                 '<b>Subjects:</b> ' + f.subjects.join(", ") + '<br>' + f.email + '</p>' +
               '</article>';
    }
  }
  document.getElementById("facultyGrid").innerHTML = cards;
}

function showNotices() {
  content.innerHTML =
    '<section class="view"><h1>Notices</h1>' +
    '<p class="subtitle">Announcements from the college office.</p>' +
    '<div class="toolbar">' +
      '<select id="categoryFilter">' +
        '<option value="">All categories</option>' +
        '<option>Exam</option><option>Placement</option><option>Event</option><option>Admin</option>' +
      '</select>' +
    '</div>' +
    '<div id="noticeList"></div></section>';

  document.getElementById("categoryFilter").addEventListener("change", showNoticeList);
  showNoticeList();
}

function showNoticeList() {
  var category = document.getElementById("categoryFilter").value;
  var html = "";
  for (var i = 0; i < data.notices.length; i++) {
    if (category === "" || data.notices[i].category === category) {
      html += noticeHTML(data.notices[i]);
    }
  }
  document.getElementById("noticeList").innerHTML = html;
}

function showEnquiry() {
  var courseOptions = '<option value="">-- Select a course --</option>';
  for (var i = 0; i < data.courses.length; i++) {
    courseOptions += '<option>' + data.courses[i].name + '</option>';
  }

  content.innerHTML =
    '<section class="view"><h1>Student Enquiry</h1>' +
    '<p class="subtitle">Have a question about admissions or courses? Fill in the form below.</p>' +
    '<div class="form-card">' +
      '<div id="formAlert"></div>' +
      '<form id="enquiryForm" novalidate>' +
        '<div class="field"><label for="name">Full Name *</label>' +
          '<input type="text" id="name" placeholder="e.g. Rohan Patil" autocomplete="name"><div class="error"></div></div>' +
        '<div class="field"><label for="email">Email *</label>' +
          '<input type="email" id="email" placeholder="you@example.com" autocomplete="email"><div class="error"></div></div>' +
        '<div class="field"><label for="phone">Mobile Number *</label>' +
          '<input type="tel" id="phone" placeholder="10-digit mobile number" maxlength="10" inputmode="numeric"><div class="error"></div></div>' +
        '<div class="field"><label for="course">Course of Interest *</label>' +
          '<select id="course">' + courseOptions + '</select><div class="error"></div></div>' +
        '<div class="field"><label for="message">Message * <small>(min 10 characters)</small></label>' +
          '<textarea id="message" rows="4" placeholder="Type your question here..."></textarea><div class="error"></div></div>' +
        '<button type="submit" class="btn primary">Submit Enquiry</button>' +
      '</form>' +
    '</div>' +
    '<div class="enquiry-list" id="enquiryList"></div></section>';

  document.getElementById("enquiryForm").addEventListener("submit", validateForm);

  var ids = ["name", "email", "phone", "course", "message"];
  for (var j = 0; j < ids.length; j++) {
    watchField(ids[j]);
  }

  showEnquiryList();
}

function validateForm(event) {
  event.preventDefault();

  var ids = ["name", "email", "phone", "course", "message"];
  var allValid = true;
  for (var i = 0; i < ids.length; i++) {
    if (!checkField(ids[i])) {
      allValid = false;
    }
  }

  var alertBox = document.getElementById("formAlert");

  if (allValid) {
    var name = document.getElementById("name").value.trim();
    var course = document.getElementById("course").value;
    saveEnquiry(name, document.getElementById("email").value.trim(),
                document.getElementById("phone").value.trim(), course,
                document.getElementById("message").value.trim());

    alertBox.innerHTML = '<div class="alert success"></div>';
    alertBox.firstChild.textContent = "Thank you, " + name + "! Your enquiry has been submitted.";
    document.getElementById("enquiryForm").reset();
    showEnquiryList();
  } else {
    alertBox.innerHTML = '<div class="alert fail">Please correct the highlighted fields.</div>';
  }
}
