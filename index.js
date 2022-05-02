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
                        <th colspan="5">
                        <div id="interface"></div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Item</td>
                        <td>Sell In</td>
                        <td>Quality</td>
                        <td>Date of Entry</td>
                        <td>Category</td>
                    </tr>
                </tbody>
            </table>
`
    $main.append($app)
}
function addItemToList(item) {
    let selectedItem = item.get("item")
    let selectedDate = item.get("date")
    let selectedQuality = item.get("quality")
    let selectedSell_in = item.get("sell_in")
    let selectedCategory = createCategory(selectedItem)
    if (selectedCategory === "legendary") {
        const inventoryItem = {
            name: selectedItem,
            sell_in: selectedSell_in,
            quality: 80,
            date_added: selectedDate,
            category: selectedCategory
        }
        inventoryItems.push(inventoryItem)

    } else {
        const inventoryItem = {
            name: selectedItem,
            sell_in: selectedSell_in,
            quality: selectedQuality,
            date_added: selectedDate,
            category: selectedCategory
        }
        inventoryItems.push(inventoryItem)
    }
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
            <td>${savedItem.date_added}</td>
            <td>${savedItem.category}</td>
        </tr>
    `
            $tBody.append($tRow)
        })
    }
}
function addInterface() {
    const $app = document.querySelector("#app")
    const $interface = document.querySelector("#interface")
    const $form1 = document.createElement("form")
    $form1.id = "form-1"
    $form1.innerHTML = `
            <label for="item">Enter Item</label>
            <input type="text" name="item" required>
            <label for="date">Date of Entry</label>
            <input type="date" name="date" required>
            <label for="quality">Quality</label>
            <input type="number" name="quality" required>
            <label for="sell_in">Sell-in Days</label>
            <input type="number" name="sell_in" required>
            <input type="submit" value="Add Item" name="item date quality sell_in">
            <input type="reset" value="Delete Inventory">
    `
    $interface.append($form1)
    const $form2 = document.createElement("form")
    $form2.id = "form-2"
    $form2.innerHTML = `
        <label for="current-date">Date of Degradation</label>
        <input type="date" name="current-date" required>
        <input type="submit" value="Apply Degradation" name="current-date">
    `
    $app.append($form2)
    addListeners($form1, $form2)
}

function addListeners($form1, $form2) {
    $form1.addEventListener("submit", (event) => {
        let formData = new FormData(event.currentTarget)
        saveItem(formData)
    })
    $form1.addEventListener("reset", (event) => {
        localStorage.clear()
        window.location.reload()
    })
    $form2.addEventListener("submit", (event) => {
        let formData = new FormData(event.currentTarget)
        eodCalculate(formData)
    })
}

function eodCalculate(date) {
    let currentDate = date.get("current-date")
    const savedInventory = localStorage.getItem("items")
    const parsedInventory = JSON.parse(savedInventory)
    let category = ""
    parsedInventory.forEach(item => {
        let days = getTimeInDays(item.date_added, currentDate)
        for (let i = 0; i < days; i++) {
            reduceItem(item)
        }
    })
    eodUpdateLocalStorage(parsedInventory)
    refreshItems()
}

function eodUpdateLocalStorage(inventory) {
    const itemsJSON = JSON.stringify(inventory)
    localStorage.setItem("items", itemsJSON)
}

function createCategory(item) {
    let category = ""
    if (item.includes("conjured")) {
        category = "conjured"
    } else if (item.includes("sulfuras")) {
        category = "legendary"
    } else if (item.includes("aged brie")) {
        category = "aged brie"
    } else if (item.includes("backstage passes")) {
        category = "backstage passes"
    } else {
        category = "standard"
    }
    return category
}

function reduceItem(item) {
    switch (item.category) {
        case "legendary":
            break;
        case "aged brie":
            item.sell_in = item.sell_in - 1
            item.quality = item.quality + 1
            if (item.quality > 50) {
                item.quality = 50
            } else if (item.quality < 0) {
                item.quality = 0
            }
            break;
        case "backstage passes":
            item.sell_in = item.sell_in - 1
            if (item.sell_in <= 10 && item.sell_in > 5) {
                item.quality = item.quality + 2
            } else if (item.sell_in <= 5 && item.sell_in > 0) {
                item.quality = item.quality + 3
            } else if (item.sell_in <= 0) {
                item.quality = 0
            } else {
                item.quality = item.quality + 1
            }
            if (item.quality > 50) {
                item.quality = 50
            } else if (item.quality < 0) {
                item.quality = 0
            }
            break;
        case "conjured":
            item.sell_in = item.sell_in - 1
            if (item.sell_in < 0) {
                item.quality = item.quality - 4
            } else {
                item.quality = item.quality - 2
            }
            if (item.quality > 50) {
                item.quality = 50
            } else if (item.quality < 0) {
                item.quality = 0
            }
            break;
        default:
            item.sell_in = item.sell_in - 1
            if (item.sell_in < 0) {
                item.quality = item.quality - 2
            } else {
                item.quality = item.quality - 1
            }
            if (item.quality > 50) {
                item.quality = 50
            } else if (item.quality < 0) {
                item.quality = 0
            }
            break;
    }
}

function getTimeInDays(dateEntered, currentDate) {
    let date1 = new Date(dateEntered)
    let date2 = new Date(currentDate)
    let differenceInTime = date2.getTime() - date1.getTime()
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays
}