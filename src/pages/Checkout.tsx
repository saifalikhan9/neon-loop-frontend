import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { motion } from "motion/react";
import { Lock, Truck, CheckCircle } from "lucide-react";
import {  useNavigate } from "react-router";
import { useCart } from "@/hooks/useCart";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRazorpay, type RazorpayResponse } from "@/lib/Rzorpay";
import { additionalCargesfn } from "@/utils/additionalCharges";
import { BounceLoader } from "@/components/ui/laoder";
interface ShippingData {
  fullName: string;
  email: string;
  address: string;
  state: string;
  city: string;
  zip: string;
  contact: string;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { isLoading, isAuthenticated } = useAuth();
  const isRazorpayLoaded = useRazorpay();
  const [shippingAddress, setshippingAddress, clearValue] =
    useLocalStorage<ShippingData>("shippingAddress", {
      fullName: "",
      email: "",
      address: "",
      state: "",
      city: "",
      zip: "",
      contact: "",
    });


  if (isLoading) {
    return <BounceLoader />;
  }

  const additionalCarges = additionalCargesfn(total);
  
  async function verifyPayment(response:RazorpayResponse) {
    try {
       await api.post("orders/verify-payment", {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
      });

      // console.log(res);
      setTimeout(() => navigate("/orders"), 2000);
    } catch (error) {
      console.error("Verification error:", error);
      alert("Payment verification failed!");
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("please login first");
    }
    if (!isRazorpayLoaded) {
      alert("Payment gateway is loading. Please wait...");
      return;
    }

    try {
      const res = await api.post("orders/create-order", {
        items,
        shippingAddress,
        totalAmount: additionalCarges?.totalAmount,
      });

      const order = res.data;

      const options = {
        key: order?.razorpayKeyId,
        amount: order?.razorpayOrder?.amount,
        currency: order?.razorpayOrder?.currency,
        name: "Your Neon Sign Store",
        description: "Neon Sign Purchase",
        order_id: order?.razorpayOrder?.id,
        handler: async function (response:RazorpayResponse) {
          // Step 3: Verify payment
           await verifyPayment(response);
          // console.log(res);
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#FF6B6B", // Your brand color
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      clearCart();
      clearValue();
    } catch (err) {
      // Handle the error, e.g., show a notification to the user
      console.log(err);
      alert(`Failed to place order`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl mb-2">Checkout</h1>
          <p className="text-lg text-gray-600">Complete your order</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <motion.div
                className="bg-white border border-gray-200 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-6 h-6 text-pink-500" />
                  <h2 className="text-2xl">Shipping Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.fullName}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          fullName: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2 ">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.email}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.address}
                      onChange={(e) => {
                        setshippingAddress((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.city}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          city: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.state}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          state: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.zip}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          zip: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      className="border-gray-200 focus:border-pink-300 transition-colors"
                      value={shippingAddress.contact}
                      onChange={(e) => {
                        setshippingAddress({
                          ...shippingAddress,
                          contact: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-white border border-gray-200 p-6 rounded-lg sticky top-24">
                <h2 className="text-2xl mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <div className="mb-1">{item.title}</div>
                        <div className="text-gray-600">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div>₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Pricing */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping Cost</span>
                    <span>₹{additionalCarges.shippingCharge}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{additionalCarges.tax}</span>
                  </div>

                  <Separator className="my-4" />
                  <div className="flex justify-between text-xl">
                    <span>Total</span>
                    <span>₹{additionalCarges?.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white mb-3 group relative overflow-hidden"
                  size="lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center justify-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Place Order
                  </span>
                </Button>

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Secure SSL Encryption</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>2-Year Warranty Included</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
}
