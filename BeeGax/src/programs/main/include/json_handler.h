#ifndef JSON_HANDLER_H
#define JSON_HANDLER_H
#include <ArduinoJson.h>

void start_time();
void init_json(String KEY);
String get_json(String KEY);
void log_data(int data_type, float content);

#endif