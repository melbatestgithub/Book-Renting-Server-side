const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const { Ability } = require('@casl/ability');
const defineRulesFor = require('../middleware/ability');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, address, phoneNumber, role } = req.body;

    // Validate required fields
    if (!email || !password || !address || !role) {
        return res.status(400).json({ message: "Email, password, confirm password, address, and role are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                firstName,
                confirmPassword:hashedPassword,
                lastName,
                address,
                phoneNumber,
                role
            }
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error details:', error); // Log error details
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });

        // Check if user exists and password is correct
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Define abilities based on the user's role
        const rules = defineRulesFor(user.role);
        const ability = new Ability(rules);

        // Generate a JWT token with the user's role
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        // Respond with user info and token
        res.status(200).json({
            id: user.id,
            email: user.email,
            role: user.role,
            firstName:user.firstName,
            lastName:user.lastName,
            token,
            abilities: ability.rules
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id); // Assuming you're passing the user ID as a parameter
    const {
      email,
      firstName,
      lastName,
      password,
      address,
      confirmPassword,
      status,
      phoneNumber,
      total_upload,
      role,
      approved,
    } = req.body;
  
    try {
      // Validate input if necessary (e.g., password matching, email format, etc.)
      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }
  
      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          email,
          firstName,
          lastName,
          password,
          address,
          confirmPassword,
          status,
          phoneNumber,
          total_upload,
          role,
          approved,
        },
      });
  
      // Respond with the updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Failed to update user", error });
    }
  };

  exports.getAllUser=async(req,res)=>{
    try {
        const users=await prisma.user.findMany()
        res.status(200).send(users)
    } catch (error) {
       res.status(500).send("Error is occured",error) 
    }
  }