import { logout } from "../api/user.js"
import { html, render, page } from "../lib.js"
import { getUserData } from "../util.js"

const nav = document.querySelector("header")

const NavTemplate = (hasUser) => html`
<a id="logo" href="/"><img id="logo-img" src="./images/logo.png" alt="" /></a>
<nav>
    <div>
        <a href="/catalog">Products</a>
    </div>

    ${!hasUser ? GuestNav() : LoggedNav()}
</nav>
`

const LoggedNav = () => html`
<div class="user">
    <a href="/create">Add Product</a>
    <a href="javascript:void(0)" @click=${onLogout}>Logout</a>
</div>
`

const GuestNav = () => html`
<div class="guest">
    <a href="/login">Login</a>
    <a href="/register">Register</a>
</div>
`

export function updateNav() {
    const user = getUserData()
    render(NavTemplate(user), nav)
}

function onLogout() {
    logout()
    updateNav()
    page.redirect("/catalog")
}