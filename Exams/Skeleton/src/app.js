import { page, render } from "./lib.js"
import { updateNav } from "./views/nav.js"
// import views

// get main element for renderer
const main = document.getElementById("wrapper")

// attach middleware
page(decorateContext)

// create page routing
// page("/", showHome)


updateNav()
page.start()

function decorateContext(ctx, next) {
    ctx.render = renderMain
    ctx.updateNav = updateNav

    const user = getUserData()
    if (user) {
        ctx.user = user
    }

    next()
}

function renderMain(content) {
    render(content, main)
}