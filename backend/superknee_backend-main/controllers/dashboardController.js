import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const recentOrders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(8);
    
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const customers = await User.countDocuments({ role: "user" });
    
    // 1. Basic Revenue (Completed only)
    const revenueData = await Order.aggregate([
      { $match: { paymentStatus: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = revenueData[0]?.total || 0;

    // 2. Average Order Value (AOV)
    const aov = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

    // 3. Revenue Trends (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const dailyRevenue = await Order.aggregate([
      { 
        $match: { 
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: "Completed"
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // 4. Order Status Distribution
    const statusDistribution = await Order.aggregate([
      { $group: { _id: "$orderStatus", count: { $sum: 1 } } }
    ]);

    // 5. Payment Method Breakdown
    const paymentBreakdown = await Order.aggregate([
      { $group: { _id: "$paymentMethod", count: { $sum: 1 }, total: { $sum: "$totalAmount" } } }
    ]);

    // 6. Top Selling Products (Logic: sum quantity from all orders)
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      { 
        $group: { 
          _id: "$items.productId", 
          name: { $first: "$items.name" },
          soldCount: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } }
        } 
      },
      { $sort: { soldCount: -1 } },
      { $limit: 5 }
    ]);

    res.json({
      success: true,
      stats: {
        totalOrders,
        totalProducts,
        customers,
        revenue: totalRevenue,
        aov,
        trends: dailyRevenue,
        statusDistribution,
        paymentBreakdown,
        topProducts
      },
      recentOrders
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};