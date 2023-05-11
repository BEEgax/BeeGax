#include <ArduinoJson.h>
#include <TimeLib.h>

#include "include/json_handler.h"
#include "include/unix.h"


StaticJsonDocument<1024> doc;
JsonArray json_data;
JsonObject json_entry;


void start_time(){
    setTime(time(NULL));
}

void init_json(String KEY){
    doc.clear();
    doc["key"] = KEY;
    json_data = doc.createNestedArray("measurements");
}

String get_json(String KEY){
    String output;
    serializeJson(doc, output);
    output = "{\"data\":" + output + "}";
    
    init_json(KEY);
    return output;
}

void log_data(int data_type, float content){
    json_entry = json_data.createNestedObject();
    json_entry["value"] = std::to_string(content);
    json_entry["value_type"] = std::to_string(data_type);
    json_entry["date"] = get_unix();
}
