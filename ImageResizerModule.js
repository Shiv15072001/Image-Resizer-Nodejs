const Jimp = require('jimp');


const imga = async (fileimg, width, height, imt, qltY) => {
    try {
        let a = await Jimp.read(`${fileimg}`)
        const d = Date.now()
        const fileName = `${d}resizer`;
        a.resize(width, height)
        a.quality(qltY)
        a.normalize()

        await a.write(`public/${fileName}.${imt}`)
        return fileName
    } catch (error) {
        console.log(error)
    }
}



module.exports = { imga }

// console.log(a());



