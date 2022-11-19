const mongoos = require('mongoose')
const BlogSchema = new mongoos.Schema({
    title:String,
    UserId:mongoos.Schema.Types.ObjectId,
    body:String,
    user:Object,
    approved:String
});
const BlogModel = mongoos.model("Blogs",BlogSchema)
module.exports = {
    BlogModel
}