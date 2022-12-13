import { get, post } from "./api.js"

export async function getAllBoughtCount(productId) {
    return get(`/data/bought?where=itemId%3D%22${productId}%22&distinct=_ownerId&count`)
}

export async function buyItem(productId) {
    return post("/data/bought", productId)
}

export async function getUserBoughtCount(productId, userId) {
    return get(`/data/bought?where=itemId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}