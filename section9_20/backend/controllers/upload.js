const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");
const path = require("path");
const fs = require("fs");

const uploadFile = async (req, res) => {
  const { type, id } = req.params;
  const validTypes = ["hospitals", "doctors", "users"];
  //Valid if the user of the request can edit this user
  // if (req.uid !== id) {
  //   return res.status(401).json({
  //     ok: true,
  //     msg: 'Not allowed'
  //   });
  // }
  // Valid Types
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid type",
    });
  }
  //validate if the file exist
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ ok: false, msg: "No files were uploaded." });
  }
  let { file } = req.files;
  try {
    const nameSplited = file.name.split(".");
    const fileExt = nameSplited[nameSplited.length - 1];

    //validate Extensions
    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if (!validExtensions.includes(fileExt)) {
      return res.status(400).json({
        ok: false,
        msg: "Invalid extension",
      });
    }
    // Generate filename
    const filename = uuidv4() + "." + fileExt;
    const path = `./uploads/${type}/${filename}`;
    file.mv(path, async function (err) {
      if (err) {
        console.log(err);
        res.status(500).json({ ok: false, msg: "Error uploading the file." });
      }

      // Update database
      const ok = await updateImage(type, id, filename);
      if (ok) {
        return res.send({
          ok,
          msg: "File uploaded, Sucessfully.",
          filename,
        });
      } else {
        return res.status(404).send({
          ok,
          msg: "Failed upload",
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error",
    });
  }
};
const getImg = (req, res) => {
  const { type, img } = req.params;
  const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);
  if (fs.existsSync(pathImg)) {
    return res.sendFile(pathImg);
  } else {
    const pathImageNoFound = path.join(__dirname, `../uploads/no-image.png`);
    return res.sendFile(pathImageNoFound);
  }
};

module.exports = {
  uploadFile,
  getImg,
};
