
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addBook= async (req, res) => {
    const { book_name, author, category ,book_owner} = req.body;
  
    try {
      const newBook = await prisma.book.create({
        data: {
          book_name,
          author,
          category,
          status: 'Pending', 
          book_owner
        },
      });
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create book', details: error.message });
    }
  }

  exports.searchBooks = async (req, res) => {
    const { query } = req.query; 
  
    try {
      const books = await prisma.book.findMany({
        where: {
          OR: [
            { book_name: { contains: query, mode: 'insensitive' } },
            { author: { contains: query, mode: 'insensitive' } }
          ]
        }
      });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: 'Failed to search books', details: error.message });
    }
  };

  exports.getAllBooks=async(req,res)=>{
    try {
      const books=await prisma.book.findMany()
      res.status(200).send(books)
      
    } catch (error) {
      res.status(500).send("This Error is Occured",error)
    }
  }

  exports.deleteBooks=async(req,res)=>{
    const { id } = req.params;

    try {
      const book = await prisma.book.findUnique({ where: { id: Number(id) } }); 
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await prisma.book.delete({ where: { id: Number(id) } }); 
  
      res.status(200).json({ message: 'Book successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while deleting the book' });
    }
  }
  

 

  