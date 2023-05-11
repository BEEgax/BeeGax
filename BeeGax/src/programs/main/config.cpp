#include "Arduino.h"
#include "include/config.h"
#include "ArduinoJson.h"
#include "EEPROM.h"


Config::Config() {
    _data.key = "KEY0";
    _data.measure = 0;
    _data.post = 0;
    _addr = 0;
}

void Config::setPostInterval(int interval) {
    EEPROM.begin(512);
    _data.post = interval;
    EEPROM.put(_addr,_data);
    EEPROM.commit();
    EEPROM.end();
    Serial.println("Post:" + String(getPostInterval()));
}

int Config::getPostInterval() {
    EEPROM.begin(512);
    EEPROM.get(_addr,_data);
    EEPROM.end();
    return _data.post;
}

void Config::setMeasureInterval(int interval) {
    EEPROM.begin(512);
    _data.measure = interval;
    EEPROM.put(_addr,_data);
    EEPROM.commit();
    EEPROM.end();
    Serial.println("Measure:" + String(getPostInterval()));
}

int Config::getMeasureInterval() {
    EEPROM.begin(512);
    EEPROM.get(_addr,_data);
    EEPROM.end();
    return _data.measure;
}

void Config::setKey(String key) {
    EEPROM.begin(512);
    _data.key = key;
    EEPROM.put(_addr,_data);
    EEPROM.commit();
    EEPROM.end();
    Serial.println("Key:" + String(getPostInterval()));
}

String Config::getKey() {
    EEPROM.begin(512);
    EEPROM.get(_addr,_data);
    EEPROM.end();
    return _data.key;
}