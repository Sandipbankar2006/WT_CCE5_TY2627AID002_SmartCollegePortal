

document.getElementById("menuToggle").addEventListener("click", function () {
  document.getElementById("mainNav").classList.toggle("open");
});

window.addEventListener("hashchange", router);

async function init() {
  try {
    await loadData();
    document.getElementById("collegeName").textContent = data.college.name;
    document.getElementById("collegeTagline").textContent = data.college.tagline;
    document.getElementById("footAddress").textContent = data.college.address;
    document.getElementById("footContact").textContent = data.college.email + " | " + data.college.phone;
    router();                                    // show the first page
  } catch (error) {
    content.innerHTML = '<div class="alert fail">Could not load the JSON data files. ' +
                        'Please run the project using VS Code Live Server.</div>';
  }
}

init();
