const $main = document.querySelector("main")
const $app = document.querySelector("#app")
$app.innerHTML = `
                <table>
                <thead>
                    <tr>
                        <th colspan="3">Store Inventory Manager</th>
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
