import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({msg: 'All users', data: users});
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserByUsername = async (req, res) => {
    try {
        const response = await prisma.user.findUnique({
            where: {
                username: req.params.username,
            },
        });
        if (!response) {
            res.status(404).json({ msg: 'User not found' });
        } else {
            res.status(200).json({msg: 'User found', data: response});
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

// Function to login a user
export const login = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = req.body.password === user.password;
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Password' });
    }
    res.json({ username:user.username,msg: 'Login successful' });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


