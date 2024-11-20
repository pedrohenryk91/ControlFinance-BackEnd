import bcrypt from 'bcryptjs';

export async function hashPassword(password: string){
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = bcrypt.hash(password, salt)
    return hashedPassword
}

export function comparePassword(password, hashedPassword){
    return bcrypt.compare(password, hashedPassword)
}