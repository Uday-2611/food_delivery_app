import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Custominput from '@/components/Custominput'
import Custombutton from '@/components/Custombutton'
import { createUser } from '@/lib/appwrite'
import * as Sentry from '@sentry/react-native'


const SignUp = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const submit = async () => {

    const { name, email, password } = form;

    if (!name || !email || !password) return Alert.alert('Error', 'Please enter valid name, email and password')

    setIsSubmitting(true)

    try {
      await createUser({ email, password, name })
      router.replace('/');
    } catch (error: any) {
      Alert.alert('Error', error.message);
      Sentry.captureEvent(error);

    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className='gap-10 bg-white rounded-lg p-5 mt-5'>
      <Custominput
        placeholder='Enter your full name'
        value={form.name}
        onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
        label='Full Name'
      />

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
        title='Sign Up'
        isLoading={isSubmitting}
        onPress={submit}
      />

      <View className='flex justify-center mt-5 flex-row gap-2'>
        <Text className='base-regular text-gray-100'>
          Already have an account?
        </Text>
        <Link href='/sign-in' className='base-bold text-primary'>
          Sign In
        </Link>
      </View>
    </View>
  )
}

export default SignUp