const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res)=>{
   const blogs = await Blog.find({})
   res.json(blogs.map(blog=>blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        blog
        ?res.json(blog)
        :res.status(404).end()
        
  })
  
  blogsRouter.post('/', async (req, res) => {
    const body = req.body
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
  
    const savedBlog = await blog.save()
        res.json(savedBlog.toJSON)
  })
  
  blogsRouter.delete('/:id', async (req, res) => {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  })
  
  blogsRouter.put('/:id', async (req, res)=>{
    const body = req.body

    const updatedBlog = {
      likes: body.likes
    }
    await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    res.status(200).end()
  })

  module.exports = blogsRouter
  