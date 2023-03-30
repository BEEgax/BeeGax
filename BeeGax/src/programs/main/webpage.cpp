#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>

#include "include/webpage.h"

AsyncWebServer server(80);


const char* PARAM_INPUT_1 = "input_1";
const char* PARAM_INPUT_2 = "input_2";


const char index_html_temp[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html><head>
    <style>html { font-family: Helvetica; display: inline-block; margin: 0px auto; text-align: center;}
    .button { background-color: #5F6B77; border: none; color: white; padding: 5px 15px; }
    text-decoration: none; font-size: 30px; margin: 2px; cursor: pointer;}" </style>
    <title>Beeska Configuration Side</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    </head><body>
    <h1>Beeska Configuration Side</h1>
    <h2>Hardware Key:</h2>
    <h3> {fdsa1111} </h3>
    <form action="/get">
    Sendeintervall (Minuten): <input type="text" name="input_1">
    <br>
    <br>
    Messintervall (Sekunden): <input type="text" name="input_2">
    <br>
    <br>
    <input type="submit" value="Submit">
    </form><br>
    
    </body></html>)rawliteral";

void notFound(AsyncWebServerRequest *request) {
    request->send(404, "text/plain", "Not found");
}

String key = "";

void start_server() {
  // Send web page with input fields to client
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    String test = String(index_html_temp);
    test.replace("{fdsa1111}", key);
    const char* index_html = test.c_str();
    request->send_P(200, "text/html", index_html);
  });


  server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
    String inputMessage1;
    String inputParam1;
    String inputMessage2;
    String inputParam2;

    if (request->hasParam(PARAM_INPUT_1)) {
      inputMessage1 = request->getParam(PARAM_INPUT_1)->value();
      inputParam1 = PARAM_INPUT_1;
    }

    if (request->hasParam(PARAM_INPUT_2)) {
      inputMessage2 = request->getParam(PARAM_INPUT_2)->value();
      inputParam2 = PARAM_INPUT_2;
    }
    if (!request->hasParam(PARAM_INPUT_1) && request->hasParam(PARAM_INPUT_2)) {
        inputMessage1 = "No message sent";
        inputParam1 = "none";
        inputMessage2 = "No message sent";
        inputParam2 = "none";
    }
    request->send(200, "text/html", "HTTP GET request sent to your ESP on input field (" 
                                     + inputParam1 + ", " + inputParam2 + ") with value: " + inputMessage1 + ", "+ inputMessage2 +
                                     "<br><a href=\"/\">Return to Home Page</a>");
  });
    
    char a[] = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (int i=0;i<=7;i++) {
        key += a[rand()%36];
    }
        

    server.onNotFound(notFound);
    server.begin();
}
