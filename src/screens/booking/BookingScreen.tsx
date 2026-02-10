import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { BookingCalendar } from '../../components/booking/BookingCalendar';
import { DogCard } from '../../components/dog/DogCard';
import { bookingService } from '../../services/booking';
import { RootState } from '../../store';
import { DogsitterProfile, Booking, Dog } from '../../types';

interface BookingScreenProps {
  route: {
    params: {
      dogsitter: DogsitterProfile;
    };
  };
  navigation: any;
}

export const BookingScreen = ({ route, navigation }: BookingScreenProps) => {
  const { dogsitter } = route.params;
  const user = useSelector((state: RootState) => state.auth.user);
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [existingBookings, setExistingBookings] = useState<
    Pick<Booking, 'startTime' | 'endTime'>[]
  >([]);
  const [loading, setLoading] = useState(false);

  // Simulons des chiens pour l'exemple
  const mockDogs: Dog[] = [
    {
      id: '1',
      name: 'Max',
      breed: 'Labrador',
      age: 3,
      ownerId: user?.id || '',
      photo: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Luna',
      breed: 'Berger Allemand',
      age: 2,
      ownerId: user?.id || '',
      photo: 'https://via.placeholder.com/100',
    },
  ];

  useEffect(() => {
    // TODO: Charger les réservations existantes depuis l'API
    setExistingBookings([
      {
        startTime: '2025-09-15T09:00:00',
        endTime: '2025-09-15T12:00:00',
      },
    ]);
  }, [dogsitter.id]);

  const calculatePrice = () => {
    if (!selectedSlot) return 0;

    const start = new Date(`${selectedDate}T${selectedSlot.start}`);
    const end = new Date(`${selectedDate}T${selectedSlot.end}`);
    const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    return hours * dogsitter.hourlyRate;
  };

  const handleBooking = async () => {
    if (!user || !selectedDog || !selectedDate || !selectedSlot) {
      Alert.alert('Erreur', 'Veuillez sélectionner toutes les informations nécessaires');
      return;
    }

    setLoading(true);
    try {
      const price = calculatePrice();
      const booking: Omit<Booking, 'id'> = {
        clientId: user.id,
        dogsitterId: dogsitter.id,
        dogId: selectedDog.id,
        startTime: `${selectedDate}T${selectedSlot.start}`,
        endTime: `${selectedDate}T${selectedSlot.end}`,
        status: 'pending',
        totalPrice: price,
        paymentStatus: 'pending',
      };

      const newBooking = await bookingService.createBooking(booking);
      navigation.navigate('Payment', {
        bookingId: newBooking.id,
        amount: price,
      });
    } catch (error) {
      Alert.alert('Erreur', "Une erreur s'est produite lors de la réservation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choisissez votre chien</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockDogs.map((dog) => (
              <View key={dog.id} style={styles.dogCard}>
                <DogCard
                  dog={dog}
                  onPress={() => setSelectedDog(dog)}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sélectionnez une date et un horaire</Text>
          <BookingCalendar
            availability={dogsitter.availability}
            existingBookings={existingBookings}
            onSelectSlot={(date, slot) => {
              setSelectedDate(date);
              setSelectedSlot(slot);
            }}
          />
        </View>

        {selectedSlot && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Récapitulatif</Text>
            <Text style={styles.summaryText}>
              Date: {selectedDate}
            </Text>
            <Text style={styles.summaryText}>
              Horaires: {selectedSlot.start} - {selectedSlot.end}
            </Text>
            <Text style={styles.summaryText}>
              Chien: {selectedDog?.name}
            </Text>
            <Text style={styles.price}>
              Prix total: {calculatePrice()}€
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title={loading ? "Réservation en cours..." : "Réserver"}
          onPress={handleBooking}
          disabled={!selectedDog || !selectedSlot || loading}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  section: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  dogCard: {
    marginRight: SPACING.md,
    width: 200,
  },
  summary: {
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.md,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});