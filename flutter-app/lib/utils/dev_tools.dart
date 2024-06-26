import 'package:flutter/material.dart';

class DevTools {
  static const Color colorPlaceholder = Color(0xFFBA68C8); // purple 300
  static const Color colorPlaceholderDark = Color(0xFFAB47EC); // purple 400

  static void showToDoSnackbar(BuildContext context, {String message = ""}) {
    ScaffoldMessenger.of(context)
        .showSnackBar(SnackBar(content: Text("ToDo $message")));
  }

  static Widget placeholder(String message, {bool dark = false, Color? color}) {
    return Container(
      color: color ?? (dark ? colorPlaceholderDark : colorPlaceholder),
      child: Center(
        child: Text("ToDo: $message"),
      ),
    );
  }
}
