

function noticeHTML(n) {
  var cls = n.important ? "notice important" : "notice";
  return '<article class="' + cls + '">' +
           '<h3>' + n.title + '</h3>' +
           '<p><span class="badge">' + n.category + '</span> ' + n.date + '</p>' +
           '<p>' + n.text + '</p>' +
         '</article>';
}

function getErrorMessage(id, value) {
  if (id === "name") {
    if (value === "") return "Name is required.";
    if (!/^[A-Za-z .'-]{3,}$/.test(value)) return "Enter a valid name (letters only, min 3 characters).";
  }
  if (id === "email") {
    if (value === "") return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Enter a valid email address.";
  }
  if (id === "phone") {
    if (value === "") return "Mobile number is required.";
    if (!/^[6-9][0-9]{9}$/.test(value)) return "Enter a valid 10-digit Indian mobile number.";
  }
  if (id === "course") {
    if (value === "") return "Please select a course.";
  }
  if (id === "message") {
    if (value === "") return "Message is required.";
    if (value.length < 10) return "Message must be at least 10 characters.";
  }
  return "";
}

function setError(id, message) {
  var field = document.getElementById(id).parentElement;
  field.querySelector(".error").textContent = message;
  if (message !== "") {
    field.classList.add("invalid");
  } else {
    field.classList.remove("invalid");
  }
  return message === "";
}

function checkField(id) {
  var value = document.getElementById(id).value.trim();
  return setError(id, getErrorMessage(id, value));
}

function watchField(id) {
  var box = document.getElementById(id);
  box.addEventListener("blur", function () {
    checkField(id);
  });
  box.addEventListener("input", function () {
    if (box.parentElement.classList.contains("invalid")) {
      checkField(id);
    }
  });
}


function showEnquiryList() {
  var list = JSON.parse(localStorage.getItem("enquiries")) || [];
  var box = document.getElementById("enquiryList");
  if (list.length === 0) {
    box.innerHTML = "";
    return;
  }
  var html = '<h2 class="section-title">Your recent enquiries (saved in this browser)</h2><ul>';
  for (var i = 0; i < list.length && i < 5; i++) {
    html += '<li><b>' + list[i].name + '</b> - ' + list[i].course + ' (' + list[i].date + ')</li>';
  }
  box.innerHTML = html + '</ul>';
}


function saveEnquiry(name, email, phone, course, message) {
  var list = JSON.parse(localStorage.getItem("enquiries")) || [];
  list.unshift({
    name: name, email: email, phone: phone, course: course, message: message,
    date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  });
  localStorage.setItem("enquiries", JSON.stringify(list));
}
