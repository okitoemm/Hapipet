import React from 'react';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../../constants/theme';
import { PaymentForm } from '../../components/payment/PaymentForm';
import { bookingService } from '../../services/booking';

interface PaymentScreenProps {
  route: {
    params: {
      bookingId: string;
      amount: number;
    };
  };
  navigation: any;
}

export const PaymentScreen = ({ route, navigation }: PaymentScreenProps) => {
  const { bookingId, amount } = route.params;

  const handlePaymentSuccess = async () => {
    try {
      await bookingService.updateBookingStatus(bookingId, 'confirmed', 'completed');
      Alert.alert(
        'Succès',
        'Votre paiement a été effectué avec succès',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Bookings'),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        'Erreur',
        'Le paiement a été effectué mais une erreur est survenue lors de la mise à jour de la réservation'
      );
    }
  };

  const handlePaymentError = (error: string) => {
    Alert.alert('Erreur de paiement', error);
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaymentForm
        amount={amount}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});