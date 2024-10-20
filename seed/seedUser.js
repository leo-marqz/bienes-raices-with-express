import bcrypt from 'bcrypt';

const users = [
    {
        name: 'Leonel Marquez',
        email: 'leomarqz2020@gmail.com',
        password: bcrypt.hashSync('$ABClm123', 10),
    },
    {
        name: 'Karla Hernandez',
        email: 'karlh@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        confirmed: 1
    },
    {
        name: 'John Doe',
        email: 'johnd@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        confirmed: 1
    }
]

export default users;