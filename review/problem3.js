const fs = require("fs");
const path = require("path");
function createDirectory(dirpath, callback) {
  fs.mkdir(dirpath, { recursive: true }, (err) => {
    if (err) {
      console.log(`error creating directory`);
    } else {
      console.log(`Directory Created `);
      callback(dirpath);
    }
  });
}

function createFilesSequentially(dirpath, fileCount, index = 1, callback) {
  if (index > fileCount) {
    callback(dirpath);
    return;
  }

  const fileName = `file${index}.json`;
  const filePath = path.join(dirpath, fileName);
  fs.writeFile(filePath, "FileData", (err) => {
    if (err) {
      console.log(`Error creating file:${err}`);
    } else {
      console.log(`File Created ${fileName}`);
      createFilesSequentially(dirpath, fileCount, index + 1, callback);
    }
  });
}
function deleteAllFiles(dirPath, callback) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.log(`Error reading files: ${err}`);
    }

    console.log(`Directory read successfully`);

    function deleteFileAtIndex(index) {
      if (index >= files.length) {
        callback();
        return;
      }

      const filePath = path.join(dirPath, files[index]);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(`Error deleting file: ${err}`);
        } else {
          console.log(`${files[index]} deleted successfully`);
          deleteFileAtIndex(index + 1);
        }
      });
    }

    deleteFileAtIndex(0);
  });
}

const dirPath = path.join(__dirname, "jsonFolder");
let numberOfFiles = 3;

createDirectory(dirPath, () => {
  createFilesSequentially(dirPath, numberOfFiles, 1, () => {
    console.log("All files created successfully.");

    deleteAllFiles(dirPath, () => {
      console.log("All files deleted successfully.");
    });
  });
});
