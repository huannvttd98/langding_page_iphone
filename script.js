// Language translations will be loaded dynamically
let translations = {};

async function loadTranslations(language) {
  try {
    const response = await fetch(`lang/${language}.json`);
    translations[language] = await response.json();
  } catch (error) {
    console.error(`Error loading ${language} translations:`, error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  // Load all translations
  await Promise.all([
    loadTranslations('en'),
    loadTranslations('es'),
    loadTranslations('fr'),
  ]);

  // Language switching functionality
  const languageSelect = document.getElementById('languageSelect');

  // Load saved language preference
  const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
  languageSelect.value = savedLanguage;
  updateLanguage(savedLanguage);

  languageSelect.addEventListener('change', e => {
    const language = e.target.value;
    updateLanguage(language);
    localStorage.setItem('preferredLanguage', language);
    document.documentElement.lang = language;
  });

  function updateLanguage(language) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[language] && translations[language][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[language][key];
        } else {
          element.textContent = translations[language][key];
        }
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Navbar background opacity on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    }
  });

  // Animate elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      '.feature-card, .spec-item, .gallery-item, .price-card'
    );
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;
      const isVisible = elementTop < window.innerHeight && elementBottom >= 0;

      if (isVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  };

  // Initial styles for animation
  const elementsToAnimate = document.querySelectorAll(
    '.feature-card, .spec-item, .gallery-item, .price-card'
  );
  elementsToAnimate.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);

  // Modal functionality
  const modal = document.getElementById('purchaseModal');
  const buyButtons = document.querySelectorAll('.buy-button');
  const closeModal = document.querySelector('.close-modal');
  const purchaseForm = document.getElementById('purchaseForm');
  const modelInput = document.getElementById('model');

  buyButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      const card = button.closest('.price-card');
      const model = card.querySelector('h3').textContent;
      modelInput.value = model;
      modal.style.display = 'flex'; // Changed from 'block' to 'flex'
    });
  });

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';

    // Add icon and message container
    successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;

    document.body.appendChild(successDiv);

    // Add animation
    setTimeout(() => successDiv.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
      successDiv.classList.remove('show');
      setTimeout(() => successDiv.remove(), 300);
    }, 3000);
  }

  purchaseForm.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      model: document.getElementById('model').value,
      storage: document.getElementById('model').value.match(/\d+GB/)[0],
      notes: document.getElementById('address').value,
      // Default values for now
      color: 'Not Selected',
      paymentMethod: 'Not Selected',
    };

    try {
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccessMessage(
          'Thank you for your purchase! We will contact you soon.'
        );
        modal.style.display = 'none';
        purchaseForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      showSuccessMessage('An error occurred. Please try again later.');
    }
  });
});
