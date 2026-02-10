import { useState, useCallback } from 'react';
import { bookingService } from '../services/booking';
import { Booking } from '../types';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadUserBookings = useCallback(async (userId: string, type: 'client' | 'dogsitter') => {
    setLoading(true);
    setError(null);
    try {
      const userBookings = await bookingService.getUserBookings(userId, type);
      setBookings(userBookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (booking: Omit<Booking, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const newBooking = await bookingService.createBooking(booking);
      setBookings((prev) => [...prev, newBooking]);
      return newBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelBooking = useCallback(async (bookingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBooking = await bookingService.cancelBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking
        )
      );
      return updatedBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const confirmBooking = useCallback(async (bookingId: string) => {
    setLoading(true);
    setError(null);
    try {
      const updatedBooking = await bookingService.confirmBooking(bookingId);
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingId ? updatedBooking : booking
        )
      );
      return updatedBooking;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    loadUserBookings,
    createBooking,
    cancelBooking,
    confirmBooking,
  };
};