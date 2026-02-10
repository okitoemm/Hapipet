import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { DogsitterCard } from '../../components/dogsitter/DogsitterCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setDogsitters } from '../../store/slices/dogsitterSlice';
import { DogsitterProfile } from '../../types';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeSection = ({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <MaterialCommunityIcons name={icon as any} size={24} color={COLORS.primary} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

const StatsCard = ({ icon, title, value }: { icon: string; title: string; value: string }) => (
  <View style={styles.statsCard}>
    <Ionicons name={icon as any} size={24} color={COLORS.primary} />
    <Text style={styles.statsValue}>{value}</Text>
    <Text style={styles.statsTitle}>{title}</Text>
  </View>
);

export const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { dogsitters, loading } = useSelector((state: RootState) => state.dogsitter);

  useEffect(() => {
    const fetchDogsitters = async () => {
      dispatch(setLoading(true));
      // TODO: Remplacer par l'appel API réel
      const mockDogsitters: DogsitterProfile[] = [
        {
          id: '1',
          email: 'john@example.com',
          fullName: 'John Doe',
          type: 'dogsitter',
          description: 'Passionné par les chiens depuis toujours',
          hourlyRate: 15,
          dailyRate: 50,
          rating: 4.8,
          availability: {},
          reviews: [],
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
          },
        },
        {
          id: '2',
          email: 'jane@example.com',
          fullName: 'Jane Smith',
          type: 'dogsitter',
          description: 'Éducatrice canine professionnelle',
          hourlyRate: 20,
          dailyRate: 70,
          rating: 4.9,
          availability: {},
          reviews: [],
          location: {
            latitude: 48.8566,
            longitude: 2.3522,
          },
        },
      ];
      
      dispatch(setDogsitters(mockDogsitters));
      dispatch(setLoading(false));
    };

    fetchDogsitters();
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <HomeSection title="Statistiques" icon="chart-box">
          <View style={styles.statsContainer}>
            <StatsCard icon="time-outline" title="Heures de garde" value="124h" />
            <StatsCard icon="paw" title="Chiens gardés" value="45" />
            <StatsCard icon="star" title="Note moyenne" value="4.8" />
          </View>
        </HomeSection>

        <HomeSection title="Dog-sitters à proximité" icon="map-marker-radius">
          <View style={styles.dogsittersContainer}>
            {dogsitters.map((dogsitter) => (
              <DogsitterCard
                key={dogsitter.id}
                dogsitter={dogsitter}
                onPress={() => {
                  navigation.navigate('DogsitterProfile', { dogsitterId: dogsitter.id });
                }}
              />
            ))}
          </View>
        </HomeSection>

        <HomeSection title="Services populaires" icon="star-circle">
          <View style={styles.servicesContainer}>
            <View style={styles.serviceCard}>
              <MaterialCommunityIcons name="walk" size={32} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Promenade</Text>
            </View>
            <View style={styles.serviceCard}>
              <MaterialCommunityIcons name="home" size={32} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Garde à domicile</Text>
            </View>
            <View style={styles.serviceCard}>
              <MaterialCommunityIcons name="dog" size={32} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>Pension</Text>
            </View>
          </View>
        </HomeSection>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  statsCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  statsTitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  dogsittersContainer: {
    gap: SPACING.md,
  },
  servicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceTitle: {
    fontSize: 12,
    color: COLORS.text,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
});