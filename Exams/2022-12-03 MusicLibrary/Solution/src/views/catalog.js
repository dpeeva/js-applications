import { getAll } from "../api/data.js"
import { html } from "../lib.js"


const CatalogTemplate = (posts) => html`
<section id="dashboard">
    <h2>Albums</h2>
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        ${posts.length == 0
        ? html`<h2>There are no albums added yet.</h2>`
        : posts.map(PostTemplate)}
    </ul>
</section>`

const PostTemplate = (post) => html`
<li class="card">
    <img src=${post.imageUrl} alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${post.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${post.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${post.sales}</span></p>
    <a class="details-btn" href="/details/${post._id}">Details</a>
</li>`

export async function showCatalog(ctx) {
    const posts = await getAll()
    ctx.render(CatalogTemplate(posts))
}