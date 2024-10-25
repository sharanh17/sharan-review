// const fs = require("fs");
// const path = require("path");

// function createDirectory(dirPath, callback) {
//   fs.mkdir(dirPath, { recursive: true }, (err) => {
//     if (err) {
//       console.log(`Error in creating dir:${err}`);
//     } else {
//       console.log(`Dir created succesfully at :${dirPath}`);
//       callback(dirPath);
//     }
//   });
// }

// function createFilesSequentially(dirPath, fileCount, index = 1, callback) {
//   if (index > fileCount) {
//     callback(dirPath);
//     return;
//   }
//   const filename = `file${index}.json`;

//   const filePath = path.join(dirPath, filename);
//   fs.writeFile(filePath, "fileData", (err) => {
//     if (err) {
//       console.log(`error creating file;${err}`);
//     } else {
//       console.log(`File created :${filename}`);
//       createFilesSequentially(dirPath, fileCount, index + 1, callback);
//     }
//   });
// }

// function deleteAllFiles(dirPath, callback) {
//   fs.readdir(dirPath, (err, files) => {
//     if (err) {
//       console.log(`not able to read dir ${err}`);
//     } else {
//       console.log(`Directory read succesfully`);
//       let deletedFiles = 0;
//       files.forEach((file) => {
//         const filePath = path.join(path.join(dirPath, file));
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.error(`error deleting files ${err}`);
//           } else {
//             console.log(`${file} deleted succesfully`);
//             deletedFiles++;

//             if (deletedFiles === files.length) {
//               callback();
//             }
//           }
//         });
//       });
//     }
//   });
// }

// function createDirectoryAddFiles(directooryName) {
//   const newPath = path.join(__dirname, directooryName);
//   fs.mkdir(newPath, (err) => {
//     if (err) {
//       console.error("Directory already created ");
//     }
//   });

//   for (let i = 0; i < 10; i++) {
//     const file = `file${i}.json`;
//     const pathFile = path.join(newPath, file);
//     const data = { filename: file };
//     fs.writeFile(pathFile, JSON.stringify(data), (err) => {
//       if (err) {
//         console.log(`Error while creating and writing file`);
//       }
//       console.log(`file created ${file} succesfully`);
//     });
//   }
// }

// function deleteFilesSimultaneously(directory) {
//   const pathDir = path.join(__dirname, directory);
//   fs.readdir(pathDir, (err, files) => {
//     if (err) {
//       throw new Error(err);
//     } else {
//       files.forEach((file) => {
//         console.log(file);
//         const filePath = path.join(pathDir, file);
//         fs.unlink(filePath, (err) => {
//           if (err) {
//             console.log("error in deleting");
//             return;
//           }
//           console.log("File" + filePath + "deleted succesfully");
//         });
//       });
//     }
//   });
// }

// const dirPath = path.join(__dirname, "jsonFolder");
// let numberOfFiles = 3;

// createDirectory(dirPath, () => {
//   createFilesSequentially(dirPath, numberOfFiles, 1, () => {
//     console.log("All files created successfully.");

//     deleteAllFiles(dirPath, () => {
//       console.log("All files deleted successfully.");
//     });
//   });
// });
// createDirectoryAddFiles("./Json");
// deleteFilesSimultaneously("./Json");
// function createDirectory(dirPath) {
//   return new Promise((resolve, reject) => {
//     fs.mkdir(dirPath, { recursive: true }, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         console.log("Directory created successfully");
//         resolve();
//       }
//     });
//   });
// }

// function createFilesSequentially(dirPath, numberOfFiles) {
//   let createFilePromise = Promise.resolve();
//   for (let index = 1; index <= numberOfFiles; index++) {
//     createFilePromise = createFilePromise.then(() => {
//       const fileName = `file${index}.json`;
//       const filePath = path.join(dirPath, fileName);
//       return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, "file data", (err) => {
//           if (err) {
//             reject(err);
//           } else {
//             console.log(`${fileName} created successfully`);
//             resolve();
//           }
//         });
//       });
//     });
//   }
//   return createFilePromise.then(() => {
//     console.log("All files created sequentially");
//   });
// }

// function deleteFilesSequentially(dirPath) {
//   return new Promise((resolve, reject) => {
//     fs.readdir(dirPath, (err, files) => {
//       if (err) {
//         reject(err);
//         return;
//       }

//       if (files.length === 0) {
//         console.log("No files to delete");
//         resolve();
//         return;
//       }

//       let deleteFilePromise = Promise.resolve();

//       files.forEach((file) => {
//         deleteFilePromise = deleteFilePromise.then(() => {
//           return new Promise((resolve, reject) => {
//             const filePath = path.join(dirPath, file);
//             fs.unlink(filePath, (err) => {
//               if (err) {
//                 reject(err);
//               } else {
//                 console.log(`${file} deleted successfully`);
//                 resolve();
//               }
//             });
//           });
//         });
//       });

//       deleteFilePromise
//         .then(() => {
//           console.log("All files deleted sequentially");
//           resolve();
//         })c
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   });
// }

// createDirectory("./promiseCreateDir")
//   .then(() => createFilesSequentially("./promiseCreateDir", 3))
//   .then(() => deleteFilesSequentially("./promiseCreateDir"))
//   .catch((err) => console.error(err));
// const fs = require("fs").promises; // Use the promises version of fs
// const path = require("path");

// async function createDirectory(dirPath, numberOfFiles) {
//   try {
//     await fs.mkdir(dirPath, { recursive: true });
//     for (let i = 1; i <= numberOfFiles; i++) {
//       const fileName = `file${i}.json`;
//       const filePath = path.join(dirPath, fileName);
//       await fs.writeFile(filePath, "File Data");
//       console.log(`Created ${fileName}`);
//     }
//   } catch (err) {
//     console.error(`Error creating files:`, err);
//   }
// }


// async function deleteFiles(dirPath) {
//   try {
//     const files = await fs.readdir(dirPath);
//     for (const file of files) {
//       const filePath = path.join(dirPath, file);
//       await fs.unlink(filePath);
//       console.log(`Deleted ${file}`);
//     }
//     console.log(`All files deleted successfully.`);
//   } catch (err) {
//     console.log("Error deleting files", err);
//   }
// }

// const dirPath = path.join(__dirname, "asyncAwaitDir");
// const numberOfFiles = 5;

// async function testFileOperations() {
//   try {
//     await createDirectory(dirPath, numberOfFiles);
//     console.log("Directory and files created.");

//     await deleteFiles(dirPath);
//   } catch (error) {
//     console.error("An error occurred during the file operations:", error);
//   }
// }

// testFileOperations();
