import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Dog } from '../../types';

interface DogCardProps {
  dog: Dog;
  onPress: () => void;
}

export const DogCard = ({ dog, onPress }: DogCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: dog.photo || 'https://via.placeholder.com/100' }}
        style={styles.photo}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{dog.name}</Text>
        <Text style={styles.breed}>{dog.breed}</Text>
        <Text style={styles.age}>{dog.age} an{dog.age > 1 ? 's' : ''}</Text>
        {dog.specialNeeds && (
          <Text style={styles.specialNeeds}>{dog.specialNeeds}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: BORDER_RADIUS.md,
  },
  info: {
    marginLeft: SPACING.md,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  breed: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  age: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: SPACING.xs,
  },
  specialNeeds: {
    fontSize: 14,
    color: COLORS.warning,
    fontStyle: 'italic',
  },
});