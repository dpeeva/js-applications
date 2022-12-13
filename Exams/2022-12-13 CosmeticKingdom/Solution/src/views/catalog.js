import { getAll } from "../api/data.js"
import { html } from "../lib.js"


const CatalogTemplate = (items) => html`
<h2>Products</h2>
<section id="dashboard">
    ${!items || items.length == 0
        ? html`<h2>No products yet.</h2>`
        : items.map(ItemTemplate)
    }
</section>
`


const ItemTemplate = (item) => html`
<div class="product">
    <img src=${item.imageUrl} alt="example1" />
    <p class="title">${item.name}</p>
    <p><strong>Price:</strong><span class="price">${item.price}</span>$</p>
    <a class="details-btn" href="/catalog/${item._id}">Details</a>
  </div>
`

export async function showCatalog(ctx) {
    const posts = await getAll()
    ctx.render(CatalogTemplate(posts))
}