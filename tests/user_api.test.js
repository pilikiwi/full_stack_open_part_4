const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
    {
        'username':'testUser01',
        'name':'iAmTest',
        'password':'wwadadda123com',
    },
    {
        'username':'testUser02',
        'name':'iAmAlsoTest',
        'password':'wwaa123com',
    }
]

beforeEach(async ()=>{
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(initialUsers[0])
    
    await api
        .post('/api/users')
        .send(initialUsers[1])
})

test('all users are returned', async ()=>{
    const response = await api.get('/api/users')

    expect(response.body.length).toBe(initialUsers.length)
})



test('duplicated username not saved', async ()=>{
    const duplicateUser = {
        'username':'testUser01',
        'name':'iAmNotChecked',
        "password":"iAmNotChecked",
}
    const response = await api
        .post('/api/users')
        .send(duplicateUser)
        .expect(400)

    expect(response.body.error).toContain('`username` to be unique')
})

test('malformated username not saved', async ()=>{
    const malnamedUser = {
        'username':'01',
        'name':'iAmNotChecked',
        "password":"iAmNotChecked",
}
    const response = await api
        .post('/api/users')
        .send(malnamedUser)
        .expect(400)

    expect(response.body.error).toContain('shorter than the minimum allowed lengt')
})


afterAll(()=>{
    mongoose.connection.close()
})