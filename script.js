'use strict';

// Utility function to toggle active class
const toggleActive = (element) => element.classList.toggle('active');

// Sidebar functionality
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

sidebarBtn.addEventListener('click', () => toggleActive(sidebar));

// Portfolio filter functionality
const filterSelect = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

// Filter function
const filterProjects = (category) => {
  filterItems.forEach(item => {
    // Convert category to lowercase and normalize for comparison
    const normalizedCategory = category.toLowerCase();
    const itemCategory = item.dataset.category.toLowerCase();
    
    if (normalizedCategory === 'all' || normalizedCategory === itemCategory) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
};

// Mobile select dropdown
if (filterSelect) {
  filterSelect.addEventListener('click', () => toggleActive(filterSelect));
  
  selectItems.forEach(item => {
    item.addEventListener('click', () => {
      const selectedValue = item.textContent;
      selectValue.textContent = selectedValue;
      toggleActive(filterSelect);
      filterProjects(selectedValue);
    });
  });
}

// Desktop filter buttons
let activeFilterBtn = filterButtons[0];

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedValue = button.textContent;
    selectValue.textContent = selectedValue;
    filterProjects(selectedValue);
    
    // Update active button
    activeFilterBtn.classList.remove('active');
    button.classList.add('active');
    activeFilterBtn = button;
  });
});

// Page navigation
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navLinks.forEach((link, index) => {
  link.addEventListener('click', () => {
    const targetPage = link.textContent.toLowerCase();
    
    // Update pages
    pages.forEach(page => {
      if (page.dataset.page === targetPage) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });
    
    // Update nav links
    navLinks.forEach(navLink => navLink.classList.remove('active'));
    link.classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
  });
});

// Modal slideshow functionality
const modal = document.getElementById("projectModal");
const modalImage = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentImages = [];
let currentIndex = 0;

// Example project images mapping
const projectImages = {
  "Doctor booking": [
    "./assets/images/appProject1_1.jpg",
    "./assets/images/appProject1_2.jpg",
    "./assets/images/appProject1_3.jpg",
    "./assets/images/appProject1_4.jpg",
    "./assets/images/appProject1_5.jpg",
    "./assets/images/appProject1_6.jpg",
    "./assets/images/appProject1_7.jpg",
    "./assets/images/appProject1_8.jpg",
    "./assets/images/appProject1_9.jpg",
    "./assets/images/appProject1_10.jpg",
    "./assets/images/appProject1_11.jpg",
    "./assets/images/appProject1_12.jpg",
    "./assets/images/appProject1_13.jpg",
    "./assets/images/appProject1_14.jpg",
    "./assets/images/appProject1_15.jpg",
    "./assets/images/appProject1_16.jpg",
    "./assets/images/appProject1_17.jpg"
  ],
  "Calculate the semester average": [
    "./assets/images/appProject2_1.jpg",
    "./assets/images/appProject2_2.jpg"
  ],
  "Patients list": [
    "./assets/images/webProject3_1.gif",
    "./assets/images/webProject3_2.gif",
    "./assets/images/webProject3_3.gif",
    "./assets/images/webProject3_4.gif",
    "./assets/images/webProject3_5.gif"
  ],
    "Dashboard": [
    "./assets/images/webProject2_1.gif",
    "./assets/images/webProject2_2.gif"
  ],
    "Portfolio": [
    "./assets/images/webProject1_1.gif",
    "./assets/images/webProject1_1,5.gif",
    "./assets/images/webProject1_2.gif",
    "./assets/images/webProject1_3.gif",
    "./assets/images/webProject1_4.gif",
    "./assets/images/webProject1_5.gif"
  ],
    "To_Do List": [
    "./assets/images/desktop1.png",
    "./assets/images/desktop2.png",
    "./assets/images/desktop3.png",
    "./assets/images/desktop4.png",
    "./assets/images/desktop5.png"
  ]
};

function showImage(index) {
  modalImage.src = currentImages[index];
}

document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const title = item.querySelector(".project-title").textContent;
    currentImages = projectImages[title] || [];
    currentIndex = 0;

    if (currentImages.length > 0) {
      showImage(currentIndex);
      modal.style.display = "block";
    }
  });
});

// Navigation
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % currentImages.length;
  showImage(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  showImage(currentIndex);
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
