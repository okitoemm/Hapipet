import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { DogsitterProfile } from '../../types';
import { FontAwesome } from '@expo/vector-icons';

interface DogsitterProfileScreenProps {
  route: {
    params: {
      dogsitterId: string;
    };
  };
  navigation: any;
}

export const DogsitterProfileScreen = ({
  route,
  navigation,
}: DogsitterProfileScreenProps) => {
  const { dogsitterId } = route.params;
  const [dogsitter, setDogsitter] = useState<DogsitterProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDogsitterProfile = async () => {
      try {
        const mockDogsitter: DogsitterProfile = {
          id: dogsitterId,
          email: 'john@example.com',
          fullName: 'John Doe',
          type: 'dogsitter',
          description: "Passionné par les chiens depuis toujours. Je propose des balades et du dog-sitting avec beaucoup d'attention.",
          hourlyRate: 15,
          dailyRate: 50,
          rating: 4.8,
          avatar: 'https://via.placeholder.com/150',
          availability: {
            'Lundi': ['9:00-12:00', '14:00-18:00'],
            'Mardi': ['9:00-12:00', '14:00-18:00'],
            'Mercredi': ['9:00-12:00', '14:00-18:00'],
          },
          reviews: [
            {
              id: '1',
              rating: 5,
              comment: 'Excellent dog-sitter!',
              authorId: '2',
              targetId: dogsitterId,
              createdAt: '2025-09-01',
            },
          ],
          location: { latitude: 48.8566, longitude: 2.3522 },
        };
        setDogsitter(mockDogsitter);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDogsitterProfile();
  }, [dogsitterId]);

  const handleBooking = () => {
    navigation.navigate('Booking', { dogsitter });
  };

  const handleMessage = () => {
    navigation.navigate('Messages');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!dogsitter) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Dog-sitter non trouvé</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: dogsitter.avatar }} style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text style={styles.name}>{dogsitter.fullName}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color={COLORS.warning} />
              <Text style={styles.rating}>{dogsitter.rating.toFixed(1)}</Text>
            </View>
            <Text style={styles.rates}>
              {dogsitter.hourlyRate}€/heure • {dogsitter.dailyRate}€/jour
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <Text style={styles.description}>{dogsitter.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Disponibilités</Text>
          {Object.entries(dogsitter.availability).map(([day, slots]) => (
            <View key={day} style={styles.availabilityRow}>
              <Text style={styles.day}>{day}</Text>
              <Text style={styles.slot}>{(slots as string[]).join(', ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avis ({dogsitter.reviews.length})</Text>
          {dogsitter.reviews.map((review) => (
            <View key={review.id} style={styles.review}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewRating}>
                  <FontAwesome name="star" size={14} color={COLORS.warning} />
                  <Text style={styles.reviewRatingText}>{review.rating}</Text>
                </View>
                <Text style={styles.reviewDate}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.actionButton, styles.messageButton]} onPress={handleMessage}>
          <FontAwesome name="comment" size={20} color={COLORS.primary} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.bookButton]} onPress={handleBooking}>
          <FontAwesome name="calendar" size={20} color={COLORS.white} />
          <Text style={styles.bookButtonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row',
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  avatar: { width: 100, height: 100, borderRadius: BORDER_RADIUS.xl },
  headerInfo: { flex: 1, marginLeft: SPACING.md, justifyContent: 'center' },
  name: { fontSize: 24, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.xs },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  rating: { fontSize: 16, color: COLORS.textLight, marginLeft: SPACING.xs },
  rates: { fontSize: 16, color: COLORS.primary, fontWeight: '500' },
  section: { padding: SPACING.lg, backgroundColor: COLORS.white, marginTop: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: COLORS.text, marginBottom: SPACING.md },
  description: { fontSize: 16, color: COLORS.text, lineHeight: 24 },
  availabilityRow: { flexDirection: 'row', marginBottom: SPACING.sm },
  day: { width: 100, fontSize: 16, fontWeight: '500', color: COLORS.text },
  slot: { fontSize: 16, color: COLORS.textLight },
  review: { marginBottom: SPACING.md, padding: SPACING.md, backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.md },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.xs },
  reviewRating: { flexDirection: 'row', alignItems: 'center' },
  reviewRatingText: { marginLeft: 4, fontSize: 14, color: COLORS.textLight },
  reviewDate: { fontSize: 14, color: COLORS.textLight },
  reviewComment: { fontSize: 16, color: COLORS.text, lineHeight: 22 },
  footer: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    ...SHADOWS.small,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.xs,
  },
  messageButton: { backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.primary },
  bookButton: { backgroundColor: COLORS.primary },
  messageButtonText: { marginLeft: SPACING.xs, fontSize: 16, color: COLORS.primary, fontWeight: '600' },
  bookButtonText: { marginLeft: SPACING.xs, fontSize: 16, color: COLORS.white, fontWeight: '600' },
});
