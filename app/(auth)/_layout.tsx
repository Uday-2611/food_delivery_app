import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import React from 'react'
import { Slot } from 'expo-router'
import { images } from '@/constants'
import Custominput from '@/components/Custominput'
import Custombutton from '@/components/Custombutton'

const _layout = () => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView className='bg-white h-full' keyboardShouldPersistTaps='handled' >
        <View className='w-full relative' style={{ height: Dimensions.get('screen').height / 2.25 }}>
          <ImageBackground source={images.loginGraphic} className='size-full rounded-b-lg' resizeMode='stretch' />
          <Image source={images.logo} className='size-48 self-center absolute -bottom-16 z-10' />
        </View>
        <Slot />
      </ScrollView>
    </KeyboardAvoidingView>

  )
}

export default _layout