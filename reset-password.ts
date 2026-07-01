import 'dotenv/config'
import { prisma } from './lib/prisma'
import bcrypt from 'bcryptjs'

async function resetPassword() {
  const email = 'kenlubs45@gmail.com'
  const newPassword = '374983Ken@' // Change this to your desired password
  
  const hashedPassword = await bcrypt.hash(newPassword, 10)
  
  const user = await prisma.user.update({
    where: { email },
    data: { password: hashedPassword },
  })
  
  console.log(`Password reset for ${email}`)
  console.log(`New password: ${newPassword}`)
  console.log(`User: ${user.name} (${user.role})`)
}

resetPassword()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
