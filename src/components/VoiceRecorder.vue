<template>
    <div ref="container" class="container">
      <div class="recorder-container"></div>
    </div>
    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
      <ion-fab-button>
        <ion-icon :icon="chevronUpCircle"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button @click="stopRecorder">
          <ion-icon :icon="stop"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>
    <ion-loading :is-open="!initialized" message="Loading..." />
  </template>
  
  <script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue';
  import { IonFab, IonFabButton, IonIcon, IonFabList, IonLoading } from '@ionic/vue';

  import { Capacitor, PluginListenerHandle } from "@capacitor/core";
  import { VoiceRecorder } from 'capacitor-voice-recorder';
  import {
    chevronUpCircle,
    flashlight,
    stop,
    cameraReverse,
  } from 'ionicons/icons';
  const viewBox = ref("0 0 1280 720");
  
  const container = ref<HTMLDivElement|undefined>();
  const initialized = ref(false);
  let torchOn = false;
  let onPlayedListener:PluginListenerHandle|undefined;
  let interval:any;
  let detecting = false;

  const emit = defineEmits<{
    (e: 'onStopped'): void
    (e: 'onRecorded',blob:Blob,path:string|undefined): void
  }>();
  
  onMounted(async () => {
    try {
      VoiceRecorder.requestAudioRecordingPermission().then((result: any) => console.log(result.value));
      if (container.value && Capacitor.isNativePlatform() === false) {
        
      }
     
      if (onPlayedListener) {
        onPlayedListener.remove();
      }
      
      
    } catch (error) {
      alert(error);
    }
    initialized.value = true;
  });
  
  onBeforeUnmount(async () => {
    if (onPlayedListener) {
      onPlayedListener.remove();
    }
    stopRecording();
  });
  
  const startRecording = () => {
    /* VoiceRecorder.startRecording(options?: RecordingOptions)
    .then((result: any) => console.log(result.value))
    .catch(
      error => console.log(error)
      
    ); */
    
  }
  
  const stopRecording = () => {
    clearInterval(interval);
    emit("onStopped");
  }
  
  const stopRecorder = async () => {
    if (onPlayedListener) {
      onPlayedListener.remove();
    }
    stopRecording();
    
  }
  
  </script>
  
  <style scoped>
  .container {
    width:100%;
    height:100%;
  }
  </style>