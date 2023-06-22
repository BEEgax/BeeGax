#include <ESP8266HTTPClient.h>

#include "include/dht20.h"
#include "include/webpage.h"
#include "include/json_handler.h"
#include "include/wifi.h"
#include "include/config.h"
#include "include/loadcell.h"

// Device Key
const String KEY = "KEY1";

// Server URL
const char* serverName = "http://167.235.150.74:8000/api/measurement/";

// measure and post intervalls
int measurement_timer = 0;
int post_timer = 0;

const int measurement_intervall = 4;
const int post_intervall = 20;


/**
 * The function transfers data to a server using HTTP POST method if WiFi is connected.
 * 
 * @param data A pointer to a character array (string) that contains the data to be transferred to the
 * server.
 */
void transfer_values(char* data) {
  	if(WiFi.status() == WL_CONNECTED){
		Serial.print("\nData:\n\n\n\n");
		Serial.print(data);
		Serial.print("\n\n\n\n");
		WiFiClient client; // Create wifi client
		HTTPClient http; // Create http client

		http.begin(client, serverName); // Begin client to server connection
    
    	http.addHeader("Content-Type", "application/json");

		http.POST(data); // Send data to URL

    	http.end();  // Free resources
  	}
  	else {
		Serial.println("WiFi Disconnected");
	}
}

/**
 * The function checks if it's time to take measurements and logs humidity and temperature data if it
 * is.
 */
void check_measure(){
	if (measurement_timer >= measurement_intervall){
		delay(2000);
		log_data(2, get_humidity());
		delay(2000);
		log_data(0, get_weight()*0.001);
		delay(2000);
		log_data(1, get_temp());
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

void setup() {
	post_timer = 0;
	measurement_timer = 0;
	Serial.begin(115200);
	connect_to_WiFi();
	load_cell_init();
	start_time();  // connect to timeserver 
	dht_start();  // start the dht20 sensor
	init_json(KEY);   // create the json doc and initialize needed values
	delay(1000);
}

void loop() {
	check_measure();
	check_post();
	delay(1000);
}