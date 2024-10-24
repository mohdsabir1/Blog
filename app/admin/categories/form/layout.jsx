import React from 'react'
import CatFormContext from './contexts/CatFormContext'

export default function FormLayout({children}) {
  return (
    <CatFormContext>{children}</CatFormContext>
  )
}
