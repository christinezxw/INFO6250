const inventory = { 
    "1": { 
      itemId: "1",
      name: "Stuffed Mouse",
      quantity: 3,
    },
    "2": { 
      itemId: "2",
      name: "Laser Pointer", 
      quantity: 1,
    },
    "4": { 
      itemId: "4",
      name: "String",
      quantity: 2,
    },
    "5": { 
      itemId: "5",
      name: "Squeaky Toy",
      quantity: 0,
    },
}

function itemNameExist(itemName) {
    const items = Object.values(inventory);
    for (let key in items) {
        if (convertName(items[key].name) === convertName(itemName)) {
            return true;
        }
    }
    return false;
}

function itemNameValid(name) {
    return name.replace(/\s/g,'').match("^[A-Za-z0-9]+$");
}

function convertName(name) {
    return name.replace(/\s/g,'').toLowerCase();
}

const inventoryStorage = {
    inventory,
    itemNameExist,
    itemNameValid
};
  
module.exports = inventoryStorage;