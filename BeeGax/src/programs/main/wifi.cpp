#include <ESP8266WiFi.h>
#include <WiFiManager.h>

#include "include/wifi.h"

WiFiManager wifiManager;

void connect_to_WiFi(){
    wifiManager.autoConnect("BeeGax Config");
}

wl_status_t get_status(){
    return WiFi.status();
}