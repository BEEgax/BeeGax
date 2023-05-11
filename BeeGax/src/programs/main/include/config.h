#ifndef CONFIG_H
#define CONFIG_H

#include <Arduino.h>

class Config {
public:
    Config();
    void setPostInterval(int interval);
    int getPostInterval();
    void setMeasureInterval(int interval);
    int getMeasureInterval();
    void setKey(String key);
    String getKey();
private:
    struct { 
        int post;
        int measure;
        String key;
    } _data;
    int _addr;
};

#endif