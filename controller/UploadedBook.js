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
    const updatedBook = await prisma.book.update({
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
   
};

exports.getAllUploadedBook=async(req,res)=>{
    try {
        const uploadedBook=await prisma.uploadedBook.findMany()
        res.status(200).send(uploadedBook)
    } catch (error) {
        res.status(500).send("Error is Occured",Error)
    }
}
