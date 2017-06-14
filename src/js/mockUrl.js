/**
 * Created by Gatsby on 2017/6/14.
 */
import Mock from 'mockjs';
export default {
    '/login':(option)=>{
        const login=Mock.mock({
            data:{
                userNickName:'sunshine824',
                userId:0
            }
        })
    }
}