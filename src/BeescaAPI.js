class BeescaAPI {
    static hives = ["Hive1", "Hive2", "Hive3", "Hive5"];
    
    static getHives(){
        fetch("http://167.235.150.74:8000/api/hive/")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => console.error(error));
    
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