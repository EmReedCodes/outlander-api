const express = require('express')
const app = express()
const cors = require('cors')
//const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

app.use(cors())
app.use(express.json())

// const outlander = {
//     'james fraser': {
//         'name': 'James Fraser',
//         'birthDate': 'May 1, 1721',
//         'birthPlace': 'Lallybroch, Scotland',
//         'features' : {
//             'height': "6'4",
//             'eyeColor': 'dark blue',
//             'hairColor': 'red'
//         },
//         'occupation': ['Soldier', 'Laird', "Propietor of Fraser's Ridge", 'Printer'],
//         'quote': "For if you feel for me as I do for you–then I am asking you to tear out your heart and live without it.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/d/d9/S5-Jamie.jpg'

//     },
//     'claire fraser': {
//         'name': 'Claire Fraser',
//         'birthDate': 'October 20, 1918',
//         'birthPlace': 'London, England',
//         'features' : {
//             'height': "5'6",
//             'eyeColor': 'light brown/gold',
//             'hairColor': 'curly light brown'
//         },
//         'occupation': ['Physician'],
//         'quote':  "All right you bloody Scottish bastard, let’s see how stubborn you really are.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/6/68/S06E03-still15.jpg'
//     },
//     'brianna mackenzie': {
//         'name': 'Brianna MacKenzie',
//         'birthDate': 'November 23, 1948',
//         'birthPlace': 'Boston, Massachusetts, USA',
//         'features' : {
//             'height': "6'0",
//             'eyeColor': 'dark blue',
//             'hairColor': 'red'
//         },
//         'occupation': ['Engineer', 'Plant Inspector for North of Scotland'],
//         'quote' : "I've seen a marriage made from obligation and one made for love. If I hadn't seen both, I could have lived with obligation. But I have seen both... and I won't.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/8/85/S5-Brianna.jpg'
//     },
//     'jonathon randall': {
//         'name': 'Jonathon Randall',
//         'birthDate': 'September 3, 1705',
//         'birthPlace': 'unknown',
//         'features' : {
//             'height': "5'10",
//             'eyeColor': 'hazel',
//             'hairColor': 'dark brown'
//         },
//         'occupation': ["Captain of His Majesty's Eighth Dragoons"],
//         'quote' : "I dwell in darkness, Madam, and darkness is where I belong.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/a/a8/BJR-Season2.jpg'
//     },
//     'frank randall': {
//         'name': 'Frank Randall',
//         'birthDate': '1906',
//         'birthPlace': 'unknown',
//         'features' : {
//             'height': "5'10",
//             'eyeColor': 'hazel',
//             'hairColor': 'dark brown'
//         },
//         'occupation': ['Historian', 'Officer in the British Army'],
//         'quote' : "I love you, Claire. Unconditionally. No matter what.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/a/ad/3_Frank_648x1080.jpg'
//     },
//     'john grey': {
//         'name': 'John Grey',
//         'birthDate': 'June 14, 1729',
//         'birthPlace': 'unknown',
//         'features' : {
//             'height': "5'6",
//             'eyeColor': 'light blue',
//             'hairColor': 'blond'
//         },
//         'occupation': ['Soldier', 'Diplomat', 'Governor'],
//         'quote' : "Do you know what is is to love someone, and never--Never!--Be able to give them peace, or joy, or happiness?",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/a/a7/S5-Lord-John.jpg'
//     },
//     'roger mackenzie': {
//         'name': 'Roger Jerimiah Wakefield MacKenzie',
//         'birthDate': '1940 or 1941',
//         'birthPlace': 'unknown',
//         'features' : {
//             'height': "6'3",
//             'eyeColor': 'green',
//             'hairColor': 'black'
//         },
//         'occupation': ['Historian', 'Minister'],
//         'quote' : "Brianna, I love you all, or not at all.",
//         'image': 'https://static.wikia.nocookie.net/outlander/images/e/e9/Roger-S6.jpg'
//     },     
// }

let dbConnectionStr = process.env.DB_STRING

//{useUnifiedTopology: true, useNewUrlParser: true}
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to Database`)
        let db = client.db('outlander')  //might just be outlander
        const infoCollection = db.collection('outlander-info') 
    



    app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:outlanderName' , (req, res) => {
    const outlanderReq = req.params.outlanderName
    infoCollection.find({name: outlanderReq}).toArray()
    .then(results => {
        console.log(results) 
        res.json(results[0])//we will need to respond so our API can use it (with json)
    })
    .catch(error => console.log(error))
    // if(outlander[outlanderReq]){ //need to look in db instead
    //     res.json(outlander[outlanderReq])
    // }else{
    //     res.json(outlander['Landed in the wrong century'])
    // }
    })

})
.catch(error => console.log(error))

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running.')
})