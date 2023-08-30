# Patient Kiosk Finder

This is a React application that helps users find the nearest medical kiosks based on geographic coordinates.

### Setup Instructions

1. **Clone the repository:**
2. npm install
3. Start the development server:npm start
### How to Use
1. Enter your coordinates manually (latitude and longitude).
2. Click the "Search" button to find the nearest medical kiosks.
3. Alternatively, use your current location by clicking the "Use My Location" button.
The list of nearest medical kiosks will be displayed, along with their names and distances.

### Assumptions Made
- The application assumes that the provided API URL will return a list of medical kiosks' data in response to a GET request with latitude and longitude parameters.
- It assumes that the API response will include kiosk information including name, latitude, and longitude.

### Design Choices
- The application has a simple and user-friendly design with input fields for coordinates and buttons for actions.
- Nearest kiosk results are displayed in a list with relevant information (name and distance).
- Error messages provide clear feedback to users in case of invalid input or API errors.

### Challenges Faced
- Geolocation Handling: Integrating and handling geolocation access and errors was a challenge, as different browsers and devices might have varying behaviors.
- Distance Calculation: Implementing the Haversine formula accurately for distance calculation required attention to detail.
- UI and Responsiveness: Ensuring that the UI components are responsive and visually appealing on different devices and screen sizes posed design and CSS challenges.


