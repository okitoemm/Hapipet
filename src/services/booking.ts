import { supabase } from './supabase';
import { Booking } from '../types';
import { paymentService } from './payment';

export const bookingService = {
  async createBooking(booking: Omit<Booking, 'id'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  },

  async getUserBookings(userId: string, type: 'client' | 'dogsitter') {
    // En mode développement, utiliser les données de test
    if (__DEV__) {
      const { mockBookings } = require('../mocks/bookings');
      const field = type === 'client' ? 'clientId' : 'dogsitterId';
      return mockBookings.filter(booking => booking[field] === userId);
    }

    const field = type === 'client' ? 'clientId' : 'dogsitterId';
    
    const { data, error } = await supabase
      .from('bookings')
      .select('*, dog:dogs(*), client:profiles!clientId(*), dogsitter:profiles!dogsitterId(*)')
      .eq(field, userId)
      .order('startTime', { ascending: false });

    if (error) throw error;
    return data as Booking[];
  },

  async updateBookingStatus(
    bookingId: string,
    status: Booking['status'],
    paymentStatus?: Booking['paymentStatus']
  ) {
    const updates: Partial<Booking> = { status };
    if (paymentStatus) {
      updates.paymentStatus = paymentStatus;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) throw error;
    return data as Booking;
  },

  async cancelBooking(bookingId: string) {
    return this.updateBookingStatus(bookingId, 'cancelled');
  },

  async confirmBooking(bookingId: string) {
    return this.updateBookingStatus(bookingId, 'confirmed');
  },

  async completeBooking(bookingId: string) {
    return this.updateBookingStatus(bookingId, 'completed', 'completed');
  },

  async processPayment(bookingId: string, amount: number) {
    try {
      const { clientSecret } = await paymentService.createPaymentIntent(amount);
      const payment = await paymentService.confirmPayment(clientSecret);
      
      if (payment) {
        // Mettre à jour le statut de la réservation
        await this.updateBookingStatus(bookingId, 'confirmed', 'completed');
        return { success: true, error: null };
      }
      return { success: false, error: 'Échec du paiement' };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors du paiement'
      };
    }
  },

  async initiateRefund(bookingId: string) {
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single();

    if (bookingError) throw bookingError;

    try {
      // Créer le remboursement via Stripe
      await paymentService.createRefund(bookingId, booking.totalPrice);
      
      // Mettre à jour le statut de la réservation
      await this.updateBookingStatus(bookingId, 'cancelled', 'refunded');
      
      return { success: true, error: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors du remboursement'
      };
    }
  },

  async checkAvailability(
    dogsitterId: string,
    startTime: string,
    endTime: string
  ) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('dogsitterId', dogsitterId)
      .eq('status', 'confirmed')
      .or(`startTime.lte.${endTime},endTime.gte.${startTime}`);

    if (error) throw error;
    return data.length === 0; // true if available
  },
};