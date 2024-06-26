// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target

part of 'live_config_cubit.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more informations: https://github.com/rrousselGit/freezed#custom-getters-and-methods');

/// @nodoc
class _$LiveConfigStateTearOff {
  const _$LiveConfigStateTearOff();

  _Neutral neutral({required bool newFeedItems}) {
    return _Neutral(
      newFeedItems: newFeedItems,
    );
  }
}

/// @nodoc
const $LiveConfigState = _$LiveConfigStateTearOff();

/// @nodoc
mixin _$LiveConfigState {
  bool get newFeedItems => throw _privateConstructorUsedError;

  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(bool newFeedItems) neutral,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult Function(bool newFeedItems)? neutral,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(bool newFeedItems)? neutral,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Neutral value) neutral,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult Function(_Neutral value)? neutral,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Neutral value)? neutral,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;

  @JsonKey(ignore: true)
  $LiveConfigStateCopyWith<LiveConfigState> get copyWith =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $LiveConfigStateCopyWith<$Res> {
  factory $LiveConfigStateCopyWith(
          LiveConfigState value, $Res Function(LiveConfigState) then) =
      _$LiveConfigStateCopyWithImpl<$Res>;
  $Res call({bool newFeedItems});
}

/// @nodoc
class _$LiveConfigStateCopyWithImpl<$Res>
    implements $LiveConfigStateCopyWith<$Res> {
  _$LiveConfigStateCopyWithImpl(this._value, this._then);

  final LiveConfigState _value;
  // ignore: unused_field
  final $Res Function(LiveConfigState) _then;

  @override
  $Res call({
    Object? newFeedItems = freezed,
  }) {
    return _then(_value.copyWith(
      newFeedItems: newFeedItems == freezed
          ? _value.newFeedItems
          : newFeedItems // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc
abstract class _$NeutralCopyWith<$Res>
    implements $LiveConfigStateCopyWith<$Res> {
  factory _$NeutralCopyWith(_Neutral value, $Res Function(_Neutral) then) =
      __$NeutralCopyWithImpl<$Res>;
  @override
  $Res call({bool newFeedItems});
}

/// @nodoc
class __$NeutralCopyWithImpl<$Res> extends _$LiveConfigStateCopyWithImpl<$Res>
    implements _$NeutralCopyWith<$Res> {
  __$NeutralCopyWithImpl(_Neutral _value, $Res Function(_Neutral) _then)
      : super(_value, (v) => _then(v as _Neutral));

  @override
  _Neutral get _value => super._value as _Neutral;

  @override
  $Res call({
    Object? newFeedItems = freezed,
  }) {
    return _then(_Neutral(
      newFeedItems: newFeedItems == freezed
          ? _value.newFeedItems
          : newFeedItems // ignore: cast_nullable_to_non_nullable
              as bool,
    ));
  }
}

/// @nodoc

class _$_Neutral implements _Neutral {
  const _$_Neutral({required this.newFeedItems});

  @override
  final bool newFeedItems;

  @override
  String toString() {
    return 'LiveConfigState.neutral(newFeedItems: $newFeedItems)';
  }

  @override
  bool operator ==(dynamic other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType &&
            other is _Neutral &&
            (identical(other.newFeedItems, newFeedItems) ||
                other.newFeedItems == newFeedItems));
  }

  @override
  int get hashCode => Object.hash(runtimeType, newFeedItems);

  @JsonKey(ignore: true)
  @override
  _$NeutralCopyWith<_Neutral> get copyWith =>
      __$NeutralCopyWithImpl<_Neutral>(this, _$identity);

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function(bool newFeedItems) neutral,
  }) {
    return neutral(newFeedItems);
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult Function(bool newFeedItems)? neutral,
  }) {
    return neutral?.call(newFeedItems);
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function(bool newFeedItems)? neutral,
    required TResult orElse(),
  }) {
    if (neutral != null) {
      return neutral(newFeedItems);
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(_Neutral value) neutral,
  }) {
    return neutral(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult Function(_Neutral value)? neutral,
  }) {
    return neutral?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(_Neutral value)? neutral,
    required TResult orElse(),
  }) {
    if (neutral != null) {
      return neutral(this);
    }
    return orElse();
  }
}

abstract class _Neutral implements LiveConfigState {
  const factory _Neutral({required bool newFeedItems}) = _$_Neutral;

  @override
  bool get newFeedItems;
  @override
  @JsonKey(ignore: true)
  _$NeutralCopyWith<_Neutral> get copyWith =>
      throw _privateConstructorUsedError;
}
