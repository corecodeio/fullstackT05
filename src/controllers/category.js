const allCategory = (req,res,next)=>{
    return res.status(200)
    .json({
        message: 'all category',
    })
}
const createCategory = (req,res,next)=>{
    //console.log(req.person);
    try {
        const args = {
            id: req.person.id,
            name: req.body.name,
            description: req.body.description
        }
        //const response = 
    } catch (error) {
        
    }
    return res.status(200)
    .json({
        message: 'create category',
    })
}
module.exports = {
    allCategory, createCategory
}