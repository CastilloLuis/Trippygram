export class helpers{
    validateJSON = (data, i) => {
        console.log(data)
        if(JSON.stringify(data) === '{}') {
            return false;
        } else {
            if(Object.keys(data).length < i) {
                return false;
            } else {
                for(let params in data) {
                    if((data[params].length === 0)) {
                        return false;
                    }
                }
                return true;               
            }

        }

    }
}