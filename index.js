const items = [
    { name: "+5 Dexterity Vest", sell_in: 10, quality: 20, id: "0" },
    { name: "Aged Brie", sell_in: 2, quality: 0, id: "1" },
    { name: "Elixir of the Mongoose", sell_in: 5, quality: 7, id: "2" },
    { name: "Sulfuras, Hand of Ragnaros", sell_in: 0, quality: 80, id: "3" },
    { name: "Backstage passes to a TAFKAL80ETC concert", sell_in: 15, quality: 20, id: "4" },
    { name: "Conjured Mana Cake", sell_in: 3, quality: 6, id: "5" },
]

const inventoryItems = []

createTable()
addInterface()
refreshItems()

function createTable() {
    const $main = document.querySelector("main")
    const $app = document.querySelector("#app")
    $app.innerHTML = `
                <table>
                <thead>
                    <tr>
                        <th colspan="3">
                        <div id="interface"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item</td>
                        <td>Sell In</td>
                        <td>Quality</td>
                    </tr>
                </tbody>
            </table>
`
    $main.append($app)
}

function addItemToList(item) {
    let selectedItem = item.get("item")
    items.forEach(masterItem => {
        if (masterItem.name === selectedItem) {
            const inventoryItem = {
                name: masterItem.name,
                sell_in: masterItem.sell_in,
                quality: masterItem.quality,
                id: masterItem.id,
            }
            inventoryItems.push(inventoryItem)
        }
    })
}

function saveItem(item) {
    addItemToList(item)
    updateLocalStorage()
}

function updateLocalStorage() {
    if (localStorage.length > 0) {
        const savedInventory = localStorage.getItem("items")
        const parsedInventory = JSON.parse(savedInventory)
        let spreadInventory = [...parsedInventory, ...inventoryItems]
        const itemsJSON = JSON.stringify(spreadInventory)
        localStorage.setItem("items", itemsJSON)
    } else {
        const itemsJSON = JSON.stringify(inventoryItems)
        localStorage.setItem("items", itemsJSON)
    }
}

function refreshItems() {
    const savedInventory = localStorage.getItem("items")
    const parsedInventory = JSON.parse(savedInventory)
    const $tBody = document.querySelector("tbody")
    if (localStorage.length > 0) {
        parsedInventory.forEach(savedItem => {

            const $tRow = document.createElement("tr")
            $tRow.innerHTML = `
        <tr>
            <td>${savedItem.name}</td>
            <td>${savedItem.sell_in}</td>
            <td>${savedItem.quality}</td>
        </tr>
    `
            $tBody.append($tRow)
        })
    }
}


function addInterface() {
    const $interface = document.querySelector("#interface")
    const $form = document.createElement("form")
    $form.id = "item-selection"
    $form.innerHTML = `
            <label for="item">Select Item</label>
            <select name="item">

            </select>
            <input type="submit" value="Add Item" name="selection">
            <input type="reset" value="Delete Inventory">
            <input type="button" value="EOD" id="eod">
    `
    addOptions(items, $form)
    $interface.append($form)
    addListeners($form)
}

function addOptions(items, $form) {
    items.map(item => {
        const $option = document.createElement("option")
        $option.value = item.name
        $option.textContent = `${item.name}`
        $form.querySelector("select").append($option)
    })
}

function addListeners($form) {
    $form.addEventListener("submit", (event) => {
        let formData = new FormData(event.currentTarget)
        saveItem(formData)
    })
    $form.addEventListener("reset", (event) => {
        console.log("click")
        localStorage.clear()
        window.location.reload()
    })
    $form.querySelector("#eod").addEventListener("click", (event) => {
        eodCalculate()
        window.location.reload()
    })
}

function reduceItem(item) {
    item.sell_in = item.sell_in - 1
    console.log(item.name.includes("Conjured"))
    if (!item.name.includes("conjured") && !item.name.includes("Conjured")) {
        if (item.sell_in < 0 && item.quality > 0) {
            item.quality = item.quality - 2
        } else if (item.quality > 0 && item.quality < 50) {
            item.quality = item.quality - 1
        }
    } else {
        if (item.sell_in < 0 && item.quality > 0) {
            item.quality = item.quality - 4
        } else if (item.quality > 0) {
            item.quality = item.quality - 2
        }
    }
}

function reduceSpecialItem(item) {
    switch (item.id) {
        case "1":
            item.sell_in = item.sell_in - 1
            if (item.quality < 50) {
                item.quality = item.quality + 1
            }
            break;
        case "4":
            item.sell_in = item.sell_in - 1
            if (item.sell_in <= 10 && item.sell_in > 5 && item.quality <= 48) {
                item.quality = item.quality + 2
            } else if (item.sell_in <= 5 && item.sell_in >= 0 && item.quality <= 47) {
                item.quality = item.quality + 3
            } else if (item.sell_in < 0) {
                item.quality = item.quality * 0
            } else {
                item.quality = item.quality + 1
            }
            break;
        default:
            break;
    }
}

function eodCalculate() {
    const savedInventory = localStorage.getItem("items")
    const parsedInventory = JSON.parse(savedInventory)
    // go through inventory master list and apply changes to each item
    parsedInventory.forEach(item => {
        switch (item.id) {
            case "0":
                reduceItem(item)
                break;
            case "1":
                reduceSpecialItem(item)
                break;
            case "2":
                reduceItem(item)
                break;
            case "3":
                break;
            case "4":
                reduceSpecialItem(item)
                break;
            case "5":
                reduceItem(item)
                break;
            default:
                break;
        }
        eodUpdateLocalStorage(parsedInventory)
        refreshItems()
    })
}

function eodUpdateLocalStorage(inventory) {
    const itemsJSON = JSON.stringify(inventory)
    localStorage.setItem("items", itemsJSON)
}
