const dummy = (blogs) =>{
    if (Array.isArray(blogs) == true){
        return 1
    }
 }

const totalLikes = (blogs) =>{
 return blogs.map(blog => blog.likes).reduce((sum, like)=> sum + like, 0)
}

module.exports = {
    dummy, totalLikes
}