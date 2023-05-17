import { ref } from "vue"
import { storage } from '../firebase/config'
import { user } from './useUser.js'

const useStorage = () => {    
    const uploadImage = async (image) => {
    const error = ref(null)
    const url = ref(null) // длинная ссылка asdfghjkl
    const filePath = ref(null) // avatars/img.jpg


    try {
        filePath.value = `avatars/${user.value.uid}/${image.name}` //avatar/myUserId/img.jpg

        const storageRef = storage.ref(filePath.value)
        const res = await storageRef.put(image)

        url.value = await res.ref.getDownloadURL()
        
    } 
    catch (err) {
        error.value = err.message
    }
    return { error, url, filePath }
    }
    const sendImage = async (image) => {
    const error = ref(null)
    const url = ref(null) // длинная ссылка asdfghjkl
    const filePath = ref(null) // avatars/img.jpg


    try {
        filePath.value = `usersImages/${user.value.uid}/${image.name}` //usersImages/myUserId/img.jpg

        const storageRef = storage.ref(filePath.value)
        const res = await storageRef.put(image)

        url.value = await res.ref.getDownloadURL()
        
    } 
    catch (err) {
        error.value = err.message
    }
    return { error, url, filePath }
    }
    return {uploadImage,sendImage}
}


export default useStorage