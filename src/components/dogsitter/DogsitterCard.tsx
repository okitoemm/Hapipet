import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { DogsitterProfile } from '../../types';
import { FontAwesome } from '@expo/vector-icons';

interface DogsitterCardProps {
  dogsitter: DogsitterProfile;
  onPress: () => void;
}

export const DogsitterCard = ({ dogsitter, onPress }: DogsitterCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: dogsitter.avatar || 'https://via.placeholder.com/100' }}
        style={styles.avatar}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{dogsitter.fullName}</Text>
        <View style={styles.ratingContainer}>
          <View style={styles.ratingWrapper}>
            <FontAwesome name="star" size={16} color={COLORS.warning} />
            <Text style={styles.rating}>{dogsitter.rating.toFixed(1)}</Text>
          </View>
        </View>
        <Text style={styles.price}>
          {dogsitter.hourlyRate}€/heure • {dogsitter.dailyRate}€/jour
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.small,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  rating: {
    fontSize: 14,
    color: COLORS.textLight,
    marginLeft: 4,
  },
  price: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '500',
  },
});