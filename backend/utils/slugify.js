function slugify(text) {
return text
    .toString()   // pastikan string
    .toLowerCase()   // menjadikannya huruf kecil
    .trim()     // hapus spasi di belakang
    .replace(/\s+/g, '-') // spasi ganti jadi -
    .replace(/\-\-+/g, '-'); // ganti double -- jadi -
}
module.exports = { slugify };