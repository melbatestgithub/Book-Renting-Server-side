const router = require('express').Router();
const bookController = require("../controller/Book");
const multer = require('multer');

const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
const prisma = new PrismaClient(); 
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/addBook", bookController.addBook);
router.get("/search", bookController.searchBooks);
router.get("/getAllBook", bookController.getAllBooks);


router.post('/uploadBook', upload.single('bookCover'), async (req, res) => {
  const { book_name, author, category, book_number, quantity, book_price,book_owner, } = req.body;

  // Handle file upload
  const bookCover = req.file ? req.file.path : null;

  try {
    // Ensure required fields are provided
    if (!book_name || !author || !category || !book_number || !quantity || !book_price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create new book entry
    const newBook = await prisma.uploadedBook.create({
      data: {
        book_name,
        author,
        category,
        book_owner,
        book_number: parseInt(book_number, 10), // Ensure book_number is an integer
        quantity: parseInt(quantity, 10),
        book_price,
        book_cover: bookCover ? Buffer.from(bookCover) : null, // Adjust according to your needs
      },
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error uploading book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Add route for uploading book cover


module.exports = router;
