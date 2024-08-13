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
    const user = req.user; // Retrieve user from localStorage
    const bookId = parseInt(req.params.bookId);

    // const ability = defineAbilitiesFor(user);

 
        const updatedBookData = {
            book_name: req.body.book_name,
            author: req.body.author,    
            book_price: req.body.book_price,
            book_number: req.body.book_number
        };

        try {
            const updatedBook = await prisma.uploadedBook.update({
                where: { id: bookId },
                data: updatedBookData
            });

            if (updatedBook) {
                res.status(200).send('Book updated successfully');
            } else {
                res.status(404).send('Book not found');
            }
        }
        
        catch (error) {
            res.status(500).send('Error updating the book');
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
