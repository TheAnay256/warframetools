import $ from 'jquery';

export function getInitialData() {
    let url = 'resources/warframeDrops.html';
    let categories = [
        {name: "missionRewards", transformer: missionRewards}
    ]
    
    return fetch(url).then((response) => { //grab the raw file data
        return response.blob();
    }).then((blob) => { //parse data into text
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.readAsText(blob);
        });
    }).then((fileText) => {
        let page = $(fileText);
        let results = {itemNames: [], items: {}};
        
        categories.forEach((category) => { //For each category, parse drop chances into individual items
            insertCategoryIntoData(category, results, page)
        });
        
        return results;
    });
}

function insertCategoryIntoData(category, data, raw) {
    let categoryTable = raw.filter("#" + category.name).next();
    $(categoryTable).prepend("<tr class='blank-row'></tr>"); //Insert blank row at beginning for uniform iteration

    categoryTable.find(".blank-row").each((index, element) => {
        category.transformer($(element).nextUntil(".blank-row"), data);
    });
}

function missionRewards(table, data) {
    let parsedData = tableToArray(table); 
    let mission;
    let rotation;
    
    parsedData.forEach((entry, index) => {
        if(index == 0) {
            mission = entry[0]; //First entry in subtable is always mission
        }
        else if(entry.length == 1) {
            rotation = entry[0]; //every single-entry row thereafter is a rotation or sub-mission
        }
        else{
            if(data.itemNames.includes(entry[0])){
                data.items[entry[0]].missionRewards.push({mission: mission, rotation: rotation, rarity: entry[1]});
            }
            else{
                data.itemNames.push(entry[0]);
                data.items[entry[0]] = newItemProperties();
                data.items[entry[0]].missionRewards.push({mission: mission, rotation: rotation, rarity: entry[1]});
            }
        }
    });
}

function tableToArray(table) { //finally getting out of jquery-land
    return table.toArray().map((entry) => {
        if($(entry).children().length > 0) {
            return $(entry).children().toArray().map((child) => { return $(child).text(); });
        }
        return $(entry).text(); //data is still ugly at this point but not jquery levels of ugly
    });
}

function newItemProperties() {
    return {missionRewards: []};
}
