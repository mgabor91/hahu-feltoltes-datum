javascript: (function() {
    const API_ENDPOINT = 'http://localhost:5000/check';

    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    function fetchLastModified(imageUrl, containerElement) {
        if (!imageUrl) {
            console.error('fetchLastModified called with empty imageUrl', containerElement);
            return;
        }
        const url = `${API_ENDPOINT}?url=${encodeURIComponent(imageUrl)}`;
        fetch(url).then(response => {
            if (!response.ok) {
                console.error(`HTTP error! status: ${response.status}, url: ${url}`);
                return response.text().then(text => {
                    throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
                });
            }
            return response.json();
        }).then(data => {
            if (data && data.lastModified !== undefined && data.lastModified !== null) {
                const lastModifiedDate = formatDate(data.lastModified);
                const dateElement = document.createElement( % 27 div % 27);
                dateElement.style.fontSize = % 270.8 em % 27;
                dateElement.style.color = % 27 #777';          dateElement.textContent = % 60 Last Modified: $ {
                    lastModifiedDate
                } % 60;
                containerElement.appendChild(dateElement);
            } else {
                console.warn( % 60 No valid lastModified data
                    for $ {
                        imageUrl
                    } % 60, data);
                const noDataElement = document.createElement('div');
                noDataElement.style.fontSize = '0.8em';
                noDataElement.style.color = '#777';
                noDataElement.textContent = 'Last Modified: N/A';
                containerElement.appendChild(noDataElement);
            }
        }).catch(error => {
            console.error('Error fetching last modified for', imageUrl, error);
            const errorElement = document.createElement('div');
            errorElement.style.fontSize = '0.8em';
            errorElement.style.color = 'red';
            errorElement.textContent = % 60 Error: $ {
                error.message
            } % 60;
            containerElement.appendChild(errorElement);
        });
    }

    function processImages() {
        const images = document.querySelectorAll('img');
        let imageCount = 0;
        images.forEach(img => {
            if (img && img.src) {
                imageCount++;
                const imageUrl = img.src;
                const containerElement = img.parentElement;
                fetchLastModified(imageUrl, containerElement);
            } else {
                console.warn("Skipping invalid image element", img);
            }
        });
        console.log( % 60 Processed $ {
                imageCount
            }
            images. % 60);
    }
    try {
        processImages();
    } catch (error) {
        console.error("Error in processImages:", error);
    }
})();
