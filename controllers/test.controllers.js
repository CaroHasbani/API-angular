export const getTest=(req,res)=>{
    // req = es toda la info que llega desde el navegador a mifuncion
    // res= es la respuest que se genera
    res.send({
        message: "api/test is working"
    })
}
