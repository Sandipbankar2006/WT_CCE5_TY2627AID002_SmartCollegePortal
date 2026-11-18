

var data = null;

async function loadData() {

  var responses = await Promise.all([
    fetch("data/college.json"),
    fetch("data/notices.json"),
    fetch("data/departments.json"),
    fetch("data/courses.json"),
    fetch("data/faculty.json")
  ]);
  for (var i = 0; i < responses.length; i++) {
    if (!responses[i].ok) {
      throw new Error("Failed to load " + responses[i].url);
    }
  }
  var parts = await Promise.all(responses.map(function (r) { return r.json(); }));

  data = {
    college: parts[0],
    notices: parts[1],
    departments: parts[2],
    courses: parts[3],
    faculty: parts[4]
  };
}

function getDeptName(id) {
  for (var i = 0; i < data.departments.length; i++) {
    if (data.departments[i].id === id) {
      return data.departments[i].name;
    }
  }
  return id;
}
