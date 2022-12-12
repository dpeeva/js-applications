import { getById, updateById } from "../api/data.js"
import { html } from "../lib.js"
import { createSubmitHandler } from "../util.js"

const EditTemplate = (post, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${onEdit}>
        <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value=${post.singer} />
        <input type="text" name="album" id="album-album" placeholder="Album" value=${post.album} />
        <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value=${post.imageUrl} />
        <input type="text" name="release" id="album-release" placeholder="Release date" value=${post.release} />
        <input type="text" name="label" id="album-label" placeholder="Label" value=${post.label} />
        <input type="text" name="sales" id="album-sales" placeholder="Sales" value=${post.sales} />

        <button type="submit">post</button>
        </form>
    </div>
</section>`

export async function showEdit(ctx) {
    const id = ctx.params.id
    const post = await getById(id)

    ctx.render(EditTemplate(post, createSubmitHandler(onEdit)))

    async function onEdit({ singer, album, imageUrl, release, label, sales }) {
        if ([singer, album, imageUrl, release, label, sales].some(x => x == "")) {
            return alert("All fields are rquired!")
        }

        await updateById(id, { singer, album, imageUrl, release, label, sales })
        ctx.page.redirect("/details/" + id)
    }
}