import { Request, Response } from 'express';
import AuthService from '../services';
import { Role } from '@prisma/client';

class AuthController {
    // Qeydiyyat üçün endpoint
    static async register(req: Request, res: Response): Promise<void> {
        const { email, password, role } = req.body;
        try {
            const newUser = await AuthService.register(email, password, role);
            res.status(201).json({ message: 'Qeydiyyat uğurlu oldu', user: newUser });
        } catch (error: any) {
            res.status(400).json({ message: 'Qeydiyyatda problem yarandı', error: error.message });
        }
    }

    // Giriş üçün endpoint
    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const token = await AuthService.login(email, password);
            if (!token) throw new Error('Giriş uğursuz oldu');
            res.status(200).json({ message: 'Giriş uğurludur', token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    }

    // Rol yoxlama üçün endpoint (Authorization)
    static async verifyRole(req: Request, res: Response, requiredRole: Role): Promise<void> {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            res.status(403).json({ message: 'Token təqdim olunmayıb' });
            return;
        }
        
        try {
            const hasRole = await AuthService.verifyRole(token, requiredRole);
            if (hasRole) {
                res.status(200).json({ message: 'Rol uyğun gəldi' });
            } else {
                res.status(403).json({ message: 'Rol uyğun gəlmir' });
            }
        } catch (error: any) {
            res.status(403).json({ message: error.message });
        }
    }
}

export default AuthController;