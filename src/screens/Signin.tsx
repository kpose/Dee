import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {LargeInput, LargeButton, Spinner} from 'app/components';

import {colors, fonts, hp, wp} from 'app/utils';
import SigninUser from 'app/providers/SigninUser';
import {AuthStackProps} from 'app/types/AuthStackTypes';
import {isValidEmail, isValidPassword} from 'app/utils/validators';
import {ThemeContext} from 'app/providers/ThemeContext';

const Signin = ({navigation}: AuthStackProps) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoginError, setisLoginError] = useState<string | null>();
  const {theme, toggleTheme} = useContext(ThemeContext);

  const renderLabel = (label: string) => {
    return (
      <View style={styles.labelContainer}>
        <Text style={[fonts.body]}>{label}</Text>
      </View>
    );
  };

  const failedAttempts =
    'Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.';

  const login = async () => {
    setIsLoading(true);
    const response = await SigninUser(email, password);
    if (response.message.code === 'auth/too-many-requests') {
      setisLoginError(failedAttempts);
      setIsLoading(false);
    } else if (response.message.code === 'auth/wrong-password')
      setIsLoading(false);
    setisLoginError('Invalid credentials, try again');
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View>
            {renderLabel('Email')}
            <LargeInput
              value={email}
              onChangeText={(x: string) => setEmail(x)}
              keyboardType={'email-address'}
              placeholder="Enter your email"
              error={email.length > 3 && !isValidEmail(email)}
              hasIcon={true}
              icon={email ? 'emoticon-cool' : 'emoticon-confused'}
              iconColor={colors.SECONDARY}
            />
            {email.length > 3 && !isValidEmail(email) && (
              <Text style={[fonts.caption, {color: colors.WARNING}]}>
                Invalid email, please verify.
              </Text>
            )}

            {renderLabel('Password')}
            <LargeInput
              value={password}
              secureTextEntry={true}
              onChangeText={(x: string) => setPassword(x)}
              placeholder="Enter password"
              error={password.length > 3 && !isValidPassword(password)}
              hasIcon={true}
              icon={email ? 'eye-off' : 'eye'}
              iconColor={colors.SECONDARY}
            />

            {isLoginError && (
              <Text style={[fonts.caption, {color: colors.WARNING}]}>
                {isLoginError}
              </Text>
            )}
            {password.length > 3 && !isValidPassword(password) && (
              <Text style={[fonts.caption, {color: colors.WARNING}]}>
                Password must contain an uppercase and lowercase letter, a
                number and special character.
              </Text>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <LargeButton
              title="Log in"
              onPress={login}
              disabled={
                !isValidEmail(email) && !isValidPassword(password)
                  ? true
                  : false
              }
            />
          </View>
          <View style={styles.option}>
            <Text style={[fonts.caption]}>Don't have an account?</Text>
            <TouchableOpacity>
              <Text
                style={[
                  fonts.caption,
                  {fontWeight: 'bold', marginLeft: wp(2)},
                ]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    marginHorizontal: wp(4),
  },

  socialContainer: {
    marginTop: hp(6),
  },
  socialCaption: {
    color: colors.LIGHT_GRAY,
  },
  surface: {
    height: hp(6),
    width: wp(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(3),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(3),
  },
  labelContainer: {
    marginTop: hp(2),
  },

  buttonContainer: {
    marginTop: hp(5),
  },
  option: {
    marginTop: hp(2),
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
});
