import * as userRepository from './user.repository.js';
import { hashPassword } from "../../utils/hash.js";

export const getAllUsers = async () => {
    return await userRepository.getAllUsers();
}

export const getUserById = async (id) => {
    return await userRepository.getUserById(id);
}

export const createUser = async (userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (existingUser) {
        const error = new Error("Email sudah terdaftar");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await hashPassword(userData.password);

    return await userRepository.createUser({
        ...userData,
        password: hashedPassword
    });
};

export const updateUser = async (id, userData) => {
    const existingUser = await userRepository.findUserByEmail(userData.email);

    if (existingUser && existingUser.id !== parseInt(id)) {
        const error = new Error("Email sudah terdaftar");
        error.statusCode = 409;
        throw error;
    }

    return await userRepository.updateUser(id, userData);
};

export const deleteUser = async (id) => {
    return await userRepository.deleteUser(id);
};
