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
const modalTitle = document.getElementById("modalTitle");
const modalRole = document.getElementById("modalRole");
const modalDesc = document.getElementById("modalDesc");
const modalSkillsList = document.getElementById("modalSkills");
const modalDots = document.getElementById("modalDots");

let currentImages = [];
let currentIndex = 0;

// Project images mapping
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
  ],
    "Furniture E-commerce App": [
    "./assets/images/appProject2_1.jpg",
    "./assets/images/appProject2_2.jpg",
    "./assets/images/appProject2_3.jpg",
    "./assets/images/appProject2_4.jpg",
    "./assets/images/appProject2_5.jpg",
    "./assets/images/appProject2_6.jpg",
    "./assets/images/appProject2_7.jpg",
    "./assets/images/appProject2_8.jpg",
    "./assets/images/appProject2_9.jpg",
    "./assets/images/appProject2_10.jpg",
    "./assets/images/appProject2_11.jpg",
    "./assets/images/appProject2_12.jpg",
    "./assets/images/appProject2_13.jpg",
    "./assets/images/appProject2_14.jpg",
    "./assets/images/appProject2_15.jpg",

  ],
  "Online Learning Platform App": [
    "./assets/images/appProject3_1.png",
    "./assets/images/appProject3_2.png",
    "./assets/images/appProject3_3.png",
    "./assets/images/appProject3_4.png",
    "./assets/images/appProject3_5.png",
    "./assets/images/appProject3_6.png",
    "./assets/images/appProject3_7.png",
    "./assets/images/appProject3_8.png",
    "./assets/images/appProject3_9.png",
    "./assets/images/appProject3_10.png",
    "./assets/images/appProject3_11.png",
    "./assets/images/appProject3_12.png",
    "./assets/images/appProject3_13.png",

  ],
  "Fitness / Workout App": [
    "./assets/images/appProject4_1.png",
    "./assets/images/appProject4_2.png",
    "./assets/images/appProject4_3.png",
    "./assets/images/appProject4_4.png",
    "./assets/images/appProject4_5.png",
    "./assets/images/appProject4_6.png",
    "./assets/images/appProject4_7.png",
    "./assets/images/appProject4_8.png",
    "./assets/images/appProject4_9.png",
    "./assets/images/appProject4_10.png",
    "./assets/images/appProject4_11.png",
    "./assets/images/appProject4_12.png",
    "./assets/images/appProject4_13.png",
    "./assets/images/appProject4_14.png",
    "./assets/images/appProject4_15.png",
    "./assets/images/appProject4_16.png",
    "./assets/images/appProject4_17.png",
    "./assets/images/appProject4_18.png",
    "./assets/images/appProject4_19.png",
    "./assets/images/appProject4_20.png",
    "./assets/images/appProject4_21.png",
  ],
  "Furniture E-commerce Admin Panel": [
    "./assets/images/webProject4_1.png",
    "./assets/images/webProject4_2.png",
    "./assets/images/webProject4_3.png",
    "./assets/images/webProject4_4.png",
    "./assets/images/webProject4_5.png",
    "./assets/images/webProject4_6.png",
    "./assets/images/webProject4_7.png",
    "./assets/images/webProject4_8.png",
    "./assets/images/webProject4_9.png"
  ],
    "Patients list": [
    "./assets/images/webProject3_1.gif",
    "./assets/images/webProject3_2.gif",
    "./assets/images/webProject3_3.gif",
    "./assets/images/webProject3_4.gif",
    "./assets/images/webProject3_5.gif"
  ],
  "Portfolio": [
    "./assets/images/webProject1_1.gif",
    "./assets/images/webProject1_1,5.gif",
    "./assets/images/webProject1_2.gif",
    "./assets/images/webProject1_3.gif",
    "./assets/images/webProject1_4.gif",
    "./assets/images/webProject1_5.gif"
  ]
};

