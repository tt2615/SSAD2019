

const bgDic= (id)=>{
    const pictures=[
        require('../../../assets/images/backgrounds/laketown.png'),
        require('../../../assets/images/backgrounds/rivendell.png')
    ]

    return pictures[id-1]
}

export default bgDic;