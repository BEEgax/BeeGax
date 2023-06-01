#include <ESP8266HTTPClient.h>

#include "include/dht20.h"
#include "include/webpage.h"
#include "include/json_handler.h"
#include "include/wifi.h"
#include "include/config.h"

// initialize needed objects
HTTPClient sender;
Config mainConf;

// Device Key
const String KEY = "KEY5";

// Server URL
const char* serverName = "http://167.235.150.74:8000/api/measurement/";

// measure and post intervalls
int measurement_timer = 20;
int post_timer = 300;


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
		WiFiClient client;                    // Create wifi client
		HTTPClient http;                      // Create http client

		http.begin(client, serverName);       // Begin client to server connection
    
    	http.addHeader("Content-Type", "application/json");

		http.POST(data);

    	http.end();  // Free resources
  	}
  	else {
		Serial.println("WiFi Disconnected");
	}
}

void check_measure(){  // Log the data from the sensors in intervalls
	if (measurement_timer >= mainConf.getMeasureInterval()){
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

void check_post(){  // Post the Data to the server in intervalls
	if (post_timer >= mainConf.getPostInterval()){
		transfer_values((char*)get_json(KEY).c_str());
		post_timer = 0;
	}
	else{
		post_timer++;
	}
}

void update_config(){
	int mesu = get_config()["MEASURE"];
	int post = get_config()["POST"];
	if (mesu != mainConf.getMeasureInterval() ||
			post != mainConf.getPostInterval()){
		mainConf.setMeasureInterval(mesu);
		mainConf.setPostInterval(post);
	}
}

void setup() {
	Serial.begin(115200);
	connect_to_WiFi();
	start_server();  // start webserver for configuration
	update_config();  // update the timer limits
	start_time();  // connect to timeserver 
	dht_start();  // start the dht20 sensor
	init_json(KEY);   // create the json doc and initialize needed values
	delay(1000);
}

void loop() {
	update_config();
	check_measure();
	check_post();

	delay(1000);
}