// Project descriptions
const projectData = {
  "Doctor booking": {
    title: "Doctors appointments",
    role: "I've built the whole project, frontend and backend",
    description: "A mobile app designed to simplify communication and scheduling between patients and doctors. Patients can book appointments, view available time slots, and receive reminders, while doctors can manage their schedules and consultation times. The app is connected to a backend server for real-time data storage, retrieval, and push notifications using Firebase.",
    skills: ["Java", "XML", "PHP", "MySQL", "Firebase"]
  },
    "Furniture E-commerce App": {
    title: "🛋️ Furniture E-commerce App",
    role: "I developed the entire application, including both the frontend (mobile app) and backend (API & database design).",
    description: "A full-stack furniture e-commerce mobile application that provides users with a smooth and intuitive shopping experience. Customers can browse a wide range of furniture products, filter by categories, view detailed product information, and add items to their cart for purchase. The app also supports secure authentication and allows users to track their orders in real time.",
    skills: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs","Firebase (Authentication / Notifications)"]
  },
    "Furniture E-commerce Admin Panel": {
    title: "🛋️ Furniture E-commerce Admin Panel",
    role: "I developed the entire application, including both the frontend (mobile app) and backend (API & database design).",
    description : "On the admin side, the system includes a complete management panel that enables administrators to :\n\n●   Add, update, and delete products.\n●    Manage categories dynamically.\n●   Monitor and update order statuses (pending, shipped, delivered, etc.).\n●   Handle inventory and stock levels.\n●   View customer orders and activity.\n\n The application is powered by a robust backend using RESTful APIs and a relational database, ensuring efficient data handling, scalability, and real-time synchronization between users and administrators.",
    skills: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs","Firebase (Authentication / Notifications)"]
  },
    "Online Learning Platform App": {
    title: "🎓 Online Learning Platform App",
    role: "I developed the entire application, including both the frontend (mobile app) and backend (API & database design).",
    description: "This project is a mobile e-learning app that enables users to discover, enroll in, and manage online courses.\nIt includes:\n\n●   Onboarding & authentication (sign up, login, social login)\n●   Course selection & search with categories and filters\n●   Personalized home dashboard with recommendations and popular courses\n●   Instructor listings to build credibility\n●   User profile & settings for account management",
    skills: ["Flutter", "Dart", "PHP", "MySQL", "REST APIs","Firebase (Authentication / Notifications)"]
  },
  "Fitness / Workout App": {
    title: "🏋️ Fitness / Workout App",
    role: "I developed the frontend of the application using Flutter.",
    description : "This is a fitness app called TrainTrek (or Fitline).\n It helps users with:\n\n●   Workouts – Exercise classes, programs (e.g., “Powerfull Crusher”), and trainer guidance\n●   Tracking – Weight, height, fat mass, steps, and calories burned\n●  Booking – Gym sessions and class schedules\n●   Trainers – Browse and follow fitness experts\n●   Profile & Settings – User info, preferences (country, currency, dark mode), and notifications\n●   Messages & Notifications – Activity updates and chats\n●   Authentication – Sign up, login, and password reset",
    skills: ["Flutter", "Dart","Firebase (Authentication / Notifications)"]
  },
  "Patients list": {
    title: "Patient Management Platform",
    role: "Back-end developer",
    description: "A web platform built with React & Node.js where doctors can add, edit, and delete patient data with a clean, intuitive interface backed by a robust server-side API.",
    skills: ["Node.js", "React", "MySQL"]
  },
  "Portfolio": {
    title: "Personal Portfolio Website",
    role: "Full-stack developer & designer",
    description: "A responsive personal portfolio website built from scratch to showcase projects, skills, and experience. Features smooth navigation, animated sections, a project gallery with modal slideshow, and a clean dark aesthetic crafted with pure HTML, CSS, and JavaScript.",
    skills: ["HTML", "CSS", "JavaScript"]
  }
};

function buildDots(count) {
  modalDots.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      showImage(currentIndex);
    });
    modalDots.appendChild(dot);
  }
}

function updateDots(index) {
  const dots = modalDots.querySelectorAll('span');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

function showImage(index) {
  modalImage.src = currentImages[index];
  updateDots(index);
}

document.querySelectorAll(".project-item").forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();
    const title = item.querySelector(".project-title").textContent.trim();
    currentImages = projectImages[title] || [];
    currentIndex = 0;

    if (currentImages.length > 0) {
      // Populate description
      const data = projectData[title] || {};
      modalTitle.textContent = data.title || title;
      modalRole.textContent = data.role || '';
      modalDesc.innerHTML = (data.description || '').replace(/\n/g, '<br>');

      modalSkillsList.innerHTML = '';
      (data.skills || []).forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        modalSkillsList.appendChild(li);
      });

      buildDots(currentImages.length);
      showImage(currentIndex);
      modal.style.display = "block";
      document.body.style.overflow = 'hidden';
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

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (modal.style.display !== 'block') return;
  if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % currentImages.length; showImage(currentIndex); }
  if (e.key === 'ArrowLeft') { currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; showImage(currentIndex); }
  if (e.key === 'Escape') closeModal();
});

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = '';
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
