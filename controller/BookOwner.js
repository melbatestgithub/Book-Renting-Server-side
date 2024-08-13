const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getBookOwner = async (req, res) => {
  try {
    // Fetch all users where the role is 'book owner'
    const bookOwners = await prisma.user.findMany({
      where: {
        role: 'Owner',
      },
    });

    // Check if any book owners were found
    if (bookOwners.length === 0) {
      return res.status(404).json({ message: 'No book owners found' });
    }

    // Return the list of book owners
    res.status(200).json(bookOwners);
  } catch (error) {
    console.error('Error fetching book owners:', error);
    res.status(500).json({ message: 'An error occurred while fetching book owners' });
  }
};

exports.approveUser = async (req, res) => {
  const { id } = req.params;

  // Ensure 'id' is parsed to an integer
  const userId = parseInt(id);

  // Check if 'userId' is a valid number
  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { approved: true },
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteUser= async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: 'Book owner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book owner' });
  }
}

