import { useQuery } from "@/hooks/useQuery";
import api from "@/lib/axios";
import type React from "react";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Package,
  AlertCircle,
  ShoppingCart,
  X,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { BounceLoader } from "@/components/ui/laoder";

// --- Type Definitions ---
interface ItemMeta {
  font: string;
  text: string;
  color: string;
  size: string;
}

interface OrderItem {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  meta: ItemMeta;
}

interface ShippingAddress {
  fullName: string;
  contact: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface Order {
  _id: string;
  createdAt: string;
  paymentStatus: "Pending" | "Completed" | "Failed";
  orderStatus: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  totalAmount: number;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  paidAt: string | null;
}

// --- Status Badge Component ---
const StatusBadge = ({
  status,
  type = "payment",
}: {
  status: string;
  type?: "payment" | "order";
}) => {
  const paymentStatusConfig = {
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      label: "Payment Pending",
    },
    Completed: { bg: "bg-green-100", text: "text-green-800", label: "Paid" },
    Failed: { bg: "bg-red-100", text: "text-red-800", label: "Payment Failed" },
  };

  const orderStatusConfig = {
    Processing: {
      bg: "bg-blue-100",
      text: "text-blue-800",
      label: "Processing",
    },
    Shipped: { bg: "bg-purple-100", text: "text-purple-800", label: "Shipped" },
    Delivered: {
      bg: "bg-green-100",
      text: "text-green-800",
      label: "Delivered",
    },
    Cancelled: { bg: "bg-gray-100", text: "text-gray-800", label: "Cancelled" },
  };

