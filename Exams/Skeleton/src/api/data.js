import { del, get, post, put } from "./api.js"

// Create Application Service

const getAllUrl = ""
export async function getAll() {
    return get(getAllUrl)
}

const baseUrl = ""

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