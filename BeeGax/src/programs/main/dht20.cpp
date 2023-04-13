#include <DHT20.h>

#include "include/dht20.h"

DHT20 DHT;

/**
 * The function checks the status of a DHT20 sensor and prints an appropriate message based on the
 * status code.
 * 
 * @param status an integer value representing the status of a DHT20 sensor reading. The function
 * check_status() takes this status as input and returns a corresponding message indicating the status
 * of the reading. The possible values for status are defined as constants in the code, such as
 * DHT20_OK, DHT20_ERROR
 * 
 * @return an integer value, either 1 or 0, depending on the case of the switch statement.
 */
int check_status(int status){
    switch (status)
    {
      case DHT20_OK:
        Serial.print("OK");
        return 1;
        break;
      case DHT20_ERROR_CHECKSUM:
        Serial.print("Checksum error");
        return 0;
        break;
      case DHT20_ERROR_CONNECT:
        Serial.print("Connect error");
        return 0;
        break;
      case DHT20_MISSING_BYTES:
        Serial.print("Missing bytes");
        return 0;
        break;
      case DHT20_ERROR_BYTES_ALL_ZERO:
        Serial.print("All bytes read zero");
        return 0;
        break;
      case DHT20_ERROR_READ_TIMEOUT:
        Serial.print("Read time out");
        return 0;
        break;
      case DHT20_ERROR_LASTREAD:
        Serial.print("Error read too fast");
        return 0;
        break;
      default:
        Serial.print("Unknown error");
        return 0;
        break;
    }
}

/**
 * This function initializes the DHT sensor.
 */
void dht_start(){
    DHT.begin();
}

float get_temp(){
    int status = DHT.read();
    if (check_status(status)){
        return DHT.getTemperature();
    }
    return 0.0;
}

float get_humidity(){
    int status = DHT.read();
    if (check_status(status)){
        return DHT.getHumidity();
    }
    return 0.0;
}
