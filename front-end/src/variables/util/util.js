export function jsonParse(str){
    console.log("line 2",str)
    return str.parseJSON();
    //return JSON.parse(str);
    //return eval("(" + str + ")")
    //return "JSON" in window ? JSON.parse(str): eval("(" + str + ")")
}