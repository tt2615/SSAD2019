
const charPic=(id)=>{
    const images = [
        require('./biobo.png'),
        require('./thorin.png')
    ];

    return images[id];
}

export default charPic;