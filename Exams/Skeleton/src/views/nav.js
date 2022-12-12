import { logout } from "../api/user.js"
import { html, render, page } from "../lib.js"
import { getUserData } from "../util.js"

// update selector
const nav = document.querySelector("header")

// update template
const NavTemplate = (hasUser) => html`
<nav>
    ${hasUser
        ? html`<a @click=${onLogout} href="javascript:void(0)">Logout</a>`
        : html``
    }
</nav>
`

export function updateNav() {
    const user = getUserData()
    render(NavTemplate(!!user), nav)
}

function onLogout() {
    logout()
    updateNav()
    page.redirect("/") // check if should redirect to Home
}