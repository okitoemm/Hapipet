import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { FontAwesome } from '@expo/vector-icons';
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

  // Si nous n'avons pas de dogsitters du tout, on affiche un message
  if (dogsitters.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchContainer}>
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Rechercher un dog-sitter..."
          />
        </View>
        <View style={styles.centerContainer}>
          <Text>Aucun dog-sitter disponible pour le moment</Text>
        </View>
      </SafeAreaView>
    );
  }

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
            <View style={styles.ratingContainer}>
              <Text style={styles.dogsitterInfo}>
                {dogsitter.hourlyRate}€/h •{' '}
              </Text>
              <View style={styles.ratingWrapper}>
                <Text style={styles.rating}>{dogsitter.rating.toFixed(1)}</Text>
                <FontAwesome name="star" size={14} color={COLORS.warning} />
              </View>
            </View>
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
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: 2,
  },
  dogsitterAddress: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});