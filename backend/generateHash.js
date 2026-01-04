import bcrypt from "bcryptjs";

const password = "12345";

bcrypt.hash(password, 10).then((hash) => {
  console.log("COPY THIS HASH ↓");
  console.log(hash);
});
