import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {hp, wp, colors, regularIconSize, fonts} from 'app/utils';
import {margin} from 'app/utils/sizes';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  isVisible: boolean;
  closeModal: () => void;
}
const NewNoteModal = ({isVisible, closeModal}: IProps) => {
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection={['up', 'left', 'right', 'down']}
      hasBackdrop={true}
      backdropColor="transparent"
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      style={styles.modal}>
      <View>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.rowContainer}>
              <Icon
                name="camera"
                size={regularIconSize}
                color={colors.PRIMARY}
              />
              <Text style={[styles.text, fonts.body]}> Take photo</Text>
            </View>

            <View style={styles.rowContainer}>
              <Icon
                name="image"
                size={regularIconSize}
                color={colors.PRIMARY}
              />
              <Text style={[styles.text, fonts.body]}> Choose image</Text>
            </View>

            <View style={styles.rowContainer}>
              <Icon
                name="brush-sharp"
                size={regularIconSize}
                color={colors.PRIMARY}
              />
              <Text style={[styles.text, fonts.body]}> Drawing </Text>
            </View>

            <View style={styles.rowContainer}>
              <MaterialIcons
                name="keyboard-voice"
                size={regularIconSize}
                color={colors.PRIMARY}
              />
              <Text style={[styles.text, fonts.body]}> Recording </Text>
            </View>

            <View style={[styles.rowContainer]}>
              <Icon
                name="checkbox-outline"
                size={regularIconSize}
                color={colors.PRIMARY}
              />
              <Text style={[styles.text, fonts.body]}> Checkboxes </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewNoteModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalView: {
    padding: margin,
    backgroundColor: 'red',
    width: '100%',
    height: 450,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  text: {
    marginLeft: wp(3),
  },
});