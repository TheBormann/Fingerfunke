import 'package:bloc/bloc.dart';
import 'package:fingerfunke_app/cache/media_cache/media_cache.dart';
import 'package:fingerfunke_app/cache/media_cache/media_cache.impl.dart';
import 'package:flutter/material.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'network_image_state.dart';
part 'network_image_cubit.freezed.dart';

class NetworkImageCubit extends Cubit<NetworkImageState> {
  final String url;
  final int? height;
  final int? width;

  final MediaCache _mediaCache;

  NetworkImageCubit(this.url, {this.height, this.width, MediaCache? mediaCache})
      : _mediaCache = mediaCache ?? MediaCacheImpl(),
        super(const NetworkImageState.loading()) {
    _mediaCache
        .getSingleImageFile(
          url,
        ) // maxHeight: height, maxWidth: width)
        .then((image) => emit(NetworkImageState.imageLoaded(image)))
        .catchError((error, stacktrace) {
      emit(NetworkImageState.error(error));
    });
  }
}
