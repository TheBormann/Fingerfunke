part of 'post.dart';

class Event extends Post {
  final DateTime startTime;

  const Event(
      {required FirestoreId id,
      required UserInfo author,
      required String title,
      required String description,
      required DateTime creationTime,
      required post_visibility visibility,
      required String location,
      //required this.postPlace,
      required List<Asset> media,
      required List<UserInfo> participants,
      required this.startTime})
      : super._(
            id: id,
            type: post_type.event,
            author: author,
            title: title,
            description: description,
            creationTime: creationTime,
            visibility: visibility,
            location: location,
            media: media,
            participants: participants);

  @override
  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "creationTime": dateToJson(creationTime),
      "author": author.toJson(),
      "type": _postTypeEnumMap[type],
      "title": title,
      "description": description,
      "visibility": postVisibilityEnumMap[visibility],
      "location": location,
      "media": media.map((e) => e.toJson()).toList(),
      "participants": participants.map((user) => user.toJson()).toList(),
      "startTime": dateToJson(startTime)
    };
  }

  factory Event.fromJson(Map<String, dynamic> map) {
    return Event(
      id: map["id"] as String,
      creationTime: dateFromJson(map['creationTime'] as int),
      author: UserInfo.fromJson(map["author"]),
      title: map["title"] as String,
      description: map["description"] as String,
      visibility: $enumDecode(postVisibilityEnumMap, map["visibility"]),
      location: map["location"] as String,
      media: (map['media'] as List<dynamic>)
          .map((e) => Asset.fromJson(e as Map<String, dynamic>))
          .toList(),
      participants: (map["participants"] as List<dynamic>)
          .map((participant) =>
              UserInfo.fromJson(participant as Map<String, dynamic>))
          .toList(),
      startTime: dateFromJson(map['startTime'] as int),
    );
  }

  factory Event.fromDoc(DocumentSnapshot document) =>
      Event.fromJson(documentSnaphsotToJson(document));

  factory Event.createWithId(
          {required UserInfo author,
          required String title,
          required String description,
          required post_visibility visibility,
          required String location,
          //required GeoHash postPlace,
          required List<Asset> media,
          required DateTime startTime}) =>
      Event(
          id: const Uuid().v4(),
          author: author,
          title: title,
          description: description,
          creationTime: DateTime.now(),
          visibility: visibility,
          location: location,
          media: media,
          participants: [author],
          startTime: startTime);

  @override
  List<Object> get props => [...super.props, startTime];
}
