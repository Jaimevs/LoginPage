import mutations from "./mutations";
import getters from "./getters";

export default{
    namepaced: true,
    state(){
        return {
            authenticated: false,
            username: ""
        }
    },
    mutations,
    getters
}