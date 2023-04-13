#include <NTPClient.h>
#include <WiFiUdp.h>

#include "include/unix.h"

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org");

unsigned long get_unix() {
    timeClient.update();
    unsigned long now = timeClient.getEpochTime();
    return now;
}