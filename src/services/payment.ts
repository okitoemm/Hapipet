import { initStripe, Stripe } from '@stripe/stripe-react-native';
import { supabase } from './supabase';

let stripe: Stripe | null = null;

// TODO: Remplacer par votre clé publique Stripe
const STRIPE_PUBLISHABLE_KEY = 'YOUR_PUBLISHABLE_KEY';

export const paymentService = {
  async initialize() {
    // Mock de l'initialisation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  },

  async createPaymentIntent(amount: number, currency: string = 'eur') {
    // Simulation d'une création de paiement
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      clientSecret: 'mock_client_secret_' + Math.random().toString(36).substring(7),
      error: null
    };
  },

  async confirmPayment(clientSecret: string) {
    if (!stripe) throw new Error('Stripe not initialized');

    const { paymentIntent, error } = await stripe.confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    if (error) throw error;
    return paymentIntent;
  },

  async updatePaymentStatus(bookingId: string, status: 'completed' | 'refunded') {
    const { data, error } = await supabase
      .from('bookings')
      .update({ paymentStatus: status })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async setupApplePay() {
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.isApplePaySupported();
    if (error) throw error;

    return await stripe.presentApplePay({
      cartItems: [],
      country: 'FR',
      currency: 'eur',
    });
  },

  async setupGooglePay() {
    if (!stripe) throw new Error('Stripe not initialized');

    const { error } = await stripe.initGooglePay({
      testEnv: true, // Mettre à false en production
      merchantName: 'Hapipet',
      countryCode: 'FR',
      billingAddressConfig: {
        format: 'FULL',
        isRequired: true,
      },
    });

    if (error) throw error;
  },

  async presentGooglePay(amount: number) {
    if (!stripe) throw new Error('Stripe not initialized');

    return await stripe.presentGooglePay({
      amount,
      currencyCode: 'EUR',
    });
  },

  async createRefund(bookingId: string, amount: number, currency: string = 'eur') {
    const { data, error } = await supabase.functions.invoke('create-refund', {
      body: {
        bookingId,
        amount,
        currency,
      },
    });

    if (error) throw error;
    return data;
  },
};