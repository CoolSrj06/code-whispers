const sessionIdToUserMap= new Map();// it is basically a hash map

function setUser(id,user){
    sessionIdToUserMap.set(id,user);
}

function getUser(id){
    return sessionIdToUserMap.get(id);
}

module.exports={
    setUser,
    getUser,
}