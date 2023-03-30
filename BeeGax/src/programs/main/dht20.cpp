#include <DHT20.h>

#include "include/dht20.h"

DHT20 DHT;

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
