const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const defineAbilitiesFor  = require('../middleware/ability'); // Adjust the path as necessary

exports.getOwnerUploadedBook = async (req, res) => {
    const { bookOwner } = req.query;
    try {
        const uploadedBook = await prisma.uploadedBook.findMany({
            where: {
                book_owner: bookOwner
            }
        });
        res.status(200).send(uploadedBook);
    } catch (error) {
        res.status(500).send("Error occurred", error);
    }
};

// Update an uploaded book
exports.UpdateUploadedBook = async (req, res) => {
    const { id } = req.params;
    const { book_name, status, book_price, book_number } = req.body;
  
    try {
      const updatedBook = await prisma.uploadedBook.update({
        where: { id: parseInt(id) },
        data: {
          book_name,
          status,
          book_price,
          book_number,
        },
      });
  
      res.status(200).json(updatedBook);
    } catch (error) {
      if (error.code === 'P2025') { // Prisma specific error code for record not found
        return res.status(404).json({ message: 'Book not found' });
      }
      console.error("Update error:", error);
      res.status(500).json({ message: 'An error occurred while updating the book' });
    }

    
};


exports.DeleteUploadedBook = async (req, res) => {
   
};

exports.getAllUploadedBook=async(req,res)=>{
    try {
        const uploadedBook=await prisma.uploadedBook.findMany()
        res.status(200).send(uploadedBook)
    } catch (error) {
        res.status(500).send("Error is Occured",Error)
    }
}
