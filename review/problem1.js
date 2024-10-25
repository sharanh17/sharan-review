const fs = require("fs");
const path = require("path");

function createDirectory(dirPath, callback) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error in creating Directory : ${err}`);
    } else {
      console.log(`Directory is created successfully at: ${dirPath}`);
      callback(dirPath);
    }
  });
}

function createFilesSequentially(dirPath, fileCount, index = 1, callback) {
  if (index > fileCount) {
    callback(dirPath);
    return;
  }

  const filename = `file${index}.json`;
  const filePath = path.join(dirPath, filename);
  fs.writeFile(filePath, "FileData", (err) => {
    if (err) {
      console.log(`Error in creating file: ${err}`);
    } else {
      console.log(`${filename} is created successfully`);
      createFilesSequentially(dirPath, fileCount, index + 1, callback);
    }
  });
}

function deleteAllFiles(dirPath, callback) {
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
    } else {
      console.log("Directory read successfully");

      let deletedFiles = 0;

      files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${file} - ${err}`);
          } else {
            console.log(`${file} deleted successfully`);
            deletedFiles++;

            if (deletedFiles === files.length) {
              callback();
            }
          }
        });
      });
    }
  });
}

module.exports = { createDirectory, createFilesSequentially, deleteAllFiles };
