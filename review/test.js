const {
  createDirectory,
  createFilesSequentially,
  deleteAllFiles,
} = require("./problem1.js");
const path = require("path");
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
