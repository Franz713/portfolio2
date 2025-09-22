// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.navmenu a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
const animatedElements = document.querySelectorAll('.section-header, .about-card, .skill-category, .project-item, .contact-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Typing effect for the title
const titleElement = document.querySelector('.home-text h2');
const titleText = titleElement.textContent;
titleElement.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < titleText.length) {
        titleElement.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// Skills animation on scroll
const skillItems = document.querySelectorAll('.skill-item');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, observerOptions);

skillItems.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateX(-30px)';
    skill.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObserver.observe(skill);
});

// Project hover effects
const projectItems = document.querySelectorAll('.project-item');
projectItems.forEach(project => {
    const overlay = project.querySelector('.project-overlay');
    const content = project.querySelector('.project-content h3');
    
    project.addEventListener('mouseenter', () => {
        overlay.style.opacity = '1';
        content.style.color = 'var(--accent-color)';
    });
    
    project.addEventListener('mouseleave', () => {
        overlay.style.opacity = '0';
        content.style.color = 'var(--text-color)';
    });
});

// Contact card interactions
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Editable About Section
let isEditing = false;
let originalText = '';

function toggleEditMode() {
    const aboutText = document.getElementById('aboutText');
    const aboutEditor = document.getElementById('aboutTextEditor');
    const editBtn = document.getElementById('editAboutBtn');
    const editActions = document.getElementById('editActions');
    
    if (!isEditing) {
        isEditing = true;
        originalText = aboutText.textContent;
        
        aboutText.style.display = 'none';
        aboutEditor.style.display = 'block';
        aboutEditor.value = originalText;
        aboutEditor.focus();
        
        editBtn.innerHTML = '<i class="fas fa-eye"></i> Preview';
        editBtn.style.background = '#dc2626';
        editActions.style.display = 'flex';
        aboutText.classList.add('editing');
    } else {
        aboutText.textContent = aboutEditor.value;
        aboutText.style.display = 'block';
        aboutEditor.style.display = 'none';
        
        editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        editBtn.style.background = 'var(--accent-color)';
    }
}

function saveChanges() {
    const aboutText = document.getElementById('aboutText');
    const aboutEditor = document.getElementById('aboutTextEditor');
    const editBtn = document.getElementById('editAboutBtn');
    const editActions = document.getElementById('editActions');
    
    aboutText.textContent = aboutEditor.value;
    localStorage.setItem('aboutText', aboutEditor.value);
    
    isEditing = false;
    aboutText.style.display = 'block';
    aboutEditor.style.display = 'none';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.style.background = 'var(--accent-color)';
    editActions.style.display = 'none';
    aboutText.classList.remove('editing');
    
    showNotification('Changes saved successfully!');
}

function cancelEdit() {
    const aboutText = document.getElementById('aboutText');
    const aboutEditor = document.getElementById('aboutTextEditor');
    const editBtn = document.getElementById('editAboutBtn');
    const editActions = document.getElementById('editActions');
    
    aboutText.textContent = originalText;
    
    isEditing = false;
    aboutText.style.display = 'block';
    aboutEditor.style.display = 'none';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editBtn.style.background = 'var(--accent-color)';
    editActions.style.display = 'none';
    aboutText.classList.remove('editing');
    
    showNotification('Changes discarded');
}

// Load saved about text from localStorage
window.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('aboutText');
    if (savedText) {
        document.getElementById('aboutText').textContent = savedText;
        document.getElementById('aboutTextEditor').value = savedText;
    }
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--accent-color)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    notification.style.zIndex = '2000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}
