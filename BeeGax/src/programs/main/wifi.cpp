#include <ESP8266WiFi.h>

#include "include/wifi.h"

WiFiClientSecure wifiClient;

// WLAN-Daten
const char* ssid = "";
const char* password = "";

void connect(){
    WiFi.begin(ssid, password);  // start connecting to WIFI
	while(WiFi.status() != WL_CONNECTED) {  // Try connecting/Wait for connection
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.print("Connected to WiFi network with IP Address: ");
	Serial.println(WiFi.localIP());
}

String* get_availible_wifis(){
    int nr = WiFi.scanNetworks();
    String networks[nr];
    for (size_t i = 0; i < nr; i++)
    {
        networks[i] = WiFi.SSID(i);
    }
    return networks;
}

wl_status_t get_status(){
    return WiFi.status();
}