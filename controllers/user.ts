import User from "../models/user.ts";
import {Request,Response} from "npm:express";

const getUser = async (req: Request,res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        res.json(user);
    } catch (error) {
        res.json({message: error.message})
    }
}

const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({message: error.message})
    }
}

const createUser = async (req: Request, res: Response) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.tatus(400).json({message: error.message});
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if(user === null) {
            return res.status(404).json({message: "Cannot find user"});
        }
        if(req.body.name != null) {
            user.name = req.body.name;
        }
        if(req.body.email != null) {
            user.email = req.body.email
        }
        if(req.body.password != null) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id);
        if(user == null) {
            return res.status(404).json({message: "Cannot find user"});
        }
        // depcreated things
        // await user.remove();

        await User.deleteOne({ _id: user._id });
        res.json({ message: "Deleted User" });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export {getUser, getUsers, createUser, updateUser, deleteUser};