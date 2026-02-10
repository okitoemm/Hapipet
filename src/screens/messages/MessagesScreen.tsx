import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Message = {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

const MessageCard = ({ message, onPress }: { message: Message; onPress: () => void }) => (
  <TouchableOpacity style={styles.messageCard} onPress={onPress}>
    <View style={styles.avatarContainer}>
      <Image source={{ uri: message.sender.avatar }} style={styles.avatar} />
      <View style={styles.onlineIndicator} />
    </View>
    <View style={styles.messageContent}>
      <View style={styles.messageHeader}>
        <Text style={styles.senderName}>{message.sender.name}</Text>
        <Text style={styles.timestamp}>{message.timestamp}</Text>
      </View>
      <View style={styles.messagePreview}>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {message.lastMessage}
        </Text>
        {message.unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadCount}>{message.unreadCount}</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export const MessagesScreen = () => {
  // Données mockées des conversations
  const mockMessages: Message[] = [
    {
      id: '1',
      sender: {
        id: '1',
        name: 'Sarah Martin',
        avatar: 'https://picsum.photos/200',
      },
      lastMessage: 'D\'accord pour 14h demain ! À bientôt',
      timestamp: '5 min',
      unreadCount: 2,
    },
    {
      id: '2',
      sender: {
        id: '2',
        name: 'Jean Dupont',
        avatar: 'https://picsum.photos/201',
      },
      lastMessage: 'Je serai là dans 10 minutes',
      timestamp: '2h',
      unreadCount: 0,
    },
    {
      id: '3',
      sender: {
        id: '3',
        name: 'Marie Bernard',
        avatar: 'https://picsum.photos/202',
      },
      lastMessage: 'Merci pour la balade d\'aujourd\'hui !',
      timestamp: 'Hier',
      unreadCount: 0,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        {mockMessages.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons name="message-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyStateText}>
              Aucune conversation
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Commencez à discuter avec un dog-sitter
            </Text>
          </View>
        ) : (
          mockMessages.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onPress={() => {
                // Navigation vers la conversation
              }}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  messageCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  messageContent: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  senderName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  messagePreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: SPACING.sm,
  },
  unreadBadge: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xs,
  },
  unreadCount: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    marginTop: SPACING.xl * 2,
  },
  emptyStateText: {
    fontSize: 18,
    color: COLORS.text,
    marginTop: SPACING.md,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
});