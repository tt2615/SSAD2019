

const bgDic= (id)=>{
    const pictures=[
        require('../../../assets/images/backgrounds/1.gif'),
        require('../../../assets/images/backgrounds/2.jpeg')
    ]

    return pictures[id-1]
}

export default bgDic;