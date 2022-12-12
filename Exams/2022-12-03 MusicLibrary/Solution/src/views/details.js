import { deleteById, getById } from "../api/data.js"
import { addLike, getAllLikesCount, getUserLikesCount } from "../api/like.js"
import { html, nothing } from "../lib.js"


const DetailsTemplate = (post, isLoggedUser, isOwner, onDelete, likesCount, onLike, hasLiked) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${post.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${post.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${post.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${post.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${post.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${post.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likesCount}</span></div>

        ${isLoggedUser ? html`
            <div id="action-buttons">
            ${isOwner ? html`
                <a href="/edit/${post._id}" id="edit-btn">Edit</a>
                <a href="javascript:void(0)" @click=${onDelete} id="delete-btn">Delete</a>
                `
            : nothing}
            ${!isOwner && !hasLiked ? html`
                <a href="javascript:void(0)" @click=${onLike} id="like-btn">Like</a>`
            : nothing}
            </div>`
        : nothing
    }
    </div>
</section>`

export async function showDetails(ctx) {
    const id = ctx.params.id
    const post = await getById(id)

    const isLoggedUser = !!ctx.user
    const isOwner = isLoggedUser && ctx.user._id == post._ownerId

    const likeCount = await getAllLikesCount(id)
    let likeCountCurrentUser = {}

    if (isLoggedUser) {
        likeCountCurrentUser = await getUserLikesCount(id, ctx.user._id)
    }
    const hasLiked = likeCountCurrentUser == 0 ? false : true

    ctx.render(DetailsTemplate(post, isLoggedUser, isOwner, onDelete, likeCount, onLike, hasLiked))

    async function onDelete() {
        await deleteById(id)
        ctx.page.redirect("/catalog")
    }

    async function onLike() {
        await addLike({ id })
        ctx.page.redirect("/details/" + id)
    }
}