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
  const { id } = req.params; // Extract the id from the route parameters
  const { book_name, status, book_price, book_number } = req.body;

  try {
    const updatedBook = await prisma.uploadedBook.update({
      where: { id: parseInt(id) }, // Ensure the id is correctly passed and parsed as an integer
      data: {
        book_name,
        status,
        book_price,
        book_number
      },
    });

    res.status(200).send(updatedBook);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send({ message: "Internal Server Error", error: error.message });
  }
    
};


exports.DeleteUploadedBook = async (req, res) => {
  const { id } = req.params; // Extract the ID from URL parameters

  try {
    // Check if the book exists
    const book = await prisma.uploadedBook.findUnique({ where: { id: Number(id) } }); // Prisma query to find the book
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Delete the book
    await prisma.book.delete({ where: { id: Number(id) } }); // Prisma query to delete the book

    // Respond with success
    res.status(200).json({ message: 'Book successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the book' });
  }
};
exports.getAllUploadedBook=async(req,res)=>{
    try {
        const uploadedBook=await prisma.uploadedBook.findMany()
        res.status(200).send(uploadedBook)
    } catch (error) {
        res.status(500).send("Error is Occured",Error)
    }
}
