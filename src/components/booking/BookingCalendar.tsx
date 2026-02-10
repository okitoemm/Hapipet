import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';

interface TimeSlot {
  start: string;
  end: string;
  isAvailable: boolean;
}

interface BookingCalendarProps {
  availability: {
    [key: string]: string[]; // jour -> plages horaires disponibles
  };
  existingBookings: {
    startTime: string;
    endTime: string;
  }[];
  onSelectSlot: (date: string, slot: TimeSlot) => void;
}

export const BookingCalendar = ({
  availability,
  existingBookings,
  onSelectSlot,
}: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Génère les 14 prochains jours
  const getNextDays = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  // Vérifie si un créneau est disponible
  const isSlotAvailable = (date: string, start: string, end: string) => {
    const startTime = new Date(`${date}T${start}`);
    const endTime = new Date(`${date}T${end}`);

    return !existingBookings.some((booking) => {
      const bookingStart = new Date(booking.startTime);
      const bookingEnd = new Date(booking.endTime);
      return (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd)
      );
    });
  };

  // Génère les créneaux horaires pour un jour donné
  const getTimeSlots = (date: string) => {
    const dayOfWeek = new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'long',
    });
    const daySlots = availability[dayOfWeek] || [];

    return daySlots.map((slot) => {
      const [start, end] = slot.split('-');
      return {
        start,
        end,
        isAvailable: isSlotAvailable(date, start, end),
      };
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.daysContainer}>
          {getNextDays().map((date) => (
            <TouchableOpacity
              key={date}
              style={[
                styles.dayButton,
                selectedDate === date && styles.selectedDay,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[
                  styles.dayText,
                  selectedDate === date && styles.selectedDayText,
                ]}
              >
                {formatDate(date)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.timeSlotsContainer}>
        {getTimeSlots(selectedDate).map((slot, index) => (
          <TouchableOpacity
            key={`${slot.start}-${slot.end}-${index}`}
            style={[
              styles.timeSlot,
              !slot.isAvailable && styles.unavailableSlot,
            ]}
            onPress={() => {
              if (slot.isAvailable) {
                onSelectSlot(selectedDate, slot);
              }
            }}
            disabled={!slot.isAvailable}
          >
            <Text
              style={[
                styles.timeSlotText,
                !slot.isAvailable && styles.unavailableSlotText,
              ]}
            >
              {slot.start} - {slot.end}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  daysContainer: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  dayButton: {
    padding: SPACING.md,
    marginHorizontal: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  selectedDay: {
    backgroundColor: COLORS.primary,
  },
  dayText: {
    fontSize: 14,
    color: COLORS.text,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  timeSlotsContainer: {
    flex: 1,
    padding: SPACING.md,
  },
  timeSlot: {
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  unavailableSlot: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
  },
  timeSlotText: {
    fontSize: 16,
    color: COLORS.text,
    textAlign: 'center',
  },
  unavailableSlotText: {
    color: COLORS.textLight,
  },
});