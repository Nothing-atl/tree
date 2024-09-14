

// Function to make the API request
async function translateText(text, sourceLang, targetLang) {
    const LINGVA_API_BASE_URL = 'https://lingva.ml/api/v1';
  
    try {
      // Construct the API URL
      const url = `${LINGVA_API_BASE_URL}/${sourceLang}/${targetLang}/${encodeURIComponent(text)}`;
      
      // Make the API request
      const response = await fetch(url);
      const data = await response.json();
  
      // Return the translated text
      return data.translation;
    } catch (error) {
      console.error('Error during translation:', error);
      return 'Translation error.';
    }
  }
  
  // Handling form submission
  document.getElementById('convert-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the form from reloading the page
    
    // Get the input values
    const text = document.getElementById('source-text').value;
    const sourceLang = document.getElementById('source-lang').value;
    const targetLang = document.getElementById('target-lang').value;
    
    // Call the translation function
    const translatedText = await translateText(text, sourceLang, targetLang);
    
    // Display the translated text
    document.getElementById('translated-text').innerText = translatedText;
  });
  