"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Printer } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/cart-context"
import { Checkmark } from "@/components/ui/Checkmark" // adjust path as needed

export default function SuccessPage() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useCart()

  const tax = cartTotal * 0.1
  const grandTotal = cartTotal + tax
  const receiptNumber = Math.floor(100000 + Math.random() * 900000)
  const date = new Date().toLocaleString()

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/")
    }
  }, [cart, router])

  const handleBackToPOS = () => {
    clearCart()
    router.push("/")
  }

  const handlePrint = () => {
    window.print()
  }

  if (cart.length === 0) return null

  return (
    <div className="container mx-auto max-w-md py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="rounded-lg border p-6 print:border-none bg-white dark:bg-zinc-900"
      >
        {/* Animated check icon */}
        <motion.div
          className="mb-6 flex items-center justify-center relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.div
            className="absolute inset-0 blur-xl bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          />
          <Checkmark
            size={80}
            strokeWidth={4}
            color="rgb(16 185 129)"
            className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
          />
        </motion.div>

        <h1 className="mb-2 text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100">Payment Successful</h1>
        <p className="mb-6 text-center text-muted-foreground">Thank you for your purchase!</p>

        <div className="mb-6 text-center">
          <p className="font-medium">Receipt #{receiptNumber}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-zinc-800 dark:text-zinc-100">
              <p>{item.name} × {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-2 text-zinc-900 dark:text-zinc-100">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax (10%)</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-bold">
            <p>Total</p>
            <p>${grandTotal.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="w-full">
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
          <Button onClick={handleBackToPOS} className="w-full">
            Go Back to POS
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
