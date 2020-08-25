const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      "title": "My test blog",
      "author": "Chih Wei Hsu",
      "url": "www.bloguriltest.com",
      "likes": 20,
    },
    {
      "title": "My 2nd test blog",
      "author": "Chih Wei Hsu",
      "url": "www.bloguril2test.com",
      "likes": 30,
    },
]

beforeEach(async ()=>{
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('all blogs are returned', async ()=>{
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('blogs are returned as json', async ()=>{
  await api
  .get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)  
})

afterAll(()=>{
    mongoose.connection.close()
})