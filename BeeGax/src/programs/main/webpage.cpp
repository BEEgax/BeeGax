#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESPAsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include <map>

#include "include/webpage.h"

AsyncWebServer server(80);


const char* PARAM_INPUT_1 = "input_1";
const char* PARAM_INPUT_2 = "input_2";

int temp_measure = 0;
int temp_post = 0;

const char index_html_temp[] PROGMEM = R"rawliteral(
<!DOCTYPE HTML><html><head>
  <title>ESP Input Form</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script>
    function submitMessage() {
      alert("Saved value to ESP SPIFFS");
      setTimeout(function(){ document.location.reload(false); }, 500);   
    }
  </script></head><body>
  <form action="/get" target="hidden-form">
    inputString (current value %inputString%): <input type="text" name="inputString">
    <input type="submit" value="Submit" onclick="submitMessage()">
  </form><br>
  <form action="/get" target="hidden-form">
    inputInt (current value %inputInt%): <input type="number " name="inputInt">
    <input type="submit" value="Submit" onclick="submitMessage()">
  </form><br>
  <form action="/get" target="hidden-form">
    inputFloat (current value %inputFloat%): <input type="number " name="inputFloat">
    <input type="submit" value="Submit" onclick="submitMessage()">
  </form>
  <iframe style="display:none" name="hidden-form"></iframe>
</body></html>)rawliteral";

void notFound(AsyncWebServerRequest *request) {
    request->send(404, "text/plain", "Not found");
}

void start_server() {
  // Send web page with input fields to client
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    String test = String(index_html_temp);
    const char* index_html = test.c_str();
    request->send_P(200, "text/html", index_html);
  });


  server.on("/get", HTTP_GET, [] (AsyncWebServerRequest *request) {
    String measure_intervall_msg;
    String measure_intervall_inp;
    String post_intervall_msg;
    String post_intervall_inp;

    if (request->hasParam(PARAM_INPUT_1)) {
      measure_intervall_msg = request->getParam(PARAM_INPUT_1)->value();
      measure_intervall_inp = PARAM_INPUT_1;
    }

    if (request->hasParam(PARAM_INPUT_2)) {
      post_intervall_msg = request->getParam(PARAM_INPUT_2)->value();
      post_intervall_inp = PARAM_INPUT_2;
    }
    if (!request->hasParam(PARAM_INPUT_1) && request->hasParam(PARAM_INPUT_2)) {
        measure_intervall_msg = "No message sent";
        measure_intervall_inp = "none";
        post_intervall_msg = "No message sent";
        post_intervall_inp = "none";
    }
    request->send(200, "text/html", "HTTP GET request sent to your ESP on input field (" 
                  + measure_intervall_inp + ", " + post_intervall_inp + ") with value: " + measure_intervall_msg + ", "+ post_intervall_msg +
                  "<br><a href=\"/\">Return to Home Page</a>");
    temp_measure = measure_intervall_msg.toInt();
    temp_post = post_intervall_msg.toInt();
  });

  server.onNotFound(notFound);
  server.begin();
}

std::map<String, int> get_config(){
    std::map<String, int> m{{"MEASURE", temp_measure}, {"POST", temp_post * 60}};
    return m;
}
