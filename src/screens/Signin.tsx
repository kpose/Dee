import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {LargeInput, LargeButton} from 'app/components';
import VectorIcon from 'react-native-vector-icons/FontAwesome';
import {colors, fonts, hp, navigationIconSize, wp} from 'app/utils';
import {AuthStackProps} from 'app/types/AuthStackTypes';

const Signin = ({navigation}: AuthStackProps) => {
  const [email, setEmail] = useState<string>('');
  const renderLabel = (label: string) => {
    return (
      <View style={styles.labelContainer}>
        <Text style={[fonts.body]}>{label}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.socialContainer}>
        <Text style={[fonts.caption, styles.socialCaption]}>
          Log in with one of the following options.
        </Text>
        <View style={styles.socialRow}>
          <TouchableOpacity>
            <Surface style={[{backgroundColor: '#db3236'}, styles.surface]}>
              <VectorIcon name="google" size={25} color={colors.WHITE} />
            </Surface>
          </TouchableOpacity>
          <TouchableOpacity>
            <Surface style={[styles.surface, {backgroundColor: '#3b5998'}]}>
              <VectorIcon name="facebook" size={25} color={colors.WHITE} />
            </Surface>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        {renderLabel('Email')}
        <LargeInput
          value={email}
          onChangeText={(x: string) => setEmail(x)}
          placeholder="John Doe"
          hasIcon={true}
          icon={email ? 'emoticon-cool' : 'emoticon-confused'}
          iconColor={colors.SECONDARY}
        />

        {renderLabel('Password')}
        <LargeInput
          value={email}
          onChangeText={(x: string) => setEmail(x)}
          placeholder="John Doe"
          hasIcon={true}
          icon={email ? 'eye-off' : 'eye'}
          iconColor={colors.SECONDARY}
        />
      </View>
      <View style={styles.buttonContainer}>
        <LargeButton title="Log in" onPress={() => console.log('predded')} />
      </View>
      <View style={styles.option}>
        <Text style={[fonts.caption]}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text
            style={[fonts.caption, {fontWeight: 'bold', marginLeft: wp(2)}]}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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