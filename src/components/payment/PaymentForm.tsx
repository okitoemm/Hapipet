import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { Button } from '../ui/Button';
import { paymentService } from '../../services/payment';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

export const PaymentForm = ({
  amount,
  onSuccess,
  onError,
}: PaymentFormProps) => {
  const { createPaymentMethod } = useStripe();
  const [loading, setLoading] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  useEffect(() => {
    paymentService.initialize().catch((error) => {
      console.error('Error initializing Stripe:', error);
    });
  }, []);

  const handlePayment = async () => {
    if (!cardComplete) {
      Alert.alert('Erreur', 'Veuillez remplir correctement les informations de carte');
      return;
    }

    setLoading(true);
    try {
      // Créer l'intention de paiement
      const { clientSecret } = await paymentService.createPaymentIntent(amount);

      // Confirmer le paiement
      await paymentService.confirmPayment(clientSecret);

      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erreur lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  const handleApplePay = async () => {
    setLoading(true);
    try {
      await paymentService.setupApplePay();
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erreur lors du paiement Apple Pay');
    } finally {
      setLoading(false);
    }
  };

  const handleGooglePay = async () => {
    setLoading(true);
    try {
      await paymentService.setupGooglePay();
      await paymentService.presentGooglePay(amount);
      onSuccess();
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Erreur lors du paiement Google Pay');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paiement sécurisé</Text>
      <Text style={styles.amount}>{amount}€</Text>

      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardComplete(cardDetails.complete);
        }}
      />

      <Button
        title="Payer"
        onPress={handlePayment}
        disabled={!cardComplete || loading}
        fullWidth
      />

      {Platform.OS === 'ios' && (
        <Button
          title="Payer avec Apple Pay"
          onPress={handleApplePay}
          variant="outline"
          fullWidth
        />
      )}

      {Platform.OS === 'android' && (
        <Button
          title="Payer avec Google Pay"
          onPress={handleGooglePay}
          variant="outline"
          fullWidth
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  loadingContainer: {
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xl,
  },
  cardContainer: {
    height: 50,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});