export default function validateVideoURL(url: string){
    const result = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(result)
      return result[1];
    return null;
};
