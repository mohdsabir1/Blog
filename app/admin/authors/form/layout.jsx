import React from 'react'
import AuthorFormContextProvider from './contexts/AuthorFormContext'


export default function FormLayout({children}) {
  return (
    <AuthorFormContextProvider>{children}</AuthorFormContextProvider>
  )
}
