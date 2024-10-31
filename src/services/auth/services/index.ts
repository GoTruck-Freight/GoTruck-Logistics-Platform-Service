import { db } from '../../../utils/db.server';
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Account, Role } from '@prisma/client';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

class AuthService {
    // İstifadəçi qeydiyyatı
    static async register(email: string, password: string, role: Role): Promise<Account> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await db.account.create({
            data: {
                email,
                password: hashedPassword,
                role,
            },
        });
        return newUser;
    }

    // İstifadəçi girişi
    static async login(email: string, password: string): Promise<string | null> {
        const user = await db.account.findUnique({
            where: { email },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('E-poçt və ya şifrə səhvdir');
        }

        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    }

    // İstifadəçinin rolunu yoxlamaq üçün metod
    static async verifyRole(token: string, requiredRole: Role): Promise<boolean> {
        try {
            // `unknown` tipindən çevirərək dəqiqliyi artırırıq
            const decodedToken = jwt.verify(token, JWT_SECRET) as unknown as { role: Role } & JwtPayload;
            
            // `decodedToken` içində `role`-un mövcudluğunu yoxlayın
            if (!decodedToken.role) {
                throw new Error('Invalid token: role not found');
            }

            return decodedToken.role === requiredRole;
        } catch (error) {
            throw new Error('Token verification failed');
        }
    }
}

export default AuthService;