const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const fs = require('fs')
const upload = multer({ dest: "uploads/" });

app.use("/static", express.static("public"));
const { imga } = require("./ImageResizerModule");
const bodyParser = require('body-parser');
// app.use(express.json());
const port = 8000;

// Initialize body-parser middleware with the extended option set to true
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer().none());


console.log(__dirname)

app.get("/", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "/index_resize.html"));
});


//  to get selected value from the user .....



app.post("/resize", upload.single("imgs"), async function (req, res) {
    console.log(req.file);
    // console.log(res.body.selection)
    const x = Number(req.body["resize-x"]);
    const y = Number(req.body['resize-y']);
    const imT = req.body['image-type'];
    const qlty = Number(req.body['quality']);
    console.log(req.file.path)
    const a = path.join(__dirname, req.file.path)
    console.log(a)
    console.log(imT)
    console.log(qlty)
    let fileName = await imga(a, x, y, imT, qlty);
    console.log(fileName)
    res.redirect(`http://localhost:${port}/static/${fileName}.${imT}`);

    // delete the uploaded file
    fs.unlink(path.join(__dirname, req.file.path), () => {
        console.log('Img file is deleted')
    })
});


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

// d