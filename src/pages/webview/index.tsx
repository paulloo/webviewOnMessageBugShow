import React, { useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'

import { WebView } from '@tarojs/components'

import './index.scss'

function WebViewPage(props) {
  const router = useRouter()
  const [weburl, setWeburl] = useState('')

  const { url } = router.params

  useEffect(() => {
    const _weburl = decodeURIComponent(url || '')
    debugger
    if (process.env.TARO_ENV === 'h5') {
      window.location.replace(_weburl)
      return
    }
    setWeburl(_weburl)
  }, [url])

  function onLoadHandler(e) {
    console.log('onLoad: ', e.detail)
    debugger
  }

  function onErrorHandler(e) {
    console.log('onError: ', e.detail)
    debugger
  }

  function onMessageHandler(e) {
    console.log('onMessageHandler: ', e)
    debugger
    Taro.eventCenter.trigger('onMessage', { data: e.detail })
  }

  return <WebView src={weburl} onLoad={onLoadHandler} onError={onErrorHandler} onMessage={onMessageHandler} />
}

export default WebViewPage
