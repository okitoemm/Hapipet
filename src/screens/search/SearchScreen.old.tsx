import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { RootState } from '../../store';
import { Input } from '../../components/ui/Input';
import { useLocation } from '../../hooks/useLocation';
import { locationService } from '../../services/location';

export const SearchScreen = () => {
  const { dogsitters } = useSelector((state: RootState) => state.dogsitter);
  const [searchQuery, setSearchQuery] = useState('');
  const { location } = useLocation();

  // Filtrer les dogsitters
  const filteredDogsitters = dogsitters.filter((dogsitter) => {
    if (!searchQuery) return true;
    
    return dogsitter.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           dogsitter.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Input
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Rechercher un dog-sitter..."
        />
      </View>

      <ScrollView style={styles.scrollView}>
        {filteredDogsitters.map((dogsitter) => (
          <TouchableOpacity 
            key={dogsitter.id} 
            style={styles.dogsitterItem}
            onPress={() => {
              // Navigation vers le profil du dogsitter
            }}
          >
            <Text style={styles.dogsitterName}>{dogsitter.fullName}</Text>
            <Text style={styles.dogsitterInfo}>
              {dogsitter.hourlyRate}€/h • {dogsitter.rating}⭐️
            </Text>
            <Text style={styles.dogsitterAddress}>
              {location ? 
                `Distance : ${locationService.calculateDistance(
                  location.coords.latitude,
                  location.coords.longitude,
                  dogsitter.location.latitude,
                  dogsitter.location.longitude
                ).toFixed(1)} km` : 
                'Localisation non disponible'
              }
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  dogsitterItem: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.md,
  },
  dogsitterName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  dogsitterInfo: {
    fontSize: 16,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  dogsitterAddress: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});