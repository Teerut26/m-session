const imageDiscord = (id: string, avatar: string,size?:"128"|"256"|"512") => {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.webp?size=${size ? size : "128"}`;
};

export default imageDiscord;