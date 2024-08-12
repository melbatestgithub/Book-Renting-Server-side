const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addCategory = async (req, res) => {
    try {
        const category = await prisma.bookCategory.create({
            data: req.body // Correctly passing data
        });
        res.status(200).send(category);
    } catch (error) {
        res.status(500).send({ message: "Error creating category", error }); // Combined message and error
    }
};

exports.getCategory = async (req, res) => {
    try {
        const bookCategory = await prisma.bookCategory.findMany();
        res.status(200).send(bookCategory);
    } catch (error) {
        res.status(500).send({ message: "Error fetching categories", error }); // Added error handling
    }
};
