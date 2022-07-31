const getUserRole = function(element){
  if(element==='hacker'){
    return{
      role:"hacker",
      type:null
    }
  }
  else if(element==='program_super_admin' || element==='program_manager'){
    return{
      role:'client',
      type:element==='program_super_admin'?'super_manager':'manager'
    }
  }
  else{
    return{
      role:"march1st",
      type:null
    }
  }
}
export {
  getUserRole
}
