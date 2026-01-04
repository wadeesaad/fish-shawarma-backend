import bcrypt from "bcryptjs";

const hashed = "$2b$10$E/LwIrLvRtcyWEotpg8zZuaRt8o3eYaXk9iBQO02wGiorpwKNGA4q";
const password = "12345";

bcrypt.compare(password, hashed)
  .then(result => {
    console.log("Password match:", result); // should print true
  })
  .catch(err => console.error(err));
