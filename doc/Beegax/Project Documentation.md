## Introduction:
Beeska is an IoT project that helps beekeepers monitor their beehives remotely. The system uses various sensors to monitor the temperature, humidity, and weight of the hive. The data collected by the sensors is stored in a JSON format and sent to a web server. The beekeeper can access the data by visiting the web server, which displays the data in real-time. The system is designed to be low cost, easy to install, and user-friendly.

## Hardware:
The hardware used in the project includes an ESP8266 Wi-Fi module, DHT20 temperature and humidity sensor, ==HX711== load cell amplifier, and a load cell. The ESP8266 Wi-Fi module is used to connect the system to the internet. The DHT20 sensor is used to monitor the temperature and humidity of the hive. The ==HX711== amplifier and the load cell are used to measure the weight of the hive.

## Software:
The Beeska Hive Monitoring System uses the Arduino programming language to control the hardware. The software includes three main modules: sensor data acquisition, JSON formatting and transmission, and a web interface for data display and configuration.

## Sensor Data Acquisition:
The sensor data acquisition module is responsible for reading the data from the DHT20 temperature and humidity sensor and the ==HX711== load cell amplifier. The temperature, humidity, and weight data are stored in variables.

## JSON Formatting and Transmission:
The JSON formatting and transmission module is responsible for converting the sensor data into a JSON format and transmitting it to the web server. The JSON data is stored in a buffer and sent to the server using the HTTP protocol.

## Web Interface:
The beekeeper can configure the system using the web interface.

# Code
## main.cpp
### setup()
This function is called once when the microcontroller is powered up or reset. It initializes the Serial communication and calls the start_wifi() function.

### loop()
This function is called repeatedly after the setup() function. It checks for new data and posts it to the server. It also handles the measure_interval and post_interval and adjusts the data posting frequency accordingly.

### transfer_values(char* data)
#### Functionality
The function transfers data to a server using HTTP POST request if the device is connected to WiFi.
#### Parameters
- `data` (char*): A pointer to a character array (string) that contains the data to be transferred.
#### Return Values
None.

#### Example Usage
```arduino
std::string msg = "Hello World!";
transfer_values((char*)msg.c_str());
```

### check_measure()
#### Functionality
The function logs data from sensors at intervals.

#### Parameters
None.

#### Return Values
None.

#### Example Usage
```arduino
check_measure();
```

### check_post()
#### Functionality
The function checks if it's time to post data to the server and if so, transfers the values in JSON.

#### Parameters
None.

#### Return Values
None.

#### Example Usage
```arduino
check_post();
```

### update_config()
#### Functionality
The function updates the measurement and post intervals based on the values in the configuration and prints them if they have changed.

#### Parameters
None.

#### Return Values
None.

#### Example Usage
```arduino
update_config();
```

---

## dht20.cpp
### check_status()
#### Functionality
This function checks the status of a DHT20 sensor reading and prints an appropriate message based on the status code. The `status` parameter is an integer value representing the status of a DHT20 sensor reading. The function takes this status as input and returns an integer value of 1 or 0, depending on the case of the switch statement.

#### Parameters
- `status` (int): An integer value representing the status of a DHT20 sensor reading.

#### Return Values
-   `1` (int): If the status code represents a successful reading.
-   `0` (int): If the status code represents an unsuccessful reading.

#### Example Usage
```arduino
int status = DHT.read();
if (check_status(status)){
    // Do something with the reading.
}
```

### dht_start()
#### Functionality
This function initializes the DHT20 sensor.

#### Parameters
None.

#### Return Value
None.

#### Example Usage
```arduino
dht_start();
```

### get_temp()
#### Functionality
This function reads the temperature from the DHT20 sensor and returns a float value representing the temperature in Celsius.

#### Parameters
None.

#### Return Values
- `temperature` (float): A float value representing the temperature in Celsius. Returns `0.0` if the reading was unsuccessful.

#### Example Usage
```arduino
float temperature = get_temp();
// Do something with the temperature reading.
```

### get_humidity()
#### Functionality
This function reads the humidity from the DHT20 sensor and returns a float value representing the relative humidity.

#### Parameters
None.

#### Return Values
- `humidity` (float): A float value representing the relative humidity. Returns `0.0` if the reading was unsuccessful.

#### Example Usage
```arduino
float humidity = get_humidity();
// Do something with the humidity reading.
```

---

## unix.cpp
### get_unix()
#### Functionality
This function retrieves the current Unix timestamp from an NTP server.

#### Parameters
None.

#### Return Values
- `now` (unsigned long): An unsigned long integer representing the current Unix timestamp.

#### Example Usage
```arduino
unsigned long currentTime = get_unix(); Serial.print("Current Unix timestamp: "); Serial.println(currentTime);
```

---

## json_handler.cpp
### start_time()
#### Funtionality
This function sets the current time using the setTime() function from the TimeLib library. It takes the current UNIX timestamp as an argument.

#### Parameters
None.

#### Return Values
None.

#### Example Usage
```arduino
start_time();
```

### init_json(String KEY)
#### Functionality
This function initializes a new JSON document with the given key. It creates an empty array for the measurements and sets the doc object to point to it.

#### Parameters
- `KEY`: a string representing the key to be used in the JSON document.

#### Return Values
None.

#### Example Usage
```arduino
init.json("my_key");
```


### get_json(String KEY)
#### Functionality
This function returns the JSON data as a string. It adds a "data" key to the JSON object and wraps it in curly braces.

#### Parameters
- `KEY`: a string representing the key to be used in the JSON document.

#### Return Values
- `output`: A string representing the JSON document with the key and measurement data.

#### Example Usage
```arduino
String json_data = get_json("my_key");
```

### log_data(int data_type, float content)
#### Functionality
This function logs a new data point to the JSON document. It creates a new JSON object with the current timestamp, data type, and content. It adds the object to the json_data array.

#### Parameters
- `data_type`: an integer representing the type of measurement data being logged.
- `content`: a float representing the actual value of the measurement data being logged.

#### Return Values
None.

#### Example Usage
```arduino
log_data(1, 20.0); // logs a temperature measurement with a value of 20.0
```

---

## webpage.cpp
### start_server()
#### Functionality
This function starts the web server on port 80. It serves an HTML page with input fields for the measurement interval and posting interval. It also generates a random hardware key and displays it on the webpage.

#### Parameters
None.

#### Return Values
None.

#### Example Usage
```arduino
start_server();
```

### get_config()
#### Functionality
This function returns a std::map object with the current measurement interval and posting interval. It is called when the user submits the form on the web page.

#### Parameters
None.

#### Return Values
- `m`(std::map<String, int>): map containing configuration settings, with keys "MEASURE" and "POST" for the measurement and posting intervals, respectively.

#### Example Usage
```arduino
std::map<String, int> config = get_config();
int measure_interval = config["MEASURE"];
int post_interval = config["POST"];
```