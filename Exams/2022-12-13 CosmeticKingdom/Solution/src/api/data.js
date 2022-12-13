import { del, get, post, put } from "./api.js"

export async function getAll() {
    return get("/data/products?sortBy=_createdOn%20desc")
}

const baseUrl = "/data/products/"

export async function getById(id) {
    return get(baseUrl + id)
}

export async function addItem(data) {
    return post(baseUrl, data)
}

export async function updateById(id, data) {
    return put(baseUrl + id, data)
}

export async function deleteById(id) {
    return del(baseUrl + id)
}