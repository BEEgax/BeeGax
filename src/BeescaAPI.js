class BeescaAPI {
    static data = []

    static async getHives(){
        
        const data = await fetch("http://167.235.150.74:8000/api/hive/")
            .then((response) => response.json())
            .catch((error) => console.error(error));
        this.data = data;

        const hives = data.data.map((hive) => hive.hardware_api_key);
        
        while (hives.length < 8){
            hives.push("+");
        };

        return hives
    }

    static async getWeight(hive_key){
        const data = await fetch("http://167.235.150.74:8000/api/measurement/")
            .then((response) => response.json())
            .catch((error) => console.error(error));
            return false;
        
    }

    static getTemperature(hive){
        const temperature = 0.0
        return temperature
    }

    static getHumidity(hive){
        const humidity = 0.0
        return humidity
    }

    static getLocation(hive){
        const location = ""
        return location
    }
}

export default BeescaAPI;