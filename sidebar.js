const navigationBarIcon = document.querySelector(".navigation-bar-icon");
const sidebar = document.getElementById("sidebar");
const sidebarIcon = document.querySelector(".side-bar-icon");

function toggleSidebarOn() {
    sidebar.classList.add("active");
}

function toggleSidebarOff() {
    sidebar.classList.remove("active");
}

navigationBarIcon.addEventListener("click", toggleSidebarOn);
sidebarIcon.addEventListener("click", toggleSidebarOff);
