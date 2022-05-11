import jsonData from '../constants/dataa.json'
export const getRange = (min, max) => {
    const filteredData = jsonData?.data?.filter(x => {
        if (x?.cdc_key === 'YES') {
            if (x?.electronic_shares * 1 >= min && x?.electronic_shares * 1 <= max) {
                return x;
            }
        } else {
            if (x?.physical_shares * 1 >= min && x?.physical_shares * 1 <= max) {
                return x;
            }
        }
    });
    return ({ counter: filteredData?.length, range: `${min} - ${max}`, sum: getSum(filteredData) });
}
export const getList = () => {
    let temp = [];
    let total_counter=0;
    for (let i = 0, min = 0, max = 100; i < 24; i++) {
       
         console.log('total_counter',total_counter);
        if (i === 0) {
            const obj=getRange(min, max);
            console.log('obj.counter::',obj.counter);
            total_counter+=obj.counter;
            temp.push(obj);

        } else if (i === 1) {
        
            min = max + 1;
            max = 500;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        } else if (i === 2) {
            min = max + 1;
            max = 1000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        } else if ((i >= 3 && i <= 10) || (i >= 13 && i <= 17)) {
            min = max + 1;
            if(i===3){
                max=5000;
            }else{
                max = max + 5000;
            }
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        } else if (i === 11 || i === 12) {
            min = max + 1;
            max = max + 10000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }else if (i===18){
            min = max+5000 + 1;
            max = max + 15000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }
        else if(i===19){
            min = max +20000+ 1;
            max = max + 130000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }
        else if(i===20){
            min = max + 1;
            max = max + 500000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }
        else if(i===21){
            min = max + 1+245000;
            max = max + 250000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }
        else if(i===22){
            min = max + 1+1615000;
            max = max + 1620000;
            const obj=getRange(min, max);
            total_counter+=obj.counter;
            temp.push(obj);

        }

    }
    return ({data:temp,total:total_counter});
}

export const getSum = (list) => {
    let res = 0;
    list?.map((item) => {
        res += (item?.electronic_shares * 1 + item?.physical_shares * 1);
    });
    return res;
}
