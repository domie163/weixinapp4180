const base = {
    get() {
        return {
            url : "http://localhost:8080/qingshaoniankepujiaoxuepingtai/",
            name: "qingshaoniankepujiaoxuepingtai",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/qingshaoniankepujiaoxuepingtai/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "青少年科普教学系统平台"
        } 
    }
}
export default base
