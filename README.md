# EduShare - Educational Resource Portal

A modern, responsive web application for sharing and discovering educational resources. EduShare allows users to browse, search, filter, and download study materials across various categories and file types.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Dark/Light Theme**: Toggle between light and dark modes
- **Advanced Search**: Find resources by keywords
- **Smart Filtering**: Filter by category and file type
- **Resource Upload**: Easily upload new educational materials
- **Download Tracking**: Keep track of download counts
- **Modern UI**: Clean, intuitive interface with smooth animations

## Technologies Used

- HTML5
- CSS3 (with CSS Variables for theming)
- JavaScript (ES6+)
- [Font Awesome 6](https://fontawesome.com/) - For icons
- Google Fonts (Inter) - For typography

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build step required - runs directly in the browser

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Arisha-452000/EduShare---Educational-Resource-Portal
   cd edushare
   ```

2. Open `index.html` in your preferred web browser.

## Usage

1. **Browsing Resources**
   - Scroll through the grid of available resources
   - Each card shows the title, category, file type, and size

2. **Searching**
   - Use the search bar to find specific resources by title or category
   - Press Enter or click the search icon to execute the search

3. **Filtering**
   - Use the dropdown menus to filter by category and/or file type
   - Select "All" in either dropdown to clear that filter

4. **Uploading Resources**
   - Click the "Upload Document" button
   - Fill in the required information (title, category, type)
   - Select a file to upload
   - Click "Upload Document" to submit

5. **Downloading Resources**
   - Click the "Download" button on any resource card
   - A confirmation will appear (in a real app, this would start the download)

6. **Theme Toggle**
   - Click the moon/sun icon in the top-right corner to toggle between light and dark modes
   - Your preference will be saved for future visits

## File Structure

```
edushare/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
```

## Customization

### Adding More Categories

To add more categories, update the following:
1. Add the category to the `categoryFilter` select element in `index.html`
2. Add the category to the `documentCategory` select element in the upload form
3. The system will automatically handle the new category in the filtering

### Adding More File Types

To support additional file types:
1. Add the file type to the `typeFilter` select element in `index.html`
2. Add the file type to the `documentType` select element in the upload form
3. Update the `getIconForType` function in `script.js` to include an appropriate icon for the new file type

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - 

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Google Fonts](https://fonts.google.com/) for the Inter font family
- All contributors and users of EduShare

---

<div align="center">
  Made with ❤️ by Arisha 
</div>
