// JavaScript functionality for X-ray Classifier application

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tooltips and popovers if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        // biome-ignore lint/style/noVar: <explanation>
        // biome-ignore lint/correctness/noInnerDeclarations: <explanation>
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl));
        
        // biome-ignore lint/style/noVar: <explanation>
                // biome-ignore lint/correctness/noInnerDeclarations: <explanation>
                                var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl));
    }
    
    // Dark mode toggle functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = document.querySelector('.theme-icon');
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.setAttribute('data-bs-theme', 'dark');
        if (darkModeToggle) darkModeToggle.checked = true;
        if (themeIcon) themeIcon.classList.replace('bi-sun', 'bi-moon');
    }
    
    // Toggle theme when the switch is clicked
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                htmlElement.setAttribute('data-bs-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.classList.replace('bi-sun', 'bi-moon');
            } else {
                htmlElement.setAttribute('data-bs-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.classList.replace('bi-moon', 'bi-sun');
            }
            
            // Add class to body for transition effect
            document.body.classList.add('theme-transition');
            setTimeout(() => {
                document.body.classList.remove('theme-transition');
            }, 1000);
        });
    }
    
    // Image preview functionality
    const fileInput = document.getElementById('file');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    const defaultPreviewText = document.getElementById('default-preview-text');
    
    if (fileInput && imagePreview) {
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            
            if (file) {
                // Validate file type
                const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                if (!validTypes.includes(file.type)) {
                    alert('Please select a valid image file (JPG, JPEG, PNG)');
                    fileInput.value = '';
                    return;
                }
                
                // Validate file size (optional, limit to 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('File size should be less than 5MB');
                    fileInput.value = '';
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    if (defaultPreviewText) {
                        defaultPreviewText.style.display = 'none';
                    }
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    
                    if (previewContainer) {
                        previewContainer.classList.add('has-image');
                    }
                }
                
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Form submission and loading overlay
    const uploadForm = document.getElementById('upload-form');
    const loadingOverlay = document.getElementById('loading-overlay');
    
    if (uploadForm && loadingOverlay) {
        uploadForm.addEventListener('submit', () => {
            if (fileInput && fileInput.files.length > 0) {
                loadingOverlay.classList.add('active');
                setTimeout(() => {
                    // This allows the loading overlay to render before form submission
                    return true;
                }, 10);
            }
        });
    }
    
    // Results animation
    const resultBox = document.querySelector('.result-box');
    if (resultBox) {
        resultBox.classList.add('fade-in');
        
        // Add appropriate class based on result
        const resultLabel = document.querySelector('.result-box h3');
        if (resultLabel) {
            if (resultLabel.textContent.includes('Positive')) {
                resultBox.classList.add('positive');
            } else {
                resultBox.classList.add('negative');
            }
        }
    }
});
