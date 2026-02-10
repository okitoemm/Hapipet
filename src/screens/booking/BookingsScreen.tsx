import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { Booking } from '../../types';
import { bookingService } from '../../services/booking';
import { RootState } from '../../store';

export const BookingsScreen = ({ navigation }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    // En mode développement, utiliser un utilisateur de test si aucun utilisateur n'est connecté
    const currentUser = __DEV__ && !user 
      ? { id: 'client1', type: 'client' as const } 
      : user;
      
    if (!currentUser) return;

    try {
      const userBookings = await bookingService.getUserBookings(
        currentUser.id,
        currentUser.type
      );
      setBookings(userBookings);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de charger les réservations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      loadBookings();
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'annuler la réservation");
    }
  };

  const handleConfirmBooking = async (bookingId: string) => {
    try {
      await bookingService.confirmBooking(bookingId);
      loadBookings();
    } catch (error) {
      Alert.alert("Erreur", "Impossible de confirmer la réservation");
    }
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderBookingStatus = (status: Booking['status']) => {
    const statusColors = {
      pending: COLORS.warning,
      confirmed: COLORS.primary,
      completed: COLORS.success,
      cancelled: COLORS.error,
    };

    const statusLabels = {
      pending: 'En attente',
      confirmed: 'Confirmé',
      completed: 'Terminé',
      cancelled: 'Annulé',
    };

    return (
      <Text
        style={[
          styles.statusText,
          { color: statusColors[status] },
        ]}
      >
        {statusLabels[status]}
      </Text>
    );
  };

  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  const FilterButton = ({ label, value }: { label: string; value: typeof filter }) => (
    <TouchableOpacity 
      style={[
        styles.filterButton, 
        filter === value && styles.filterButtonActive
      ]}
      onPress={() => setFilter(value)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === value && styles.filterButtonTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>Chargement des réservations...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton label="Toutes" value="all" />
          <FilterButton label="En attente" value="pending" />
          <FilterButton label="Confirmées" value="confirmed" />
          <FilterButton label="Terminées" value="completed" />
          <FilterButton label="Annulées" value="cancelled" />
        </ScrollView>
      </View>
      <ScrollView>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Aucune réservation {filter !== 'all' ? 'dans cette catégorie' : ''}
            </Text>
          </View>
        ) : filteredBookings.map((booking) => (
          <TouchableOpacity
            key={booking.id}
            style={styles.bookingCard}
            onPress={() => {
              // TODO: Navigation vers le détail de la réservation
            }}
          >
              <View style={styles.bookingHeader}>
                <Text style={styles.name}>
                  {user?.type === 'client'
                    ? `Dog-sitter: ${booking.dogsitter?.fullName}`
                    : `Client: ${booking.client?.fullName}`}
                </Text>
                {renderBookingStatus(booking.status)}
              </View>            <View style={styles.bookingInfo}>
              <Text style={styles.infoText}>
                Le {formatDateTime(booking.startTime)}
              </Text>
              <Text style={styles.infoText}>
                Jusqu'à {formatDateTime(booking.endTime)}
              </Text>
              <Text style={styles.price}>{booking.totalPrice}€</Text>
            </View>

            {booking.status === 'pending' && (
              <View style={styles.actions}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => handleCancelBooking(booking.id)}
                >
                  <Text style={styles.actionButtonText}>Annuler</Text>
                </TouchableOpacity>

                {user?.type === 'dogsitter' && (
                  <TouchableOpacity
                    style={[styles.actionButton, styles.confirmButton]}
                    onPress={() => handleConfirmBooking(booking.id)}
                  >
                    <Text style={[styles.actionButtonText, styles.confirmButtonText]}>
                      Confirmer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  filterButton: {
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.xl,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.background,
  },
  filterButtonActive: {
    backgroundColor: COLORS.primary,
  },
  filterButtonText: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  filterButtonTextActive: {
    color: COLORS.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  bookingCard: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
    margin: SPACING.md,
    ...SHADOWS.small,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookingInfo: {
    marginBottom: SPACING.md,
  },
  infoText: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.md,
  },
  actionButton: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: BORDER_RADIUS.sm,
    borderWidth: 1,
  },
  cancelButton: {
    borderColor: COLORS.error,
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.error,
  },
  confirmButtonText: {
    color: COLORS.white,
  },
});