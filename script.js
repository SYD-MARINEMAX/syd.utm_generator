document.addEventListener('DOMContentLoaded', function() {
    const utmForm = document.getElementById('utmForm');
    const resultContainer = document.getElementById('resultContainer');
    const generatedUrlElement = document.getElementById('generatedUrl');
    const copyBtn = document.getElementById('copyBtn');
    
    // Form validation and URL generation
    utmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const baseUrl = document.getElementById('baseUrl').value.trim();
        const utmSource = document.getElementById('utmSource').value;
        const utmMedium = document.getElementById('utmMedium').value;
        const utmCampaign = document.getElementById('utmCampaign').value.trim().replace(/\s+/g, '_');
        const utmTerm = document.getElementById('utmTerm').value.trim().replace(/\s+/g, '+');
        const utmContent = document.getElementById('utmContent').value.trim().replace(/\s+/g, '_');
        
        // Validate required fields
        if (!baseUrl || !utmSource || !utmMedium) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Validate URL format
        try {
            new URL(baseUrl);
        } catch (e) {
            alert('Please enter a valid URL including http:// or https://');
            return;
        }
        
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
    
    // Form input validation
    document.getElementById('utmCampaign').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\s+/g, '_');
    });
    
    document.getElementById('utmTerm').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\s+/g, '+');
    });
    
    document.getElementById('utmContent').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\s+/g, '_');
    });
});
