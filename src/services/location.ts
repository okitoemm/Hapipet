import * as Location from 'expo-location';
import { LocationObject, LocationAccuracy } from 'expo-location';

interface LocationWithAddress extends LocationObject {
  address?: string;
}

export const locationService = {
  async requestPermissions() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      throw new Error('Permission de localisation refusée');
    }
  },

  async getCurrentLocation(): Promise<LocationWithAddress> {
    const location = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.High,
    });

    const [address] = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    return {
      ...location,
      address: address
        ? `${address.street || ''} ${address.city || ''} ${
            address.postalCode || ''
          }`.trim()
        : undefined,
    };
  },

  async geocodeAddress(address: string) {
    const locations = await Location.geocodeAsync(address);
    if (locations.length === 0) {
      throw new Error('Adresse non trouvée');
    }
    return locations[0];
  },

  async searchNearbyDogsitters(
    latitude: number,
    longitude: number,
    radius: number = 5000 // rayon en mètres
  ) {
    // TODO: Implémenter la recherche avec Supabase + PostGIS
    // Pour l'instant, nous retournons des données statiques
    return [];
  },

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Rayon de la Terre en km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance en km
    return d;
  },

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  },
};