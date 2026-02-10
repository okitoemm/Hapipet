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
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, SPACING, BORDER_RADIUS } from '../../constants/theme';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { logout } from '../../store/slices/authSlice';
import { RootState } from '../../store';

const ProfileSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const ProfileMenuItem = ({ 
  icon, 
  label, 
  value, 
  onPress 
}: { 
  icon: string; 
  label: string; 
  value?: string;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemContent}>
      <MaterialCommunityIcons name={icon as any} size={24} color={COLORS.primary} />
      <Text style={styles.menuItemLabel}>{label}</Text>
    </View>
    <View style={styles.menuItemRight}>
      {value && <Text style={styles.menuItemValue}>{value}</Text>}
      <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textLight} />
    </View>
  </TouchableOpacity>
);

export const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarButton}>
              <MaterialCommunityIcons name="pencil" size={16} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{user.fullName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <ProfileSection title="Informations personnelles">
          <ProfileMenuItem 
            icon="account" 
            label="Modifier mon profil" 
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="map-marker" 
            label="Adresse" 
            value={user.address}
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="phone" 
            label="Téléphone" 
            value={user.phone}
            onPress={() => {}} 
          />
        </ProfileSection>

        <ProfileSection title="Préférences">
          <ProfileMenuItem 
            icon="bell" 
            label="Notifications" 
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="earth" 
            label="Langue" 
            value="Français"
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="theme-light-dark" 
            label="Thème" 
            value="Clair"
            onPress={() => {}} 
          />
        </ProfileSection>

        <ProfileSection title="Paiement">
          <ProfileMenuItem 
            icon="credit-card" 
            label="Moyens de paiement" 
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="receipt" 
            label="Historique des paiements" 
            onPress={() => {}} 
          />
        </ProfileSection>

        <ProfileSection title="Support">
          <ProfileMenuItem 
            icon="help-circle" 
            label="Aide et support" 
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="file-document" 
            label="Conditions d'utilisation" 
            onPress={() => {}} 
          />
          <ProfileMenuItem 
            icon="shield-check" 
            label="Politique de confidentialité" 
            onPress={() => {}} 
          />
        </ProfileSection>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={24} color={COLORS.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
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
  },
  header: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  email: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  section: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.white,
    paddingVertical: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginLeft: SPACING.md,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontSize: 14,
    color: COLORS.textLight,
    marginRight: SPACING.sm,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
    padding: SPACING.md,
  },
  logoutText: {
    marginLeft: SPACING.sm,
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    color: COLORS.textLight,
    fontSize: 12,
    marginBottom: SPACING.xl,
  },
});