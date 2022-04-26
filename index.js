const items = [
    { name: "+5 Dexterity Vest", attributes: { sell_in: "10", quality: "20" }, },
    { name: "Aged Brie", attributes: { sell_in: "2", quality: "0" }, },
    { name: "Elixir of the Mongoose", attributes: { sell_in: "5", quality: "7" }, },
    { name: "Sulfuras, Hand of Ragnaros", attributes: { sell_in: "0", quality: "80" }, },
    { name: "Backstage passes tp a TAFKAL80ETC concert", attributes: { sell_in: "15", quality: "20" }, },
    { name: "Conjured Mana Cake", attributes: { sell_in: "3", quality: "6" }, },
]







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
addInterface()

function addItem() {
    const $tBody = document.querySelector("tbody")

    const $tRow = document.createElement("tr")
    $tRow.innerHTML = `
        <tr>
            <td>Item Name</td>
            <td>Item Sell In</td>
            <td>Item Quality</td>
        </tr>
    `
    $tBody.append($tRow)
}

function addInterface() {
    const $interface = document.querySelector("#interface")
    const $form = document.createElement("form")
    $form.innerHTML = `
            <label for="item">Select Item</label>
            <select name="item">
                <option value="">+5 Dexterity Vest</option>
                <option value="">Aged Brie</option>
                <option value="">Elixir of the Mongoose</option>
                <option value="">Sulfuras, Hand of Ragnaros</option>
                <option value="">Backstage passes to a TAFKAL80ETC concert</option>
                <option value="">Conjured Mana Cake</option>
                <option value="">+5 Dexterity Vest</option>
            </select>
            <input type="submit" value="Add Item">
    `
    $interface.append($form)
}
