const imgRegex: RegExp = /\.(gif|jpg|jpeg|tiff|png|webp|bmp)$/i;

export const isImg = (str: string) => imgRegex.test(str);
