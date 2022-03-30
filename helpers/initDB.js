// connect database code

//ES 6 syntex type ==module
import mongoose from "mongoose";

function initDB(){
  //if we allready connected with database than it is below logic retun from the code
  if (mongoose.connections[0].readyState) {
    console.log("already connected ");
    return;
  }

// if we not use not upper code we this file uppload in any api related work  it fetch connection every time 
// so we put jack upper side 

  mongoose.connect(process.env.MONGO_URI);

  mongoose.connection.on("connected", () => console.log("connected to mongo"));

  mongoose.connection.on("error", (err) => {
    console.log("Error connecting", err);
  });
};

export default initDB;
