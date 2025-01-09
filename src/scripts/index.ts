import '../styles/style.css';

interface FormElements extends HTMLFormControlsCollection {
  fullName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
  confirmPassword: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
  readonly elements: FormElements;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registerForm') as RegisterForm;
  
  const validateEmail = (email: string): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  };
  
  const validatePassword = (password: string): boolean => {
      return password.length >= 8;
  };
  
  const validateForm = (e: Event): void => {
      e.preventDefault();
      
      const { fullName, email, password, confirmPassword } = form.elements;
      let isValid = true;
      
      // Validate Full Name
      if (!fullName.value.trim()) {
          fullName.classList.add('is-invalid');
          showErrorMessage(fullName, "Full Name is required.");
          isValid = false;
      } else {
          fullName.classList.remove('is-invalid');
          fullName.classList.add('is-valid');
          hideErrorMessage(fullName);
      }
      
      // Validate Email
      if (!validateEmail(email.value)) {
          email.classList.add('is-invalid');
          showErrorMessage(email, "Please enter a valid email address.");
          isValid = false;
      } else {
          email.classList.remove('is-invalid');
          email.classList.add('is-valid');
          hideErrorMessage(email);
      }
      
      // Validate Password
      if (!validatePassword(password.value)) {
          password.classList.add('is-invalid');
          showErrorMessage(password, "Password must be at least 8 characters long.");
          isValid = false;
      } else {
          password.classList.remove('is-invalid');
          password.classList.add('is-valid');
          hideErrorMessage(password);
      }
      
      // Validate Confirm Password
      if (password.value !== confirmPassword.value || !confirmPassword.value) {
          confirmPassword.classList.add('is-invalid');
          showErrorMessage(confirmPassword, "Passwords do not match.");
          isValid = false;
      } else {
          confirmPassword.classList.remove('is-invalid');
          confirmPassword.classList.add('is-valid');
          hideErrorMessage(confirmPassword);
      }
      
      if (isValid) {
          // Here you would typically send the form data to your server
          console.log('Form is valid, submitting...', {
              fullName: fullName.value,
              email: email.value,
              password: password.value
          });
          
          // Reset form after successful submission
          form.reset();
          Array.from(form.elements).forEach((element) => {
            // Type assertion to HTMLInputElement
            const inputElement = element as HTMLInputElement;
            
            if (inputElement instanceof HTMLInputElement) {
              inputElement.classList.remove('is-valid');
            }
          });
          
      } else {
          // Focus on the first invalid field
          const firstInvalid = form.querySelector('.is-invalid') as HTMLElement;
          firstInvalid?.focus();
      }
  };
  
  const showErrorMessage = (input: HTMLInputElement, message: string) => {
      const errorMessage = input.nextElementSibling as HTMLElement;
      if (errorMessage) {
          errorMessage.textContent = message;
          errorMessage.classList.add('d-block');
      }
  };

  const hideErrorMessage = (input: HTMLInputElement) => {
      const errorMessage = input.nextElementSibling as HTMLElement;
      if (errorMessage) {
          errorMessage.classList.remove('d-block');
      }
  };
  
  form.addEventListener('submit', validateForm);
});
