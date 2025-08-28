import multer from "multer";   // multer import kar rahe hain (file upload ke liye)

// Storage configuration
const storage = multer.diskStorage({
  // Upload hone ke baad file kaha store hogi
  destination: function (req, file, cb) {
    cb(null, "./public/temp")   // ./public/temp folder me save hogi
  },
  // File ka naam kya hoga
  filename: function (req, file, cb) {
    cb(null, file.originalname)  // original filename se hi save karna hai
  }
})

// Upload middleware create kiya
export const upload = multer({
  storage,   // storage config use ho rahi hai
})
