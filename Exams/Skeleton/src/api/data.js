import { del, get, post, put } from "./api.js"

// Create Application Service

const getAllUrl = ""
export async function getAll() {
    return get(getAllUrl)
}

const getByIdUrl = "" // update url
export async function getById(id) {
    return get(getByIdUrl + id)
}

const createPostUrl = "" // update url
export async function createPost(postData) {
    return post(createPostUrl + postData)
}