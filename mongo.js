const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstackpart3:${password}@cluster0.dvfyddh.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        /// Save a note
        // const note = new Note({
        //   content: 'HTML is Easy',
        //   date: new Date(),
        //   important: true,
        // })
        // return note.save()

        /// Fetch all notes
        Note.find({}).then(result => {
            result.forEach(note => {
                console.log(note)
            })
            mongoose.connection.close()
        })
    })
    .then(() => {
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))

