let cartContent=[];
export const getCart=(req,res)=>{
    // req = es toda la info que llega desde el navegador a mi funcion
    // res= es la respuesta que se genera
    res.send(cartContent);
}

export const addToCart=(req,res)=>{
   // necesito leer el body para obtener el json --> express solo no lo hace, hay que instalar una libreria (bodyParser)
    const itemToAdd= req.body;
    // eso me trae el json
    // lo pusheo, con el itemToAdd ya me viene el id
    if (cartContent.findIndex(movie=> movie.id === itemToAdd.id)<0){
        cartContent.push(itemToAdd);
        res.send({
            status:"ok",
            cartContent
        })
    } else{
        res.send({
            status:" not ok",
             // quiero que me devuelva el carrito actualizado
            cartContent
        })
    }
  
}

export const removeFromCart=(req,res)=>{
    const id= Number(req.query.id);
    const indexToRemove = cartContent.findIndex(movie=>movie.id===id);
    if(indexToRemove>=0){
      cartContent.splice(indexToRemove,1);
      res.send({
        status:'Deleted',
        cartContent
      });
    }else{
      res.send({
        status: 'Deletion cant be done',
        cartContent
      })
    }
  
  }
export const clearCart=(req,res)=>{
   cartContent=[];
 res.send(cartContent);
}


