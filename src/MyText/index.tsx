import { View, Text } from 'react-native'
import React from 'react'
import adjust from './adjust'

interface MyTextProps {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  title: string;
  style?: any;
  color: string;
}

export const MyText = ({h1,h2,h3,h4,h5,h6,title,style,color}: MyTextProps)=>{
  return (
    <Text
        style={{
            fontSize: h1 ? adjust(18) : h2 ? adjust(16) : h3 ? adjust(14) : h4 ? adjust(12) : h5 ? adjust(10) : h6 ? adjust(8) : undefined,
            color:color,
            ...style,
        }}
    >
        {title}
    </Text>
  )
}