class BeescaAPI {
    static hives = ["FDFDF", "Volvo", "BMW"];
    
    static getHives(){
        while (BeescaAPI.hives.length < 8){
            BeescaAPI.hives.push("+");
        };
        return BeescaAPI.hives
    }

    static getWeight(){
        const weight = 0.0
        return weight
    }

    static getTemperature(){
        const temperature = 0.0
        return temperature
    }

    static getHumidity(){
        const humidity = 0.0
        return humidity
    }

    static getLocation(){
        const location = ""
        return location
    }
}

export default BeescaAPI;