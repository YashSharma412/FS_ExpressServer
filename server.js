const express = require("express");
const app = express();
const fs = require("fs");
const fileUpload = require("express-fileupload");
const path = require("path");

// ! MiddleWares =>
app.use(express.json());
app.use(fileUpload()); // it will move the file uploaded object to req.files


app.listen(8000, () => {
  console.log("server running on port 8000");
});

app.get("/", (req, res) => {
  res.send("root api route");
});


// ? Similar working code from gpt
app.get("/uploadForm", (req, res) => {
    fs.readFile(__dirname + '/form.html', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading file');
        return;
      }
  
      res.send(data);
    });
  });
  
// ? My Failed Try
// app.get("/uploadForm", (req, res)=>{
//     try{
//         fs.readFile("form.html", (err, data)=>{
//             if(err) throw err;
//             return res.send(data)
//         })
//     } catch(err){
//         res.status(500).json("error in reading form.html file")
//     }

// })

app.post("/uploadData", (req, res)=>{
    console.log("response files: ", req.files);
    console.log("response body: ", req.body);
    const {myFile} = req.files;
    myFile.mv(__dirname + "/assets/uploads/" + myFile.name)
    res.status(200).json("Succesfully uploaded file");
})

// ! Using read stream method
app.get("/readForm", (req, res)=>{
    const filePath = path.join(__dirname , "form.html");
    const readStream = fs.createReadStream(filePath);

    readStream.on("error", (err)=>{
        console.log("error: ", err);
        res.status(500).json("error in reading form.html file")
    })

    readStream.pipe(res); // More efficent then readStream.on("data", (chunk)=>{})
    // readStream.on('data', (chunk) => {
    //     res.write(chunk);
    //   });
    
    //   readStream.on('end', () => {
    //     res.end();
    //   });
})
