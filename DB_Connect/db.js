const mongoos = require('mongoose');
const Connection = async()=>{
     try {
       await mongoos.connect('mongodb+srv://arvind_maurya:arvind_194@cluster0.qxv1nzm.mongodb.net/?retryWrites=true&w=majority');
       console.log('database connected');
     } catch (error) {
         console.log(error)
     }
}
module.exports = {
    Connection
}