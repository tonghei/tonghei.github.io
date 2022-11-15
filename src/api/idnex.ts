import axios from "axios";

const request = axios.create({
    timeout: 10000
})

export const reqOneSentence = () => request({ url: 'https://tenapi.cn/yiyan/?format=js', method: 'get' })