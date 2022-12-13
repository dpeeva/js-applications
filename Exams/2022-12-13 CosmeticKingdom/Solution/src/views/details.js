import { deleteById, getById } from "../api/data.js"
import { buyItem, getAllBoughtCount, getUserBoughtCount } from "../api/buy.js"
import { html, nothing } from "../lib.js"


const DetailsTemplate = (item, hasUser, isOwner, onDelete, boughtCount, onBuy, hasBought) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${item.imageUrl} alt="example1" />
        <p id="details-title">${item.name}</p>
        <p id="details-category">
            Category: <span id="categories">${item.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${item.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${boughtCount}</span> times.</h4>
                <span>${item.description}</span>
            </div>
        </div>

        ${hasUser ? html`
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
            ${isOwner ? html`
            <a href="/edit/${item._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}>Delete</a>
            `: hasBought ? html`
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="javascript:void(0)" @click=${onBuy} id="buy-btn">Buy</a>
            `: nothing}
        </div>`
        : nothing}

    </div>
</section>
`

export async function showDetails(ctx) {
    const id = ctx.params.id
    const post = await getById(id)

    const isLoggedUser = !!ctx.user
    const isOwner = isLoggedUser && ctx.user._id == post._ownerId

    const boughtCount = await getAllBoughtCount(id)
    let boughtCountCurrentUser = {}

    if (isLoggedUser) {
        boughtCountCurrentUser = await getUserBoughtCount(id, ctx.user._id)
    }
    const hasBought = boughtCountCurrentUser == 0 ? false : true

    ctx.render(DetailsTemplate(post, isLoggedUser, isOwner, onDelete, boughtCount, onBuy, hasBought))

    async function onDelete() {
        const isConfirmed = confirm("Are you sure you want to delete this item?")

        if (isConfirmed) {
            await deleteById(id)
            ctx.page.redirect("/catalog")
        }
    }

    async function onBuy() {
        // hasBought = true
        // boughtCount += 1
        await buyItem({ id })
        ctx.page.redirect("/catalog/" + id)
    }
}