const buffer = Buffer.alloc(8);

buffer.writeInt16LE(258,0);
console.log(buffer);

buffer.writeInt16BE(258, 0);
console.log(buffer);