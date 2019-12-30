import { useEffect, useRef, useState } from 'react'

const useStripe = (apiKey: string) => {
  // guard against SSR
  if (typeof window === undefined) {
    return null
  }

  const loadTimer = useRef<any>(null)
  const [stripe, setStripe] = useState(null)

  // initiate stripe js
  if (
    document.getElementById('stripe-js') !== undefined &&
    (window as any).Stripe === undefined
  ) {
    const script = document.createElement('script')
    script.async = true
    script.id = 'stripe-js'
    script.src = 'https://js.stripe.com/v3/'
    script.type = 'text/javascript'

    document.getElementsByTagName('head')[0].appendChild(script)

    // check if the stripe scripts are loaded before rendering the form
    useEffect(() => {
      loadTimer.current = setInterval(() => {
        if ((window as any).Stripe !== undefined) {
          setStripe((window as any).Stripe(apiKey))
          clearInterval(loadTimer.current)
        }
      }, 100)

      return () => {
        clearInterval(loadTimer.current)
      }
    }, [])
  }

  return stripe
}

export { useStripe }
