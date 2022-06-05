const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())

const outlander = {
    'james fraser': {
        'name': 'James Fraser',
        'birthDate': 'May 1, 1721',
        'birthPlace': 'Lallybroch, Scotland',
        'features' : {
            'height': "6'4",
            'eyeColor': 'dark blue',
            'hairColor': 'red'
        },
        'occupation': ['soldier', 'laird', "Propietor of Fraser's Ridge", 'Printer'],
        'image': 'https://static.wikia.nocookie.net/outlander/images/d/d9/S5-Jamie.jpg/revision/latest/scale-to-width-down/328?cb=20200222025214'

    },
    'claire fraser': {
        'name': 'Claire Fraser',
        'birthDate': 'October 20, 1918',
        'birthPlace': 'London, England',
        'features' : {
            'height': "5'6",
            'eyeColor': 'light brown/gold',
            'hairColor': 'curly light brown'
        },
        'occupation': 'Physician',
        'image': 'https://static.wikia.nocookie.net/outlander/images/6/68/S06E03-still15.jpg/revision/latest/scale-to-width-down/333?cb=20220320171422'
    },
    'brianna macKenzie': {
        'name': 'Brianna MacKenzie',
        'birthDate': 'November 23, 1948',
        'birthPlace': 'Boston, Massachusetts, USA',
        'features' : {
            'height': "6'0",
            'eyeColor': 'dark blue',
            'hairColor': 'red'
        },
        'occupation': ['Engineer', 'Plant Inspector for North of Scotland'],
        'image': 'https://static.wikia.nocookie.net/outlander/images/8/85/S5-Brianna.jpg/revision/latest/scale-to-width-down/1000?cb=20200222014639'
    }  
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/api/:outlander' , (req, res) => {
    const outlanderReq = req.params.outlander.toLowerCase()
    if(outlander[outlanderReq]){
        res.json(outlander[outlanderReq])
    }else{
        res.json(outlander['Landed in the wrong century'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log('Server is running.')
})