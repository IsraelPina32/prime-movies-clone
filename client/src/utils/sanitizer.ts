/* 
    Ensures the poster URL is secure and provides a fallback if the image does not exist.
*/

 export  const getSecurePoster = (url: string) => {
        if (!url || url === 'N/A') return 'https://via.placeholder.com/300x450?text=Sem+Poster';
            
        return url.replace(/^http:\/\//i, 'https://');
};