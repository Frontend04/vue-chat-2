<script setup>
import { ref } from '@vue/reactivity';
import { ru } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated } from '@vue/runtime-core';
import getCollecton from '../composables/getCollection';
import bll from '@/assets/bll.jpg'
import { user } from '../composables/useUser'

const messages = ref(null)
const { documents } = getCollecton('messages');

onUpdated(() => {
    messages.value.scrollTop = messages.value.scrollHeight;
});
    
const formattedDocuments = computed(() => {
    if(documents.value) {
        return documents.value.map((doc) => {
            const time = formatDistanceToNow(doc.createdAt.toDate(), {
                locale: ru,
                addSuffix: false,
                includeSeconds: true
            });
            return { ...doc, createdAt: time }
        })
    }
})


</script>

<template> 
  <div class="chat-window">
      <div :ref="(el) => messages = el"   v-if="documents" class="messages">
          <div :class="{me: user.uid === doc.userId}" class="chat__message" v-for="doc in formattedDocuments" :key="doc.id">
              <img class="chat__avatar"  :src="doc.avatar" alt="">
             <div v-if="doc.message" >
              <span v-if="user.uid !== doc.userId" class="name">{{ doc.name }}</span> 
              <span class="message">{{ doc.message }}</span> 
              <span class="created-at">{{ doc.createdAt }}</span>
             </div>
             <div :class="{ me:user.uid !== doc.userId }" v-else>
                 <div>
                  <img class="chat__image" :src="doc.image" alt="">
                 <span class="created-at">{{ doc.createdAt }}</span>   
                 </div>         
             </div>
          </div>
      </div>
      <div v-else>Идет загрузкa...</div>
  </div>
</template>

<style scoped>
.chat-window{
    background: #fafafa;
    padding: 30px 20px;
}
.chat__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-right: 10px;
}
.chat__image {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 12px;
}
.chat__image.me {
    display: flex;
    justify-content: flex-end;
    width: 50%;
}
.chat__message {
    display: flex;
    margin-bottom: 10px;
}
.me.chat__message {
   flex-flow: row-reverse;
}
.me.chat__message img {
    margin-right: 0;
    margin-left: 10px;
}
.me.chat__message .created-at{
   display: flex;
   justify-content: flex-end;
}
.single{
    margin: 18px 0;
}
.created-at{
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
}
.name{
    font-weight: bold;
    margin-right: 6px;
}
.messages{
    max-height: 400px;
    overflow: auto;
}
</style>