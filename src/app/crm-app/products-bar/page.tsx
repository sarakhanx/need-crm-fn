'use client'

import React from 'react'
import MaxA4 from '@/components/wrapper/maxA4'
import ProductsBarRow from '../../../components/Products-bar-row'

export default function Page() {







  return (
   
      <div className="flex flex-col justify-between mt-2">
        <div className="flex justify-center w-full text-center">
        <h1 className='prompt-semibold text-xl'>ฟอร์มการออกใบรายการขอบาร์สินค้าเข้าระบบ</h1>
        </div>
          <ProductsBarRow/>
      </div>
  )
}
