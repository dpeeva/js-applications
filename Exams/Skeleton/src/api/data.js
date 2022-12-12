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

const editPostUrl = "" // update url
export async function editPost(id, postData) {
    return put(editPostUrl + id, postData)
}

const deletePostUrl = "" // update url
export async function deleteById(id) {
    return del(deletePostUrl + id)
}