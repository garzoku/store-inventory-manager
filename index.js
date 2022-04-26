const items = [
    { name: "+5 Dexterity Vest", sell_in: "10", quality: "20" },
    { name: "Aged Brie", sell_in: "2", quality: "0" },
    { name: "Elixir of the Mongoose", sell_in: "5", quality: "7" },
    { name: "Sulfuras, Hand of Ragnaros", sell_in: "0", quality: "80" },
    { name: "Backstage passes tp a TAFKAL80ETC concert", sell_in: "15", quality: "20" },
    { name: "Conjured Mana Cake", sell_in: "3", quality: "6" },
]

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

function saveItem(item) {
    // put the option selection in a var by getting it's NAME attribute.
    let selectedItem = item.get("item")
    localStorage.setItem(`${selectedItem}`, selectedItem)
}

function refreshItems() {
    const $tBody = document.querySelector("tbody")
    if (localStorage.length > 0) {
        Object.keys(localStorage).forEach(key => {
            items.forEach(inventoryItem => {
                if (key === inventoryItem.name) {
                    const $tRow = document.createElement("tr")
                    $tRow.innerHTML = `
        <tr>
            <td>${inventoryItem.name}</td>
            <td>${inventoryItem.sell_in}</td>
            <td>${inventoryItem.quality}</td>
        </tr>
    `
                    $tBody.append($tRow)
                }
            })
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
    `
    addOptions(items, $form)
    $interface.append($form)
    addButtonListener($form)
}

function addOptions(items, $form) {
    items.map(item => {
        const $option = document.createElement("option")
        $option.value = item.name
        $option.textContent = `${item.name}`
        $form.querySelector("select").append($option)
    })
}

function addButtonListener($form) {
    $form.addEventListener("submit", (event) => {
        let formData = new FormData(event.target)
        for (const obj of formData) { console.log(obj) }
        saveItem(formData)
    })
}
