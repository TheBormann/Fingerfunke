// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserInfo _$UserInfoFromJson(Map<String, dynamic> json) => UserInfo(
      id: json['id'] as String,
      name: json['name'] as String,
      picture: json['picture'] == null
          ? null
          : ImageAsset.fromJson(json['picture'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$UserInfoToJson(UserInfo instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'picture': instance.picture?.toJson(),
    };

User _$UserFromJson(Map<String, dynamic> json) => User(
      id: json['id'] as String,
      name: json['name'] as String,
      picture: json['picture'] == null
          ? null
          : ImageAsset.fromJson(json['picture'] as Map<String, dynamic>),
      age: json['age'] as int?,
      gender: $enumDecodeNullable(_$GENDEREnumMap, json['gender']),
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'id': instance.id,
      'name': instance.name,
      'picture': instance.picture?.toJson(),
      'age': instance.age,
      'gender': _$GENDEREnumMap[instance.gender],
    };

const _$GENDEREnumMap = {
  GENDER.male: 'male',
  GENDER.female: 'female',
  GENDER.divers: 'divers',
};