  const config =
    type === "payment"
      ? paymentStatusConfig[status as keyof typeof paymentStatusConfig]
      : orderStatusConfig[status as keyof typeof orderStatusConfig];

  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${config.bg} ${config.text}`}
    >
      <span className="w-2 h-2 rounded-full mr-2 bg-current opacity-60"></span>
      {config.label}
    </span>
  );
};

// --- Order Item Card Component ---
const OrderItemCard = ({ item }: { item: OrderItem }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex-1">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
              {item.title}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 text-xs sm:text-sm text-gray-600">
              <div>
                <p className="text-gray-500">Qty</p>
                <p className="font-medium text-gray-900">{item.quantity}</p>
              </div>
              <div>
                <p className="text-gray-500">Color</p>
                <p className="font-medium text-gray-900">{item.meta.color}</p>
              </div>
              <div>
                <p className="text-gray-500">Font</p>
                <p className="font-medium text-gray-900 truncate">
                  {item.meta.font}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Size</p>
                <p className="font-medium text-gray-900 capitalize">
                  {item.meta.size}
                </p>
              </div>
            </div>
            {item.meta.text && (
              <div className="mt-2">
                <p className="text-xs text-gray-500">Custom Text</p>
                <p className="font-medium text-gray-900 text-sm break-words">
                  "{item.meta.text}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-500">Price</p>
        <p className="text-lg sm:text-xl font-bold text-gray-900">
          ₹{item.price.toFixed(2)}
        </p>
        {item.quantity > 1 && (
          <p className="text-xs text-gray-500 mt-1">
            ₹{(item.price * item.quantity).toFixed(2)} total
          </p>
        )}
      </div>
    </div>
  );
};

// --- Order Card Component ---
const OrderCard = ({ order, index }: { order: Order; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);

  const handleCancelOrder = async () => {
    setCancelLoading(true);
    try {
      console.log("Canceling order:", order._id);
      // TODO: Make API call to cancel order
      // await api.post(`/orders/${order._id}/cancel`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Order cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      alert("Failed to cancel order. Please try again.");
    } finally {
      setCancelLoading(false);
    }
  };

  const handleReturnOrder = async () => {
    setReturnLoading(true);
    try {
      console.log("Returning order:", order._id);
      // TODO: Make API call to return order
      // await api.post(`/orders/${order._id}/return`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Return request submitted successfully!");
    } catch (error) {
      console.error("Failed to return order:", error);
      alert("Failed to submit return request. Please try again.");
    } finally {
      setReturnLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const canCancel =
    order.paymentStatus === "Pending" ||
    (order.paymentStatus === "Completed" && order.orderStatus === "Processing");
  const canReturn =
    order.paymentStatus === "Completed" && order.orderStatus === "Delivered";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm text-gray-600 mb-1">
              Order ID:{" "}
              <span className="font-mono font-semibold text-gray-900">
                #{order._id.substring(0, 12)}...
              </span>
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Placed on:{" "}
              <span className="font-medium text-gray-900">
                {formatDate(order.createdAt)}
              </span>
            </p>
            {order.paidAt && (
              <p className="text-xs sm:text-sm text-gray-600">
                Paid on:{" "}
                <span className="font-medium text-gray-900">
                  {formatDate(order.paidAt)}
                </span>
              </p>
            )}
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 flex-wrap">
            <StatusBadge status={order.paymentStatus} type="payment" />
            <StatusBadge status={order.orderStatus} type="order" />
            <button
              onClick={() => setExpanded(!expanded)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              aria-label={
                expanded ? "Collapse order details" : "Expand order details"
              }
            >
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {!expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm">
            <div className="text-gray-600">
              <span className="font-medium text-gray-900">
                {order.items.length}
              </span>{" "}
              item
              {order.items.length !== 1 ? "s" : ""}
            </div>
            <div className="text-gray-900 font-semibold">
              Total:{" "}
              <span className="text-pink-600">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {expanded && (
        <>
          {/* Items */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Order Items
            </h3>
            <div className="space-y-3">
              {order.items.map((item) => (
                <OrderItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Shipping Address
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">
                {order.shippingAddress.fullName}
              </p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.zip}
              </p>
              <p className="flex items-center gap-1">
                <span className="text-gray-500">📞</span>
                {order.shippingAddress.contact}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="p-4 sm:p-6 bg-gray-50 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm sm:text-base text-gray-600">
                Order Total:
              </span>
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row gap-3">
            {canCancel && (
              <Button
                onClick={handleCancelOrder}
                disabled={cancelLoading}
                variant="outline"
                className="flex-1 gap-2 bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-300"
              >
                <X className="w-4 h-4" />
                {cancelLoading ? "Canceling..." : "Cancel Order"}
              </Button>
            )}
            {canReturn && (
              <Button
                onClick={handleReturnOrder}
                disabled={returnLoading}
                variant="outline"
                className="flex-1 gap-2 bg-transparent hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
              >
                <RotateCcw className="w-4 h-4" />
                {returnLoading ? "Processing..." : "Return Order"}
              </Button>
            )}
            {!canCancel && !canReturn && (
              <p className="text-sm text-gray-500 py-2 text-center">
                No actions available for this order
              </p>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

// --- Main Orders Component ---
const Orders: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>(
    async () => {
      const res = await api.get("/orders/my-orders", {});
      return res.data.orders;
    },
    {
      cacheKey: "ordersData",
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  if (isLoading) {
    return <BounceLoader />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
        <AlertCircle className="w-12 h-12 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-muted-foreground text-center">
          We couldn't fetch your orders. Please try again later.
        </p>
        <p className="mt-2 text-sm text-destructive">
          {error.message || "Something went wrong"}
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-4"
          variant="outline"
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-4xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            My Orders
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            View your order history and manage your purchases.
          </p>
        </motion.div>

        {/* Orders List or Empty State */}
        {!orders || !Array.isArray(orders) || orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-card p-8 sm:p-12 rounded-lg border border-border shadow-sm"
          >
            <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              No Orders Yet
            </h2>
            <p className="text-muted-foreground mb-6">
              You haven't placed any orders. Let's change that!
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
            >
              Start Shopping
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {orders.map((order, index) => (
              <OrderCard key={order._id} order={order} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
