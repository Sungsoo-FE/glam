import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import Images from '../assets/images';
import {Keys, Meta, Profile} from '../modules/profile/profile';
import glamColors from '../public/glamColors';

interface ProfileValue {
  name: string;
  value: any;
  isColumn?: boolean;
  isBlack?: boolean;
  isChangeable?: boolean;
  isDialog?: boolean;
  placeholder?: string;
  changeValue?: (name: string, value: any) => void;
  showModal?: boolean;
  setShowModal?: (showModal: boolean) => void;
  meta?: Keys[];
}

interface ModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  changeValue?: (name: string, value: any) => void;
  name: string;
  meta: Keys[];
  value: string;
}

export function ProfileTable({data, meta}: Profile) {
  const [introduction, setIntroduction] = useState<string | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [bodyType, setBodyType] = useState<string | null>(null);
  const [company, setCompany] = useState<string | null>(null);
  const [job, setJob] = useState<string | null>(null);
  const [education, setEducation] = useState<string | null>(null);
  const [school, setSchool] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIntroduction(data.introduction);
      setHeight(data.height);
      var bodyName = meta.body_types.filter(e => {
        if (e.key === data.body_type) {
          return e;
        }
      });
      setBodyType(bodyName[0].name);
      setCompany(data.company);
      setJob(data.job);
      setEducation(data.education);
      setSchool(data.school);
    }
  }, [data]);

  function changeValue(name: string, value: any) {
    if (value === '') {
      value = null;
    }
    switch (name) {
      case '소개':
        setIntroduction(value);
        break;
      case '키':
        // var heightName = meta.educations.filter(e => {
        //   if (e.key === value) {
        //     return e.name;
        //   }
        // });
        setHeight(value);
        break;
      case '체형':
        var bodyName = meta.body_types.filter(e => {
          if (e.key === value) {
            return e.name;
          }
        });
        setBodyType(bodyName[0].name);
        break;
      case '직장':
        setCompany(value);
        break;
      case '직업':
        setJob(value);
        break;
      case '학력':
        var educationName = meta.educations.filter(e => {
          if (e.key === value) {
            return e.name;
          }
        });
        setEducation(educationName[0].name);
        break;
      case '학교':
        setSchool(value);
        break;
    }
    setShowModal(false);
  }

  return (
    <View style={s.containerWrapper}>
      <ProfileRow name={'닉네임'} value={data?.name ?? ''} />
      <ProfileRow
        name={'성별'}
        value={data?.gender == 'M' ? '남성' : '여성'}
        isBlack={true}
      />
      <ProfileRow name={'생일'} value={data?.birthday} />
      <ProfileRow name={'위치'} value={data?.location} />
      <View style={s.division} />
      <ProfileRow
        name={'소개'}
        value={introduction}
        isColumn={true}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'회원님의 매력을 간단하게 소개해주세요'}
      />
      <View style={s.division} />
      {/* <ProfileRow
        name={'키'}
        value={height}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        showModal={showModal}
        placeholder={'선택해주세요'}
      /> */}
      <ProfileRow
        name={'체형'}
        value={bodyType}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        showModal={showModal}
        placeholder={'선택해주세요'}
        meta={meta?.body_types}
      />
      <View style={s.division} />
      <ProfileRow
        name={'직장'}
        value={company}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'입력해주세요'}
      />
      <ProfileRow
        name={'직업'}
        value={job}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'입력해주세요'}
      />
      <ProfileRow
        name={'학력'}
        value={education}
        isChangeable={true}
        isDialog={true}
        changeValue={changeValue}
        setShowModal={setShowModal}
        showModal={showModal}
        placeholder={'선택해주세요'}
        meta={meta?.educations}
      />
      <ProfileRow
        name={'학교'}
        value={school}
        isChangeable={true}
        changeValue={changeValue}
        placeholder={'입력해주세요'}
      />
    </View>
  );
}

function ProfileRow({
  name,
  value,
  isColumn,
  isBlack,
  isChangeable,
  isDialog,
  placeholder,
  changeValue,
  showModal,
  setShowModal,
  meta,
}: ProfileValue) {
  return (
    <View style={[s.tableWrapper, isColumn ? s.columnWrapper : s.rowWrapper]}>
      <Text
        style={[s.nameStyle, !isColumn ? {alignSelf: 'center'} : {height: 30}]}>
        {name}
      </Text>
      {!isChangeable ? (
        <View style={s.valueStyle}>
          <Text
            style={[
              {
                color: isBlack ? glamColors.black : glamColors.Blue,
              },
              name === '닉네입' && {
                width: 30,
              },
            ]}>
            {value}
          </Text>
          {name === '닉네임' && (
            <FastImage
              source={Images.lock}
              resizeMode={FastImage.resizeMode.contain}
              style={{
                width: 14,
                height: 14,
                marginLeft: 8,
                alignSelf: 'center',
              }}
            />
          )}
        </View>
      ) : isDialog ? (
        <TouchableOpacity
          style={s.valueStyle}
          onPress={() => setShowModal!(!showModal)}>
          <Text style={{color: glamColors.Blue}}>{value ?? placeholder}</Text>
          {showModal && (
            <SelectDialog
              showModal={showModal!}
              setShowModal={setShowModal!}
              meta={meta!}
              name={name}
              value={value}
              changeValue={changeValue!}
            />
          )}
        </TouchableOpacity>
      ) : (
        <TextInput
          style={s.valueStyle}
          value={value}
          onChangeText={value => changeValue!(name, value)}
          placeholder={value ?? placeholder}
        />
      )}
      {isColumn && (
        <View
          style={{
            height: 30,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: glamColors.Gray4,
            }}>
            SNS 아이디 등 연락처 입력 시 서비스 이용 제한됩니다.
          </Text>
        </View>
      )}
    </View>
  );
}

function SelectDialog({
  showModal,
  setShowModal,
  name,
  meta,
  value,
  changeValue,
}: ModalProps) {
  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}>
      <TouchableOpacity onPress={() => setShowModal(false)}>
        <View style={s.selectModal}>
          <View style={s.modalContent}>
            <View style={s.modalTitle}>
              <Text>{name}</Text>
            </View>
            <ScrollView
              style={{width: '100%'}}
              contentContainerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: 16,
              }}>
              {meta?.map((e: any, index: number): any => {
                return (
                  <TouchableOpacity
                    style={s.modalValue}
                    onPress={() => changeValue!(name, e.key)}>
                    <Text
                      style={[
                        s.modalText,
                        value === e.name && {color: glamColors.Blue},
                      ]}>
                      {e.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const s = StyleSheet.create({
  containerWrapper: {
    padding: 16,
  },
  tableWrapper: {
    width: '100%',
  },
  rowWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  columnWrapper: {
    flexDirection: 'column',
  },
  nameStyle: {
    width: '35%',
    fontSize: 16,
    color: glamColors.black,
  },
  valueStyle: {
    width: '65%',
    fontSize: 16,
    color: glamColors.Blue,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  division: {
    width: '100%',
    height: 1,
    color: glamColors.Gray2,
    marginTop: 8,
    marginBottom: 8,
  },
  selectModal: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    elevation: 20,
  },
  modalContent: {
    width: '80%',
    height: 412,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: glamColors.Gray2,
    borderBottomWidth: 1,
  },
  modalValue: {
    width: '100%',
    height: 44,
    justifyContent: 'center',
  },
  modalText: {},
});
