import { ref } from 'vue'
import { auth } from '@/firebase/config'
import useStorage from './useStorage'

const error = ref(null)
const { uploadImage } = useStorage()

const signup = async (email, password, name, avatar) => {
  error.value = null

  try {
    const response = await auth.createUserWithEmailAndPassword(email, password)

    const { url } = await uploadImage(avatar)
   
    if (!response) {
      throw new Error('Невозможно провести регистрацию')
    }

    await response.user.updateProfile({ displayName: name, photoURL: url.value })
    error.value = null

  return response
  } catch (err) {
    console.log(err.message)
    error.value = err.message
  }
}

const useSignup = () => {
  return { error, signup }
}

export default useSignup