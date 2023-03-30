#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_I2CDevice.h>
#include <ArduinoJson.h>
#include <vector>
#include <map>
#include <TimeLib.h>
#include <FastLED.h>
#include <iostream>

#include "include/unix.h"
#include "include/dht20.h"

using namespace std;
 
HTTPClient sender;
WiFiClientSecure wifiClient;

const int humidity_id = 0;
const int weight_id = 1;
const int temperature_id = 2;

const int humidity_border = 20;
const int weight_border = 10;
const int temperature_border = 10;

int timer = 0;
int post_border = 60;

int entry_id = 0;

int humidity_timer = 0;
int weight_timer = 0;
int temperatur_timer = 0;

// WLAN-Daten
const char* ssid = "HTL-Weiz";
const char* password = "HTL-Weiz";

const char* serverName = "http://167.235.150.74:8000/api/measurement/";

String identification_key = "KEY5";

StaticJsonDocument<1024> doc;
JsonArray json_data;
JsonObject json_entry;

void init_json(){
  doc.clear();
  doc["key"] = identification_key;
  json_data = doc.createNestedArray("measurements");
  entry_id = 0;
}

String get_json(){
  String output;
  serializeJson(doc, output);
  output = "{\"data\":" + output + "}";
  return output;
}

void log_data(int data_type, float content){
  uint32_t unix = now();
  json_entry = json_data.createNestedObject();
  json_entry["value"] = std::to_string(content);
  json_entry["value_type"] = std::to_string(data_type);
  json_entry["date"] = get_unix();
}

void transfer_values(char* data) {
  if(WiFi.status() == WL_CONNECTED){
    Serial.print("\n\n\n\n");
    Serial.print(data);
    Serial.print("\n\n\n\n");
    WiFiClient client;                    // Create wifi client
    HTTPClient http;                      // Create http client
  
                                          // Your Domain name with URL path or IP address with path
    http.begin(client, serverName);       // Begin client to server connection
    
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(data);
   
    // Free resources
    http.end();
  }
  else {
    Serial.println("WiFi Disconnected");
  }
}

void setup() {
  dht_start();
  Serial.begin(115200);

  setTime(time(NULL));

  WiFi.begin(ssid, password); 
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {     // Try connecting/Wait for connection
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  init_json();
}

int check_timer(int timer, int border, int data_type){
  if (timer > border){
    if (data_type == 0){
      log_data(data_type, get_humidity());
    } else if (data_type == 1){
      log_data(data_type, 0.0);  //weight
    } else if (data_type == 2){
      log_data(data_type, get_temp());
    }
    return 0;
  } else {
    return timer + 1;
  }
}

void loop() {
  humidity_timer = check_timer(humidity_timer, humidity_border, humidity_id);
  weight_timer = check_timer(weight_timer, weight_border, weight_id);
  temperatur_timer = check_timer(temperatur_timer, temperature_border, temperature_id);
  if (timer == post_border){
    transfer_values((char*)get_json().c_str());
    timer = 0;
    init_json();
  }
  else{
    timer++;
  }
  delay(1000);
}