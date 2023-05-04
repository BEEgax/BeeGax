class BeescaAPI {
    static hives = [];
    static measurements = [];
    static weights = [];
    static temperatures = [];
    static humidities = [];
    static timeWeight = [];
    static timeTemp = [];
    static timeHum = [];

    static async getHives(){
        
        const data = await fetch("http://167.235.150.74:8000/api/hive/")
            .then((response) => response.json())
            .catch((error) => console.error(error));
            this.hives = data.data;
            
            let i = 0;
        while (this.hives.length < 8) {
            this.hives.push({id: `P${i}`, hardware_api_key: "+", location:"", name: ""});
            i++;
        }

        return this.hives;
    }

    static async setMeasurements(hive_id) {
        const data = await fetch(`http://167.235.150.74:8000/api/measurement/${hive_id}/1670669800/1682587200`)
        .then((response) => response.json())
        .catch((error) => console.error(error));

        // console.log(data);
        
        this.measurements = data.data
        this.timeWeight = [];
        this.timeTemp = [];
        this.timeHum = [];
        this.weights = [];
        this.temperatures = [];
        this.humidities = [];

        data.data.map((measurement) => {
            switch (measurement.value_type) {
                case 0:
                    this.weights.push(measurement.value);
                    this.timeWeight.push(this.timeConverter(measurement.date));
                    break;
                case 1:
                    this.temperatures.push(measurement.value);
                    this.timeTemp.push(this.timeConverter(measurement.date));
                    break;
                case 2:
                    this.humidities.push(measurement.value);
                    this.timeHum.push(this.timeConverter(measurement.date));
                    break;
            };
        });
        this.timeWeight = this.shortenList(this.timeWeight)
        this.timeHum = this.shortenList(this.timeHum)
        this.timeTemp = this.shortenList(this.timeTemp)
    }

    static async postHive(hive) {
        /*
        {
            name: string,
            location: string,
            hardware_api_key: string
        }
        */
        const response = await fetch("http://167.235.150.74:8000/api/hive/", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(hive)
        });

        await this.getHives();
    }

    static async patchHive(hive) {
        console.log("***********++++++++++++**********")
    }

    static getLocation(hive){
        const location = ""
        return location
    }

    static shortenList(list){
        let tempList = []
        // tempList.push("")
        tempList.push("                     " + list[0]);
        tempList.push("")
        tempList.push("              " + list[list.length-1]);
        return tempList
    }

    static timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour; // + ':' + min + ':' + sec ;
        return time;
      }
}

export default BeescaAPI;