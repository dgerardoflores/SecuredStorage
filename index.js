import Crypto from "./src/helpers/Crypto.js";

console.log(Crypto.encrypt("En el trabajo no se debe peinar la gata", "3e$C!F)H@McQfTjK"))

console.log(Crypto.decrypt("86PVqXRrfJtHqjBNazWrZ4c8Zpcn+ypu6NOcXfY6FlKNNC4hJEgexiJdNrZrzi3g6HIFDp65zQ==", "3e$C!F)H@McQfTjK"));
