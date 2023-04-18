#ifndef WIFI_H
#define WIFI_H

#include <Arduino.h>
#include <ESP8266WiFi.h>


void connect();
String* get_availible_wifis();
wl_status_t get_status();

#endif