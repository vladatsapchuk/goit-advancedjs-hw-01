const setStoredData = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  };
  
  const getStoredData = key => {
    try {
      const dataFromLS = localStorage.getItem(key);
      return dataFromLS ? JSON.parse(dataFromLS) : null;
    } catch (err) {
      console.log(err);
      return null;
    }
  };
  
  const feedbackForm = document.querySelector('.feedback-form');
  const feedbackformdatakey = 'feedback-form-session-data';
  
  const formData = {
    email: '',
    message: '',
  };
  
  const savedData = getStoredData(feedbackformdatakey);

  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';
    feedbackForm.elements.email.value = formData.email;
    feedbackForm.elements.message.value = formData.message;
  }

  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const email = formData.email.trim();
    const message = formData.message.trim();
  
    if (!email || !message) {
      alert('Both email and message are required. Please complete all fields.');
      return;
    }
  
    console.log('Submitted formData:', formData);
  
    // Clear stored data and reset form
    localStorage.removeItem(feedbackformdatakey);
    feedbackForm.reset();
    
    // Clear formData fields
    formData.email = '';
    formData.message = '';
  });

  feedbackForm.addEventListener('input', evt => {
    formData[evt.target.name] = evt.target.value;
    setStoredData(feedbackformdatakey, formData);
  });