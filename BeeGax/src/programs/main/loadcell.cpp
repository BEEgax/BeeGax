#include "HX711.h"

#include "include/loadcell.h"

// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = D7; //D1 20 5
const int LOADCELL_SCK_PIN = D8; //D2 19 4

HX711 scale;
long reading;
long calibrate_value = 30;
long weight;

void tare() {
  Serial.println("Tare... remove any weights from the scale.");
  delay(5000);
  scale.tare();
  long zero_factor = scale.get_units(10);
  Serial.print("Tare done... Zero factor is: ");
  Serial.println(zero_factor);
  Serial.print("Place a known weight on the scale and enter the weight in g: ");
  String input_str;
  while (Serial.available() == 0) { }
  input_str = Serial.readString();
  input_str = input_str + "00";
  long int input = input_str.toInt();
  reading = scale.get_units(10);
  Serial.print("Result: Scale weight in units:");
  Serial.println(reading);
  long value = reading - zero_factor;
  calibrate_value = value / input;
}

long get_weight() {
  reading = scale.get_units(10);
  weight = reading / calibrate_value - 158;
  return weight;
}

void load_cell_init() {
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);
  scale.set_scale();
  //tare();
}
