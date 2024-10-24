import React from 'react'

import PostFormContextProvider from './contexts/PostFormContext'


export default function FormLayout({children}) {
  return (
    <PostFormContextProvider>{children}</PostFormContextProvider>
  )
}
