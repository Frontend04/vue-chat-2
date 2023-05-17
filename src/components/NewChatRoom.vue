<script setup>
import { ref } from '@vue/reactivity'
import { user } from "../composables/useUser"
import { timestamp } from '../firebase/config'
import useCollection from '../composables/useCollection'
import share from '@/assets/share.png'
import useStorage from '../composables/useStorage'
const message = ref("")
const image = ref(null)

const { sendImage } = useStorage();

 const chat = {
        userId:user.value.uid,
        name:user.value.displayName,
        createdAt:timestamp(),
        avatar: user.value.photoURL  ,
    };

const { addDoc, error } = useCollection('messages');

const handleChangeFile = async (event) => {
  const { url } = await sendImage(await event.target.files[0])
    await addDoc({ ...chat, image: url.value })

    if(error.value) {
        console.log(error.message)
    }

    message.value = ''
}


const handleSubmitMessage = async () => {
 
     await addDoc({ ...chat, message: message.value })

    if(error.value) {
        console.log(error.message)
    }

    message.value = ''
}
</script>

<template>
  <form>
      <textarea
       v-model="message"
       @keypress.enter="handleSubmitMessage"
       placeholder="Type a message and hit enter to send"></textarea>
       <div class="share">
        <label>
           <img :src="share" alt="">
       <input type="file" @change="handleChangeFile" />   
        </label>
       </div>
  </form>
</template>

<style scoped>
form{
    margin: 10px;
    display: flex;
}
img {
    width: 40px;
    height: 40px;
    cursor: pointer;
}
textarea{
    width: 100%;
    max-width: 80%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius:20px;
    font-family:inherit;
    outline: none;
    resize: none;
}
.share {
    border-left: 2px solid #5ae4ca;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%; 
}
.share input {
    display: none;
}
.error{
    text-align: center;
    color:#ff2a58;
    font-size: 12px;
    padding: 10px 0;
}

</style>