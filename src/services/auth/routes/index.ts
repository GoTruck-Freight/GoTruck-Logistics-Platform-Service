import { Router } from 'express';
import AuthController from '../controller';
import { Role } from '@prisma/client';

const authRouter = Router();

// Qeydiyyat
authRouter.post('/register', AuthController.register);

// Giriş
authRouter.post('/login', AuthController.login);

// Məsələn, yalnız adminlərin istifadə edə biləcəyi bir route
authRouter.get('/admin-only', (req, res) => {
    AuthController.verifyRole(req, res, Role.ADMIN);
});

// Driver roluna uyğunluğu yoxlamaq üçün nümunə
authRouter.get('/driver-only', (req, res) => {
    AuthController.verifyRole(req, res, Role.DRIVER);
});

// Shipper roluna uyğunluğu yoxlamaq üçün nümunə
authRouter.get('/shipper-only', (req, res) => {
    AuthController.verifyRole(req, res, Role.SHIPPER);
});

export default authRouter;