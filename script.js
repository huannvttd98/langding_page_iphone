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
      const href = this.getAttribute('href');
      if (href === '#') return; // Skip empty hash links

      const target = document.querySelector(href);
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

  function showNotification(message, isError = false) {
    const notificationDiv = document.createElement('div');
    notificationDiv.className = isError ? 'error-message' : 'success-message';

    notificationDiv.innerHTML = `
      <i class="fas ${isError ? 'fa-exclamation-circle' : 'fa-check-circle'}"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notificationDiv);

    setTimeout(() => notificationDiv.classList.add('show'), 10);

    setTimeout(() => {
      notificationDiv.classList.remove('show');
      setTimeout(() => notificationDiv.remove(), 300);
    }, 3000);
  }

  // Form validation functions
  const validateName = (name) => {
    return /^[A-Za-z\s]+$/.test(name);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\+?[\d\s-()]{10,}$/.test(phone);
  };

  const setFieldError = (fieldId, message) => {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');
    const errorSpan = document.getElementById(`${fieldId}-error`);

    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    errorSpan.textContent = message;
  };

  const setFieldSuccess = (fieldId) => {
    const field = document.getElementById(fieldId);
    const formGroup = field.closest('.form-group');

    formGroup.classList.remove('error');
    formGroup.classList.add('success');
  };

  const validateField = (fieldId, validatorFn, errorMessage) => {
    const field = document.getElementById(fieldId);
    const isValid = validatorFn(field.value.trim());

    if (!isValid) {
      setFieldError(fieldId, errorMessage);
    } else {
      setFieldSuccess(fieldId);
    }

    return isValid;
  };

  const setLoadingState = (isLoading) => {
    const form = document.getElementById('purchaseForm');
    const submitButton = form.querySelector('.submit-button');
    console.log( " submitButton", submitButton);
    if (isLoading) {
      form.classList.add('form-disabled');
      submitButton.classList.add('loading');
    } else {
      form.classList.remove('form-disabled');
      submitButton.classList.remove('loading');
    }
  };

  // Update the form submission event listener
  purchaseForm.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField('name', validateName, 'Please enter a valid name (letters and spaces only)');
    const isEmailValid = validateField('email', validateEmail, 'Please enter a valid email address');
    const isPhoneValid = validateField('phone', validatePhone, 'Please enter a valid phone number');
    const isAddressValid = validateField('address', value => value.length >= 10, 'Please enter a complete address (minimum 10 characters)');

    if (!isNameValid || !isEmailValid || !isPhoneValid || !isAddressValid) {
      return;
    }

    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      model: document.getElementById('model').value,
      storage: document.getElementById('model').value.match(/\d+GB/)[0],
      notes: document.getElementById('address').value.trim(),
      // Default values for now
      color: 'Not Selected',
      paymentMethod: 'Not Selected',
    };

    try {
      setLoadingState(true);
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('Thank you for your purchase! We will contact you soon.');
        modal.style.display = 'none';
        purchaseForm.reset();
        // Reset validation states
        document.querySelectorAll('.form-group').forEach(group => {
          group.classList.remove('success', 'error');
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification(error.message || 'An error occurred. Please try again later.', true);
    } finally {
      setLoadingState(false);
    }
  });

  // Add input event listeners for real-time validation
  document.getElementById('name').addEventListener('input', () => {
    validateField('name', validateName, 'Please enter a valid name (letters and spaces only)');
  });

  document.getElementById('email').addEventListener('input', () => {
    validateField('email', validateEmail, 'Please enter a valid email address');
  });

  document.getElementById('phone').addEventListener('input', () => {
    validateField('phone', validatePhone, 'Please enter a valid phone number');
  });

  document.getElementById('address').addEventListener('input', () => {
    validateField('address', value => value.length >= 10, 'Please enter a complete address (minimum 10 characters)');
  });
});
