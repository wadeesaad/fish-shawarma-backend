import bcrypt from "bcryptjs";

const hashFromDB = "$2b$10$E/LwIrLvRtcyWEotpg8zZuaRt8o3eYaXk9iBQO02wGiorpwKNGA4q";
const enteredPassword = "12345";

const match = await bcrypt.compare(enteredPassword, hashFromDB);

console.log("Password match:", match);
