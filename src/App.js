import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance * 1000; // Convert to meters
}

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [geolocationAvailable, setGeolocationAvailable] = useState(false);
  const [medicalKiosks, setMedicalKiosks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if geolocation is available in the browser
    if ('geolocation' in navigator) {
      setGeolocationAvailable(true);
    }
  }, []);

  const handleSearch = async () => {
    if (latitude.trim() === '' || longitude.trim() === '') {
      setError('Please enter valid coordinates.');
      return;
    }

    try {
      setError('');
      const response = await axios.get(
        `YOUR_API_URL_HERE?latitude=${latitude}&longitude=${longitude}`
      );

      const kiosksWithDistances = response.data.map((kiosk) => ({
        ...kiosk,
        distance: calculateDistance(
          parseFloat(latitude),
          parseFloat(longitude),
          kiosk.latitude,
          kiosk.longitude
        ),
      }));

      const nearestKiosks = kiosksWithDistances.sort(
        (a, b) => a.distance - b.distance
      );

      setMedicalKiosks(nearestKiosks.slice(0, 5));
    } catch (error) {
      setError('Error fetching data. Please check your coordinates and try again.');
    }
  };

  const handleGeolocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toFixed(6));
        setLongitude(position.coords.longitude.toFixed(6));
        setError('');
      },
      () => {
        setError('Geolocation access denied. Please enter your coordinates manually.');
      }
    );
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Find Nearest Medical Kiosks
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Enter your coordinates manually:
      </Typography>
      <TextField
        label="Latitude"
        variant="outlined"
        fullWidth
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <TextField
        label="Longitude"
        variant="outlined"
        fullWidth
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="subtitle1" gutterBottom style={{ marginTop: '20px' }}>
        Or use your current location:
      </Typography>
      {geolocationAvailable ? (
        <Button variant="contained" color="primary" onClick={handleGeolocationSearch}>
          Use My Location
        </Button>
      ) : (
        <Typography color="textSecondary">
          Geolocation is not available in your browser.
        </Typography>
      )}
      <List>
        {medicalKiosks.map((kiosk, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={kiosk.name}
              secondary={`Distance: ${kiosk.distance.toFixed(2)} meters`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;
