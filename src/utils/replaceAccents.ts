export function replaceAccents(str) {
    const map = {
        á: "a", é: "e", í: "i", ó: "o", ú: "u",
        Á: "A", É: "E", Í: "I", Ó: "O", Ú: "U",
        ñ: "n", Ñ: "N"
    };
    return str.replace(/[áéíóúÁÉÍÓÚñÑ]/g, match => map[match]);
}