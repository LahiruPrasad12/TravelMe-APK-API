const ServicesItem = require('../Models/Services');
const DB = require('../dbConfig')

const services = [
    {
        name:'Intercity Express',
        origin:'colombo',
        destination:'candy',
        start_time:'10:00:00',
        arrival_time:'12:00:00',
        price:1000,
        bus_num:'ABC-1234',
        contact_num:1234567890,
        type:'AC'
    },
    {
        name:'Highway Express',
        origin:'matara',
        destination:'galle',
        start_time:'02:00:00',
        arrival_time:'04:00:00',
        price:800,
        bus_num:'BBC-1684',
        contact_num:1234567890,
        type:'NON/AC'
    },
    {
        name:'Staffan Express',
        origin:'jaffna',
        destination:'colombo',
        start_time:'10:00:00',
        arrival_time:'15:00:00',
        price:2000,
        bus_num:'NMA-1234',
        contact_num:1234567890,
        type:'AC'
    },
    {
        name:'Newcomb Express',
        origin:'negombo',
        destination:'embilipitiya',
        start_time:'10:00:00',
        arrival_time:'17:00:00',
        price:3000,
        bus_num:'ABC-1234',
        contact_num:1234567890,
        type:'AC'
    }
]

const saveItem = async()=>{
    try{
        await User.findOne({account_type: 'admin'})
        for (const x of services) {
            console.log(x)
           await ServicesItem.create(x)
        }
    }catch (e){

    }
    // closeDatabase()
}

const saveData =async ()=>{
    await saveItem();
    await closeDatabase();
}

const closeDatabase = async() => {
    DB.disconnect().then(() => {
        console.log('database connection close')
    })
}

saveData()

