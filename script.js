// Sample data - In a real app, this would come from a backend API
const resources = [
    {
        id: 1,
        title: "Introduction to Calculus",
        category: "mathematics",
        type: "pdf",
        size: "2.4 MB",
        date: "2025-05-15",
        downloads: 1245,
        icon: "fa-calculator"
    },
    {
        id: 2,
        title: "Physics for Beginners",
        category: "science",
        type: "pdf",
        size: "3.1 MB",
        date: "2025-05-10",
        downloads: 987,
        icon: "fa-atom"
    },
    {
        id: 3,
        title: "Modern Web Development",
        category: "programming",
        type: "video",
        size: "156 MB",
        date: "2025-05-20",
        downloads: 2456,
        icon: "fa-code"
    },
    {
        id: 4,
        title: "World History Timeline",
        category: "history",
        type: "ppt",
        size: "5.7 MB",
        date: "2025-04-28",
        downloads: 756,
        icon: "fa-landmark"
    },
    {
        id: 5,
        title: "Classic Literature Collection",
        category: "literature",
        type: "doc",
        size: "1.8 MB",
        date: "2025-05-05",
        downloads: 1532,
        icon: "fa-book"
    },
    {
        id: 6,
        title: "Linear Algebra Fundamentals",
        category: "mathematics",
        type: "pdf",
        size: "4.2 MB",
        date: "2025-05-18",
        downloads: 876,
        icon: "fa-superscript"
    }
];

// DOM Elements
const resourcesContainer = document.getElementById('resourcesContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const typeFilter = document.getElementById('typeFilter');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');
const uploadBtn = document.getElementById('uploadBtn');
const uploadModal = document.getElementById('uploadModal');
const closeBtn = document.querySelector('.close-btn');
const uploadForm = document.getElementById('uploadForm');
const documentFile = document.getElementById('documentFile');
const fileLabel = document.querySelector('.file-label');
const fileNameDisplay = document.createElement('span');
fileLabel.appendChild(fileNameDisplay);

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
}

// Initialize theme from localStorage or prefer-color-scheme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(prefersDark ? 'dark' : 'light');
    }
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);

// Upload Modal Functionality
uploadBtn.addEventListener('click', () => {
    uploadModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
    uploadModal.classList.remove('active');
    document.body.style.overflow = '';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === uploadModal) {
        uploadModal.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Handle file selection
documentFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileNameDisplay.textContent = file.name;
        fileNameDisplay.style.marginTop = '0.5rem';
        fileNameDisplay.style.color = 'var(--primary-color)';
    } else {
        fileNameDisplay.textContent = '';
    }
});

// Handle form submission
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('documentTitle').value;
    const category = document.getElementById('documentCategory').value;
    const type = document.getElementById('documentType').value;
    const file = documentFile.files[0];
    
    if (!file) {
        alert('Please select a file to upload');
        return;
    }
    
    // Create a new resource object
    const newResource = {
        id: Date.now(), // Simple unique ID
        title: title,
        category: category,
        type: type,
        size: formatFileSize(file.size),
        date: new Date().toISOString().split('T')[0],
        downloads: 0,
        icon: getIconForType(type)
    };
    
    // Add to resources array
    resources.unshift(newResource);
    
    // Update the display
    handleFilterChange();
    
    // Close modal and reset form
    uploadModal.classList.remove('active');
    document.body.style.overflow = '';
    uploadForm.reset();
    fileNameDisplay.textContent = '';
    
    // Show success message
    alert('Document uploaded successfully!');
});

// Helper function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper function to get icon based on file type
function getIconForType(type) {
    const icons = {
        'pdf': 'fa-file-pdf',
        'doc': 'fa-file-word',
        'ppt': 'fa-file-powerpoint',
        'video': 'fa-file-video'
    };
    return icons[type] || 'fa-file-alt';
}

// Display resources
function displayResources(resourcesToDisplay) {
    resourcesContainer.innerHTML = '';
    
    if (resourcesToDisplay.length === 0) {
        resourcesContainer.innerHTML = '<p class="no-results">No resources found matching your criteria.</p>';
        return;
    }
    
    resourcesToDisplay.forEach(resource => {
        const resourceElement = document.createElement('div');
        resourceElement.className = 'resource-card';
        resourceElement.innerHTML = `
            <div class="resource-image">
                <i class="fas ${resource.icon}"></i>
            </div>
            <div class="resource-info">
                <span class="resource-category">${resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}</span>
                <h3 class="resource-title">${resource.title}</h3>
                <div class="resource-meta">
                    <span>${resource.type.toUpperCase()}</span>
                    <span>${resource.size}</span>
                </div>
                <a href="#" class="download-btn" data-id="${resource.id}">
                    <i class="fas fa-download"></i> Download
                </a>
            </div>
        `;
        resourcesContainer.appendChild(resourceElement);
    });
}

// Filter resources based on search and filters
function filterResources() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedType = typeFilter.value;
    
    return resources.filter(resource => {
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm) ||
                           resource.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || resource.category === selectedCategory;
        const matchesType = !selectedType || resource.type === selectedType;
        
        return matchesSearch && matchesCategory && matchesType;
    });
}

// Handle search and filter changes
function handleFilterChange() {
    const filteredResources = filterResources();
    displayResources(filteredResources);
}

// Event Listeners
searchBtn.addEventListener('click', handleFilterChange);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleFilterChange();
    }
});
categoryFilter.addEventListener('change', handleFilterChange);
typeFilter.addEventListener('change', handleFilterChange);

// Download button click handler
document.addEventListener('click', (e) => {
    if (e.target.closest('.download-btn')) {
        e.preventDefault();
        const resourceId = parseInt(e.target.closest('.download-btn').dataset.id);
        const resource = resources.find(r => r.id === resourceId);
        if (resource) {
            // In a real app, this would trigger a file download
            alert(`Downloading: ${resource.title} (${resource.type.toUpperCase()})`);
            resource.downloads++;
        }
    }
});

// Initialize the page by displaying all resources and setting up theme
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    displayResources(resources);
});
