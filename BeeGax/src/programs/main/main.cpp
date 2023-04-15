/**
 * This is an Arduino sketch that logs data from a DHT20 sensor and posts it to a server at regular
 * intervals.
 * 
 * @param data The data being transferred to the server in JSON format, containing the sensor readings
 * and device key.
 */
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include "include/dht20.h"
#include "include/webpage.h"
#include "include/json_handler.h"

 
HTTPClient sender;
WiFiClientSecure wifiClient;

// Device Key
const String KEY = "KEY5";

// WLAN-Daten
const char* ssid = "GloeWLAN";
const char* password = "MargitHerwig!2001";
const char* serverName = "http://167.235.150.74:8000/api/measurement/";

// Measurement Intervall
int measurement_intervall = 20;

// Post Intervall
int post_intervall = 60;


int measurement_timer = 0;
int post_timer = 0;


/**
 * The function transfers data to a server using HTTP POST request if the device is connected to WiFi.
 * 
 * @param data A pointer to a character array (string) that contains the data to be transferred.
 */
void transfer_values(char* data) {
  	if(WiFi.status() == WL_CONNECTED){
		Serial.print("\nData:\n\n\n\n");
		Serial.print(data);
		Serial.print("\n\n\n\n");
		WiFiClient client;                    // Create wifi client
		HTTPClient http;                      // Create http client
	
											// Your Domain name with URL path or IP address with path
		http.begin(client, serverName);       // Begin client to server connection
    
    	http.addHeader("Content-Type", "application/json");

		http.POST(data);

    	http.end();  // Free resources
  	}
  	else {
		Serial.println("WiFi Disconnected");
	}
}

/**
 * The function logs data from sensors at intervals.
 */
void check_measure(){  // Log the data from the sensors in intervalls
	if (measurement_timer >= measurement_intervall){
		delay(2000);
		log_data(0, get_humidity());
		delay(2000);
		log_data(1, 0.0);
		delay(2000);
		log_data(2, get_temp());
		measurement_timer = 0;
	} else {
		measurement_timer++;
	}
}

/**
 * The function checks if it's time to post data to the server and if so, transfers the values in JSON
 * format.
 */
void check_post(){  // Post the Data to the server in intervalls
	if (post_timer >= post_intervall){
		transfer_values((char*)get_json(KEY).c_str());
		post_timer = 0;
	}
	else{
		post_timer++;
	}
}

/**
 * The function updates the measurement and post intervals based on the values in the configuration and
 * prints them if they have changed.
 */
void update_config(){
	int m_prev = measurement_intervall;
	int p_prev = post_intervall;
	measurement_intervall = get_config()["MEASURE"];
	post_intervall = get_config()["POST"];
	if (m_prev != measurement_intervall ||
		p_prev != post_intervall){
			Serial.print("\n\nm_int: ");
			Serial.print(measurement_intervall);
			Serial.print("\np_int: ");
			Serial.print(post_intervall);
			Serial.print("\n");
	}
}

void setup() {
	dht_start();  // start the dht20 sensor
	Serial.begin(115200);

	WiFi.begin(ssid, password);  // start connecting to WIFI
	while(WiFi.status() != WL_CONNECTED) {  // Try connecting/Wait for connection
		delay(500);
		Serial.print(".");
	}
	Serial.println("");
	Serial.print("Connected to WiFi network with IP Address: ");
	Serial.println(WiFi.localIP());

	update_config();  // update the timer limits
	start_time();  // connect to timeserver 
	start_server();  // start webserver for configuration

	init_json(KEY);   // create the json doc and initialize needed values
	delay(1000);
}

void loop() {
	update_config();
	check_measure();
	check_post();

	delay(1000);
}