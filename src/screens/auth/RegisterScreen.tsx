import React, { useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, SPACING } from '../../constants/theme';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { setCredentials } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    type: 'client' as 'client' | 'dogsitter',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const { email, password, confirmPassword, fullName, type } = formData;

    if (!email || !password || !confirmPassword || !fullName) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await authService.signUp(email, password, fullName, type);
      dispatch(setCredentials(result));
    } catch (error) {
      setError("Erreur lors de l'inscription");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>
          Rejoignez Hapipet en quelques étapes simples
        </Text>

        <Input
          label="Nom complet"
          value={formData.fullName}
          onChangeText={(value) => updateForm('fullName', value)}
          placeholder="Votre nom complet"
          autoCapitalize="words"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(value) => updateForm('email', value)}
          placeholder="votre@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Mot de passe"
          value={formData.password}
          onChangeText={(value) => updateForm('password', value)}
          placeholder="Votre mot de passe"
          secureTextEntry
        />

        <Input
          label="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChangeText={(value) => updateForm('confirmPassword', value)}
          placeholder="Confirmer votre mot de passe"
          secureTextEntry
        />

        <View style={styles.typeContainer}>
          <Button
            title="Je suis un client"
            variant={formData.type === 'client' ? 'primary' : 'outline'}
            onPress={() => updateForm('type', 'client')}
          />
          <View style={styles.typeSpacer} />
          <Button
            title="Je suis dog-sitter"
            variant={formData.type === 'dogsitter' ? 'primary' : 'outline'}
            onPress={() => updateForm('type', 'dogsitter')}
          />
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Button
          title={loading ? "Inscription..." : "S'inscrire"}
          onPress={handleRegister}
          disabled={loading}
          fullWidth
        />

        <Button
          title="Déjà un compte ? Se connecter"
          variant="outline"
          onPress={() => {
            navigation.navigate('Login');
          }}
          fullWidth
        />
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
    padding: SPACING.xl,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: SPACING.xl,
  },
  error: {
    color: COLORS.error,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.xl,
  },
  typeSpacer: {
    width: SPACING.md,
  },
});