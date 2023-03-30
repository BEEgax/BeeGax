class BeescaAPI {
    static getHives(){
        const hives = ["FDFDF", "Volvo", "BMW"];
        while (hives.length < 8){
            hives.push("+");
        };
        return hives
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