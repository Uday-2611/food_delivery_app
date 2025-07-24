import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Custominput from '@/components/Custominput'
import Custombutton from '@/components/Custombutton'
import { signIn } from '@/lib/appwrite'

const SignIn = () => {


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })

  const submit = async () => {

    const { email, password } = form;


    if (!email || !password) return Alert.alert('Error', 'Please enter valid email and password')

    setIsSubmitting(true)

    try {
      await signIn({ email, password });
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <Custominput
        placeholder='Enter your email'
        value={form.email}
        onChangeText={(text) => setForm((prev) => ({ ...prev, email: text }))}
        label='Email'
        keyboardType='email-address'
      />
      <Custominput
        placeholder='Enter your password'
        value={form.password}
        onChangeText={(text) => setForm((prev) => ({ ...prev, password: text }))}
        label='Password'
        secureTextEntry={true}
      />

      <Custombutton
        title='Sign In'
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Don&apos;t have an account?
        </Text>
        <Link href='/sign-up' className='base-bold text-primary'>
          Sign Up
        </Link>
      </View>
    </View>
  )
}

export default SignIn