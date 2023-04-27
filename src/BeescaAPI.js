class BeescaAPI {
    static hives = [];
    static measurements = [];
    static weights = [];
    static temperatures = [];
    static humidities = [];
    static time = [];

    static async getHives(){
        
        const data = await fetch("http://167.235.150.74:8000/api/hive/")
            .then((response) => response.json())
            .catch((error) => console.error(error));
            this.hives = data.data;
            
            let i = 0;
        while (this.hives.length < 8) {
            this.hives.push({id: `P${i}`, hardware_api_key: "+", location:""});
            i++;
        }

        return this.hives;
    }

    static async setMeasurements(hive_id) {
        const data = await fetch(`http://167.235.150.74:8000/api/measurement/${hive_id}/1680769800/1682587200`)
        .then((response) => response.json())
        .catch((error) => console.error(error));
        
        console.log("asd");
        console.log(data);
        
        this.measurements = data.data;

        this.time = [];
        this.weights = [];
        this.temperatures = [];
        this.humidities = [];

        data.data.map((measurement) => {
            switch (measurement.value_type) {
                case 0:
                    this.weights.push(measurement.value);
                    break;
                case 1:
                    this.temperatures.push(measurement.value);
                    break;
                case 2:
                    this.humidities.push(measurement.value);
                    break;
            };
            this.time.push(measurement.date);
        });
    }

    static getLocation(hive){
        const location = ""
        return location
    }
}

export default BeescaAPI;