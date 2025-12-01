let z =require("zod");

let usersignup = z.object({
    username :z.string(),
    password :z.string()
})

let gamecreate = z.object({
    name:z.string(),
})


module.exports={
    usersignup,
    gamecreate
}