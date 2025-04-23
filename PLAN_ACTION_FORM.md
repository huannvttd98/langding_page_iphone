# Form Loading and Validation Implementation Plan

## Overview
This plan outlines the implementation of loading states and form validation for the iPhone landing page purchase modal form.

## Implementation Steps

### 1. Form Validation

#### Client-side Validation
- Add validation for required fields:
  - Full Name (letters and spaces only)
  - Email (valid email format)
  - Phone Number (valid phone format)
  - Shipping Address (required)
- Show inline validation messages
- Disable submit button until form is valid

#### HTML Updates
```html
<!-- Add validation attributes and error message containers -->
<div class="form-group">
  <label for="name">Full Name</label>
  <input type="text" id="name" pattern="[A-Za-z\s]+" required>
  <span class="error-message" id="name-error"></span>
</div>
```

### 2. Loading States

#### Visual Indicators
- Add spinner animation during form submission
- Disable form inputs while submitting
- Show progress feedback to user

#### CSS Implementation
```css
.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: none;
}

.submit-button.loading .spinner {
  display: inline-block;
  margin-left: 8px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.form-disabled {
  opacity: 0.7;
  pointer-events: none;
}
```

### 3. JavaScript Implementation

#### Form Validation Functions
```javascript
const validateName = (name) => {
  return /^[A-Za-z\s]+$/.test(name);
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone) => {
  return /^\+?[\d\s-()]{10,}$/.test(phone);
};
```

#### Loading State Management
```javascript
const setLoadingState = (isLoading) => {
  const form = document.getElementById('purchaseForm');
  const submitButton = form.querySelector('.submit-button');

  if (isLoading) {
    form.classList.add('form-disabled');
    submitButton.classList.add('loading');
  } else {
    form.classList.remove('form-disabled');
    submitButton.classList.remove('loading');
  }
};
```

### 4. Error Handling

- Show specific error messages for:
  - Invalid input validation
  - Network errors
  - Server errors
- Implement error recovery
- Preserve form data on error

### 5. Success Feedback

- Show success message
- Clear form after successful submission
- Provide next steps information
- Add option to submit another entry

## Implementation Timeline

1. **Day 1**: Add HTML and CSS for validation and loading states
2. **Day 2**: Implement JavaScript validation functions
3. **Day 3**: Add loading state management and API integration
4. **Day 4**: Implement error handling and success feedback
5. **Day 5**: Testing and refinement

## Testing Checklist

- [ ] All form fields validate correctly
- [ ] Loading spinner appears during submission
- [ ] Form is disabled while submitting
- [ ] Error messages are clear and helpful
- [ ] Success feedback is shown after submission
- [ ] Form recovers gracefully from errors
- [ ] Works across all major browsers
- [ ] Mobile responsive behavior works correctly

## Technical Requirements

- Update styles.css
- Modify script.js form submission logic
- Add validation utilities
- Enhance error handling in server/index.js