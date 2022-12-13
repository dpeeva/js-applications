import { getById, updateById } from "../api/data.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"

const EditTemplate = (item, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="name" id="name" placeholder="Product Name" .value=${item.name} />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${item.imageUrl} />
            <input type="text" name="category" id="product-category" placeholder="Category" .value=${item.category} />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50">${item.description}</textarea>
            <input type="text" name="price" id="product-price" placeholder="Price" .value=${item.price} />
            <button type="submit">post</button>
        </form>
    </div>
</section>
`

export async function showEdit(ctx) {
    const id = ctx.params.id
    const item = await getById(id)

    ctx.render(EditTemplate(item, createSubmitHandler(onEdit)))

    async function onEdit({ name, imageUrl, category, description, price }) {
        if ([name, imageUrl, category, description, price].some(x => x == "")) {
            return alert("All fields are rquired!")
        }

        await updateById(id, { name, imageUrl, category, description, price })
        ctx.page.redirect("/catalog/" + id)
    }
}