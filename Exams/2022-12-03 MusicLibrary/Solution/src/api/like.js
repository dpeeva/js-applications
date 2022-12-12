import { get, post } from "./api.js"

export async function getAllLikesCount(id) {
    return get(`/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`)
}

export async function addLike(id) {
    return post("/data/likes", id)
}

export async function getUserLikesCount(albumId, userId) {
    return get(`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}