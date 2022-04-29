function setStation(data){
  return{
    type:'SET_ACTIVE_STATION',
    payload:data
  }
}

function resetStation(){
  return{
    type:'RESET_STATION'
  }
}

function setActiveNode(data){
  return{
    type:'SET_ACTIVE_NODE',
    payload:data,
  }
}


export { setStation, resetStation, setActiveNode }