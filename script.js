document.addEventListener('DOMContentLoaded', function() {
    const utmForm = document.getElementById('utmForm');
    const resultContainer = document.getElementById('resultContainer');
    const generatedUrlElement = document.getElementById('generatedUrl');
    const copyBtn = document.getElementById('copyBtn');
    
    // Function to generate and update URL
    function generateUrl() {
        const baseUrl = document.getElementById('baseUrl').value.trim();
        const utmSource = document.getElementById('utmSource').value;
        const utmMedium = document.getElementById('utmMedium').value;
        const utmCampaign = document.getElementById('utmCampaign').value.trim().replace(/\s+/g, '_');
        const utmTerm = document.getElementById('utmTerm').value.trim().replace(/\s+/g, '+');
        const utmContent = document.getElementById('utmContent').value.trim().replace(/\s+/g, '_');
        
        // Check if required fields are filled
        if (!baseUrl || !utmSource || !utmMedium) {
            return;
        }
        
        // Validate URL format
        try {
            // Build UTM URL
            let finalUrl = new URL(baseUrl);
            
            // Add UTM parameters
            finalUrl.searchParams.set('utm_source', utmSource);
            finalUrl.searchParams.set('utm_medium', utmMedium);
            
            if (utmCampaign) {
                finalUrl.searchParams.set('utm_campaign', utmCampaign);
            }
            
            if (utmTerm) {
                finalUrl.searchParams.set('utm_term', utmTerm);
            }
            
            if (utmContent) {
                finalUrl.searchParams.set('utm_content', utmContent);
            }
            
            // Display result
            generatedUrlElement.textContent = finalUrl.toString();
            resultContainer.classList.add('active');
            resultContainer.style.display = 'block';
        } catch (e) {
            // Invalid URL format - don't update
            return;
        }
    }
    
    // Form submission (prevent default behavior)
    utmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateUrl();
    });
    
    // Copy to clipboard functionality
    copyBtn.addEventListener('click', function() {
        const urlText = generatedUrlElement.textContent;
        
        navigator.clipboard.writeText(urlText)
            .then(() => {
                // Change button text temporarily
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy URL. Please try again or copy manually.');
            });
    });
    
    // Add input event listeners to all form fields
    const formFields = ['baseUrl', 'utmSource', 'utmMedium', 'utmCampaign', 'utmTerm', 'utmContent'];
    
    formFields.forEach(field => {
        document.getElementById(field).addEventListener('input', function(e) {
            // Apply specific formatting rules
            if (field === 'utmCampaign' || field === 'utmContent') {
                e.target.value = e.target.value.replace(/\s+/g, '_');
            } else if (field === 'utmTerm') {
                e.target.value = e.target.value.replace(/\s+/g, '+');
            }
            
            // Generate URL on every input change
            generateUrl();
        });
    });
});
