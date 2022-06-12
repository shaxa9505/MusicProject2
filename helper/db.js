module.exports = () => {
    const mongoose = require("mongoose");
    mongoose.connect('mongodb+srv://movies:dnU8HBFAi0kSEEec@newcluster.duasx.mongodb.net/test');
    const db = mongoose.connection;
    db.on("open", () => console.log("MongoDbga olayn ulandik Super !!!!!"))
    db.on("error", (err) => console.log("Bizda Qayerdadir xatolik bor", err))
}