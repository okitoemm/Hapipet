import { useState, useEffect } from 'react';
import { locationService } from '../services/location';
import { LocationObject } from 'expo-location';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission de localisation refusée');
          setLoading(false);
          return;
        }
        
        const currentLocation = await locationService.getCurrentLocation();
        setLocation(currentLocation);
        if (currentLocation.address) {
          setAddress(currentLocation.address);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur de localisation');
      } finally {
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  const updateLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      await locationService.requestPermissions();
      const currentLocation = await locationService.getCurrentLocation();
      setLocation(currentLocation);
      if (currentLocation.address) {
        setAddress(currentLocation.address);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de localisation');
    } finally {
      setLoading(false);
    }
  };

  return {
    location,
    address,
    error,
    loading,
    updateLocation,
  };
};